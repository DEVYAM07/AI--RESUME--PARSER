import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const resumes = pgTable("resumes", {
  id: serial("id").primaryKey(),
  originalText: text("original_text").notNull(),
  parsedData: jsonb("parsed_data").notNull(),
  score: integer("score"),
  atsScore: integer("ats_score"),
  suggestions: text("suggestions").array(),
  keywords: text("keywords").array(),
});

export const insertResumeSchema = createInsertSchema(resumes).omit({
  id: true,
});

export type InsertResume = z.infer<typeof insertResumeSchema>;
export type Resume = typeof resumes.$inferSelect;

export type ParsedResumeData = {
  name: string;
  email: string;
  phone?: string;
  skills: string[];
  education: Array<{
    degree: string;
    school: string;
    year?: string;
  }>;
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string[];
  }>;
};
