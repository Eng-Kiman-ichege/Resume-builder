"use client";

import { ArrowLeft, ZoomIn, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ResumePreview } from "@/components/ResumePreview";

export default function ExperienceIntroPage() {
  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-br from-amber-50/50 via-white to-blue-50/50 dark:from-zinc-950 dark:via-zinc-950 dark:to-slate-900 overflow-hidden">
      {/* Top Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Intro Content */}
        <div className="w-full lg:w-1/2 xl:w-7/12 flex flex-col h-full justify-center px-8 md:px-16 lg:px-24 py-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            <div className="text-lg text-slate-700 dark:text-slate-300 font-medium mb-4 flex items-center gap-2">
              Great progress! Next up <span className="text-slate-400">→</span> Experience
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-12 text-slate-900 dark:text-white leading-[1.1]">
              Add details about <br/> your work <br/> <span className="relative inline-block">experience<div className="absolute -bottom-2 left-0 w-full h-1.5 bg-green-300 dark:bg-green-600 rounded-full"></div></span>
            </h1>

            <div className="flex gap-4 items-start bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm p-6 rounded-2xl border border-amber-100 dark:border-amber-900/30 mb-16 shadow-sm">
              <div className="mt-1 bg-amber-100 dark:bg-amber-900/50 p-2 rounded-lg text-amber-700 dark:text-amber-400">
                <Wand2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Our AI now makes writing easier!</h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                  With writing help you can fix mistakes or rephrase sentences to suit your needs.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 relative">
              <Link href="/builder">
                <Button variant="ghost" className="text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 px-6 h-14 text-lg">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back
                </Button>
              </Link>
              
              <Link href="/builder/experience">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-12 h-14 rounded-full text-lg shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5">
                  Continue
                </Button>
              </Link>

              {/* Decorative Arrow (CSS approximation) */}
              <div className="absolute -top-12 left-64 opacity-60 hidden md:block">
                <svg width="80" height="40" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-slate-800 dark:stroke-slate-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10,10 Q40,-10 80,30" />
                  <path d="M65,30 L80,30 L75,15" />
                </svg>
              </div>
            </div>
          </motion.div>
          
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        </div>

        {/* Right Side: Live Preview Highlighted */}
        <div className="hidden lg:flex w-1/2 xl:w-5/12 bg-transparent flex-col items-center justify-center p-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ResumePreview />
          </motion.div>

          <button className="mt-8 text-blue-600 dark:text-blue-400 font-bold hover:underline transition-all z-20">
            Change template
          </button>
        </div>

      </div>
    </div>
  );
}
