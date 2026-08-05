import axios from 'axios';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import ffmpeg from 'fluent-ffmpeg';
import { config } from '../config/index.js';
import { v4 as uuidv4 } from 'uuid';

const SARVAM_PIECE_SECONDS = 25;
const SARVAM_STT_TRANSLATE_URL = 'https://api.sarvam.ai/speech-to-text-translate';

export class SarvamService {
  
  static getAudioDuration(filePath) {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(filePath, (err, metadata) => {
        if (err) return reject(err);
        resolve(metadata.format.duration);
      });
    });
  }

  static splitAudio(filePath, durationSeconds) {
    return new Promise((resolve, reject) => {
      const dir = path.dirname(filePath);
      const ext = path.extname(filePath);
      const base = path.basename(filePath, ext);
      const piecePath = path.join(dir, `${base}_%03d${ext}`);

      ffmpeg(filePath)
        .outputOptions([
          `-f segment`,
          `-segment_time ${SARVAM_PIECE_SECONDS}`,
          `-c copy`
        ])
        .output(piecePath)
        .on('end', () => {
          // Find all pieces
          const files = fs.readdirSync(dir)
            .filter(f => f.startsWith(`${base}_`) && f.endsWith(ext) && f !== path.basename(filePath))
            .sort();
          resolve(files.map(f => path.join(dir, f)));
        })
        .on('error', reject)
        .run();
    });
  }

  static async sendToSarvam(piecePath) {
    if (!config.sarvamApiKey) {
      throw new Error("SARVAM_API_KEY is not set.");
    }

    const form = new FormData();
    form.append('file', fs.createReadStream(piecePath));
    form.append('model', config.sarvamSttModel);
    form.append('with_diarization', 'false');

    try {
      const response = await axios.post(SARVAM_STT_TRANSLATE_URL, form, {
        headers: {
          ...form.getHeaders(),
          'api-subscription-key': config.sarvamApiKey
        }
      });
      return response.data.transcript || '';
    } catch (error) {
      console.error(`Sarvam API Error:`, error.response?.data || error.message);
      throw error;
    }
  }

  static async transcribe(filePath) {
    const dir = path.dirname(filePath);
    const ext = path.extname(filePath);
    const base = path.basename(filePath, ext);
    
    try {
      // Split audio into 25s pieces
      const duration = await this.getAudioDuration(filePath);
      const totalPieces = Math.ceil(duration / SARVAM_PIECE_SECONDS);
      
      const pieces = await this.splitAudio(filePath, duration);
      
      let fullText = "";

      for (let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];
        
        try {
          const text = await this.sendToSarvam(piece);
          fullText += text + " ";
        } finally {
          if (fs.existsSync(piece)) fs.unlinkSync(piece);
        }
      }

      return fullText.trim();
    } finally {
      // Fallback robust cleanup for any chunks left behind
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir).filter(f => f.startsWith(`${base}_`) && f.endsWith(ext) && f !== path.basename(filePath));
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
