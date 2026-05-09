"use client";

import { ModernClassic } from "./ModernClassic";
import { BlueExecutive } from "./BlueExecutive";
import { Minimalist } from "./Minimalist";
import { London } from "./London";
import { Paris } from "./Paris";
import { Tokyo } from "./Tokyo";
import { NewYork } from "./NewYork";
import { Berlin } from "./Berlin";
import { Sydney } from "./Sydney";
import { Toronto } from "./Toronto";
import { Seoul } from "./Seoul";
import { Barcelona } from "./Barcelona";
import { Rome } from "./Rome";
import { Amsterdam } from "./Amsterdam";
import { Singapore } from "./Singapore";
import { Milan } from "./Milan";
import { Stockholm } from "./Stockholm";
import { Madrid } from "./Madrid";
import { Austin } from "./Austin";
import { Seattle } from "./Seattle";
import { ResumeData } from "@/lib/context/ResumeContext";

export const TEMPLATES = {
  // Core Collection
  "modern-classic": ModernClassic,
  "blue-executive": BlueExecutive,
  "minimalist": Minimalist,
  "seattle": Seattle,
  "london": London,
  "paris": Paris,
  "tokyo": Tokyo,
  "new-york": NewYork,
  
  // Executive Series
  "executive-gold": BlueExecutive,
  "corporate-pro": London,
  "director-slate": ModernClassic,
  "ceo-premium": NewYork,
  "board-member": Paris,
  
  // Creative Series
  "creative-neon": Seattle,
  "design-studio": Tokyo,
  "portfolio-bold": NewYork,
  "art-director": Berlin,
  "agency-pro": Sydney,
  
  // Minimal Series
  "clean-canvas": Minimalist,
  "simple-light": London,
  "pure-white": Paris,
  "minimal-plus": Toronto,
  "zen-resume": Seoul,
  
  // Professional Cities
  "berlin": Berlin,
  "sydney": Sydney,
  "toronto": Toronto,
  "seoul": Seoul,
  "barcelona": Barcelona,
  "rome": Rome,
  "amsterdam": Amsterdam,
  "singapore": Singapore,
  "milan": Milan,
  "stockholm": Stockholm,
  "madrid": Madrid,
  "austin": Austin,
  
  // Specialized
  "tech-innovator": Seattle,
  "sales-master": BlueExecutive,
  "marketing-hero": Tokyo,
  "legal-advisor": London,
  "medical-pro": Toronto,
  "finance-elite": ModernClassic,
  "academic-bright": NewYork,
  "non-profit": Barcelona,
  "startup-vibe": Austin,
  "freelance-flow": Madrid,
  
  // Global Edition
  "dubai": BlueExecutive,
  "hong-kong": Tokyo,
  "shanghai": London,
  "london-dark": London,
  "paris-nights": Paris,
  "tokyo-drift": Tokyo,
  "ny-loft": NewYork,
  "sf-tech": Seattle,
  "austin-sun": Austin,
  "miami-vice": Seattle,
} as const;

export const colors = [
  "#3b82f6", // Blue 500
  "#0f172a", // Slate 900
  "#1e293b", // Slate 800
  "#0052cc", // Royal Blue
  "#dc2626", // Red 600
  "#16a34a", // Green 600
  "#9333ea", // Purple 600
  "#f59e0b", // Amber 500
];

export type TemplateId = keyof typeof TEMPLATES;

export function getTemplateComponent(id: string) {
  const normalizedId = id.toLowerCase().replace(/[^a-z0-9]/g, '-');
  
  // Direct matching
  if (normalizedId in TEMPLATES) {
    return TEMPLATES[normalizedId as TemplateId];
  }

  // Keyword matching
  for (const templateId of Object.keys(TEMPLATES)) {
    if (normalizedId.includes(templateId)) {
      return TEMPLATES[templateId as TemplateId];
    }
  }
  
  // Specific fallbacks for common names
  if (normalizedId.includes("olivia") || normalizedId.includes("sanchez")) return TEMPLATES["blue-executive"];
  if (normalizedId.includes("creative")) return TEMPLATES["barcelona"];
  if (normalizedId.includes("corporate")) return TEMPLATES["new-york"];
  if (normalizedId.includes("professional")) return TEMPLATES["london"];

  // Default fallback
  return TEMPLATES["modern-classic"];
}
