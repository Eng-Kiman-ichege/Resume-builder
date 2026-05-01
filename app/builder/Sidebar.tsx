"use client";

import { usePathname } from "next/navigation";
import { Check, FileText } from "lucide-react";
import Link from "next/link";

const steps = [
  { id: 1, name: "Header", path: "/builder" },
  { id: 2, name: "Experience", path: "/builder/experience-intro" },
  { id: 3, name: "Education", path: "/builder/education" },
  { id: 4, name: "Skills", path: "/builder/skills" },
  { id: 5, name: "Summary", path: "/builder/summary" },
  { id: 6, name: "Additional Details", path: "/builder/additional" },
  { id: 7, name: "Finalize", path: "/builder/finalize" },
];

export function Sidebar() {
  const pathname = usePathname();
  
  let activeStepIndex = 0;
  if (pathname.includes("experience")) activeStepIndex = 1;
  else if (pathname.includes("education")) activeStepIndex = 2;
  else if (pathname.includes("skills")) activeStepIndex = 3;
  else if (pathname.includes("summary")) activeStepIndex = 4;
  else if (pathname.includes("additional")) activeStepIndex = 5;
  else if (pathname.includes("finalize")) activeStepIndex = 6;

  return (
    <aside className="w-64 lg:w-72 bg-[#1a2332] flex flex-col py-8 border-r border-slate-800 z-10 flex-shrink-0 text-white relative overflow-hidden">
      <div className="px-8 flex items-center gap-2 mb-12">
        <div className="bg-white text-[#1a2332] p-1.5 rounded flex items-center justify-center">
          <FileText className="h-5 w-5" />
        </div>
        <span className="font-bold text-xl tracking-tight">CV Craft.</span>
      </div>
      
      <div className="flex flex-col flex-1 px-8 space-y-6">
        {steps.map((step, index) => {
          const isActive = index === activeStepIndex;
          const isCompleted = index < activeStepIndex;
          
          return (
            <div key={step.id} className="relative flex items-center group">
              {/* Vertical line connector */}
              {index !== steps.length - 1 && (
                <div className={`w-px h-10 absolute left-[15px] top-[30px] ${isCompleted ? 'bg-green-400' : 'bg-white/20'}`}></div>
              )}
              
              <div className="flex items-center gap-4 z-10">
                {isCompleted ? (
                  <div className="w-8 h-8 rounded-full bg-green-400 text-[#1a2332] flex items-center justify-center font-bold text-sm shadow-[0_0_10px_rgba(74,222,128,0.5)]">
                    <Check className="h-5 w-5" />
                  </div>
                ) : isActive ? (
                  <div className="w-8 h-8 rounded-full bg-white text-[#1a2332] flex items-center justify-center font-bold text-sm">
                    {step.id}
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full border border-white/30 text-white/50 flex items-center justify-center font-bold text-sm bg-[#1a2332]">
                    {step.id}
                  </div>
                )}
                
                <span className={`text-base tracking-wide ${isActive ? 'font-bold text-white' : isCompleted ? 'text-slate-300' : 'text-slate-400'}`}>
                  {step.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Decorative Wave at the bottom */}
      <div className="absolute bottom-20 right-0 left-8 opacity-20 pointer-events-none">
        <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto stroke-white fill-transparent stroke-2">
          <path d="M 0,100 C 50,80 100,50 150,0" />
          <path d="M 10,110 C 60,90 110,60 160,10" />
          <path d="M 20,120 C 70,100 120,70 170,20" />
          <path d="M 30,130 C 80,110 130,80 180,30" />
          <path d="M 40,140 C 90,120 140,90 190,40" />
        </svg>
      </div>

      {/* Footer links */}
      <div className="px-8 mt-auto text-xs text-slate-400 space-y-2">
        <div className="flex gap-2 font-medium">
          <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          <span>|</span>
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <span>|</span>
          <Link href="#" className="hover:text-white transition-colors">Contact Us</Link>
        </div>
        <p>© {new Date().getFullYear()}, CV Craft Limited. All rights reserved.</p>
      </div>
    </aside>
  );
}
