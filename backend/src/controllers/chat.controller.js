import { RagService } from '../services/rag.service.js';
import { Video } from '../models/Video.js';

export class ChatController {
  static async chat(req, res, next) {
    try {
      const { videoId, question } = req.body;
      const userId = req.user.id;

      if (!videoId || !question) {
        return res.status(400).json({ error: 'videoId and question are required.' });
      }

      // Verify ownership
      const video = await Video.findOne({ _id: videoId, user: userId });
      if (!video) {
        return res.status(404).json({ error: 'Video not found or you do not have permission to access it.' });
      }

      const answer = await RagService.askQuestion(video.pineconeNamespace, question);

      res.status(200).json({ answer });
    } catch (error) {
      next(error);
    }
  }
}
