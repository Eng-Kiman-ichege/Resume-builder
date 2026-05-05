"use client";

import { useRef, useState, useEffect } from "react";
import { useResume } from "@/lib/context/ResumeContext";
import { ResumePreview } from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, Download, CheckCircle2, Share2, Printer, 
  Settings2, Type, Palette, Layout, Mail, SpellCheck, 
  Plus, Edit2, ChevronDown, FileText, Loader2 
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { TEMPLATES as templates, colors } from "@/lib/templates";
import { cn } from "@/lib/utils";

export default function ReviewPage() {
  const { resumeData, updateSection } = useResume();
  const [activeTab, setActiveTab] = useState<"design" | "formatting">("design");
  const [editingPart, setEditingPart] = useState<"accent" | "title" | "layout">("accent");
  const [dbTemplates, setDbTemplates] = useState<any[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  
  const resumeRef = useRef<any>(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const res = await fetch("/api/templates");
      if (res.ok) {
        const data = await res.json();
        setDbTemplates(data);
      } else {
        setDbTemplates([]);
      }
    } catch (err) {
      console.error(err);
      setDbTemplates([]);
    } finally {
      setLoadingTemplates(false);
    }
  };

  const handleColorChange = (color: string) => {
    const fieldMap = {
      accent: "color",
      title: "titleColor",
      layout: "backgroundColor"
    };
    const field = fieldMap[editingPart];
    const newSettings = { ...resumeData.settings, [field]: color };
    
    updateSection("settings", newSettings);
    
    // Background save
    fetch("/api/resume/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        section: "settings", 
        data: newSettings
      })
    });
  };

  const handleTemplateChange = (templateId: string) => {
    updateSection("settings", { ...resumeData.settings, templateId });
    
    // Background save
    fetch("/api/resume/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        section: "settings", 
        data: { ...resumeData.settings, templateId } 
      })
    });
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#1a2b4b] text-white overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-2">
          <div className="bg-white text-[#1a2b4b] p-1 rounded-sm">
            <Layout className="h-5 w-5" />
          </div>
          <span className="font-bold text-xl tracking-tight italic">Resume Now.</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-md border border-white/10">
            <span className="text-sm font-medium">Resume_2</span>
            <Edit2 className="h-3 w-3 text-slate-400 cursor-pointer hover:text-white" />
          </div>
          <button className="flex items-center gap-1 text-sm text-slate-300 hover:text-white transition-colors">
            More Options <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        <div className="w-40"></div> {/* Spacer for balance */}
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Design Controls */}
        <div className="w-80 border-r border-white/10 bg-[#25375a] flex flex-col shrink-0">
          <div className="flex p-4 gap-2">
            <button 
              onClick={() => setActiveTab("design")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-bold transition-all",
                activeTab === "design" ? "bg-amber-100 text-slate-900" : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <Palette className="h-4 w-4" /> Design
            </button>
            <button 
              onClick={() => setActiveTab("formatting")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-bold transition-all",
                activeTab === "formatting" ? "bg-amber-100 text-slate-900" : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <Type className="h-4 w-4" /> Formatting
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-white/10">
            {activeTab === "design" ? (
              <>


                <section>
                  <h3 className="text-lg font-bold mb-4">Templates</h3>
                  {loadingTemplates ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      {dbTemplates.map((template) => (
                        <div 
                          key={template.id}
                          onClick={() => handleTemplateChange(template.id)}
                          className={cn(
                            "cursor-pointer rounded-lg border-2 overflow-hidden transition-all relative group bg-white",
                            resumeData.settings?.templateId === template.id ? "border-green-400 ring-2 ring-green-400/20" : "border-transparent opacity-80 hover:opacity-100"
                          )}
                        >
                          <div className="w-[100%] aspect-[1/1.414] relative origin-top overflow-hidden">
                            {template.thumbnail && template.is_pdf ? (
                              <iframe 
                                src={template.thumbnail + "#toolbar=0&navpanes=0&scrollbar=0"} 
                                className="w-full h-full border-none pointer-events-none scale-[1.5] origin-top"
                                title={template.name}
                              />
                            ) : (
                              <div className="absolute inset-0 pointer-events-none transform scale-[0.3] origin-top-left w-[333%] h-[333%]">
                                 <ResumePreview 
                                   customTemplateId={template.id} 
                                 />
                              </div>
                            )}
                          </div>

                          <div className="absolute inset-x-0 bottom-0 bg-slate-900/90 p-1.5 border-t border-white/10 z-20">
                             <p className="text-[8px] font-bold text-center truncate w-full text-slate-300">{template.name}</p>
                          </div>
                          
                          {resumeData.settings?.templateId === template.id && (
                            <div className="absolute top-2 right-2 bg-green-400 rounded-full p-0.5 shadow-lg z-30">
                              <CheckCircle2 className="h-4 w-4 text-white" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                            <span className="text-[10px] font-bold uppercase tracking-wider">Select</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-slate-400">
                <Settings2 className="h-10 w-10 mb-2 opacity-20" />
                <p className="text-xs">Formatting options coming soon</p>
              </div>
            )}
          </div>
        </div>

        {/* Center: Resume Preview */}
        <div className="flex-1 overflow-y-auto bg-slate-200/20 p-8 flex flex-col items-center custom-scrollbar">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-white origin-top"
            onClick={() => setActiveTab("design")}
          >
            <ResumePreview ref={resumeRef} />
          </motion.div>
        </div>

        {/* Right Sidebar: Actions */}
        <div className="w-80 border-l border-white/10 bg-[#25375a] flex flex-col shrink-0">
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={() => resumeRef.current?.download()}
                className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              >
                <Download className="h-5 w-5" />
                <span className="text-[10px] font-bold uppercase">Download</span>
              </button>
              <button 
                onClick={() => resumeRef.current?.print()}
                className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              >
                <Printer className="h-5 w-5" />
                <span className="text-[10px] font-bold uppercase">Print</span>
              </button>
              <button 
                onClick={() => resumeRef.current?.email()}
                className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              >
                <Mail className="h-5 w-5" />
                <span className="text-[10px] font-bold uppercase">Email</span>
              </button>
            </div>

            <Link href="/dashboard" className="block">
              <Button className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-full shadow-lg shadow-blue-900/20">
                Finish
              </Button>
            </Link>

            <div className="h-px bg-white/10 my-4" />

            <button className="w-full flex items-center justify-between text-slate-300 hover:text-white transition-colors group">
              <div className="flex items-center gap-2">
                <SpellCheck className="h-5 w-5 text-amber-400" />
                <span className="font-bold">Spell Check</span>
              </div>
            </button>

            <div className="h-px bg-white/10 my-4 border-dashed" />

            <section>
              <h4 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest">Resume Sections</h4>
              <div className="space-y-4">
                {[
                  { id: 1, label: "Heading" },
                  { id: 2, label: "Summary" },
                  { id: 3, label: "Skills" },
                  { id: 4, label: "Experience" },
                  { id: 5, label: "Education and Training" },
                ].map((sec) => (
                  <div key={sec.id} className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center text-[10px] font-bold">
                      {sec.id}
                    </div>
                    <span className="font-medium text-slate-200">{sec.label}</span>
                  </div>
                ))}
              </div>

              <button className="mt-6 flex items-center gap-2 text-amber-400 hover:text-amber-300 font-bold transition-colors">
                <Plus className="h-4 w-4" /> Add a section
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
