import { resumes, type Resume, type InsertResume } from "@shared/schema";

export interface IStorage {
  createResume(resume: InsertResume): Promise<Resume>;
  getResume(id: number): Promise<Resume | undefined>;
  getAllResumes(): Promise<Resume[]>;
  updateResume(id: number, updates: Partial<Resume>): Promise<Resume | undefined>;
}

export class MemStorage implements IStorage {
  private resumes: Map<number, Resume>;
  private currentId: number;

  constructor() {
    this.resumes = new Map();
    this.currentId = 1;
  }

  async createResume(insertResume: InsertResume): Promise<Resume> {
    const id = this.currentId++;
    const resume: Resume = { ...insertResume, id };
    this.resumes.set(id, resume);
    return resume;
  }

  async getResume(id: number): Promise<Resume | undefined> {
    return this.resumes.get(id);
  }

  async getAllResumes(): Promise<Resume[]> {
    return Array.from(this.resumes.values());
  }

  async updateResume(id: number, updates: Partial<Resume>): Promise<Resume | undefined> {
    const existing = this.resumes.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updates };
    this.resumes.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
