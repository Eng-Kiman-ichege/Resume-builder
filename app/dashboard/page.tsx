"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Mail, PenTool, ClipboardList } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  const handleCreateResume = () => {
    router.push("/builder");
  };

  const handleCreateCoverLetter = () => {
    // For now, let's just point to a placeholder or stay on the page
    // if there's no cover letter builder yet.
    // router.push("/cover-letter-builder");
    console.log("Create cover letter clicked");
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Resume Card */}
        <Card className="border-slate-200 bg-slate-50/50 hover:bg-slate-100/50 transition-all duration-300">
          <CardContent className="flex flex-col items-center justify-center p-8 sm:p-12 py-12 sm:py-16 space-y-6 sm:space-y-8">
            <div className="relative">
              <div className="absolute -inset-4 bg-orange-100/50 rounded-full blur-xl -z-10 animate-pulse"></div>
              <div className="w-20 h-28 sm:w-24 sm:h-32 bg-white border-2 border-slate-900 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] flex flex-col p-3 overflow-hidden">
                <div className="w-full h-2 bg-orange-200 rounded mb-2"></div>
                <div className="w-3/4 h-1.5 bg-slate-100 rounded mb-1"></div>
                <div className="w-full h-1.5 bg-slate-100 rounded mb-1"></div>
                <div className="w-5/6 h-1.5 bg-slate-100 rounded mb-3"></div>
                
                <div className="w-full h-1 bg-slate-100 rounded mb-1"></div>
                <div className="w-full h-1 bg-slate-100 rounded mb-1"></div>
                <div className="w-1/2 h-1 bg-slate-100 rounded"></div>
                
                <div className="absolute -bottom-2 -right-4 w-12 h-12 rotate-12">
                  <PenTool className="w-10 h-10 text-slate-800" />
                </div>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Resume</h2>

            <Button 
              onClick={handleCreateResume}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 px-8 sm:py-6 sm:px-12 rounded-full text-base sm:text-lg shadow-lg hover:shadow-blue-500/30 transition-all"
            >
              Create now
            </Button>
          </CardContent>
        </Card>

        {/* Cover Letter Card */}
        <Card className="border-slate-200 bg-slate-50/50 hover:bg-slate-100/50 transition-all duration-300">
          <CardContent className="flex flex-col items-center justify-center p-8 sm:p-12 py-12 sm:py-16 space-y-6 sm:space-y-8">
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-100/50 rounded-full blur-xl -z-10 animate-pulse"></div>
              <div className="w-20 h-28 sm:w-24 sm:h-32 bg-white border-2 border-slate-900 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] flex flex-col p-3 overflow-hidden">
                <div className="w-1/2 h-6 border-b border-slate-900 mb-4"></div>
                <div className="w-full h-1.5 bg-slate-100 rounded mb-1"></div>
                <div className="w-full h-1.5 bg-slate-100 rounded mb-1"></div>
                <div className="w-full h-1.5 bg-slate-100 rounded mb-1"></div>
                <div className="w-3/4 h-1.5 bg-slate-100 rounded mb-4"></div>
                
                <div className="w-full h-1 bg-slate-100 rounded mb-1"></div>
                <div className="w-full h-1 bg-slate-100 rounded mb-1"></div>
                
                <div className="absolute -bottom-2 -right-4 w-12 h-12 rotate-12">
                  <PenTool className="w-10 h-10 text-slate-800" />
                </div>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Cover letter</h2>

            <Button 
              onClick={handleCreateCoverLetter}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 px-8 sm:py-6 sm:px-12 rounded-full text-base sm:text-lg shadow-lg hover:shadow-blue-500/30 transition-all"
            >
              Create now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
