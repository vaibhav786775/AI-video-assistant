import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  youtubeUrl: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  summary: {
    type: String
  },
  actionItems: {
    type: String
  },
  keyDecisions: {
    type: String
  },
  openQuestions: {
    type: String
  },
  pineconeNamespace: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: 'english'
  },
  duration: {
    type: Number
  },
  thumbnail: {
    type: String
  },
  status: {
    type: String,
    enum: ['processing', 'completed', 'failed'],
    default: 'processing'
  },
  processingTime: {
    type: Number // in seconds
  }
}, {
  timestamps: true
});

export const Video = mongoose.model('Video', videoSchema);
