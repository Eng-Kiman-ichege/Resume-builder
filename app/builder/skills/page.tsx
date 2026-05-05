"use client";

import { ArrowLeft, ZoomIn, Search, Plus, ChevronDown, Bold, Italic, Underline, List, Undo, Redo, Wand2, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useResume } from "@/lib/context/ResumeContext";
import { ResumePreview } from "@/components/ResumePreview";
import { TemplateSelector } from "@/components/TemplateSelector";
import { AiSuggestionDialog } from "@/components/AiSuggestionDialog";

export default function SkillsPage() {
  const router = useRouter();
  const { resumeData, updateSection } = useResume();
  const [skills, setSkills] = useState(resumeData.skills?.content || "");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const suggestedSkills = [
    "Interpersonal communication",
    "Analytical",
    "Research",
    "Maintenance & repair",
    "Collaboration",
    "Microsoft office",
    "Basic math",
    "[Equipment] operation",
    "Calm under pressure",
    "Social perceptiveness",
    "Organizational skills"
  ];

  const addSkill = (skill: string) => {
    const newSkills = skills ? `${skills}\n• ${skill}` : `• ${skill}`;
    setSkills(newSkills);
    updateSection("skills", { content: newSkills });
  };

  const handleSaveAndContinue = async () => {
    setLoading(true);
    try {
      updateSection("skills", { content: skills });
      const response = await fetch("/api/resume/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "skills", data: { content: skills } })
      });
      
      if (response.status === 401) {
        router.push("/sign-in?redirect_url=" + window.location.href);
        return;
      }

      if (response.ok) {
        router.push("/builder/summary-intro");
      }
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setLoading(false);
    }
  };

  const [aiSuggestion, setAiSuggestion] = useState<string>("");
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);


  const getAiHelp = async () => {
    setAiLoading(true);
    try {
      const response = await fetch("/api/ai/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "skills", data: { content: skills } })
      });
      const data = await response.json();
      setAiSuggestion(data.suggestions || "AI suggested no changes.");
      setIsAiModalOpen(true);
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
        <div className="w-full lg:w-1/2 xl:w-7/12 flex flex-col h-full overflow-y-auto px-4 sm:px-8 md:px-12 pt-6 sm:pt-12 pb-32">
          <div className="max-w-4xl w-full mx-auto space-y-8">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-slate-900 dark:text-white">
                We recommend including 6-8 skills
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                Choose skills that align with the job requirements. Show employers you're confident of the work you do!
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-zinc-900 p-4 sm:p-6 rounded-xl border border-slate-100 dark:border-zinc-800">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:h-[450px]">
                
                {/* Left Panel: Skill Suggestions */}
                <div className="bg-white dark:bg-black rounded-xl border border-slate-200 dark:border-zinc-800 overflow-hidden flex flex-col relative shadow-sm">
                  <div className="p-4 border-b border-slate-100 dark:border-zinc-800">
                    <div className="relative">
                      <Input 
                        placeholder="Search by job title" 
                        className="pl-4 pr-10 h-12 bg-slate-50/50 dark:bg-zinc-900/50 text-base"
                      />
                      <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4 flex flex-wrap content-start gap-3 relative pb-20 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-zinc-800">
                    {suggestedSkills.map((skill, i) => (
                      <button 
                        key={i}
                        onClick={() => addSkill(skill)}
                        className="flex items-center gap-2 px-3 py-2 rounded-full border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-slate-300 dark:hover:border-zinc-600 hover:shadow-sm transition-all text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        <div className="bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-full p-0.5">
                          <Plus className="h-3.5 w-3.5" />
                        </div>
                        {skill}
                      </button>
                    ))}
                  </div>

                  {/* Gradient Fade and Show More */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/90 to-transparent dark:from-black dark:via-black/90 flex items-end justify-center pb-4">
                    <button className="text-blue-600 dark:text-blue-400 font-semibold text-sm flex items-center gap-1 hover:underline">
                      Show more <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Right Panel: Text Editor */}
                <div className="bg-white dark:bg-black rounded-xl border border-slate-200 dark:border-zinc-800 overflow-hidden flex flex-col shadow-sm">
                  {/* Editor Toolbar */}
                  <div className="flex flex-wrap lg:flex-nowrap items-center justify-between p-2 sm:p-3 border-b border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 gap-2">
                    <div className="flex items-center flex-wrap gap-1">
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
                    value={skills}
                    onChange={(e) => {
                      setSkills(e.target.value);
                      updateSection("skills", { content: e.target.value });
                    }}
                    className="flex-1 w-full p-6 resize-none focus:outline-none text-slate-600 dark:text-slate-300 placeholder:text-slate-400 bg-transparent text-base"
                    placeholder="Add ready-to-use skills or write your own."
                  ></textarea>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Live Preview Highlighted */}
        <div className="hidden lg:flex w-1/2 xl:w-5/12 bg-slate-100 dark:bg-zinc-900/50 border-l border-slate-200 dark:border-zinc-800 flex-col relative overflow-hidden">
          <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center justify-start scrollbar-hide">
             <ResumePreview />
             
             {/* Action Button below template */}
             <div className="mt-8 pb-12">
               <TemplateSelector>
                 <Button variant="outline" className="rounded-full border-blue-200 dark:border-blue-900/50 bg-white dark:bg-zinc-950 text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 px-10 h-12 shadow-md transition-all hover:shadow-lg">
                   <Layout className="h-4 w-4 mr-2" />
                   Change template
                 </Button>
               </TemplateSelector>
             </div>
          </div>
        </div>

      </div>

      {/* Bottom Sticky Footer */}
      <div className="fixed bottom-0 right-0 left-0 lg:left-[18rem] bg-white dark:bg-black border-t border-slate-200 dark:border-zinc-800 p-3 sm:p-4 md:px-8 flex items-center justify-between z-20">
        <Link href="/builder/skills-intro">
          <Button variant="ghost" className="text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 px-6 h-12">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <Button 
          onClick={handleSaveAndContinue}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 h-12 rounded-full text-lg shadow-md transition-all hover:shadow-lg disabled:opacity-50"
        >
          {loading ? "Saving..." : "Continue"}
        </Button>
      </div>

      <AiSuggestionDialog
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        suggestion={aiSuggestion}
        onApply={(suggestion) => {
          const newSkills = skills ? `${skills}\n\n${suggestion}` : suggestion;
          setSkills(newSkills);
          updateSection("skills", { content: newSkills });
        }}
      />
    </div>
  );
}
