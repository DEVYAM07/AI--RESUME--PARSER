import sys
import json
import spacy
import pdfplumber
from typing import Dict, List, Optional

def extract_text_from_pdf(pdf_data: bytes) -> str:
    with pdfplumber.open(pdf_data) as pdf:
        return "\n".join(page.extract_text() for page in pdf.pages)

def parse_resume(text: str) -> Dict:
    # Load spaCy model
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(text)
    
    # Extract entities
    entities = {ent.label_: ent.text for ent in doc.ents}
    
    # Extract skills using pattern matching
    skills = [token.text for token in doc if token.pos_ == "NOUN" and token.is_alpha]
    
    # Basic structure extraction using NLP patterns
    sentences = [sent.text.strip() for sent in doc.sents]
    
    education = []
    experience = []
    
    for sent in sentences:
        sent_doc = nlp(sent)
        # Education detection
        if any(edu_term in sent.lower() for edu_term in ["degree", "university", "college", "school"]):
            education.append({
                "degree": sent,
                "school": "",
                "year": ""
            })
        # Experience detection
        elif any(work_term in sent.lower() for work_term in ["worked", "led", "managed", "developed"]):
            experience.append({
                "title": "",
                "company": "",
                "duration": "",
                "description": [sent]
            })

    return {
        "name": entities.get("PERSON", ""),
        "email": entities.get("EMAIL", ""),
        "phone": entities.get("PHONE", ""),
        "skills": list(set(skills))[:10],  # Top 10 unique skills
        "education": education,
        "experience": experience
    }

def main():
    # Read PDF data from stdin
    pdf_data = sys.stdin.buffer.read()
    text = extract_text_from_pdf(pdf_data)
    parsed_data = parse_resume(text)
    print(json.dumps(parsed_data))

if __name__ == "__main__":
    main()
