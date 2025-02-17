import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import type { ParsedResumeData } from "@shared/schema";

interface ParsedViewProps {
  data: ParsedResumeData | null;
  isLoading: boolean;
}

export default function ParsedView({ data, isLoading }: ParsedViewProps) {
  if (isLoading) {
    return (
      <div className="p-6 bg-gray-900">
        <Skeleton className="h-8 w-1/3 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <Skeleton className="h-8 w-1/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-900 text-gray-400">
        Upload a resume to see the parsed content
      </div>
    );
  }

  return (
    <div className="p-6 overflow-auto bg-gray-900">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 bg-gray-800 text-white border-gray-700">
          <h2 className="text-2xl font-bold mb-2">{data.name}</h2>
          <p className="text-gray-300 mb-4">{data.email}</p>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-purple-400">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-gray-700 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-purple-400">Experience</h3>
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-4">
                <h4 className="font-semibold">{exp.title}</h4>
                <p className="text-gray-300">{exp.company} • {exp.duration}</p>
                <ul className="mt-2 list-disc list-inside text-gray-400">
                  {exp.description.map((desc, j) => (
                    <li key={j}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-purple-400">Education</h3>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-2">
                <h4 className="font-semibold">{edu.degree}</h4>
                <p className="text-gray-300">{edu.school} {edu.year}</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
