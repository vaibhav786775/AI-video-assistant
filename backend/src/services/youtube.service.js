import ytDlp from 'yt-dlp-exec';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export class YouTubeService {
  /**
   * Downloads audio from a YouTube URL and returns the file path.
   */
  static async downloadAudio(url) {
    const tempDir = path.resolve('src/temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const fileId = uuidv4();
    const outputPath = path.join(tempDir, `${fileId}.mp3`);

    console.log(`Downloading audio from ${url} ...`);
    
    await ytDlp(url, {
      extractAudio: true,
      audioFormat: 'mp3',
      output: outputPath,
      noPlaylist: true,
      postprocessorArgs: [
        'ExtractAudio:-ar 16000 -ac 1 -b:a 32k'
      ]
    });

    console.log(`Download complete: ${outputPath}`);
    return outputPath;
  }
}
