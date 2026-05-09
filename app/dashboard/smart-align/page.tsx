"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Sparkles, Loader2, FileText, Briefcase, Plus } from "lucide-react";
import Link from "next/link";
import { useResume } from "@/lib/context/ResumeContext";

export default function SmartAlignPage() {
  const router = useRouter();
  const { refreshData } = useResume();
  const [cvText, setCvText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [optimizedData, setOptimizedData] = useState<any>(null);
  const [showReview, setShowReview] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }

    setFile(selectedFile);
    setIsExtracting(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("/api/ai/extract-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to extract text from PDF");
      }

      const data = await response.json();
      setCvText(data.text);
    } catch (err: any) {
      console.error(err);
      setError("Could not read the PDF. Please try pasting the text manually.");
    } finally {
      setIsExtracting(false);
    }
  };

  const handleGenerate = async () => {
    if (!cvText || !jobDescription) {
      setError("Please provide both your CV (upload or paste) and the job description.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 1. Generate optimized resume data via AI
      const aiResponse = await fetch("/api/ai/smart-align", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvText, jobDescription }),
      });

      if (!aiResponse.ok) {
        const errData = await aiResponse.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to generate optimized resume");
      }

      const data = await aiResponse.json();
      setOptimizedData(data);
      setShowReview(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmSave = async () => {
    if (!optimizedData) return;
    
    setLoading(true);
    try {
      // 2. Save the optimized data to the database
      const saveResponse = await fetch("/api/resume/save-all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData: optimizedData }),
      });

      if (!saveResponse.ok) {
        throw new Error("Failed to save the new resume");
      }

      // 3. Refresh context and redirect to finalize page
      await refreshData();
      router.push("/dashboard/finalize");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to save the resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (showReview && optimizedData) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 md:p-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <header className="flex items-center justify-between">
            <Button variant="ghost" className="gap-2" onClick={() => setShowReview(false)}>
              <ArrowLeft className="w-4 h-4" />
              Back to Editor
            </Button>
            <div className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-bold shadow-lg">
              <Sparkles className="w-4 h-4" />
              AI Review Ready
            </div>
          </header>

          <div className="space-y-4">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              Optimization Review
            </h1>
            <p className="text-lg text-slate-600">
              Here is how our AI tailored your CV for the position. Review the changes below before finalizing.
            </p>
          </div>

          <Card className="border-indigo-100 shadow-xl overflow-hidden">
            <div className="bg-indigo-600 p-6 text-white">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                AI Strategy
              </h3>
            </div>
            <CardContent className="p-8 space-y-6">
              <div className="prose prose-slate max-w-none">
                <p className="whitespace-pre-wrap text-slate-700 leading-relaxed text-lg">
                  {optimizedData.optimizationReview || "The AI has restructured your CV to emphasize the skills and experiences most relevant to this specific job role, ensuring maximum keyword matching for ATS systems."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <div className="font-bold text-green-700 text-sm mb-1 uppercase tracking-wider">Extraction</div>
                  <div className="text-green-800 font-semibold">100% Complete</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="font-bold text-blue-700 text-sm mb-1 uppercase tracking-wider">Alignment</div>
                  <div className="text-blue-800 font-semibold">Job-Tailored</div>
                </div>
                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                  <div className="font-bold text-indigo-700 text-sm mb-1 uppercase tracking-wider">ATS Score</div>
                  <div className="text-indigo-800 font-semibold">Optimized</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col items-center gap-4 pt-4">
            <Button 
              size="lg" 
              className="w-full md:w-auto px-12 py-8 rounded-full text-xl font-bold bg-indigo-600 hover:bg-indigo-700 shadow-xl hover:shadow-indigo-500/40 transition-all gap-3"
              onClick={handleConfirmSave}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6" />
                  Confirm & Apply Changes
                </>
              )}
            </Button>
            <p className="text-slate-400 text-sm">
              Clicking confirm will update your active resume with this optimized version.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-bold shadow-lg">
            <Sparkles className="w-4 h-4" />
            AI Powered
          </div>
        </header>

        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Smart Scan & Align
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Tailor your CV for your dream job in seconds. Upload your existing PDF CV or paste the text, and let our AI do the rest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-slate-200 shadow-sm flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  Your Current CV
                </div>
                <label className="cursor-pointer">
                  <input 
                    type="file" 
                    className="hidden" 
                    accept=".pdf" 
                    onChange={handleFileChange} 
                    disabled={isExtracting}
                  />
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-xs font-semibold transition-colors">
                    {isExtracting ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Plus className="w-3 h-3" />
                    )}
                    Upload PDF
                  </div>
                </label>
              </CardTitle>
              <CardDescription>
                {file ? (
                  <span className="text-indigo-600 font-medium">Selected: {file.name}</span>
                ) : (
                  "Upload a PDF or paste the text content."
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <Textarea 
                placeholder="Pasted text will appear here after upload, or you can paste it manually..." 
                className="flex-1 min-h-[300px] resize-none focus-visible:ring-indigo-500"
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
              />
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-600" />
                Job Description
              </CardTitle>
              <CardDescription>
                Paste the requirements and description of the job you're targeting.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <Textarea 
                placeholder="Paste the target job description here..." 
                className="flex-1 min-h-[300px] resize-none focus-visible:ring-indigo-500"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </CardContent>
          </Card>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-col items-center gap-4">
          <Button 
            size="lg" 
            className="w-full md:w-auto px-12 py-8 rounded-full text-xl font-bold bg-indigo-600 hover:bg-indigo-700 shadow-xl hover:shadow-indigo-500/40 transition-all gap-3"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Tailoring your CV...
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6" />
                Generate My Tailored CV
              </>
            )}
          </Button>
          <p className="text-slate-400 text-sm">
            Warning: This will replace your current active resume.
          </p>
        </div>
      </div>
    </div>
  );
}
