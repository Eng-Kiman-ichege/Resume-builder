"use client";

import { ArrowLeft, ZoomIn, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdditionalDetailsPage() {
  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-zinc-950">
      {/* Top Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Form Area */}
        <div className="w-full lg:w-1/2 xl:w-7/12 flex flex-col h-full overflow-y-auto px-8 md:px-12 pt-12 pb-32">
          <div className="max-w-4xl w-full mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-lg leading-tight">
                Add details that show you're a well-rounded candidate
              </h1>
              <Button className="bg-amber-300 hover:bg-amber-400 text-amber-950 font-bold px-6 h-12 rounded-full shadow-sm transition-all shrink-0">
                <Plus className="mr-2 h-4 w-4" strokeWidth={3} />
                Add section
              </Button>
            </div>

            <div className="bg-slate-50 dark:bg-zinc-900 p-8 rounded-xl border border-slate-100 dark:border-zinc-800 flex items-center justify-center min-h-[200px]">
              <button className="w-full h-full min-h-[120px] rounded-lg border-2 border-dashed border-slate-300 dark:border-zinc-700 hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-black flex items-center justify-center group transition-colors">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-500 font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-400">
                  <Plus className="h-5 w-5" strokeWidth={2.5} />
                  <span>Add section</span>
                </div>
              </button>
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
                
                <div>
                  <h3 className="font-bold border-b border-slate-200 mb-1 pb-1 text-xs">Summary</h3>
                  <p className="text-slate-400">Customer-focused Retail Sales professional with solid understanding of retail dynamics, marketing and customer service. Offering five years of experience providing quality product recommendations and solutions to meet customer needs and exceed expectations. Demonstrated record of exceeding revenue targets by leveraging communication skills and sales expertise.</p>
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

                {/* Empty section space at the bottom for new additions */}
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
        <Link href="/builder/additional-intro">
          <Button variant="ghost" className="text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 px-6 h-12">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <Link href="/builder/finalize">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 h-12 rounded-full text-lg shadow-md transition-all hover:shadow-lg">
            Continue
          </Button>
        </Link>
      </div>
    </div>
  );
}
