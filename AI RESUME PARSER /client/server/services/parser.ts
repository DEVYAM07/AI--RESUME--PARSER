import { spawn } from 'child_process';
import { ParsedResumeData } from '@shared/schema';

export async function parseResume(fileBuffer: Buffer): Promise<ParsedResumeData> {
  return new Promise((resolve, reject) => {
    const python = spawn('python3', ['server/scripts/parse_resume.py']);
    let outputData = '';
    let errorData = '';

    python.stdout.on('data', (data) => {
      outputData += data.toString();
    });

    python.stderr.on('data', (data) => {
      errorData += data.toString();
    });

    python.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Parser failed: ${errorData}`));
        return;
      }
      resolve(JSON.parse(outputData));
    });

    python.stdin.write(fileBuffer);
    python.stdin.end();
  });
}
