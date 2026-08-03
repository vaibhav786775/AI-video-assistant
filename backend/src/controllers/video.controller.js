import { Video } from '../models/Video.js';
import { PineconeService } from '../services/pinecone.service.js';

export class VideoController {
  static async getHistory(req, res, next) {
    try {
      const userId = req.user.id;
      
      const videos = await Video.find({ user: userId })
        .select('_id title thumbnail youtubeUrl createdAt')
        .sort({ createdAt: -1 });

      // Transform _id to videoId for consistency
      const formattedVideos = videos.map(v => ({
        videoId: v._id,
        title: v.title,
        thumbnail: v.thumbnail,
        youtubeUrl: v.youtubeUrl,
        createdAt: v.createdAt
      }));

      res.status(200).json(formattedVideos);
    } catch (error) {
      next(error);
    }
  }

  static async getVideoDetails(req, res, next) {
    try {
      const { videoId } = req.params;
      const userId = req.user.id;

      const video = await Video.findOne({ _id: videoId, user: userId });
      
      if (!video) {
        return res.status(404).json({ error: 'Video not found or unauthorized.' });
      }

      res.status(200).json({
        videoId: video._id,
        title: video.title,
        summary: video.summary,
        actionItems: video.actionItems,
        keyDecisions: video.keyDecisions,
        openQuestions: video.openQuestions,
        youtubeUrl: video.youtubeUrl,
        createdAt: video.createdAt
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteVideo(req, res, next) {
    try {
      const { videoId } = req.params;
      const userId = req.user.id;

      const video = await Video.findOne({ _id: videoId, user: userId });
      
      if (!video) {
        return res.status(404).json({ error: 'Video not found or unauthorized.' });
      }

      // Delete from Pinecone
      await PineconeService.deleteNamespace(video.pineconeNamespace);

      // Delete from MongoDB
      await Video.deleteOne({ _id: videoId });

      res.status(200).json({ message: 'Video and associated data successfully deleted.' });
    } catch (error) {
      next(error);
    }
  }

  static async getDashboardStats(req, res, next) {
    try {
      const userId = req.user.id;

      const videos = await Video.find({ user: userId }).sort({ createdAt: -1 });
      
      const totalVideos = videos.length;
      
      const totalProcessingTime = videos.reduce((acc, curr) => acc + (curr.processingTime || 0), 0);
      
      const lastProcessedVideo = totalVideos > 0 ? {
        videoId: videos[0]._id,
        title: videos[0].title,
        createdAt: videos[0].createdAt
      } : null;

      res.status(200).json({
        totalVideos,
        totalProcessingTime,
        lastProcessedVideo,
        // Assuming we would track questions asked in another model, but for now we leave it out or return 0
        totalQuestionsAsked: 0
      });
    } catch (error) {
      next(error);
    }
  }
}
