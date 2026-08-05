import ytDlp from 'yt-dlp-exec';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import os from 'os';

export class YouTubeService {
  /**
   * Downloads audio from a YouTube URL and returns the file path.
   */
  static async downloadAudio(url) {
    const tempDir = os.tmpdir();

    const fileId = uuidv4();
    const outputPath = path.join(tempDir, `${fileId}.mp3`);

    await ytDlp(url, {
      extractAudio: true,
      audioFormat: 'mp3',
      output: outputPath,
      noPlaylist: true,
      postprocessorArgs: [
        'ExtractAudio:-ar 16000 -ac 1 -b:a 32k'
      ]
    });

    return outputPath;
  }
}
