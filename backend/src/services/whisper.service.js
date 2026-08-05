import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import Groq from 'groq-sdk';
import pLimit from 'p-limit';
import { config } from '../config/index.js';

export class WhisperService {
  
  static getAudioDuration(filePath) {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(filePath, (err, metadata) => {
        if (err) return reject(err);
        resolve(metadata.format.duration);
      });
    });
  }

  static splitAudio(filePath) {
    return new Promise((resolve, reject) => {
      const dir = path.dirname(filePath);
      const ext = path.extname(filePath);
      const base = path.basename(filePath, ext);
      const piecePath = path.join(dir, `${base}_groq_%03d${ext}`);

      ffmpeg(filePath)
        .outputOptions([
          `-f segment`,
          `-segment_time ${config.targetChunkSeconds}`,
          `-c copy`
        ])
        .output(piecePath)
        .on('end', () => {
          // Find all pieces
          const files = fs.readdirSync(dir)
            .filter(f => f.startsWith(`${base}_groq_`) && f.endsWith(ext))
            .sort();
          resolve(files.map(f => path.join(dir, f)));
        })
        .on('error', reject)
        .run();
    });
  }

  static async sendToGroq(piecePath, groq) {
    // Retry logic
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      try {
        const response = await groq.audio.transcriptions.create({
          file: fs.createReadStream(piecePath),
          model: config.whisperModel,
          response_format: 'json',
        });
        
        return response.text || '';
      } catch (error) {
        attempts++;
        
        const isRateLimit = error.status === 429;
        
        if (attempts >= maxAttempts) {
          return '';
        }
        
        // Exponential backoff
        const backoff = 1000 * (2 ** (attempts - 1));
        await new Promise(res => setTimeout(res, backoff));
      }
    }
  }

  /**
   * Uses Groq's Audio Transcription API purely in JavaScript, chunking large files adaptively.
   */
  static async transcribe(filePath) {
    if (!config.groqApiKey) {
      throw new Error("GROQ_API_KEY is not set for Whisper API.");
    }

    const groq = new Groq({ 
      apiKey: config.groqApiKey,
      timeout: 30000, // 30 seconds
      maxRetries: 0   // Disable internal retries so our custom backoff handles it
    });
    const limit = pLimit(config.groqConcurrency);
    
    const dir = path.dirname(filePath);
    const ext = path.extname(filePath);
    const base = path.basename(filePath, ext);
    
    try {
      const pieces = await this.splitAudio(filePath);
      
      let completed = 0;
      
      // Map pieces to limited concurrent promises
      const promises = pieces.map((piece) => limit(async () => {
        try {
          const text = await this.sendToGroq(piece, groq);
          completed++;
          return text;
        } finally {
          // Cleanup chunk immediately
          if (fs.existsSync(piece)) fs.unlinkSync(piece);
        }
      }));
      
      // Promise.all guarantees the order of the returned array matches the input pieces array
      const texts = await Promise.all(promises);
      const fullText = texts.join(" ").trim();

      if (!fullText) {
        throw new Error("Transcript file was not generated or returned empty by Groq API.");
      }

      return fullText;
    } finally {
      // Fallback robust cleanup for any chunks left behind (e.g. if splitAudio throws or process crashes midway)
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir).filter(f => f.startsWith(`${base}_groq_`) && f.endsWith(ext));
        for (const f of files) {
          const piecePath = path.join(dir, f);
          if (fs.existsSync(piecePath)) {
            try {
              fs.unlinkSync(piecePath);
            } catch (e) {
              console.error(`Failed to cleanup chunk: ${piecePath}`, e);
            }
          }
        }
      }
    }
  }
}
