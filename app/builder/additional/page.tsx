"use client";

import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

import { useResume } from "@/lib/context/ResumeContext";
import { ResumePreview } from "@/components/ResumePreview";

function AdditionalForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = searchParams?.get("type") || "Custom Section";
  
  const { resumeData, updateSection } = useResume();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialType,
    items: ""
  });

  const handleDelete = async (index: number) => {
    const updated = resumeData.additional.filter((_: any, i: number) => i !== index);
    updateSection("additional", updated);
    
    try {
      await fetch("/api/resume/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "additional", data: updated })
      });
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleAddAnother = async () => {
    if (!formData.title || !formData.items) {
      alert("Please fill in both title and details.");
      return;
    }

    const newSection = { ...formData };
    
    updateSection("additional", (prev: any[]) => {
      const updated = [...(Array.isArray(prev) ? prev : []), newSection];
      fetch("/api/resume/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "additional", data: updated })
      }).catch(err => console.error("Save error:", err));
      return updated;
    });

    setFormData({ title: "", items: "" });
  };

  const handleSaveAndContinue = async () => {
    const isFormEmpty = !formData.title && !formData.items;
    
    if (!isFormEmpty) {
      updateSection("additional", (prev: any[]) => {
        const updated = [...(Array.isArray(prev) ? prev : []), { ...formData }];
        fetch("/api/resume/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ section: "additional", data: updated })
        });
        return updated;
      });
    }

    router.push("/builder/finalize");
  };

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-zinc-950">
      <div className="flex-1 flex overflow-hidden">
        <div className="w-full lg:w-1/2 xl:w-7/12 flex flex-col h-full overflow-y-auto px-4 sm:px-8 md:px-12 pt-6 sm:pt-12 pb-32">
          <div className="max-w-3xl w-full mx-auto space-y-8">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-slate-900 dark:text-white">
                Add {initialType}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
                List any extra details you want employers to know.
              </p>
            </div>

            {resumeData.additional && resumeData.additional.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Added Sections</h3>
                <div className="space-y-3">
                  {resumeData.additional.map((sec: any, index: number) => (
                    <div key={index} className="flex items-start justify-between p-4 bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-xl">
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">{sec.title}</div>
                        <div className="text-sm text-slate-500 whitespace-pre-wrap mt-1">{sec.items}</div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDelete(index)}
                        className="text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-slate-50 dark:bg-zinc-900 p-4 sm:p-6 md:p-8 rounded-xl border border-slate-100 dark:border-zinc-800 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-slate-600 dark:text-slate-400 font-medium">Section Title</Label>
                <Input 
                  id="title" 
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Languages, Awards" 
                  className="bg-white dark:bg-black h-12" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="items" className="text-slate-600 dark:text-slate-400 font-medium">Details</Label>
                <textarea 
                  id="items"
                  value={formData.items}
                  onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                  className="w-full min-h-[150px] p-4 rounded-md border border-slate-200 dark:border-zinc-800 bg-white dark:bg-black text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter details here, e.g. English (Fluent), Spanish (Basic)"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex w-1/2 xl:w-5/12 bg-slate-100 dark:bg-zinc-900/50 border-l border-slate-200 dark:border-zinc-800 flex-col relative overflow-hidden">
          <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center justify-start scrollbar-hide">
             <ResumePreview />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 left-0 lg:left-[18rem] bg-white dark:bg-black border-t border-slate-200 dark:border-zinc-800 p-3 sm:p-4 md:px-8 flex items-center justify-between z-20">
        <Link href="/builder/additional-intro">
          <Button variant="ghost" className="text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 px-6 h-12">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline"
            onClick={handleAddAnother}
            className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-semibold px-6 h-12 rounded-full hidden md:flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Another
          </Button>
          <Button 
            onClick={handleSaveAndContinue}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 h-12 rounded-full text-lg shadow-md transition-all hover:shadow-lg"
          >
            Save & Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function AdditionalDetailsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdditionalForm />
    </Suspense>
  );
}
