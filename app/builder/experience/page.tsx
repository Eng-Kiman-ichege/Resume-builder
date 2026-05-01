"use client";

import { useState } from "react";
import { ArrowLeft, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export default function ExperiencePage() {
  const [currentlyWorkHere, setCurrentlyWorkHere] = useState(false);

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-zinc-950">
      {/* Top Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Form */}
        <div className="w-full lg:w-1/2 xl:w-7/12 flex flex-col h-full overflow-y-auto px-8 md:px-12 pt-12 pb-32">
          <div className="max-w-3xl w-full mx-auto space-y-8">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight mb-3 text-slate-900 dark:text-white">
                Let&apos;s work on your experience
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Start with your most recent job first and work backwards.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-zinc-900 p-8 rounded-xl border border-slate-100 dark:border-zinc-800 space-y-8">
              {/* Row 1: Job Title & Employer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle" className="text-slate-600 dark:text-slate-400 font-medium">Job Title</Label>
                  <Input 
                    id="jobTitle" 
                    className="bg-white dark:bg-black h-12 focus-visible:ring-blue-500 border-blue-500 ring-1 ring-blue-500" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employer" className="text-slate-600 dark:text-slate-400 font-medium">Employer</Label>
                  <Input 
                    id="employer" 
                    placeholder="e.g. R4Kenya" 
                    className="bg-white dark:bg-black h-12" 
                  />
                </div>
              </div>

              {/* Row 2: City & Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-slate-600 dark:text-slate-400 font-medium">City</Label>
                  <Input id="city" placeholder="e.g. Nairobi" className="bg-white dark:bg-black h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-slate-600 dark:text-slate-400 font-medium">Country</Label>
                  <Input id="country" placeholder="e.g. Kenya" className="bg-white dark:bg-black h-12" />
                </div>
              </div>

              {/* Row 3: Start Date & End Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-slate-600 dark:text-slate-400 font-medium">Start Date</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <select defaultValue="" className="w-full h-12 rounded-md border border-input bg-white dark:bg-black px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                      <option value="" disabled>Month</option>
                      <option value="1">January</option>
                      <option value="2">February</option>
                      <option value="3">March</option>
                      <option value="4">April</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                      <option value="7">July</option>
                      <option value="8">August</option>
                      <option value="9">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                    <select defaultValue="" className="w-full h-12 rounded-md border border-input bg-white dark:bg-black px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                      <option value="" disabled>Year</option>
                      {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-600 dark:text-slate-400 font-medium">End Date</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <select 
                      defaultValue=""
                      disabled={currentlyWorkHere}
                      className="w-full h-12 rounded-md border border-input bg-white dark:bg-black px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="" disabled>Month</option>
                      <option value="1">January</option>
                      <option value="2">February</option>
                      <option value="3">March</option>
                      <option value="4">April</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                      <option value="7">July</option>
                      <option value="8">August</option>
                      <option value="9">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                    <select 
                      defaultValue=""
                      disabled={currentlyWorkHere}
                      className="w-full h-12 rounded-md border border-input bg-white dark:bg-black px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="" disabled>Year</option>
                      {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox 
                      id="current-work" 
                      checked={currentlyWorkHere}
                      onCheckedChange={(checked) => setCurrentlyWorkHere(checked as boolean)}
                    />
                    <Label htmlFor="current-work" className="text-sm font-medium cursor-pointer">
                      I currently work here
                    </Label>
                  </div>
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

                {/* Highlighted Experience Section */}
                <div className="relative mt-2">
                  {/* Highlight Box */}
                  <div className="absolute -inset-2 border-2 border-amber-400 bg-amber-50/20 rounded-sm pointer-events-none"></div>
                  
                  <div className="relative z-10">
                    <h3 className="font-bold border-b border-slate-200 mb-2 pb-1 text-xs">Experience</h3>
                    
                    <div className="mb-4 text-slate-500 grid grid-cols-[1fr_2fr] gap-4">
                      <div>
                        <div className="font-semibold text-slate-700">Retail Sales Associate</div>
                        <div className="italic text-slate-400">Kilimani, Nairobi, Kenya</div>
                        <div className="text-slate-400">02/2017 - Current</div>
                      </div>
                      <div className="space-y-1">
                        <div>• Increased monthly sales by 10% by effectively upselling and cross-selling products to maximize profitability.</div>
                        <div>• Prevented store losses by leveraging awareness, attention to detail and integrity to identify and investigate concerns.</div>
                        <div>• Processed payments and maintained accurate drawers to meet financial targets.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Zoom Button */}
            <button className="absolute bottom-4 right-4 w-12 h-12 bg-amber-200 hover:bg-amber-300 rounded-full shadow-lg flex items-center justify-center text-amber-900 transition-colors z-20">
              <ZoomIn className="h-5 w-5" />
            </button>
          </div>

          <button className="mt-8 text-blue-600 dark:text-blue-400 font-bold hover:underline transition-all">
            Change template
          </button>
        </div>
      </div>

      {/* Bottom Sticky Footer */}
      <div className="fixed bottom-0 right-0 left-0 lg:left-[18rem] bg-white dark:bg-black border-t border-slate-200 dark:border-zinc-800 p-4 md:px-8 flex items-center justify-between z-20">
        <Link href="/builder/experience-intro">
          <Button variant="ghost" className="text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 px-6 h-12">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <Link href="/builder/education-intro">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 h-12 rounded-full text-lg shadow-md transition-all hover:shadow-lg">
            Continue
          </Button>
        </Link>
      </div>
    </div>
  );
}
