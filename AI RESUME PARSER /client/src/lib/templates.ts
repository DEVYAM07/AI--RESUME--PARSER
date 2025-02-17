import { create } from 'zustand';
import type { ColorScheme } from '@/components/templates/ColorSchemeCustomizer';
import type { LayoutSettings } from '@/components/templates/LayoutCustomizer';
import type { TemplateStyle } from '@/components/templates/TemplateSelector';

interface TemplateState {
  style: TemplateStyle;
  colors: ColorScheme;
  layout: LayoutSettings;
  setStyle: (style: TemplateStyle) => void;
  setColors: (colors: ColorScheme) => void;
  setLayout: (layout: LayoutSettings) => void;
}

export const useTemplateStore = create<TemplateState>((set) => ({
  style: 'modern',
  colors: {
    primary: '#6D28D9',
    secondary: '#4F46E5',
    accent: '#EC4899',
    text: '#1F2937',
    background: '#FFFFFF',
  },
 