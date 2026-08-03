import express from 'express';
import cors from 'cors';
import processRoutes from './routes/process.routes.js';
import chatRoutes from './routes/chat.routes.js';

import authRoutes from './routes/auth.routes.js';
import videoRoutes from './routes/video.routes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/process-video', processRoutes);
app.use('/api/chat', chatRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

export default app;
