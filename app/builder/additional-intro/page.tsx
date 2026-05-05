"use client";

import { ArrowLeft, ZoomIn, Globe, Trophy, Award, TrendingUp, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ResumePreview } from "@/components/ResumePreview";

export default function AdditionalIntroPage() {
  const options = [
    { icon: Globe, label: "Languages" },
    { icon: Trophy, label: "Awards & Honors" },
    { icon: Award, label: "Certifications & Licenses" },
    { icon: TrendingUp, label: "Activities" },
    { icon: User, label: "Websites & Social Links" },
    { icon: Users, label: "References" },
  ];

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
            className="max-w-2xl"
          >
            <div className="text-lg text-slate-700 dark:text-slate-300 font-medium mb-4 flex items-center gap-2">
              You got this! Last up <span className="text-slate-400">→</span> Additional Details
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 text-slate-900 dark:text-white leading-[1.1]">
              Select (optional) <br/> details to add
            </h1>

            <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg mb-6 sm:mb-8">
              Pick anything you'd like to highlight that's not already on your resume.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-16">
              {options.map((opt, index) => {
                const Icon = opt.icon;
                return (
                  <Link 
                    key={index}
                    href={`/builder/additional?type=${encodeURIComponent(opt.label)}`}
                    className="flex items-center gap-4 p-4 rounded-xl border border-slate-300 dark:border-zinc-700 bg-transparent hover:bg-slate-50 dark:hover:bg-zinc-800/50 hover:border-slate-400 dark:hover:border-zinc-500 transition-all text-left"
                  >
                    <Icon className="h-6 w-6 text-slate-800 dark:text-slate-200" strokeWidth={1.5} />
                    <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">{opt.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-4 sm:gap-6 relative mb-8 sm:mb-0">
              <Link href="/builder/summary">
                <Button variant="ghost" className="text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 sm:px-6 h-12 sm:h-14 text-base sm:text-lg">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back
                </Button>
              </Link>
              
              <Link href="/builder/finalize">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 sm:px-12 h-12 sm:h-14 rounded-full text-base sm:text-lg shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5">
                  Skip
                </Button>
              </Link>
            </div>
          </motion.div>
          
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        </div>

        {/* Right Side: Live Preview */}
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
