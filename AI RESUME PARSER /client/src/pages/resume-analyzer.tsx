import { useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import FileUpload from "@/components/resume/FileUpload";
import ParsedView from "@/components/resume/ParsedView";
import AnalysisPanel from "@/components/resume/AnalysisPanel";
import { type ParsedResumeData } from "@shared/schema";

export default function ResumeAnalyzer() {
  const [parsedData, setParsedData] = useState<ParsedResumeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="h-screen bg-gray-900">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={40}>
          <FileUpload
            onUpload={(data) => {
              setIsLoading(true);
              // Simulate AI processing delay
              setTimeout(() => {
                setParsedData(data);
                setIsLoading(false);
              }, 1500);
            }}
          />
        </ResizablePanel>
        
        <ResizableHandle />
        
        <ResizablePanel defaultSize={60}>
          <div className="h-full grid grid-rows-2">
            <ParsedView data={parsedData} isLoading={isLoading} />
            <AnalysisPanel data={parsedData} isLoading={isLoading} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
