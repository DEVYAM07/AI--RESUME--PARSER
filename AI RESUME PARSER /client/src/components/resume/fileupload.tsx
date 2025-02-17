import { useCallback, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, File } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { processResume } from "@/lib/ai";
import type { ParsedResumeData } from "@shared/schema";

interface FileUploadProps {
  onUpload: (data: ParsedResumeData) => void;
}

export default function FileUpload({ onUpload }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (!file.type.includes("pdf")) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    try {
      const parsedData = await processResume(file);
      onUpload(parsedData);
    } catch (error) {
      toast({
        title: "Error processing resume",
        description: "Please try again",
        variant: "destructive",
      });
    }
  }, [onUpload, toast]);

  return (
    <div className="h-full p-6 bg-gray-900">
      <Card
        className={`h-full flex flex-col items-center justify-center border-2 border-dashed
          ${isDragging ? "border-purple-500 bg-purple-500/10" : "border-gray-600"}
          transition-colors duration-200`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: isDragging ? 1.1 : 1 }}
          className="text-center p-8"
        >
          <div className="mb-4">
            {isDragging ? (
              <Upload className="w-16 h-16 mx-auto text-purple-500" />
            ) : (
              <File className="w-16 h-16 mx-auto text-gray-400" />
            )}
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white">
            Drop your resume here
          </h3>
          <p className="text-gray-400 mb-4">
            Support for PDF files only
          </p>
          <Button
            variant="outline"
            onClick={() => document.getElementById("resume-upload")?.click()}
          >
            Browse Files
          </Button>
          <input
            id="resume-upload"
            type="file"
            className="hidden"
            accept=".pdf"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              try {
                const parsedData = await processResume(file);
                onUpload(parsedData);
              } catch (error) {
                toast({
                  title: "Error processing resume",
                  description: "Please try again",
                  variant: "destructive",
                });
              }
            }}
          />
        </motion.div>
      </Card>
    </div>
  );
}
