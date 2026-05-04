"use client";

import { useState } from "react";
import { ArrowLeft, ZoomIn, ChevronDown, Lightbulb, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { Wand2, Trash2, Plus } from "lucide-react";

import { useResume } from "@/lib/context/ResumeContext";
import { ResumePreview } from "@/components/ResumePreview";
import { TemplateSelector } from "@/components/TemplateSelector";

export default function EducationPage() {
  const router = useRouter();
  const { resumeData, updateSection } = useResume();
  const [stillEnrolled, setStillEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [formData, setFormData] = useState({
    institution: "",
    location: "",
    degree: "",
    field: "",
    gradMonth: "",
    gradYear: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleDelete = async (index: number) => {
    const updatedEducation = resumeData.education.filter((_: any, i: number) => i !== index);
    updateSection("education", updatedEducation);
    
    try {
      await fetch("/api/resume/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "education", data: updatedEducation })
      });
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleAddAnother = async () => {
    if (!formData.institution || !formData.degree || !formData.gradYear) {
      alert("Please fill in the Institution, Degree, and Graduation Year to add an education entry.");
      return;
    }

    const newEducation = { ...formData, isStillEnrolled: stillEnrolled };
    
    // Use functional update to avoid stale state issues during rapid saves
    updateSection("education", (prev: any[]) => {
      const updated = [...(Array.isArray(prev) ? prev : []), newEducation];
      
      // Save to DB in the background
      fetch("/api/resume/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "education", data: updated })
      }).catch(err => console.error("Save error:", err));
      
      return updated;
    });

    // Clear form
    setFormData({
      institution: "",
      location: "",
      degree: "",
      field: "",
      gradMonth: "",
      gradYear: ""
    });
    setStillEnrolled(false);
  };

  const handleSaveAndContinue = async () => {
    const isFormEmpty = !formData.institution && !formData.degree && !formData.gradYear;
    const hasExistingEntries = resumeData.education.length > 0;

    if (isFormEmpty) {
      if (hasExistingEntries) {
        router.push("/builder/skills-intro");
        return;
      } else {
        alert("Please add at least one education entry.");
        return;
      }
    }

    setLoading(true);
    try {
      const newEducation = { ...formData, isStillEnrolled: stillEnrolled };
      const currentEducation = Array.isArray(resumeData.education) ? resumeData.education : [];
      const updatedEducation = [...currentEducation, newEducation];
      
      updateSection("education", updatedEducation);

      const response = await fetch("/api/resume/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "education", data: updatedEducation })
      });
      
      if (response.status === 401) {
        router.push("/sign-in?redirect_url=" + window.location.href);
        return;
      }

      if (response.ok) {
        router.push("/builder/skills-intro");
      }
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setLoading(false);
    }
  };




  const getAiHelp = async () => {
    setAiLoading(true);
    try {
      const response = await fetch("/api/ai/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "education", data: formData })
      });
      const data = await response.json();
      alert(data.suggestions || "AI suggested no changes.");
    } catch (error) {
      console.error("AI error:", error);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-zinc-950">
      {/* Top Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Form */}
        <div className="w-full lg:w-1/2 xl:w-7/12 flex flex-col h-full overflow-y-auto px-4 sm:px-8 md:px-12 pt-6 sm:pt-12 pb-32">
          <div className="max-w-3xl w-full mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-slate-900 dark:text-white">
                  Tell us about your education
                </h1>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
                  Include any education, training, or programs—even if unfinished—to highlight your progress and goals.
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={getAiHelp}
                disabled={aiLoading}
                className="gap-2 border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 shrink-0"
              >
                <Wand2 className="h-4 w-4" />
                {aiLoading ? "Thinking..." : "AI Help"}
              </Button>
            </div>

            {/* List of Added Education */}
            {resumeData.education.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Your Education</h3>
                <div className="space-y-3">
                  {resumeData.education.map((edu: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-xl group shadow-sm hover:shadow-md transition-all">
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">{edu.degree}</div>
                        <div className="text-sm text-slate-500">{edu.institution} | {edu.gradYear}</div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDelete(index)}
                        className="text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 sm:opacity-0 sm:group-hover:opacity-100 transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-slate-50 dark:bg-zinc-900 p-4 sm:p-6 md:p-8 rounded-xl border border-slate-100 dark:border-zinc-800 space-y-8 relative">
              {/* Row 1: Institution & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="institution" className="text-slate-600 dark:text-slate-400 font-medium">Institution name</Label>
                  <Input 
                    id="institution" 
                    value={formData.institution}
                    onChange={handleChange}
                    className="bg-white dark:bg-black h-12 focus-visible:ring-blue-500 border-blue-500 ring-1 ring-blue-500" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-slate-600 dark:text-slate-400 font-medium">School Location</Label>
                  <Input 
                    id="location" 
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Nairobi, Kenya" 
                    className="bg-white dark:bg-black h-12" 
                  />
                </div>
              </div>

              {/* Row 2: Degree */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="degree" className="text-slate-600 dark:text-slate-400 font-medium">Degree</Label>
                  <select 
                    id="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    className="w-full h-12 rounded-md border border-input bg-white dark:bg-black px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="" disabled>Select</option>
                    <option value="high-school">High School Diploma</option>
                    <option value="associate">Associate Degree</option>
                    <option value="bachelor">Bachelor's Degree</option>
                    <option value="master">Master's Degree</option>
                    <option value="phd">Doctorate (Ph.D.)</option>
                    <option value="certificate">Certificate</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Field of Study & Graduation Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="field" className="text-slate-600 dark:text-slate-400 font-medium">Field of Study</Label>
                  <Input 
                    id="field" 
                    value={formData.field}
                    onChange={handleChange}
                    placeholder="e.g. B.A. in Sociology and Anthropo" 
                    className="bg-white dark:bg-black h-12" 
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-600 dark:text-slate-400 font-medium">Graduation Date</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <select 
                      id="gradMonth"
                      value={formData.gradMonth}
                      onChange={handleChange}
                      className="w-full h-12 rounded-md border border-input bg-white dark:bg-black px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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
                      id="gradYear"
                      value={formData.gradYear}
                      onChange={handleChange}
                      className="w-full h-12 rounded-md border border-input bg-white dark:bg-black px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="" disabled>Year</option>
                      {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() + 5 - i).map(year => (
                        <option key={year} value={year.toString()}>{year}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox 
                      id="still-enrolled" 
                      checked={stillEnrolled}
                      onCheckedChange={(checked) => setStillEnrolled(checked as boolean)}
                    />
                    <Label htmlFor="still-enrolled" className="text-sm font-medium cursor-pointer">
                      I'm still enrolled
                    </Label>
                  </div>
                </div>
              </div>

              {/* Add Details Collapse */}
              <button className="w-full bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg p-4 flex items-center justify-between shadow-sm hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors">
                <span className="font-bold text-slate-900 dark:text-white">Add education details</span>
                <ChevronDown className="h-5 w-5 text-slate-500" />
              </button>

              {/* Pro Tip */}
              <div className="flex items-start gap-3 pt-2">
                <Lightbulb className="h-5 w-5 text-slate-800 dark:text-slate-200 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <span className="font-bold">Pro Tip</span> Details like honors, clubs, and research projects show employers your growth and learning.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Live Preview Highlighted */}
        <div className="hidden lg:flex w-1/2 xl:w-5/12 bg-slate-100 dark:bg-zinc-900/50 border-l border-slate-200 dark:border-zinc-800 flex-col relative overflow-hidden">
          <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center justify-start scrollbar-hide">
             <ResumePreview liveEducation={{ ...formData, isStillEnrolled: stillEnrolled }} />
             
             {/* Action Button below template */}
             <div className="mt-8 pb-12">
               <TemplateSelector>
                 <Button variant="outline" className="rounded-full border-blue-200 dark:border-blue-900/50 bg-white dark:bg-zinc-950 text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 px-10 h-12 shadow-md transition-all hover:shadow-lg">
                   <Layout className="h-4 w-4 mr-2" />
                   Change template
                 </Button>
               </TemplateSelector>
             </div>
          </div>
        </div>

      </div>

      {/* Bottom Sticky Footer */}
      <div className="fixed bottom-0 right-0 left-0 lg:left-[18rem] bg-white dark:bg-black border-t border-slate-200 dark:border-zinc-800 p-3 sm:p-4 md:px-8 flex items-center justify-between z-20">
        <Link href="/builder/education-intro">
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
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 h-12 rounded-full text-lg shadow-md transition-all hover:shadow-lg disabled:opacity-50"
          >
            {loading ? "Saving..." : (resumeData.education.length > 0 && !formData.institution ? "Continue" : "Save & Continue")}
          </Button>
        </div>
      </div>

    </div>
  );
}
