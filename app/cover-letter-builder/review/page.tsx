"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCoverLetter } from "@/lib/context/CoverLetterContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle2, Download, Layout, Palette, Loader2, Home } from "lucide-react";
import { CoverLetterPreview } from "@/components/CoverLetterPreview";
import { coverLetterTemplates } from "@/lib/cover-letter-templates";
import Link from "next/link";

const colors = [
  { name: "Blue", value: "#3b82f6" },
  { name: "Slate", value: "#0f172a" },
  { name: "Emerald", value: "#10b981" },
  { name: "Indigo", value: "#6366f1" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Amber", value: "#f59e0b" },
];

export default function ReviewPage() {
  const router = useRouter();
  const { coverLetterData, updateSection } = useCoverLetter();
  const [saving, setSaving] = useState(false);

  const handleTemplateChange = (id: string) => {
    updateSection("settings", { ...coverLetterData.settings, templateId: id });
  };

  const handleColorChange = (color: string) => {
    updateSection("settings", { ...coverLetterData.settings, color: color });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/cover-letter/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(coverLetterData),
      });
      
      if (response.ok) {
        // Redirect to dashboard or show success
        router.push("/dashboard/cover-letters");
      } else {
        const errorText = await response.text();
        console.error("Save failed:", errorText);
        alert("Failed to save cover letter: " + errorText);
      }
    } catch (error) {
      console.error("Save Error:", error);
      alert("An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex h-full w-full">
      {/* Left: Settings */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 md:p-16">
          <div className="max-w-2xl mx-auto space-y-12">
            <div className="space-y-4">
              <div className="h-12 w-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center shadow-inner">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Finalize</h1>
              <p className="text-lg text-slate-500">Pick a template and download your letter.</p>
            </div>

            {/* Template Selection */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold uppercase tracking-widest text-xs">
                <Layout className="h-4 w-4" />
                Select Template
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {coverLetterTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateChange(template.id)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      coverLetterData.settings.templateId === template.id
                        ? "border-blue-600 bg-blue-50 shadow-md"
                        : "border-slate-100 hover:border-slate-200 bg-slate-50/50"
                    }`}
                  >
                    <p className={`font-bold ${coverLetterData.settings.templateId === template.id ? "text-blue-600" : "text-slate-900"}`}>
                      {template.name}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">{template.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold uppercase tracking-widest text-xs">
                <Palette className="h-4 w-4" />
                Accent Color
              </div>
              <div className="flex flex-wrap gap-4">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleColorChange(color.value)}
                    className={`w-10 h-10 rounded-full border-2 transition-all shadow-sm ${
                      coverLetterData.settings.color === color.value ? "border-slate-900 scale-110" : "border-transparent hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div className="pt-10 flex flex-col gap-4 border-t border-slate-100 mt-10">
              <div className="flex justify-between items-center">
                <Button variant="ghost" onClick={() => router.back()} className="rounded-full px-8 h-12 font-bold">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button 
                  onClick={handleSave} 
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-10 h-14 font-bold text-lg shadow-xl hover:shadow-blue-500/20 transition-all"
                >
                  {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <CheckCircle2 className="mr-2 h-5 w-5" />}
                  {saving ? "Saving..." : "Save & Finish"}
                </Button>
              </div>
              <Link href="/dashboard" className="text-center text-sm text-slate-400 hover:text-slate-600 underline">
                Return to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Preview */}
      <div className="w-full lg:w-1/2 xl:w-5/12 border-l border-slate-200 bg-slate-50 flex flex-col h-full">
        <CoverLetterPreview showDownload />
      </div>
    </div>
  );
}
