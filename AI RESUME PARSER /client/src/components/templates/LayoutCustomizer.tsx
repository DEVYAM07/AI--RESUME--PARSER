import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Layout, Columns, Rows } from "lucide-react";

export interface LayoutSettings {
  columnsMode: "single" | "double";
  headerSize: number;
  contentSpacing: number;
  showBorders: boolean;
  sidebarWidth: number;
}

interface LayoutCustomizerProps {
  settings: LayoutSettings;
  onChange: (settings: LayoutSettings) => void;
}

export default function LayoutCustomizer({ settings, onChange }: LayoutCustomizerProps) {
  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Layout className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold">Layout Settings</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Column Mode</Label>
              <div className="text-sm text-gray-400">
                Switch between single and double column layout
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Columns className="w-4 h-4" />
              <Switch
                checked={settings.columnsMode === "double"}
                onCheckedChange={(checked) =>
                  onChange({
                    ...settings,
                    columnsMode: checked ? "double" : "single",
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Header Size</Label>
            <Slider
              value={[settings.headerSize]}
              min={0}
              max={100}
              step={1}
              onValueChange={([value]) =>
                onChange({ ...settings, headerSize: value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Content Spacing</Label>
            <Slider
              value={[settings.contentSpacing]}
              min={0}
              max={40}
              step={1}
              onValueChange={([value]) =>
                onChange({ ...settings, contentSpacing: value })
              }
            />
          </div>

          {settings.columnsMode === "double" && (
            <div className="space-y-2">
              <Label>Sidebar Width (%)</Label>
              <Slider
                value={[settings.sidebarWidth]}
                min={20}
                max={50}
                step={1}
                onValueChange={([value]) =>
                  onChange({ ...settings, sidebarWidth: value })
                }
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <Label>Show Borders</Label>
            <Switch
              checked={settings.showBorders}
              onCheckedChange={(checked) =>
                onChange({ ...settings, showBorders: checked })
              }
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
