import { ChatMistralAI } from '@langchain/mistralai';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { mapSummaryPrompt, combineSummaryPrompt, generateTitlePrompt } from '../prompts/summary.prompt.js';
import { config } from '../config/index.js';

export class SummaryService {
  static getLLM() {
    if (!config.mistralApiKey) throw new Error("MISTRAL_API_KEY is not set.");
    
    return new ChatMistralAI({
      apiKey: config.mistralApiKey,
      modelName: "mistral-small-latest",
      temperature: 0.3
    });
  }

  static async splitTranscript(transcript) {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 3000,
      chunkOverlap: 200
    });
    return await splitter.splitText(transcript);
  }

  static async generateTitle(transcript) {
    const llm = this.getLLM();
    const chain = generateTitlePrompt.pipe(llm).pipe(new StringOutputParser());
    
    // Use first 2000 chars for title
    return await chain.invoke({ text: transcript.substring(0, 2000) });
  }

  static async summarize(transcript) {
    const llm = this.getLLM();
    const chunks = await this.splitTranscript(transcript);

    const mapChain = mapSummaryPrompt.pipe(llm).pipe(new StringOutputParser());
    
    // Map phase: summarize each chunk
    const chunkSummaries = [];
    for (const chunk of chunks) {
      const summary = await mapChain.invoke({ text: chunk });
      chunkSummaries.push(summary);
    }

    const combined = chunkSummaries.join('\n\n');

    // Reduce phase: combine partial summaries
    const combinedChain = combineSummaryPrompt.pipe(llm).pipe(new StringOutputParser());
    
    return await combinedChain.invoke({ text: combined });
  }
}
