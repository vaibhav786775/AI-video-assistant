import { v4 as uuidv4 } from 'uuid';
import { YouTubeService } from '../services/youtube.service.js';
import { TranscriptService } from '../services/transcript.service.js';
import { SummaryService } from '../services/summary.service.js';
import { ExtractorService } from '../services/extractor.service.js';
import { RagService } from '../services/rag.service.js';
import { Video } from '../models/Video.js';
import fs from 'fs';

export class ProcessController {
  static async processVideo(req, res, next) {
    let audioPath = null;
    try {
      const { youtubeUrl, language = 'english' } = req.body;
      const userId = req.user.id;

      if (!youtubeUrl) {
        return res.status(400).json({ error: 'youtubeUrl is required.' });
      }

      // 1. Check for Duplicate (Intelligent Caching)
      const existingVideo = await Video.findOne({ user: userId, youtubeUrl });
      if (existingVideo) {
        return res.status(200).json({
          title: existingVideo.title,
          summary: existingVideo.summary,
          actionItems: existingVideo.actionItems,
          keyDecisions: existingVideo.keyDecisions,
          openQuestions: existingVideo.openQuestions,
          videoId: existingVideo._id, // Using DB ID instead of sessionId
          message: 'Returned from cache.'
        });
      }

      const startTime = Date.now();

      // 2. Download
      audioPath = await YouTubeService.downloadAudio(youtubeUrl);

      // 3. Transcribe
      const transcript = await TranscriptService.transcribe(audioPath, language);
      const pineconeNamespace = uuidv4();
      
      const [
        title, 
        summary, 
        actionItems, 
        keyDecisions, 
        openQuestions
      ] = await Promise.all([
        SummaryService.generateTitle(transcript),
        SummaryService.summarize(transcript),
        ExtractorService.extractActionItems(transcript),
        ExtractorService.extractKeyDecisions(transcript),
        ExtractorService.extractQuestions(transcript),
        RagService.ingestTranscript(pineconeNamespace, transcript)
      ]);
      
      const processingTime = Math.round((Date.now() - startTime) / 1000);

      // 4. Save to MongoDB
      const videoRecord = new Video({
        user: userId,
        youtubeUrl,
        title,
        summary,
        actionItems,
        keyDecisions,
        openQuestions,
        pineconeNamespace,
        language,
        status: 'completed',
        processingTime
      });
      await videoRecord.save();

      res.status(200).json({
        title,
        summary,
        actionItems,
        keyDecisions,
        openQuestions,
        videoId: videoRecord._id, // Frontend will use this for chatting
        message: 'Processing complete.'
      });
      
    } catch (error) {
      next(error);
    } finally {
      // Cleanup audio file
      if (audioPath && fs.existsSync(audioPath)) {
        fs.unlinkSync(audioPath);
      }
    }
  }
}

