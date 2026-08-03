import { ChatMistralAI } from '@langchain/mistralai';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { PineconeStore } from '@langchain/pinecone';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { PineconeService } from './pinecone.service.js';
import { EmbeddingsService } from './embeddings.service.js';
import { ragPrompt } from '../prompts/rag.prompt.js';
import { config } from '../config/index.js';

export class RagService {
  static getLLM() {
    return new ChatMistralAI({
      apiKey: config.mistralApiKey,
      modelName: "mistral-small-latest",
      temperature: 0.3
    });
  }

  static async ingestTranscript(sessionId, transcript) {
    // 1. Split transcript
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200
    });
    
    const docs = await splitter.createDocuments([transcript], [{ sessionId }]);

    // 2. Setup Pinecone & Embeddings
    const pineconeIndex = PineconeService.getIndex();
    const embeddings = EmbeddingsService.getEmbeddings();

    // 3. Store in Pinecone
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex,
      namespace: sessionId // Use sessionId as namespace to separate chats
    });

    console.log(`Stored ${docs.length} vectors in Pinecone for session ${sessionId}`);
  }

  static async askQuestion(sessionId, question) {
    const pineconeIndex = PineconeService.getIndex();
    const embeddings = EmbeddingsService.getEmbeddings();

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex,
      namespace: sessionId
    });

    const retriever = vectorStore.asRetriever({ k: 4 });
    const relevantDocs = await retriever.invoke(question);
    
    const context = relevantDocs.map(doc => doc.pageContent).join('\n\n');

    const llm = this.getLLM();
    const chain = ragPrompt.pipe(llm).pipe(new StringOutputParser());

    return await chain.invoke({
      context,
      question
    });
  }
}
