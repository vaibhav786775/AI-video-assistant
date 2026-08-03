import { WhisperService } from './whisper.service.js';
import { SarvamService } from './sarvam.service.js';

export class TranscriptService {
  /**
   * Orchestrates the transcription based on language.
   * english -> Whisper
   * hinglish -> Sarvam
   */
  static async transcribe(filePath, language = 'english') {
    if (language.toLowerCase() === 'hinglish') {
      return await SarvamService.transcribe(filePath);
    } else {
      return await WhisperService.transcribe(filePath);
    }
  }
}
