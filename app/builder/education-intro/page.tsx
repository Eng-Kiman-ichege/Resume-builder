"use client";

import { ArrowLeft, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function EducationIntroPage() {
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
            <div className="text-xl text-slate-700 dark:text-slate-300 font-medium mb-4 flex items-center gap-2">
              Great job!
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-24 text-slate-900 dark:text-white leading-[1.1]">
              Now, let&apos;s add <br/> your <span className="relative inline-block">education<div className="absolute -bottom-2 left-0 w-full h-1.5 bg-green-300 dark:bg-green-600 rounded-full"></div></span>
            </h1>

            <div className="flex items-center gap-6 relative">
              <Link href="/builder/experience">
                <Button variant="ghost" className="text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 px-6 h-14 text-lg">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back
                </Button>
              </Link>
              
              <Link href="/builder/education">
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        </div>

        {/* Right Side: Live Preview Highlighted */}
        <div className="hidden lg:flex w-1/2 xl:w-5/12 bg-transparent flex-col items-center justify-center p-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md aspect-[1/1.414] bg-white shadow-2xl rounded-sm border border-slate-200 relative overflow-hidden"
          >
            {/* Mock Resume Content */}
            <div className="p-8 h-full flex flex-col text-slate-800">
              <div className="text-center mb-6 pb-4">
                <div className="w-12 h-12 mx-auto border border-slate-300 rounded-full flex items-center justify-center text-lg font-serif mb-2">
                  FK
                </div>
                <h2 className="text-2xl font-serif tracking-widest uppercase font-bold">Fifa Kim</h2>
                <div className="mt-2 text-[10px] text-slate-500 uppercase tracking-widest">
                  kim99012@gmail.com | 0799849023 | NAIROBI Kenya
                </div>
              </div>
              
              <div className="flex-1 text-[8px] leading-tight flex flex-col gap-4">
                <div>
                  <h3 className="font-bold border-b border-slate-200 mb-1 pb-1 text-xs">Summary</h3>
                  <p className="text-slate-400">Customer-focused Retail Sales professional with solid understanding of retail dynamics, marketing and customer service. Offering five years of experience providing quality product recommendations and solutions to meet customer needs and exceed expectations. Demonstrated record of exceeding revenue targets by leveraging communication skills and sales expertise.</p>
                </div>
                
                <div>
                  <h3 className="font-bold border-b border-slate-200 mb-1 pb-1 text-xs">Skills</h3>
                  <div className="grid grid-cols-1 text-slate-400 gap-1 opacity-50">
                    <div>Skill 1</div>
                    <div>Skill 2</div>
                    <div>Skill 3</div>
                    <div>Skill 4</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold border-b border-slate-200 mb-2 pb-1 text-xs">Experience</h3>
                  <div className="mb-4 text-slate-400 opacity-50 grid grid-cols-[1fr_2fr] gap-4">
                    <div>
                      <div className="font-semibold text-slate-600">Retail Sales Associate</div>
                      <div className="italic">Kilimani, Nairobi, Kenya</div>
                      <div>02/2017 - Current</div>
                    </div>
                    <div className="space-y-1">
                      <div>• Increased monthly sales by 10% by effectively upselling and cross-selling products to maximize profitability.</div>
                      <div>• Prevented store losses by leveraging awareness, attention to detail and integrity to identify and investigate concerns.</div>
                      <div>• Processed payments and maintained accurate drawers to meet financial targets.</div>
                    </div>
                  </div>
                </div>

                {/* Highlighted Education Section */}
                <div className="relative mt-2">
                  {/* Highlight Box */}
                  <div className="absolute -inset-3 border-2 border-amber-400 bg-amber-50/30 rounded-sm pointer-events-none"></div>
                  
                  <div className="relative z-10">
                    <h3 className="font-bold border-b border-slate-200 mb-2 pb-1 text-xs">Education and Training</h3>
                    
                    <div className="mb-4 text-slate-500">
                      <div className="font-semibold text-slate-700">Kamukunji Secondary School | Nairobi, Kenya</div>
                      <div className="text-slate-400">KCSE mean grade C</div>
                      <div className="text-slate-400">06/2013</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Zoom Button */}
            <button className="absolute bottom-4 right-4 w-12 h-12 bg-amber-200 hover:bg-amber-300 rounded-full shadow-lg flex items-center justify-center text-amber-900 transition-colors z-20">
              <ZoomIn className="h-5 w-5" />
            </button>
          </motion.div>

          <button className="mt-8 text-blue-600 dark:text-blue-400 font-bold hover:underline transition-all z-20">
            Change template
          </button>
        </div>
      </div>
    </div>
  );
}
