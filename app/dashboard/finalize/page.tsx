"use client";

import { useRef, useState, useEffect } from "react";
import { useResume } from "@/lib/context/ResumeContext";
import { ResumePreview } from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import { 
  Download, CheckCircle2, Printer, 
  Palette, Layout, Mail, Sparkles, Loader2, Home, Edit2, Search
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { TEMPLATES as templates, getTemplateComponent } from "@/lib/templates";
import { cn } from "@/lib/utils";

export default function FinalizePage() {
  const { resumeData, updateSection, refreshData, loading: contextLoading } = useResume();
  const [dbTemplates, setDbTemplates] = useState<any[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const resumeRef = useRef<any>(null);

  useEffect(() => {
    fetchTemplates();
    refreshData();
  }, []);

  const fetchTemplates = async () => {
    try {
      const res = await fetch("/api/templates");
      if (res.ok) {
        const data = await res.json();
        setDbTemplates(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingTemplates(false);
    }
  };

  const handleTemplateChange = (templateId: string) => {
    if (!resumeData) return;
    updateSection("settings", { ...resumeData.settings, templateId });
    
    fetch("/api/resume/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        section: "settings", 
        data: { ...resumeData.settings, templateId } 
      })
    });
  };

  if (contextLoading || !resumeData) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Button>
          </Link>
          <div className="w-px h-6 bg-slate-200" />
          <h1 className="font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            Your Tailored CV
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => resumeRef.current?.print()}
          >
            <Printer className="w-4 h-4" />
            Print
          </Button>
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
            onClick={() => resumeRef.current?.download()}
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-[#f8fafc]">
        {/* Left Sidebar: Template Selection */}
        <aside className="w-full lg:w-[320px] bg-white border-r border-slate-200 overflow-y-auto shrink-0 flex flex-col">
          <div className="p-8 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">
              Finalize
            </h3>
            <h2 className="text-2xl font-bold text-slate-900 leading-tight">Ready to Download?</h2>
            <p className="text-sm text-slate-500 mt-2">Choose a design below and get your professional PDF in seconds.</p>
          </div>

          <div className="p-8 flex-1 overflow-y-auto space-y-8 custom-scrollbar">
            {/* Actions */}
            <section className="space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
                Actions
                <div className="h-px flex-1 bg-slate-100 ml-4" />
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-10 gap-2 text-xs font-bold rounded-xl border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 text-slate-700" onClick={() => resumeRef.current?.print()}>
                  <Printer className="w-3.5 h-3.5" />
                  Print
                </Button>
                <Button variant="outline" className="h-10 gap-2 text-xs font-bold rounded-xl border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 text-slate-700" onClick={() => resumeRef.current?.email()}>
                  <Mail className="w-3.5 h-3.5" />
                  Email
                </Button>
              </div>
              <Button className="w-full h-12 bg-slate-900 hover:bg-black text-white font-bold gap-3 rounded-xl shadow-lg transition-all text-sm" onClick={() => resumeRef.current?.download()}>
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </section>

            {/* Appearance - Moved UP */}
            <section className="space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
                Appearance
                <div className="h-px flex-1 bg-slate-100 ml-4" />
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {["#3b82f6", "#0f172a", "#1e293b", "#dc2626", "#16a34a", "#9333ea", "#f59e0b"].map((color) => (
                  <button 
                    key={color}
                    className={cn(
                      "w-8 h-8 rounded-full border-2 transition-all shadow-sm",
                      resumeData.settings?.color === color ? "border-indigo-600 scale-125 z-10 shadow-indigo-200" : "border-white hover:scale-110"
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => updateSection("settings", { ...resumeData.settings, color })}
                  />
                ))}
              </div>
            </section>

            {/* Quick Templates - 2x2 Grid with more items */}
            <section className="space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
                Quick Styles
                <div className="h-px flex-1 bg-slate-100 ml-4" />
              </h3>
              <div className="grid grid-cols-2 gap-3 pb-8">
                {Object.keys(templates).slice(0, 12).map((id) => (
                  <button 
                    key={id}
                    onClick={() => handleTemplateChange(id)}
                    className={cn(
                      "group flex flex-col gap-2 p-2 rounded-xl border-2 transition-all relative overflow-hidden",
                      resumeData.settings?.templateId === id 
                        ? "border-indigo-600 bg-indigo-50/30 shadow-sm" 
                        : "border-slate-50 hover:border-slate-100 hover:bg-slate-50/50"
                    )}
                  >
                    <div className="aspect-[1/1.414] w-full rounded-lg border border-slate-100 bg-white overflow-hidden shrink-0 relative shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                       <div className="absolute inset-0 origin-top-left scale-[0.04] w-[2500%] h-[2500%]">
                          {(() => {
                            const T = getTemplateComponent(id) as any;
                            return <T data={resumeData as any} />;
                          })()}
                       </div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] font-bold text-slate-900 capitalize truncate px-1">{(id as string).replace(/-/g, ' ')}</div>
                    </div>
                    {resumeData.settings?.templateId === id && (
                      <div className="absolute top-1 right-1 bg-indigo-600 text-white rounded-full p-0.5 z-10 shadow-lg">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </section>
            
            <div className="pt-2">
               <Link href="/builder">
                <Button variant="ghost" className="w-full h-10 text-xs font-bold text-slate-400 hover:text-slate-900 transition-all gap-2">
                  <Edit2 className="w-3.5 h-3.5" />
                  Edit Content
                </Button>
              </Link>
            </div>
          </div>
        </aside>

        {/* Center: Resume Preview */}
        <section className="flex-1 overflow-y-auto p-4 md:p-12 flex flex-col items-center custom-scrollbar bg-slate-100/50">
          <div className="max-w-[850px] w-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-sm overflow-hidden"
            >
              <ResumePreview ref={resumeRef} />
            </motion.div>
            
            {/* Pro-Tip */}
            <div className="mt-8 p-6 bg-white border border-slate-200 rounded-3xl flex items-start gap-4 shadow-sm">
              <div className="bg-indigo-600 p-2 rounded-xl text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Expert Review: Balanced Layout</h4>
                <p className="text-sm text-slate-500 mt-1">
                  Your resume is perfectly aligned with the job description. Choosing a professional template like "London" or "Blue Executive" will maximize your impact.
                </p>
              </div>
            </div>

            {/* Bottom Template Gallery */}
            <div className="mt-20 mb-20">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full w-fit mb-3">
                    <Layout className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Template Library</span>
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Find your perfect match</h2>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Search designs..." 
                      className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all w-48"
                    />
                  </div>
                  <div className="flex gap-1 p-1 bg-white border border-slate-200 rounded-xl shadow-sm">
                    {["All", "Elite", "Clean", "Bold"].map((cat) => (
                      <button 
                        key={cat}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                          cat === 'All' ? "bg-slate-900 text-white" : "text-slate-400 hover:text-slate-900"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
                {loadingTemplates ? (
                  Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="aspect-[1/1.414] bg-slate-100 animate-pulse rounded-[1.5rem]" />
                  ))
                ) : (
                  Object.keys(templates).map((id) => (
                    <div 
                      key={id}
                      onClick={() => handleTemplateChange(id)}
                      className="group cursor-pointer flex flex-col gap-3 transition-all"
                    >
                      <div className={cn(
                        "aspect-[1/1.414] relative rounded-[1.5rem] border-2 overflow-hidden transition-all bg-white shadow-sm",
                        resumeData.settings?.templateId === id 
                          ? "border-indigo-600 ring-8 ring-indigo-500/5 shadow-xl scale-[1.05]" 
                          : "border-slate-100 hover:border-indigo-200 hover:shadow-lg hover:scale-[1.02]"
                      )}>
                        <div className="absolute inset-0 bg-white origin-top-left transform scale-[0.08] w-[1250%] h-[1250%] pointer-events-none transition-transform duration-500 group-hover:scale-[0.085]">
                           {(() => {
                             const T = getTemplateComponent(id) as any;
                             return <T data={resumeData as any} />;
                           })()}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        {resumeData.settings?.templateId === id && (
                          <div className="absolute top-4 right-4 bg-indigo-600 text-white p-1.5 rounded-full shadow-2xl z-20">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        )}

                        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                          <Button className="w-full bg-white/90 backdrop-blur-md text-indigo-600 hover:bg-white font-black text-[10px] uppercase h-8 rounded-lg shadow-xl">
                            Select Design
                          </Button>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-slate-900 capitalize">{id.replace(/-/g, ' ')}</div>
                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Professional Edition</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
