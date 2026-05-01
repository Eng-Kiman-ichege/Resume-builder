"use client";

import { ArrowLeft, ZoomIn, Globe, Trophy, Award, TrendingUp, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

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
        <div className="w-full lg:w-1/2 xl:w-7/12 flex flex-col h-full justify-center px-8 md:px-16 lg:px-24 py-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="text-lg text-slate-700 dark:text-slate-300 font-medium mb-4 flex items-center gap-2">
              You got this! Last up <span className="text-slate-400">→</span> Additional Details
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-slate-900 dark:text-white leading-[1.1]">
              Select (optional) <br/> details to add
            </h1>

            <p className="text-slate-700 dark:text-slate-300 text-lg mb-8">
              Pick anything you'd like to highlight that's not already on your resume.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
              {options.map((opt, index) => {
                const Icon = opt.icon;
                return (
                  <button 
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl border border-slate-300 dark:border-zinc-700 bg-transparent hover:bg-slate-50 dark:hover:bg-zinc-800/50 hover:border-slate-400 dark:hover:border-zinc-500 transition-all text-left"
                  >
                    <Icon className="h-6 w-6 text-slate-800 dark:text-slate-200" strokeWidth={1.5} />
                    <span className="font-bold text-slate-900 dark:text-white">{opt.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-6 relative">
              <Link href="/builder/summary">
                <Button variant="ghost" className="text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 px-6 h-14 text-lg">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back
                </Button>
              </Link>
              
              <Link href="/builder/additional">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-12 h-14 rounded-full text-lg shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5">
                  Continue
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
                  <div className="grid grid-cols-1 text-slate-400 gap-1 opacity-50 font-medium">
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

                <div>
                  <h3 className="font-bold border-b border-slate-200 mb-2 pb-1 text-xs">Education and Training</h3>
                  <div className="mb-4 text-slate-400 opacity-50">
                    <div className="font-semibold text-slate-600">Kamukunji Secondary School | Nairobi, Kenya</div>
                    <div>KCSE mean grade C</div>
                    <div>06/2013</div>
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
