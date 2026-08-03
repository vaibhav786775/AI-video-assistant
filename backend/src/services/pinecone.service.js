import { Pinecone } from '@pinecone-database/pinecone';
import { config } from '../config/index.js';

export class PineconeService {
  static getClient() {
    if (!config.pineconeApiKey) {
      throw new Error("PINECONE_API_KEY is not set in environment.");
    }
    
    return new Pinecone({
      apiKey: config.pineconeApiKey
    });
  }

  static getIndex() {
    const client = this.getClient();
    return client.Index(config.pineconeIndex);
  }

  static async deleteNamespace(namespace) {
    const index = this.getIndex();
    try {
      await index.namespace(namespace).deleteAll();
      console.log(`Successfully deleted Pinecone namespace: ${namespace}`);
    } catch (error) {
      console.error(`Failed to delete Pinecone namespace: ${namespace}`, error);
      throw error;
    }
  }
}
