import { useState } from "react";
import { Card } from "@/components/ui/card";
import TemplateSelector from "@/components/templates/TemplateSelector";
import ColorSchemeCustomizer from "@/components/templates/ColorSchemeCustomizer";
import LayoutCustomizer from "@/components/templates/LayoutCustomizer";
import { useTemplateStore } from "@/lib/templates";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Layout as LayoutIcon } from "lucide-react";

export default function TemplateCustomizer() {
  const { style, colors, layout, setStyle, setColors, setLayout } = useTemplateStore();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Template Customization
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card className="p-6 bg-gray-800 border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Choose Template Style</h2>
              <TemplateSelector currentStyle={style} onSelect={setStyle} />
            </Card>

            <Tabs defaultValue="colors">
              <TabsList className="w-full bg-gray-800 border-gray-700">
                <TabsTrigger value="colors" className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Colors
                </TabsTrigger>
                <TabsTrigger value="layout" className="flex items-center gap-2">
                  <LayoutIcon className="w-4 h-4" />
                  Layout
                </TabsTrigger>
              </TabsList>
              <TabsContent value="colors">
                <ColorSchemeCustomizer colors={colors} onChange={setColors} />
              </TabsContent>
              <TabsContent value="layout">
                <LayoutCustomizer settings={layout} onChange={setLayout} />
              </TabsContent>
            </Tabs>
          </div>

          <div className="sticky top-6">
            <Card className="p-6 bg-gray-800 border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              <div 
                className="aspect-[8.5/11] bg-white rounded-lg"
                style={{
                  background: colors.background,
                  color: colors.text,
                  padding: `${layout.contentSpacing}px`,
                }}
              >
                {/* Preview content will go here */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg h-full flex items-center justify-center text-gray-400">
                  Template Preview
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
