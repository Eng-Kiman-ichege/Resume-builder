"use client";

import { useState } from "react";
import { X, Check, ArrowRight, Rocket, Star, ShieldCheck, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function FinalizePage() {
  const [showModal, setShowModal] = useState(true);

  return (
    <div className="flex flex-col h-full w-full bg-slate-100 dark:bg-zinc-950 relative overflow-hidden">
      
      {/* Background Content (Behind the Modal) */}
      <div className="flex-1 flex overflow-hidden w-full">
        
        {/* Left Side: Document Full View */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
          
          {/* Zoom Controls (Mockup) */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center bg-white dark:bg-zinc-800 rounded-full shadow-md py-4 border border-slate-200 dark:border-zinc-700">
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-700 rounded-full transition-colors">
              <span className="text-xl font-medium leading-none">+</span>
            </button>
            <div className="w-1 h-24 my-2 bg-slate-200 dark:bg-zinc-700 rounded-full relative mx-2">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-slate-700 dark:bg-slate-300 rounded-full"></div>
            </div>
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-700 rounded-full transition-colors">
              <span className="text-xl font-medium leading-none">-</span>
            </button>
          </div>

          <div className="w-full max-w-xl aspect-[1/1.414] bg-white shadow-2xl rounded-sm border border-slate-200 relative overflow-hidden transition-all duration-300">
            {/* Mock Resume Content */}
            <div className="p-10 h-full flex flex-col text-slate-800">
              <div className="text-center mb-8 pb-6">
                <div className="w-16 h-16 mx-auto border border-slate-300 rounded-full flex items-center justify-center text-2xl font-serif mb-4">
                  FK
                </div>
                <h2 className="text-3xl font-serif tracking-widest uppercase font-bold">Fifa Kim</h2>
                <div className="mt-3 text-xs text-slate-500 uppercase tracking-widest">
                  kim99012@gmail.com | 0799849023 | NAIROBI Kenya
                </div>
              </div>
              
              <div className="flex-1 text-[10px] leading-relaxed flex flex-col gap-6">
                <div>
                  <h3 className="font-bold border-b border-slate-200 mb-2 pb-1 text-sm uppercase">Summary</h3>
                  <p className="text-slate-500">Customer-focused Retail Sales professional with solid understanding of retail dynamics, marketing and customer service. Offering five years of experience providing quality product recommendations and solutions to meet customer needs and exceed expectations. Demonstrated record of exceeding revenue targets by leveraging communication skills and sales expertise.</p>
                </div>
                
                <div>
                  <h3 className="font-bold border-b border-slate-200 mb-2 pb-1 text-sm uppercase">Skills</h3>
                  <div className="grid grid-cols-2 text-slate-500 gap-2">
                    <div>• Interpersonal communication</div>
                    <div>• Maintenance & repair</div>
                    <div>• Analytical thinking</div>
                    <div>• Team Collaboration</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold border-b border-slate-200 mb-3 pb-1 text-sm uppercase">Experience</h3>
                  <div className="mb-4 text-slate-500 grid grid-cols-[1fr_2fr] gap-6">
                    <div>
                      <div className="font-bold text-slate-700">Retail Sales Associate</div>
                      <div className="italic text-slate-400">Kilimani, Nairobi, Kenya</div>
                      <div className="text-slate-400 mt-1">02/2017 - Current</div>
                    </div>
                    <div className="space-y-2">
                      <div>• Increased monthly sales by 10% by effectively upselling and cross-selling products to maximize profitability.</div>
                      <div>• Prevented store losses by leveraging awareness, attention to detail and integrity to identify and investigate concerns.</div>
                      <div>• Processed payments and maintained accurate drawers to meet financial targets.</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold border-b border-slate-200 mb-3 pb-1 text-sm uppercase">Education and Training</h3>
                  <div className="mb-4 text-slate-500">
                    <div className="font-bold text-slate-700">Kamukunji Secondary School | Nairobi, Kenya</div>
                    <div>KCSE mean grade C</div>
                    <div className="text-slate-400 mt-1">06/2013</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Status Panel */}
        <div className="hidden lg:flex w-80 bg-slate-200/50 dark:bg-zinc-900 border-l border-slate-200 dark:border-zinc-800 flex-col py-8 px-6 relative z-10">
          
          {/* Top Progress Pills */}
          <div className="flex flex-wrap gap-2 mb-16 justify-center">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-200/50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-300 rounded-full text-xs font-semibold">
              Header <Check className="h-3 w-3" />
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-slate-300 rounded-full text-xs font-semibold">
              Experience <Check className="h-3 w-3" />
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-slate-300 rounded-full text-xs font-semibold">
              Education <Check className="h-3 w-3" />
            </div>
            <button className="flex items-center justify-center w-7 h-7 rounded-full border border-slate-400 dark:border-zinc-600 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors">
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center -mt-20">
            {/* Illustration Mockup */}
            <div className="w-40 h-40 mb-6 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Flag className="h-24 w-24 text-blue-500" strokeWidth={1} />
                <div className="absolute top-4 right-4 animate-bounce delay-100">
                  <Star className="h-6 w-6 text-amber-400 fill-amber-400" />
                </div>
                <div className="absolute bottom-8 left-4 animate-bounce delay-300">
                  <Star className="h-4 w-4 text-blue-400 fill-blue-400" />
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">You did it!</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-8">Your resume is ready.</p>
            
            <Link href="/editor">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 h-12 rounded-full shadow-md hover:shadow-lg transition-all">
                Continue to Editor
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Modal Overlay covering everything including layout sidebar! */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-zinc-950 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full transition-colors z-10"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="p-12 flex flex-col items-center text-center">
                
                {/* Illustration Area */}
                <div className="w-full h-48 mb-8 relative flex items-center justify-center">
                  <div className="w-48 h-32 bg-indigo-50 dark:bg-indigo-950/30 rounded-t-lg border-x-2 border-t-2 border-slate-800 dark:border-slate-300 relative z-10">
                    <div className="w-3/4 h-2 bg-slate-200 dark:bg-slate-700 mx-auto mt-6 rounded-full"></div>
                    <div className="w-1/2 h-2 bg-slate-200 dark:bg-slate-700 mx-auto mt-4 rounded-full"></div>
                    <div className="w-2/3 h-2 bg-slate-200 dark:bg-slate-700 mx-auto mt-4 rounded-full"></div>
                  </div>
                  
                  {/* Rocket */}
                  <div className="absolute right-[20%] top-[40%] z-20 transform rotate-45 animate-pulse">
                    <div className="bg-amber-100 dark:bg-amber-900/50 p-3 rounded-full border-2 border-slate-800 dark:border-slate-300 shadow-lg">
                      <Rocket className="h-8 w-8 text-amber-500 fill-amber-500" />
                    </div>
                  </div>

                  {/* Decorative Stars */}
                  <Star className="absolute top-8 left-[25%] h-6 w-6 text-emerald-400 fill-emerald-400 z-0 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <Star className="absolute bottom-12 right-[15%] h-4 w-4 text-blue-400 fill-blue-400 z-0 animate-bounce" style={{ animationDelay: '0.5s' }} />
                  
                  {/* Decorative swoop */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-64 h-1 bg-slate-800 dark:bg-slate-400 rounded-full"></div>
                </div>

                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
                  Nice! Now, let's level up.
                </h2>
                
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-md">
                  Elevate your resume. Review our final tips & fixes.
                </p>

                <Link href="/editor" className="w-full">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-12 h-14 rounded-full text-lg shadow-lg hover:shadow-xl transition-all w-full max-w-xs mx-auto"
                  >
                    Review
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
