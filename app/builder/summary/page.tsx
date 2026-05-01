"use client";

import { ArrowLeft, ZoomIn, Plus, Bold, Italic, Underline, List, Undo, Redo, Wand2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SummaryPage() {
  const prewrittenOptions = [
    "Highly-motivated employee with desire to take on new challenges. Strong work ethic, adaptability, and exceptional interpersonal skills. Adept at working effectively unsupervised and quickly mastering new skills.",
    "Hardworking employee with customer service, multitasking, and time management abilities. Devoted to giving every customer a positive and memorable experience.",
    "Outgoing student pursuing flexible part-time employment. Eager to learn new skills and contribute to team success."
  ];

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-zinc-950">
      {/* Top Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Form Area */}
        <div className="w-full lg:w-1/2 xl:w-7/12 flex flex-col h-full overflow-y-auto px-8 md:px-12 pt-12 pb-32">
          <div className="max-w-4xl w-full mx-auto space-y-8">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight mb-3 text-slate-900 dark:text-white">
                Briefly tell us about your background
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                Start with a prewritten option or write your own. Edit as needed, then use <span className="font-bold text-slate-800 dark:text-slate-200">Enhance with AI</span> to polish it.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-zinc-900 p-6 rounded-xl border border-slate-100 dark:border-zinc-800">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
                
                {/* Left Panel: Prewritten Options */}
                <div className="bg-white dark:bg-black rounded-xl border border-slate-200 dark:border-zinc-800 overflow-hidden flex flex-col relative shadow-sm">
                  <div className="p-4 border-b border-slate-100 dark:border-zinc-800 bg-white dark:bg-black z-10">
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">Prewritten options</h3>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 relative pb-20 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-zinc-800">
                    {prewrittenOptions.map((text, i) => (
                      <div 
                        key={i}
                        className="p-5 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-slate-300 dark:hover:border-zinc-600 shadow-sm transition-all flex flex-col gap-4 group"
                      >
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          {text}
                        </p>
                        <div className="flex justify-end">
                          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100/50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-semibold text-xs hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors">
                            <Plus className="h-3 w-3" strokeWidth={3} />
                            Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Gradient Fade */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-black dark:via-black/80 pointer-events-none"></div>
                </div>

                {/* Right Panel: Text Editor */}
                <div className="bg-white dark:bg-black rounded-xl border border-slate-200 dark:border-zinc-800 overflow-hidden flex flex-col shadow-sm">
                  {/* Editor Toolbar */}
                  <div className="flex items-center justify-between p-3 border-b border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-800">
                        <Bold className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-800">
                        <Italic className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-800">
                        <Underline className="h-4 w-4" />
                      </Button>
                      <div className="w-px h-4 bg-slate-300 dark:bg-zinc-700 mx-1"></div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-800">
                        <List className="h-4 w-4" />
                      </Button>
                      <div className="w-px h-4 bg-slate-300 dark:bg-zinc-700 mx-1"></div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-800">
                        <Undo className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-800">
                        <Redo className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs font-semibold bg-slate-100 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-700">
                      <Wand2 className="h-3.5 w-3.5" />
                      Enhance with AI
                    </Button>
                  </div>
                  
                  {/* Editor Content Area */}
                  <textarea 
                    className="flex-1 w-full p-6 resize-none focus:outline-none text-slate-600 dark:text-slate-300 placeholder:text-slate-400 bg-transparent text-base"
                    placeholder="Enter text here"
                  ></textarea>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Live Preview Highlighted */}
        <div className="hidden lg:flex w-1/2 xl:w-5/12 bg-slate-100 dark:bg-zinc-900/50 border-l border-slate-200 dark:border-zinc-800 flex-col items-center justify-center p-8 relative">
          
          <div className="w-full max-w-md aspect-[1/1.414] bg-white shadow-xl rounded-sm border border-slate-200 relative overflow-hidden transition-all hover:scale-[1.02] duration-300">
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
                
                {/* Highlighted Summary Section */}
                <div className="relative mt-2">
                  {/* Highlight Box */}
                  <div className="absolute -inset-2 border-2 border-amber-400 bg-amber-50/20 rounded-sm pointer-events-none z-10"></div>
                  
                  <div className="relative z-10">
                    <h3 className="font-bold border-b border-slate-200 mb-1 pb-1 text-xs">Summary</h3>
                    <p className="text-slate-400">Customer-focused Retail Sales professional with solid understanding of retail dynamics, marketing and customer service. Offering five years of experience providing quality product recommendations and solutions to meet customer needs and exceed expectations. Demonstrated record of exceeding revenue targets by leveraging communication skills and sales expertise.</p>
                  </div>
                </div>
                
                <div className="mt-2">
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
          </div>

          <button className="mt-8 text-blue-600 dark:text-blue-400 font-bold hover:underline transition-all z-20">
            Change template
          </button>
        </div>
      </div>

      {/* Bottom Sticky Footer */}
      <div className="fixed bottom-0 right-0 left-0 lg:left-[18rem] bg-white dark:bg-black border-t border-slate-200 dark:border-zinc-800 p-4 md:px-8 flex items-center justify-between z-20">
        <Link href="/builder/summary-intro">
          <Button variant="ghost" className="text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 px-6 h-12">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden sm:flex items-center gap-2 font-semibold border-slate-300 dark:border-zinc-700 h-12 px-6 rounded-full">
            <Sparkles className="h-4 w-4" />
            Tips & fixes
          </Button>
          <Link href="#">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 h-12 rounded-full text-lg shadow-md transition-all hover:shadow-lg">
              Continue
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
