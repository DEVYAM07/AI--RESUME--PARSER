import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertResumeSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/resumes/parse", async (req, res) => {
    try {
      const data = insertResumeSchema.parse(req.body);
      const resume = await storage.createResume(data);
      res.json(resume);
    } catch (error) {
      res.status(400).json({ error: "Invalid resume data" });
    }
  });

  app.get("/api/resumes/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const resume = await storage.getResume(id);
    if (!resume) {
      res.status(404).json({ error: "Resume not found" });
      return;
    }
    res.json(resume);
  });

  app.get("/api/resumes", async (_req, res) => {
    const resumes = await storage.getAllResumes();
    res.json(resumes);
  });

  const httpServer = createServer(app);
  return httpServer;
}
