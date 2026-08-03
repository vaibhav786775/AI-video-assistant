import { MistralAIEmbeddings } from '@langchain/mistralai';
import { config } from '../config/index.js';

export class EmbeddingsService {
  static getEmbeddings() {
    if (!config.mistralApiKey) {
      throw new Error("MISTRAL_API_KEY is not set.");
    }
    
    return new MistralAIEmbeddings({
      apiKey: config.mistralApiKey,
      modelName: "mistral-embed"
    });
  }
}
