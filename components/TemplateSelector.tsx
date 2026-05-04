"use client";

import { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TEMPLATES as fallbackTemplatesMap } from "@/lib/templates";
const fallbackTemplates = Object.entries(fallbackTemplatesMap).map(([id, component]) => ({
  id,
  name: id.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
}));
import { Check, Layout, Palette, Loader2, FileText, Sparkles } from "lucide-react";
import { useResume } from "@/lib/context/ResumeContext";
import { cn } from "@/lib/utils";
import { getTemplateComponent } from "@/lib/templates";

function TemplateMiniPreview({ templateId }: { templateId: string }) {
  const { resumeData } = useResume();
  const TemplateComponent = getTemplateComponent(templateId);
  
  return (
    <div className="w-[794px] min-h-[1123px] bg-white origin-top-left scale-[0.28] pointer-events-none">
       <TemplateComponent data={resumeData} />
    </div>
  );
}

interface Template {
  id: string;
  name: string;
  thumbnail?: string;
  description?: string;
  is_pdf?: boolean;
}

export function TemplateSelector({ children }: { children?: React.ReactNode }) {
  const { resumeData, updateSection } = useResume();
  // Ensure we have a default template ID
  const currentTemplateId = resumeData.settings?.templateId || "modern";
  
  const [open, setOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState(currentTemplateId);
  const [dbTemplates, setDbTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(false);

  // Sync with current template when modal opens
  useEffect(() => {
    if (open) {
      setSelectedTemplateId(currentTemplateId);
      fetchTemplates();
    }
  }, [open, currentTemplateId]);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/templates");
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setDbTemplates(data);
        }
      }
    } catch (err) {
      console.error("Failed to fetch templates:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    if (!selectedTemplateId) return;

    // 1. Update local state immediately
    updateSection("settings", (prev: any) => ({
      ...prev,
      templateId: selectedTemplateId
    }));
    
    // 2. Persist to database
    fetch("/api/resume/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        section: "settings", 
        data: { ...resumeData.settings, templateId: selectedTemplateId } 
      })
    });

    setOpen(false);
  };

  // Combine database templates with fallback templates, removing duplicates by ID
  const allTemplates = [...dbTemplates];
  fallbackTemplates.forEach(ft => {
    if (!allTemplates.find(t => t.id === ft.id)) {
      allTemplates.push(ft as any);
    }
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" className="gap-2 bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all">
            <Layout className="h-4 w-4" />
            Change Template
          </Button>
        )}
      </DialogTrigger>
      {/* Increased max-width to 7xl and added better padding for a "Wider" feel as requested */}
      <DialogContent className="max-w-[95vw] lg:max-w-7xl max-h-[95vh] overflow-hidden flex flex-col p-0 gap-0 border-none sm:rounded-3xl shadow-2xl bg-white dark:bg-zinc-950">
        <div className="p-8 md:p-10 border-b border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          <DialogHeader>
            <div className="flex items-center gap-5">
              <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl text-white shadow-xl shadow-blue-600/20">
                <Layout className="h-7 w-7" />
              </div>
              <div>
                <DialogTitle className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Professional Templates</DialogTitle>
                <DialogDescription className="text-lg text-slate-500 dark:text-slate-400 font-medium mt-1">
                  Select a layout that matches your industry and personal style.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-y-auto p-8 md:p-12 bg-slate-50/50 dark:bg-zinc-900/50 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-6">
              <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
              <p className="text-xl font-bold text-slate-400 animate-pulse">Syncing your templates...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {allTemplates.map((template) => {
                const isCurrentlyActive = currentTemplateId === template.id;
                const isSelected = selectedTemplateId === template.id;
                const isPdf = template.is_pdf;
                
                return (
                  <div 
                    key={template.id}
                    className="flex flex-col gap-4 group"
                  >
                    <div 
                      onClick={() => setSelectedTemplateId(template.id)}
                      className={cn(
                        "relative aspect-[1/1.414] rounded-[2rem] border-4 transition-all duration-500 overflow-hidden cursor-pointer bg-white dark:bg-zinc-900",
                        isSelected 
                          ? "border-blue-600 shadow-[0_0_50px_rgba(37,99,235,0.3)] ring-[12px] ring-blue-500/10 -translate-y-2" 
                          : "border-white dark:border-zinc-800 hover:border-slate-200 dark:hover:border-zinc-700 hover:shadow-2xl hover:-translate-y-1"
                      )}
                    >
                      {template.thumbnail ? (
                        isPdf ? (
                          <iframe 
                            src={template.thumbnail + "#toolbar=0&navpanes=0&scrollbar=0"} 
                            className="w-full h-full border-none pointer-events-none scale-[1.25] origin-top brightness-[0.98]"
                            title={template.name}
                          />
                        ) : (
                          <img 
                            src={template.thumbnail} 
                            alt={template.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        )
                      ) : (
                        <TemplateMiniPreview templateId={template.id} />
                      )}

                      {/* Overlays */}
                      <div className={cn(
                        "absolute inset-0 transition-opacity duration-500 pointer-events-none",
                        isSelected ? "bg-blue-600/5" : "bg-transparent group-hover:bg-black/5"
                      )} />

                      {isSelected && (
                        <div className="absolute top-6 right-6 bg-blue-600 text-white rounded-full p-2 shadow-2xl animate-in zoom-in spin-in-90 duration-500 z-20">
                          <Check className="h-6 w-6 stroke-[4]" />
                        </div>
                      )}

                      {isCurrentlyActive && !isSelected && (
                        <div className="absolute top-6 left-6 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest z-20 border border-white/10">
                          Active
                        </div>
                      )}

                      {/* Selection Hint */}
                      {!isSelected && (
                        <div className="absolute bottom-6 inset-x-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-20">
                          <Button className="w-full bg-white/90 backdrop-blur-sm text-slate-900 hover:bg-white font-bold rounded-xl shadow-xl">
                            Select Template
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="px-4 text-center">
                      <h3 className={cn(
                        "font-black text-lg transition-colors duration-300",
                        isSelected ? "text-blue-600" : "text-slate-900 dark:text-white group-hover:text-blue-500"
                      )}>
                        {template.name}
                      </h3>
                      {isPdf && (
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mt-1">Uploaded PDF</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="p-8 md:p-10 border-t border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-between gap-6">
          <Button 
            variant="ghost" 
            onClick={() => setOpen(false)} 
            className="text-slate-500 hover:text-slate-900 font-bold px-10 h-14 rounded-2xl hover:bg-slate-100 transition-all"
          >
            Cancel
          </Button>
          <div className="flex items-center gap-4">
             {selectedTemplateId !== currentTemplateId && (
               <p className="hidden md:block text-sm font-bold text-blue-600 animate-pulse">
                  Change detected! Click apply to save.
               </p>
             )}
             <Button 
              onClick={handleConfirm}
              disabled={loading || !selectedTemplateId}
              className="bg-blue-600 hover:bg-blue-700 text-white font-black px-12 h-16 rounded-[1.25rem] shadow-2xl shadow-blue-600/30 transition-all hover:shadow-blue-600/50 hover:-translate-y-1 active:scale-95 disabled:opacity-50 text-lg flex items-center gap-2"
            >
              <Sparkles className="h-5 w-5" />
              Apply this Template
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
