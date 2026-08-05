import { ChatMistralAI } from '@langchain/mistralai';
import { config } from '../config/index.js';

export function getMistralLLM(temperature = 0.2) {
  if (!config.mistralApiKey) throw new Error("MISTRAL_API_KEY is not set.");
  
  return new ChatMistralAI({
    apiKey: config.mistralApiKey,
    modelName: "mistral-small-latest",
    temperature
  });
}
