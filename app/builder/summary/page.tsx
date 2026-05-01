"use client";

import { ArrowLeft, ZoomIn, Plus, Bold, Italic, Underline, List, Undo, Redo, Wand2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useResume } from "@/lib/context/ResumeContext";
import { ResumePreview } from "@/components/ResumePreview";

export default function SummaryPage() {
  const router = useRouter();
  const { resumeData, updateSection } = useResume();
  const [summary, setSummary] = useState(resumeData.summary?.content || "");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);


  const prewrittenOptions = [
    "Highly-motivated employee with desire to take on new challenges. Strong work ethic, adaptability, and exceptional interpersonal skills. Adept at working effectively unsupervised and quickly mastering new skills.",
    "Hardworking employee with customer service, multitasking, and time management abilities. Devoted to giving every customer a positive and memorable experience.",
    "Outgoing student pursuing flexible part-time employment. Eager to learn new skills and contribute to team success."
  ];

  const addOption = (text: string) => {
    setSummary(prev => prev ? `${prev}\n\n${text}` : text);
  };

  const handleSaveAndContinue = async () => {
    setLoading(true);
    try {
      updateSection("summary", { content: summary });
      const response = await fetch("/api/resume/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "summary", data: { content: summary } })
      });
      
      if (response.status === 401) {
        router.push("/sign-in?redirect_url=" + window.location.href);
        return;
      }

      if (response.ok) {
        router.push("/builder/additional-intro");
      }
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAiHelp = async () => {
    setAiLoading(true);
    try {
      const response = await fetch("/api/ai/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "summary", data: { content: summary } })
      });
      const data = await response.json();
      alert(data.suggestions || "AI suggested no changes.");
    } catch (error) {
      console.error("AI error:", error);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-zinc-950">
      {/* Top Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Form Area */}
        <div className="w-full lg:w-1/2 xl:w-7/12 flex flex-col h-full overflow-y-auto px-8 md:px-12 pt-12 pb-32">
          <div className="max-w-4xl w-full mx-auto space-y-8">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight mb-3 text-slate-900 dark:text-white">
                Briefly tell us about your background
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                Start with a prewritten option or write your own. Edit as needed, then use <span className="font-bold text-slate-800 dark:text-slate-200">Enhance with AI</span> to polish it.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-zinc-900 p-6 rounded-xl border border-slate-100 dark:border-zinc-800">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
                
                {/* Left Panel: Prewritten Options */}
                <div className="bg-white dark:bg-black rounded-xl border border-slate-200 dark:border-zinc-800 overflow-hidden flex flex-col relative shadow-sm">
                  <div className="p-4 border-b border-slate-100 dark:border-zinc-800 bg-white dark:bg-black z-10">
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">Prewritten options</h3>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 relative pb-20 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-zinc-800">
                    {prewrittenOptions.map((text, i) => (
                      <div 
                        key={i}
                        className="p-5 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-slate-300 dark:hover:border-zinc-600 shadow-sm transition-all flex flex-col gap-4 group"
                      >
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          {text}
                        </p>
                        <div className="flex justify-end">
                          <button 
                            onClick={() => addOption(text)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100/50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-semibold text-xs hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors"
                          >
                            <Plus className="h-3 w-3" strokeWidth={3} />
                            Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Gradient Fade */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-black dark:via-black/80 pointer-events-none"></div>
                </div>

                {/* Right Panel: Text Editor */}
                <div className="bg-white dark:bg-black rounded-xl border border-slate-200 dark:border-zinc-800 overflow-hidden flex flex-col shadow-sm">
                  {/* Editor Toolbar */}
                  <div className="flex items-center justify-between p-3 border-b border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-800">
                        <Bold className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-800">
                        <Italic className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-800">
                        <Underline className="h-4 w-4" />
                      </Button>
                      <div className="w-px h-4 bg-slate-300 dark:bg-zinc-700 mx-1"></div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-800">
                        <List className="h-4 w-4" />
                      </Button>
                      <div className="w-px h-4 bg-slate-300 dark:bg-zinc-700 mx-1"></div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-800">
                        <Undo className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-800">
                        <Redo className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={getAiHelp}
                      disabled={aiLoading}
                      className="h-8 gap-1.5 text-xs font-semibold bg-slate-100 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-700"
                    >
                      <Wand2 className="h-3.5 w-3.5" />
                      {aiLoading ? "Thinking..." : "Enhance with AI"}
                    </Button>
                  </div>
                  
                  {/* Editor Content Area */}
                  <textarea 
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="flex-1 w-full p-6 resize-none focus:outline-none text-slate-600 dark:text-slate-300 placeholder:text-slate-400 bg-transparent text-base"
                    placeholder="Enter text here"
                  ></textarea>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Live Preview Highlighted */}
        <div className="hidden lg:flex w-1/2 xl:w-5/12 bg-slate-100 dark:bg-zinc-900/50 border-l border-slate-200 dark:border-zinc-800 flex-col items-center justify-center p-8 relative">
          <ResumePreview />
          
          <button className="mt-8 text-blue-600 dark:text-blue-400 font-bold hover:underline transition-all">
            Change template
          </button>
        </div>
      </div>

      {/* Bottom Sticky Footer */}
      <div className="fixed bottom-0 right-0 left-0 lg:left-[18rem] bg-white dark:bg-black border-t border-slate-200 dark:border-zinc-800 p-4 md:px-8 flex items-center justify-between z-20">
        <Link href="/builder/summary-intro">
          <Button variant="ghost" className="text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 px-6 h-12">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden sm:flex items-center gap-2 font-semibold border-slate-300 dark:border-zinc-700 h-12 px-6 rounded-full">
            <Sparkles className="h-4 w-4" />
            Tips & fixes
          </Button>
          <Button 
            onClick={handleSaveAndContinue}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 h-12 rounded-full text-lg shadow-md transition-all hover:shadow-lg disabled:opacity-50"
          >
            {loading ? "Saving..." : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
