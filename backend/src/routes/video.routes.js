import express from 'express';
import { VideoController } from '../controllers/video.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', VideoController.getHistory);
router.get('/dashboard/stats', VideoController.getDashboardStats);
router.get('/:videoId', VideoController.getVideoDetails);
router.delete('/:videoId', VideoController.deleteVideo);

export default router;
