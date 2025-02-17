import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Paintbrush, Check } from "lucide-react";
import { motion } from "framer-motion";

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  background: string;
}

interface ColorSchemeCustomizerProps {
  colors: ColorScheme;
  onChange: (colors: ColorScheme) => void;
}

const presetSchemes: ColorScheme[] = [
  {
    primary: "#6D28D9",
    secondary: "#4F46E5",
    accent: "#EC4899",
    text: "#1F2937",
    background: "#FFFFFF",
  },
  {
    primary: "#0891B2",
    secondary: "#0284C7",
    accent: "#2DD4BF",
    text: "#1F2937",
    background: "#F8FAFC",
  },
  {
    primary: "#059669",
    secondary: "#047857",
    accent: "#FBBF24",
    text: "#1F2937",
    background: "#ECFDF5",
  },
];

export default function ColorSchemeCustomizer({ colors, onChange }: ColorSchemeCustomizerProps) {
  const [showPresets, setShowPresets] = useState(false);

  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Paintbrush className="w-5 h-5 text-purple-400" />
            Color Scheme
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPresets(!showPresets)}
          >
            {showPresets ? "Custom Colors" : "Presets"}
          </Button>
        </div>

        {showPresets ? (
          <div className="grid grid-cols-3 gap-4">
            {presetSchemes.map((scheme, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onChange(scheme)}
                className="cursor-pointer"
              >
                <div className="h-20 rounded-lg overflow-hidden">
                  <div
                    className="h-1/2"
                    style={{ backgroundColor: scheme.primary }}
                  />
                  <div
                    className="h-1/2 flex"
                    style={{ backgroundColor: scheme.background }}
                  >
                    <div
                      className="w-1/2"
                      style={{ backgroundColor: scheme.secondary }}
                    />
                    <div
                      className="w-1/2"
                      style={{ backgroundColor: scheme.accent }}
                    />
                  </div>
                </div>
                {JSON.stringify(colors) === JSON.stringify(scheme) && (
                  <div className="flex justify-center mt-2">
                    <Check className="w-4 h-4 text-green-500" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {(Object.keys(colors) as Array<keyof ColorScheme>).map((key) => (
              <div key={key} className="space-y-2">
                <Label className="capitalize">{key} Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={colors[key]}
                    onChange={(e) =>
                      onChange({ ...colors, [key]: e.target.value })
                    }
                    className="w-12 h-8 p-1"
                  />
                  <Input
                    type="text"
                    value={colors[key]}
                    onChange={(e) =>
                      onChange({ ...colors, [key]: e.target.value })
                    }
                    className="flex-1"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
