"use client";

import { ArrowLeft, ZoomIn, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ResumePreview } from "@/components/ResumePreview";
import { TemplateSelector } from "@/components/TemplateSelector";

export default function EducationIntroPage() {
  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-br from-amber-50/50 via-white to-blue-50/50 dark:from-zinc-950 dark:via-zinc-950 dark:to-slate-900 overflow-hidden">
      {/* Top Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Intro Content */}
        <div className="w-full lg:w-1/2 xl:w-7/12 flex flex-col h-full justify-center px-4 sm:px-8 md:px-16 lg:px-24 py-8 sm:py-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            <div className="text-xl text-slate-700 dark:text-slate-300 font-medium mb-4 flex items-center gap-2">
              Great job!
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-12 sm:mb-24 text-slate-900 dark:text-white leading-[1.1]">
              Now, let&apos;s add <br/> your <span className="relative inline-block">education<div className="absolute -bottom-2 left-0 w-full h-1.5 bg-green-300 dark:bg-green-600 rounded-full"></div></span>
            </h1>

            <div className="flex items-center gap-6 relative">
              <Link href="/builder/experience">
                <Button variant="ghost" className="text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 sm:px-6 h-12 sm:h-14 text-base sm:text-lg">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back
                </Button>
              </Link>
              
              <Link href="/builder/education">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 sm:px-12 h-12 sm:h-14 rounded-full text-base sm:text-lg shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5">
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        </div>

        {/* Right Side: Live Preview Highlighted */}
        <div className="hidden lg:flex w-1/2 xl:w-5/12 bg-transparent flex-col relative z-10 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center justify-start scrollbar-hide">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ResumePreview />
            </motion.div>
            
            {/* Action Button below template */}
            <div className="mt-8 pb-12">
              <TemplateSelector>
                <Button variant="outline" className="rounded-full border-blue-200 dark:border-blue-900/50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 px-10 h-12 shadow-md transition-all hover:shadow-lg">
                  <Layout className="h-4 w-4 mr-2" />
                  Change template
                </Button>
              </TemplateSelector>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
