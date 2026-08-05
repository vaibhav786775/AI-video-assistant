import { StringOutputParser } from '@langchain/core/output_parsers';
import { extractActionItemsPrompt, extractKeyTakeawaysPrompt, extractQuestionsPrompt } from '../prompts/extract.prompt.js';
import { getMistralLLM } from '../utils/llm.util.js';

export class ExtractorService {

  static async extractActionItems(transcript) {
    const llm = getMistralLLM();
    const chain = extractActionItemsPrompt.pipe(llm).pipe(new StringOutputParser());
    return await chain.invoke({ text: transcript });
  }

  static async extractKeyDecisions(transcript) {
    const llm = getMistralLLM();
    const chain = extractKeyTakeawaysPrompt.pipe(llm).pipe(new StringOutputParser());
    return await chain.invoke({ text: transcript });
  }

  static async extractQuestions(transcript) {
    const llm = getMistralLLM();
    const chain = extractQuestionsPrompt.pipe(llm).pipe(new StringOutputParser());
    return await chain.invoke({ text: transcript });
  }
}
