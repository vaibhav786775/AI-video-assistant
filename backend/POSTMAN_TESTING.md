# Postman Testing Guide

This guide provides the necessary information to test the AI Video Assistant Node.js backend using Postman.

## Prerequisites

1. Ensure your `.env` file in the `node-backend` directory is fully configured with your API keys (`MISTRAL_API_KEY`, `PINECONE_API_KEY`, and `SARVAM_API_KEY` if using Hinglish).
2. Start the server by running `npm start` inside the `node-backend` directory. The server should be running on `http://localhost:3000`.

---

## 1. Process Video API

This endpoint takes a YouTube URL, downloads the audio, transcribes it, generates summaries, extracts action items/decisions/questions, and stores the embeddings in Pinecone for chatting.

- **Method**: `POST`
- **URL**: `http://localhost:3000/api/process-video`
- **Headers**:
  - `Content-Type`: `application/json`
- **Body** (raw -> JSON):

```json
{
  "youtubeUrl": "https://youtu.be/qYNweeDHiyU?si=xjPXlSq64Hs9fhxx", 
  "language": "english" 
}
```

**Note**: You can change `"language"` to `"hinglish"` if you want to test the Sarvam API transcription.

### Expected Response

You should receive a `200 OK` status with a JSON object similar to this:

```json
{
  "title": "Discussion on Future AI Models",
  "summary": "• The team discussed the rollout of the new models.\n• Strategy for Q3 was finalized.",
  "actionItems": "1. Update documentation - John - Next Friday",
  "keyDecisions": "1. We will use Mistral as the primary LLM.",
  "openQuestions": "1. Do we have enough API credits for the launch?",
  "sessionId": "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
  "transcript": "(The full raw text of the transcription)"
}
```

**⚠️ IMPORTANT**: Copy the `sessionId` from this response! You will need it to use the Chat API.

---

## 2. Chat API

This endpoint allows you to ask questions about the video you just processed. It uses Retrieval-Augmented Generation (RAG) powered by Pinecone and Mistral AI to answer based *only* on the video's transcript.

- **Method**: `POST`
- **URL**: `http://localhost:3000/api/chat`
- **Headers**:
  - `Content-Type`: `application/json`
- **Body** (raw -> JSON):

```json
{
  "sessionId": "PASTE_THE_SESSION_ID_HERE",
  "question": "What were the main decisions made in the meeting?"
}
```

### Expected Response

You should receive a `200 OK` status with the AI's answer:

```json
{
  "answer": "Based on the transcript, the main decision made was to use Mistral as the primary LLM moving forward."
}
```
