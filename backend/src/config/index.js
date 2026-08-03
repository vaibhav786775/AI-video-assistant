import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  mistralApiKey: process.env.MISTRAL_API_KEY,
  sarvamApiKey: process.env.SARVAM_API_KEY,
  pineconeApiKey: process.env.PINECONE_API_KEY,
  pineconeIndex: process.env.PINECONE_INDEX || 'ai-video-assistant',
  whisperModel: process.env.WHISPER_MODEL || 'whisper-large-v3-turbo',
  groqApiKey: process.env.GROQ_API_KEY,
  sarvamSttModel: process.env.SARVAM_STT_MODEL || 'saaras:v2.5',
  groqConcurrency: parseInt(process.env.GROQ_CONCURRENCY, 10) || 4,
  targetChunkSeconds: parseInt(process.env.TARGET_CHUNK_SECONDS, 10) || 90,
  mongoDbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET || 'fallback-secret-key-for-development',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d'
};
