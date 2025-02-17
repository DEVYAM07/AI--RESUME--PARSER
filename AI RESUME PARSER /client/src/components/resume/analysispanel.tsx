import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import type { ParsedResumeData } from "@shared/schema";

interface AnalysisPanelProps {
  data: ParsedResumeData | null;
  isLoading: boolean;
}

export default function AnalysisPanel({ data, isLoading }: AnalysisPanelProps) {
  if (isLoading) {
    return (
      <div className="p-6 bg-gray-900">
        <Skeleton className="h-8 w-1/3 mb-4" />
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-16 w-full" />
      </div>
    );
  }