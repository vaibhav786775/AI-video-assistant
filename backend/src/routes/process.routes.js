import express from 'express';
import { ProcessController } from '../controllers/process.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, ProcessController.processVideo);

export default router;
