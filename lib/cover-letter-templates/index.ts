import Classic from "./Classic";
import Modern from "./Modern";
import Minimalist from "./Minimalist";

export const getCoverLetterTemplate = (id: string) => {
  switch (id.toLowerCase()) {
    case "classic":
      return Classic;
    case "modern":
      return Modern;
    case "minimalist":
      return Minimalist;
    default:
      return Classic;
  }
};

export const coverLetterTemplates = [
  { id: "classic", name: "Classic Serif", description: "Traditional and professional" },
  { id: "modern", name: "Modern Sidebar", description: "Bold and contemporary" },
  { id: "minimalist", name: "Clean Minimal", description: "Elegant and spacious" },
];
