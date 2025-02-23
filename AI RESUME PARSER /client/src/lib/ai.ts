
import type { ParsedResumeData } from "@shared/schema";
import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';

async function runSpacyParser(text: string): Promise<ParsedResumeData> {
  const pythonScript = `
import spacy
import sys
import json

def parse_resume(text):
    nlp = spacy.load("en_core_web_lg")
    doc = nlp(text)
    
    # Extract name (assuming first detected PERSON entity)
    name = next((ent.text for ent in doc.ents if ent.label_ == "PERSON"), "Unknown")
    
    # Extract email
    email = next((token.text for token in doc if token.like_email), "")
    
    # Extract phone (basic pattern matching)
    phone = next((token.text for token in doc if token.text.replace("-", "").isdigit() and len(token.text) >= 10), "")
    
    # Extract skills (looking for technical terms and proper nouns)
    skills = [token.text for token in doc if (token.pos_ == "PROPN" or token.ent_type_ == "PRODUCT") 
              and len(token.text) > 2 and token.text.isalpha()]
    
    # Basic education extraction
    education = []
    edu_keywords = ["Bachelor", "Master", "PhD", "BSc", "MSc", "degree"]
    for sent in doc.sents:
        if any(keyword in sent.text for keyword in edu_keywords):
            education.append({
                "degree": sent.text.strip(),
                "institution": "",
                "year": ""
            })
    
    # Basic experience extraction
    experience = []
    work_keywords = ["work", "job", "position", "role"]
    for sent in doc.sents:
        if any(keyword in sent.text.lower() for keyword in work_keywords):
            experience.append({
                "title": sent.text.strip(),
                "company": "",
                "duration": "",
                "description": []
            })
    
    return {
        "name": name,
        "email": email,
        "phone": phone,
        "skills": list(set(skills))[:10],  # Limit to top 10 unique skills
        "education": education[:3],  # Limit to last 3 education entries
        "experience": experience[:5]  # Limit to last 5 experience entries
    }

if __name__ == "__main__":
    resume_text = sys.stdin.read()
    result = parse_resume(resume_text)
    print(json.dumps(result))
`;

  const scriptPath = path.join(process.cwd(), 'temp_parser.py');
  await fs.writeFile(scriptPath, pythonScript);

  return new Promise((resolve, reject) => {
    const process = spawn('python3', [scriptPath]);
    let output = '';
    let error = '';

    process.stdout.on('data', (data) => {
      output += data.toString();
    });

    process.stderr.on('data', (data) => {
      error += data.toString();
    });

    process.stdin.write(text);
    process.stdin.end();

    process.on('close', async (code) => {
      await fs.unlink(scriptPath);
      
      if (code !== 0) {
        reject(new Error(`SpaCy parsing failed: ${error}`));
        return;
      }

      try {
        const result = JSON.parse(output);
        resolve(result);
      } catch (e) {
        reject(new Error('Failed to parse SpaCy output'));
      }
    });
  });
}

export async function processResume(file: File): Promise<ParsedResumeData> {
  const text = await file.text();
  try {
    return await runSpacyParser(text);
  } catch (error) {
    console.error('SpaCy parsing error:', error);
    throw new Error('Failed to parse resume');
  }
}
