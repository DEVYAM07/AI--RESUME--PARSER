import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FileText, Layout, Grid, List } from "lucide-react";

export type TemplateStyle = "modern" | "classic" | "minimal" | "professional";

interface TemplateSelectorProps {
  onSelect: (style: TemplateStyle) => void;
  currentStyle: TemplateStyle;
}

interface Template {
  id: TemplateStyle;
  name: string;
  description: string;
  icon: React.ReactNode;
}
