"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Mail, PenTool, ClipboardList, Sparkles } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  const handleCreateResume = () => {
    router.push("/builder");
  };

  const handleCreateCoverLetter = () => {
    router.push("/cover-letter-builder");
  };

  return (
    <div className="p-6 sm:p-8 md:p-12 max-w-6xl">
      <header className="mb-8 md:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
          Create a new document
        </h1>
        <p className="text-base md:text-lg text-slate-500">
          Which document do you want to create?
        </p>
      </header>

      <div className="flex flex-col gap-6 md:gap-8">
        {/* AI Scan & Align HERO Section - More Compact */}
        <Card className="border-slate-200 bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-700 hover:shadow-2xl transition-all duration-500 overflow-hidden relative group rounded-3xl border-none shadow-xl shadow-indigo-100">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px] animate-pulse" />
          </div>

          <CardContent className="flex flex-col md:flex-row items-center justify-between p-6 sm:p-10 space-y-6 md:space-y-0 md:space-x-10 relative z-10">
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full text-[9px] font-black uppercase tracking-[0.2em]">
                <Sparkles className="w-3 h-3" />
                Featured AI Engine
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none">
                  Smart Scan <span className="text-indigo-200">&</span> Align
                </h2>
                <p className="text-indigo-50/80 text-base sm:text-lg max-w-lg font-medium leading-relaxed">
                  Upload your CV and target job—our AI will perfectly tailor it to beat the ATS and impress recruiters.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2">
                <Button 
                  onClick={() => router.push("/dashboard/smart-align")}
                  className="bg-white text-indigo-600 hover:bg-indigo-50 font-black py-6 px-8 rounded-xl text-base shadow-xl hover:shadow-white/20 transition-all gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Tailor My CV Now
                </Button>
                <div className="flex items-center gap-2 text-white/60 text-[10px] font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  2.4k+ tailored today
                </div>
              </div>
            </div>

            <div className="relative flex-shrink-0 hidden lg:block">
              <div className="flex items-center gap-4">
                <div className="w-24 h-32 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl flex flex-col p-3 rotate-[-12deg] translate-x-8 opacity-40 group-hover:opacity-60 transition-all">
                   <div className="w-full h-1.5 bg-white/20 rounded mb-2"></div>
                   <div className="w-3/4 h-1 bg-white/10 rounded mb-1"></div>
                </div>
                <div className="z-10 w-28 h-36 bg-white rounded-xl shadow-2xl flex flex-col p-3 scale-110 group-hover:scale-125 transition-all duration-500">
                   <div className="w-full h-2.5 bg-indigo-100 rounded mb-2"></div>
                   <div className="w-full h-1.5 bg-slate-100 rounded mb-1.5"></div>
                   <div className="w-4/5 h-1.5 bg-slate-100 rounded"></div>
                   <div className="mt-auto flex justify-end">
                     <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
                   </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Resume Card */}
          <Card className="border-slate-100 bg-white hover:bg-slate-50 transition-all duration-300 rounded-2xl shadow-sm hover:shadow-md group">
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-6">
                <div className="w-12 h-16 bg-orange-50 border-2 border-orange-100 rounded flex flex-col p-2 group-hover:bg-orange-100 transition-colors">
                  <div className="w-full h-1 bg-orange-200 rounded mb-1"></div>
                  <div className="w-3/4 h-1 bg-slate-200 rounded mb-1"></div>
                  <div className="w-full h-1 bg-slate-200 rounded"></div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Build From Scratch</h2>
                  <p className="text-sm text-slate-500">Create a professional CV manually</p>
                </div>
              </div>
  
              <Button 
                onClick={handleCreateResume}
                className="bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold px-6 h-10 rounded-lg transition-all"
              >
                Create CV
              </Button>
            </CardContent>
          </Card>
  
          {/* Cover Letter Card */}
          <Card className="border-slate-100 bg-white hover:bg-slate-50 transition-all duration-300 rounded-2xl shadow-sm hover:shadow-md group">
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-6">
                <div className="w-12 h-16 bg-blue-50 border-2 border-blue-100 rounded flex flex-col p-2 group-hover:bg-blue-100 transition-colors">
                  <div className="w-full h-1 bg-blue-200 rounded mb-1"></div>
                  <div className="w-3/4 h-1 bg-slate-200 rounded mb-1"></div>
                  <div className="w-full h-1 bg-slate-200 rounded"></div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Cover Letter</h2>
                  <p className="text-sm text-slate-500">Write a matching cover letter</p>
                </div>
              </div>
  
              <Button 
                onClick={handleCreateCoverLetter}
                className="bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold px-6 h-10 rounded-lg transition-all"
              >
                Write Letter
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
