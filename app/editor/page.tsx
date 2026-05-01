"use client";

import { useState } from "react";
import { 
  X, Pencil, ChevronDown, Download, Printer, Mail, 
  CheckCircle2, Plus, LayoutGrid, Type, 
  FileText, Wrench, Layers, CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";

export default function EditorPage() {
  const [showModal, setShowModal] = useState(true);

  const colors = [
    "bg-indigo-600", "bg-slate-700", "bg-rose-200", "bg-blue-600", "bg-blue-400",
    "bg-teal-400", "bg-emerald-600", "bg-amber-500", "bg-rose-500"
  ];

  const sections = [
    { id: 1, name: "Heading" },
    { id: 2, name: "Summary" },
    { id: 3, name: "Skills" },
    { id: 4, name: "Experience" },
    { id: 5, name: "Education and Training" },
  ];

  return (
    <div className="flex flex-col h-screen w-screen bg-[#1e293b] text-white overflow-hidden font-sans">
      
      {/* Top Header Bar */}
      <header className="h-16 border-b border-slate-700 flex items-center justify-between px-6 bg-[#1e293b] z-20">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <div className="w-5 h-6 border-2 border-[#1e293b] rounded-sm relative">
                <div className="absolute top-1 left-1 w-2 h-0.5 bg-[#1e293b]"></div>
              </div>
            </div>
            <span className="font-bold text-xl tracking-tight">Resume <br/><span className="-mt-1 block">Now.</span></span>
          </div>
          
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-sm font-medium">Resume_2</span>
            <Pencil className="h-3.5 w-3.5 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>

        <button className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm font-medium">
          More Options <ChevronDown className="h-4 w-4" />
        </button>
      </header>

      <main className="flex flex-1 overflow-hidden relative">
        
        {/* Left Sidebar: Design & Templates */}
        <aside className="w-72 border-r border-slate-700 flex flex-col bg-[#1e293b] overflow-y-auto">
          <div className="p-6 space-y-8">
            <Tabs defaultValue="design" className="w-full">
              <TabsList className="bg-slate-800/50 p-1 w-full border border-slate-700">
                <TabsTrigger value="design" className="flex-1 gap-2 data-[state=active]:bg-white data-[state=active]:text-slate-900">
                  <LayoutGrid className="h-4 w-4" /> Design
                </TabsTrigger>
                <TabsTrigger value="formatting" className="flex-1 gap-2 data-[state=active]:bg-white data-[state=active]:text-slate-900">
                  <Type className="h-4 w-4" /> Formatting
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Colors</h3>
              <div className="grid grid-cols-5 gap-3">
                {colors.map((color, i) => (
                  <button 
                    key={i} 
                    className={`${color} w-8 h-8 rounded-full border-2 border-transparent hover:scale-110 transition-transform cursor-pointer relative flex items-center justify-center`}
                  >
                    {i === 0 && <CheckCircle2 className="h-4 w-4 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Templates</h3>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((t) => (
                  <div key={t} className={`aspect-[1/1.414] bg-slate-800 rounded-lg border-2 transition-all cursor-pointer overflow-hidden ${t === 1 ? 'border-blue-500' : 'border-slate-700 hover:border-slate-500'}`}>
                    <div className="p-2 space-y-1">
                      <div className="h-1 w-full bg-slate-700 rounded-full"></div>
                      <div className="h-1 w-3/4 bg-slate-700 rounded-full"></div>
                      <div className="mt-2 space-y-1">
                        <div className="h-0.5 w-full bg-slate-600"></div>
                        <div className="h-0.5 w-full bg-slate-600"></div>
                        <div className="h-0.5 w-full bg-slate-600"></div>
                      </div>
                    </div>
                    {t === 1 && (
                      <div className="absolute top-2 right-2 bg-slate-900 rounded-full p-1 border border-blue-500">
                        <CheckCircle2 className="h-3 w-3 text-blue-500" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Center: Resume Preview */}
        <section className="flex-1 bg-[#111827] flex items-center justify-center p-12 overflow-y-auto">
          <div className="w-full max-w-2xl aspect-[1/1.414] bg-white shadow-2xl rounded-sm">
             {/* Preview content would go here */}
          </div>
        </section>

        {/* Right Sidebar: Actions & Sections */}
        <aside className="w-72 border-l border-slate-700 flex flex-col bg-[#1e293b] overflow-y-auto">
          <div className="p-6 space-y-8">
            <div className="grid grid-cols-3 gap-2">
              <button className="flex flex-col items-center gap-2 p-2 bg-slate-800/50 rounded-lg hover:bg-slate-700 transition-colors">
                <Download className="h-5 w-5 text-slate-300" />
                <span className="text-[10px] font-bold uppercase">Download</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-2 bg-slate-800/50 rounded-lg hover:bg-slate-700 transition-colors">
                <Printer className="h-5 w-5 text-slate-300" />
                <span className="text-[10px] font-bold uppercase">Print</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-2 bg-slate-800/50 rounded-lg hover:bg-slate-700 transition-colors">
                <Mail className="h-5 w-5 text-slate-300" />
                <span className="text-[10px] font-bold uppercase">Email</span>
              </button>
            </div>

            <Button className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-full shadow-lg">
              Save & Next
            </Button>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-slate-400 group cursor-pointer hover:text-white transition-colors">
                <div className="flex items-center gap-3">
                  <Wrench className="h-4 w-4" />
                  <span className="text-sm font-bold uppercase tracking-wider">Spell Check</span>
                </div>
              </div>
              
              <div className="pt-4 space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Resume Sections</h3>
                <div className="space-y-3">
                  {sections.map((s) => (
                    <div key={s.id} className="flex items-center gap-3 group cursor-pointer">
                      <div className="w-6 h-6 rounded-full border border-slate-600 flex items-center justify-center text-[10px] font-bold text-slate-400 group-hover:border-white group-hover:text-white transition-colors">
                        {s.id}
                      </div>
                      <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{s.name}</span>
                    </div>
                  ))}
                </div>
                <button className="flex items-center gap-2 text-amber-500 hover:text-amber-400 font-bold text-sm pt-2">
                  <Plus className="h-4 w-4" /> Add a section
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Success Modal Overlay */}
        <AnimatePresence>
          {showModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white dark:bg-zinc-950 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative text-slate-900"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 transition-colors z-20"
                >
                  <X className="h-6 w-6" />
                </button>

                {/* Left Side: Content */}
                <div className="flex-1 p-12 space-y-10">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-extrabold">Nice work, fifa!</h2>
                    <p className="text-slate-500 text-lg">You&apos;ve built a powerful resume.</p>
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 p-2.5 rounded-lg text-blue-600">
                        <Layers className="h-6 w-6" />
                      </div>
                      <p className="text-slate-700 leading-tight pt-1 text-lg">
                        Add, move, or <span className="font-bold">edit sections</span> as you see fit.
                      </p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-amber-100 p-2.5 rounded-lg text-amber-600">
                        <FileText className="h-6 w-6" />
                      </div>
                      <p className="text-slate-700 leading-tight pt-1 text-lg">
                        Preview <span className="font-bold">template options</span> to match your style.
                      </p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-emerald-100 p-2.5 rounded-lg text-emerald-600">
                        <Wrench className="h-6 w-6" />
                      </div>
                      <p className="text-slate-700 leading-tight pt-1 text-lg">
                        Customize with our <span className="font-bold">formatting tools</span> to make it your own.
                      </p>
                    </div>
                  </div>

                  <Button 
                    onClick={() => setShowModal(false)}
                    className="w-full max-w-sm h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-full shadow-lg"
                  >
                    Finalize
                  </Button>
                </div>

                {/* Right Side: Illustration */}
                <div className="hidden md:flex w-5/12 bg-blue-50/50 flex-col items-center justify-center p-8 relative border-l border-slate-100">
                   {/* Mock Illustration */}
                   <div className="relative w-full aspect-square flex items-center justify-center">
                     <div className="w-56 h-72 bg-white rounded-lg border-2 border-slate-800 shadow-xl relative z-10 overflow-hidden p-6 space-y-4">
                       <div className="flex items-center gap-4 text-emerald-500 font-bold text-lg">
                         <CheckCircle className="h-6 w-6" />
                         <div className="h-1.5 w-full bg-slate-100 rounded-full"></div>
                       </div>
                       <div className="flex items-center gap-4 text-emerald-500 font-bold text-lg">
                         <CheckCircle className="h-6 w-6" />
                         <div className="h-1.5 w-full bg-slate-100 rounded-full"></div>
                       </div>
                       <div className="flex items-center gap-4 text-emerald-500 font-bold text-lg">
                         <CheckCircle className="h-6 w-6" />
                         <div className="h-1.5 w-full bg-slate-100 rounded-full"></div>
                       </div>
                       <div className="flex items-center gap-4 text-emerald-500 font-bold text-lg">
                         <CheckCircle className="h-6 w-6" />
                         <div className="h-1.5 w-full bg-slate-100 rounded-full"></div>
                       </div>
                     </div>
                     {/* Person flex mock */}
                     <div className="absolute -left-4 bottom-4 w-32 h-48 bg-amber-200 rounded-2xl border-2 border-slate-800 z-20 flex flex-col items-center justify-center">
                       <div className="w-12 h-12 rounded-full border-2 border-slate-800 bg-white -mt-16"></div>
                       <div className="w-16 h-20 border-t-2 border-slate-800 mt-4 rounded-t-full"></div>
                     </div>
                     {/* Confetti mock */}
                     <div className="absolute top-10 left-10 text-blue-400 animate-bounce">~</div>
                     <div className="absolute top-20 right-10 text-emerald-400 animate-pulse">+</div>
                   </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}
