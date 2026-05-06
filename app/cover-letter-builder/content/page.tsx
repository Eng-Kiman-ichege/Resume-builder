"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCoverLetter } from "@/lib/context/CoverLetterContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, PenTool, Sparkles, Loader2, Eye, EyeOff } from "lucide-react";
import { CoverLetterPreview } from "@/components/CoverLetterPreview";
import { useResume } from "@/lib/context/ResumeContext";

export default function ContentPage() {
  const router = useRouter();
  const { coverLetterData, updateSection } = useCoverLetter();
  const { resumeData } = useResume();
  const [showPreview, setShowPreview] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateSection("content", { body: e.target.value });
  };

  const generateWithAi = async () => {
    setAiLoading(true);
    try {
      const response = await fetch("/api/ai/generate-cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle: coverLetterData.recipient.jobTitle,
          company: coverLetterData.recipient.company,
          resumeData: resumeData // Use existing resume for context
        }),
      });
      
      const data = await response.json();
      if (data.body) {
        updateSection("content", { body: data.body });
      }
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setAiLoading(false);
    }
  };

  const handleNext = () => {
    router.push("/cover-letter-builder/review");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex h-full w-full">
      {/* Left: Form */}
      <div className={`flex-1 flex flex-col h-full overflow-hidden ${showPreview ? 'hidden lg:flex' : 'flex'}`}>
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 md:p-16">
          <div className="max-w-2xl mx-auto space-y-10 h-full flex flex-col">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shadow-inner">
                  <PenTool className="h-6 w-6" />
                </div>
                <Button 
                  onClick={generateWithAi} 
                  disabled={aiLoading || !coverLetterData.recipient.jobTitle}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full px-6 h-12 gap-2 shadow-lg hover:shadow-purple-500/20 transition-all border-none"
                >
                  {aiLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  {aiLoading ? "Writing..." : "✨ Auto-Generate with AI"}
                </Button>
              </div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">The Letter Body</h1>
              <p className="text-lg text-slate-500">Express why you&apos;re the perfect fit.</p>
            </div>

            <div className="flex-1 min-h-[400px] flex flex-col space-y-2">
              <Label htmlFor="body" className="text-slate-600 font-bold uppercase tracking-widest text-[10px]">Your Cover Letter</Label>
              <textarea 
                id="body" 
                value={coverLetterData.content.body} 
                onChange={handleChange} 
                placeholder="Start writing or use AI to generate a draft..."
                className="flex-1 w-full p-6 border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-2xl bg-slate-50/30 resize-none text-slate-700 leading-relaxed font-sans scrollbar-hide"
              />
            </div>

            <div className="pt-10 flex justify-between items-center border-t border-slate-100 mt-auto">
              <Button variant="ghost" onClick={handleBack} className="rounded-full px-8 h-12 font-bold">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setShowPreview(!showPreview)}
                  className="lg:hidden gap-2"
                >
                  {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {showPreview ? "Hide Preview" : "Show Preview"}
                </Button>
                <Button 
                  onClick={handleNext} 
                  className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-10 h-14 font-bold text-lg group transition-all shadow-xl hover:shadow-slate-200"
                >
                  Next: Review
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Preview */}
      <div className={`w-full lg:w-1/2 xl:w-5/12 border-l border-slate-200 bg-slate-50 ${showPreview ? 'flex' : 'hidden lg:flex'}`}>
        <CoverLetterPreview />
      </div>
    </div>
  );
}
