import { ChatMistralAI } from '@langchain/mistralai';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { extractActionItemsPrompt, extractKeyDecisionsPrompt, extractQuestionsPrompt } from '../prompts/extract.prompt.js';
import { config } from '../config/index.js';

export class ExtractorService {
  static getLLM() {
    if (!config.mistralApiKey) throw new Error("MISTRAL_API_KEY is not set.");
    
    return new ChatMistralAI({
      apiKey: config.mistralApiKey,
      modelName: "mistral-small-latest",
      temperature: 0.2
    });
  }

  static async extractActionItems(transcript) {
    const llm = this.getLLM();
    const chain = extractActionItemsPrompt.pipe(llm).pipe(new StringOutputParser());
    return await chain.invoke({ text: transcript });
  }

  static async extractKeyDecisions(transcript) {
    const llm = this.getLLM();
    const chain = extractKeyDecisionsPrompt.pipe(llm).pipe(new StringOutputParser());
    return await chain.invoke({ text: transcript });
  }

  static async extractQuestions(transcript) {
    const llm = this.getLLM();
    const chain = extractQuestionsPrompt.pipe(llm).pipe(new StringOutputParser());
    return await chain.invoke({ text: transcript });
  }
}
