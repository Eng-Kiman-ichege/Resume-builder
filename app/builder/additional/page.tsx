"use client";

import { ArrowLeft, ZoomIn, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useResume } from "@/lib/context/ResumeContext";
import { ResumePreview } from "@/components/ResumePreview";
import { useRouter } from "next/navigation";

export default function AdditionalDetailsPage() {
  const router = useRouter();
  const { resumeData } = useResume();

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
          <ResumePreview />
          
          <button className="mt-8 text-blue-600 dark:text-blue-400 font-bold hover:underline transition-all">
            Change template
          </button>
        </div>
      </div>

      {/* Bottom Sticky Footer */}
      <div className="fixed bottom-0 right-0 left-0 lg:left-[18rem] bg-white dark:bg-black border-t border-slate-200 dark:border-zinc-800 p-4 md:px-8 flex items-center justify-between z-20">
        <Link href="/builder/summary">
          <Button variant="ghost" className="text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 px-6 h-12">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <Link href="/builder/review">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 h-12 rounded-full text-lg shadow-md transition-all hover:shadow-lg">
            Finalize Resume
          </Button>
        </Link>
      </div>
    </div>
  );
}
