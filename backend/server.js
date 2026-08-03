import mongoose from 'mongoose';
import app from './src/app.js';
import dotenv from 'dotenv';
import { config } from './src/config/index.js';

dotenv.config();

const PORT = config.port;

mongoose.connect(config.mongoDbUri)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });
