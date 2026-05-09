"use client";

import { useRef, useState, useEffect } from "react";
import { useResume } from "@/lib/context/ResumeContext";
import { ResumePreview } from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, Download, CheckCircle2, Share2, Printer, 
  Palette, Layout, Mail, Sparkles, Loader2, Home, Edit2, Search
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { TEMPLATES as templates, getTemplateComponent } from "@/lib/templates";
import { cn } from "@/lib/utils";

export default function FinalizePage() {
  const { resumeData, updateSection, refreshData, loading: contextLoading } = useResume();
  const [dbTemplates, setDbTemplates] = useState<any[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const resumeRef = useRef<any>(null);

  useEffect(() => {
    fetchTemplates();
    refreshData(); // Ensure we have the latest data from the DB
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

  if (contextLoading) {
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
            {/* Design Controls */}
            <section className="space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Palette className="w-3 h-3" />
                Appearance
              </h3>
              <div className="flex flex-wrap gap-2">
                {["#3b82f6", "#0f172a", "#1e293b", "#dc2626", "#16a34a", "#9333ea"].map((color) => (
                  <button 
                    key={color}
                    className={cn(
                      "w-8 h-8 rounded-full border-2 transition-all",
                      resumeData.settings?.color === color ? "border-indigo-600 scale-110 shadow-md" : "border-transparent hover:scale-105"
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => updateSection("settings", { ...resumeData.settings, color })}
                  />
                ))}
              </div>
            </section>

            <div className="h-px bg-slate-100" />
            
            {/* Actions */}
            <section className="space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Actions
              </h3>
              
              <Link href="/builder" className="block">
                <Button variant="outline" className="w-full h-14 border-2 border-slate-100 hover:border-indigo-100 hover:bg-indigo-50 text-indigo-600 font-bold gap-3 rounded-2xl transition-all">
                  <Edit2 className="w-5 h-5" />
                  Edit Content & Details
                </Button>
              </Link>
            </section>

            <div className="space-y-3 pt-4">
              <Button className="w-full h-16 bg-indigo-600 hover:bg-indigo-700 text-white font-bold gap-3 shadow-xl shadow-indigo-200 rounded-2xl text-lg" onClick={() => resumeRef.current?.download()}>
                <Download className="w-6 h-6" />
                Download PDF
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-12 gap-2 text-xs font-bold rounded-xl" onClick={() => resumeRef.current?.print()}>
                  <Printer className="w-4 h-4" />
                  Print
                </Button>
                <Button variant="outline" className="h-12 gap-2 text-xs font-bold rounded-xl" onClick={() => resumeRef.current?.email()}>
                  <Mail className="w-4 h-4" />
                  Email
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Center: Resume Preview */}
        <section className="flex-1 overflow-y-auto p-4 md:p-12 flex justify-center custom-scrollbar bg-slate-200/30">
          <div className="max-w-[850px] w-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-sm overflow-hidden"
            >
              <ResumePreview ref={resumeRef} />
            </motion.div>
            
            {/* Pro-Tip */}
            <div className="mt-8 p-6 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-start gap-4">
              <div className="bg-indigo-600 p-2 rounded-lg text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-indigo-900">Pro-Tip: Keep it balanced</h4>
                <p className="text-sm text-indigo-700 mt-1">
                  Your resume is perfectly aligned with the job description. If you decide to change templates, make sure the layout still emphasizes your most relevant skills.
                </p>
              </div>
            </div>

            {/* Bottom Template Gallery */}
            <div className="mt-12 mb-20">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">
                    Gallery
                  </h3>
                  <h2 className="text-2xl font-bold text-slate-900">Try other designs</h2>
                </div>
                <div className="flex gap-2">
                  {["All", "Professional", "Modern", "Creative"].map((cat) => (
                    <button 
                      key={cat}
                      className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold hover:border-indigo-500 hover:text-indigo-600 transition-all shadow-sm"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {loadingTemplates ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="aspect-[1/1.414] bg-slate-100 animate-pulse rounded-xl" />
                  ))
                ) : (
                  dbTemplates.map((template) => (
                    <div 
                      key={template.id}
                      onClick={() => handleTemplateChange(template.id)}
                      className="group cursor-pointer flex flex-col gap-2 transition-all"
                    >
                      <div className={cn(
                        "aspect-[1/1.414] relative rounded-xl border-2 overflow-hidden transition-all bg-white shadow-sm",
                        resumeData.settings?.templateId === template.id 
                          ? "border-indigo-600 ring-4 ring-indigo-500/10 shadow-xl scale-[1.02]" 
                          : "border-slate-200 hover:border-indigo-300 hover:shadow-md"
                      )}>
                        <div className="absolute inset-0 bg-white origin-top-left transform scale-[0.1] w-[1000%] h-[1000%] pointer-events-none">
                           {(() => {
                             const Template = getTemplateComponent(template.id);
                             return <Template data={resumeData} />;
                           })()}
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                        {resumeData.settings?.templateId === template.id && (
                          <div className="absolute top-2 right-2 bg-indigo-600 text-white p-1 rounded-full shadow-lg">
                            <CheckCircle2 className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-wider text-center truncate px-2",
                        resumeData.settings?.templateId === template.id ? "text-indigo-600" : "text-slate-500 group-hover:text-slate-900"
                      )}>
                        {template.name}
                      </span>
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
