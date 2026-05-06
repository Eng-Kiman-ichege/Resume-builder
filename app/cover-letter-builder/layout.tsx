"use client";

import { CoverLetterProvider } from "@/lib/context/CoverLetterContext";
import { ResumeProvider } from "@/lib/context/ResumeContext";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight, Home, Layout, FileText, User, Mail, PenTool, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function CoverLetterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const steps = [
    { name: "Sender", href: "/cover-letter-builder", icon: User },
    { name: "Recipient", href: "/cover-letter-builder/recipient", icon: Mail },
    { name: "Content", href: "/cover-letter-builder/content", icon: PenTool },
    { name: "Review", href: "/cover-letter-builder/review", icon: CheckCircle2 },
  ];

  return (
    <ResumeProvider>
      <CoverLetterProvider>
        <div className="flex flex-col h-screen bg-white overflow-hidden">
          {/* Navigation Bar */}
          <header className="h-16 border-b border-slate-200 flex items-center justify-between px-6 bg-white z-20">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors">
                <Home className="h-5 w-5" />
              </Link>
              <div className="h-6 w-px bg-slate-200"></div>
              <span className="font-bold text-slate-900 tracking-tight">Cover Letter Builder</span>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {steps.map((step, idx) => {
                const isActive = step.href === pathname;
                const isPast = steps.findIndex(s => s.href === pathname) > idx;
                
                return (
                  <div key={step.name} className="flex items-center">
                    <Link
                      href={step.href}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                        isActive 
                          ? "bg-blue-600 text-white shadow-md shadow-blue-200" 
                          : isPast 
                            ? "text-blue-600 hover:bg-blue-50" 
                            : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      <step.icon className={`h-3.5 w-3.5 ${isActive ? "text-white" : ""}`} />
                      {step.name}
                    </Link>
                    {idx < steps.length - 1 && (
                      <ChevronRight className="h-4 w-4 text-slate-300 mx-1" />
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
               <div className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                 Auto-Saving
               </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-hidden">
            {children}
          </main>
        </div>
      </CoverLetterProvider>
    </ResumeProvider>
  );
}
