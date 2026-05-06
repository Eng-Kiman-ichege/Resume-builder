"use client";

import { useState } from "react";
import { ArrowLeft, ZoomIn, Layout, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { Wand2, Trash2, Plus, Edit2, Sparkles } from "lucide-react";

import { useResume } from "@/lib/context/ResumeContext";
import { ResumePreview } from "@/components/ResumePreview";
import { TemplateSelector } from "@/components/TemplateSelector";
import { AiSuggestionDialog } from "@/components/AiSuggestionDialog";

export default function ExperiencePage() {
  const router = useRouter();
  const { resumeData, updateSection } = useResume();
  const [currentlyWorkHere, setCurrentlyWorkHere] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiDescLoading, setAiDescLoading] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    employer: "",
    city: "",
    country: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    description: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleDelete = async (index: number) => {
    const updatedExperience = resumeData.experience.filter((_: any, i: number) => i !== index);
    updateSection("experience", updatedExperience);
    
    // Also save to database
    try {
      await fetch("/api/resume/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "experience", data: updatedExperience })
      });
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleEdit = (index: number) => {
    const expToEdit = resumeData.experience[index];
    setFormData({
      jobTitle: expToEdit.jobTitle || "",
      employer: expToEdit.employer || "",
      city: expToEdit.city || "",
      country: expToEdit.country || "",
      startMonth: expToEdit.startMonth || "",
      startYear: expToEdit.startYear || "",
      endMonth: expToEdit.endMonth || "",
      endYear: expToEdit.endYear || "",
      description: expToEdit.description || ""
    });
    setCurrentlyWorkHere(expToEdit.isCurrent || false);
    
    // Delete the original item so it can be re-added on save
    handleDelete(index);
  };

  const handleAddAnother = async () => {
    if (!formData.jobTitle || !formData.employer || !formData.startYear) {
      alert("Please fill in the Job Title, Employer, and Start Year to add an experience.");
      return;
    }

    const newExperience = { ...formData, isCurrent: currentlyWorkHere };
    
    // Use functional update to avoid stale state issues
    updateSection("experience", (prev: any[]) => {
      const updated = [...(Array.isArray(prev) ? prev : []), newExperience];
      
      // Save to DB (optional: we could do this after updateSection)
      fetch("/api/resume/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "experience", data: updated })
      }).catch(err => console.error("Save error:", err));
      
      return updated;
    });

    // Clear form
    setFormData({
      jobTitle: "",
      employer: "",
      city: "",
      country: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      description: ""
    });
    setCurrentlyWorkHere(false);
  };

  const handleSaveAndContinue = async () => {
    const isFormEmpty = !formData.jobTitle && !formData.employer && !formData.startYear;
    const hasExistingEntries = resumeData.experience.length > 0;

    if (isFormEmpty) {
      if (hasExistingEntries) {
        router.push("/builder/education-intro");
        return;
      } else {
        alert("Please add at least one work experience.");
        return;
      }
    }

    setLoading(true);
    try {
      const newExperience = { ...formData, isCurrent: currentlyWorkHere };
      
      // We need the updated list to save to DB and navigate
      const currentExperience = Array.isArray(resumeData.experience) ? resumeData.experience : [];
      const updatedExperience = [...currentExperience, newExperience];
      
      updateSection("experience", updatedExperience);

      const response = await fetch("/api/resume/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "experience", data: updatedExperience })
      });
      
      if (response.status === 401) {
        router.push("/sign-in?redirect_url=" + window.location.href);
        return;
      }

      if (response.ok) {
        router.push("/builder/education-intro");
      }
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setLoading(false);
    }
  };




  const [aiSuggestion, setAiSuggestion] = useState<string>("");
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const getAiHelp = async () => {
    setAiLoading(true);
    try {
      const response = await fetch("/api/ai/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "experience", data: formData })
      });
      const data = await response.json();
      setAiSuggestion(data.suggestions || "AI suggested no changes.");
      setIsAiModalOpen(true);
    } catch (error) {
      console.error("AI error:", error);
    } finally {
      setAiLoading(false);
    }
  };

  const handleGenerateDescription = async () => {
    if (!formData.jobTitle) {
      alert("Please enter a Job Title first to generate a description.");
      return;
    }
    
    setAiDescLoading(true);
    try {
      const response = await fetch("/api/ai/generate-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          jobTitle: formData.jobTitle,
          employer: formData.employer 
        })
      });
      const data = await response.json();
      
      if (data.description) {
        setFormData(prev => ({ 
          ...prev, 
          description: prev.description ? prev.description + "\n" + data.description : data.description 
        }));
      }
    } catch (error) {
      console.error("AI Generation error:", error);
    } finally {
      setAiDescLoading(false);
    }
  };

  const isFormActive = Object.values(formData).some(val => val !== "");

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-zinc-950">
      {/* Top Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Side: Form */}
        <div className={`w-full lg:w-1/2 xl:w-7/12 flex flex-col h-full overflow-hidden ${showMobilePreview ? 'hidden lg:flex' : 'flex'}`}>
          {/* Mobile Preview Toggle */}
          <div className="lg:hidden flex items-center justify-between gap-2 border-b border-slate-200 dark:border-zinc-800 px-3 sm:px-4 py-2 sm:py-3 bg-white dark:bg-zinc-950 flex-shrink-0">
            <span className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">Form</span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowMobilePreview(!showMobilePreview)}
              className="gap-2 text-xs sm:text-sm h-8 px-2"
            >
              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
              Preview
            </Button>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto px-3 sm:px-6 md:px-10 pt-4 sm:pt-6 pb-32 lg:pb-24">
            <div className="max-w-3xl w-full mx-auto space-y-6 sm:space-y-8">
              <div className="flex flex-col gap-3 sm:gap-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Let&apos;s work on your experience
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400">
                  Start with your most recent job first and work backwards.
                </p>
              </div>

              {/* AI Help button for mobile */}
              <div className="lg:hidden pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={getAiHelp}
                  disabled={aiLoading}
                  className="w-full gap-2 border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 text-sm"
                >
                  <Wand2 className="h-4 w-4" />
                  {aiLoading ? "Thinking..." : "Get AI Help"}
                </Button>
              </div>

              {/* List of Added Experiences */}
              {resumeData.experience.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Your Experience</h3>
                  <div className="space-y-3">
                    {resumeData.experience.map((exp: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-xl group shadow-sm hover:shadow-md transition-all">
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">{exp.jobTitle}</div>
                          <div className="text-sm text-slate-500">{exp.employer} | {exp.startYear} - {exp.isCurrent ? "Present" : exp.endYear}</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEdit(index)}
                            className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 sm:opacity-0 sm:group-hover:opacity-100 transition-all"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDelete(index)}
                            className="text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 sm:opacity-0 sm:group-hover:opacity-100 transition-all"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-slate-50 dark:bg-zinc-900 p-4 sm:p-6 md:p-8 rounded-xl border border-slate-100 dark:border-zinc-800 space-y-8">
              {/* Row 1: Job Title & Employer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle" className="text-slate-600 dark:text-slate-400 font-medium">Job Title</Label>
                  <Input 
                    id="jobTitle" 
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className="bg-white dark:bg-black h-12 focus-visible:ring-blue-500 border-blue-500 ring-1 ring-blue-500" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employer" className="text-slate-600 dark:text-slate-400 font-medium">Employer</Label>
                  <Input 
                    id="employer" 
                    value={formData.employer}
                    onChange={handleChange}
                    placeholder="e.g. R4Kenya" 
                    className="bg-white dark:bg-black h-12" 
                  />
                </div>
              </div>

              {/* Row 2: City & Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-slate-600 dark:text-slate-400 font-medium">City</Label>
                  <Input id="city" value={formData.city} onChange={handleChange} placeholder="e.g. Nairobi" className="bg-white dark:bg-black h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-slate-600 dark:text-slate-400 font-medium">Country</Label>
                  <Input id="country" value={formData.country} onChange={handleChange} placeholder="e.g. Kenya" className="bg-white dark:bg-black h-12" />
                </div>
              </div>

              {/* Row 3: Start Date & End Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-slate-600 dark:text-slate-400 font-medium">Start Date</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <select id="startMonth" value={formData.startMonth} onChange={handleChange} className="w-full h-12 rounded-md border border-input bg-white dark:bg-black px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
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
                    <select id="startYear" value={formData.startYear} onChange={handleChange} className="w-full h-12 rounded-md border border-input bg-white dark:bg-black px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                      <option value="" disabled>Year</option>
                      {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(year => (
                        <option key={year} value={year.toString()}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-600 dark:text-slate-400 font-medium">End Date</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <select 
                      id="endMonth"
                      value={formData.endMonth}
                      onChange={handleChange}
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
                      id="endYear"
                      value={formData.endYear}
                      onChange={handleChange}
                      disabled={currentlyWorkHere}
                      className="w-full h-12 rounded-md border border-input bg-white dark:bg-black px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="" disabled>Year</option>
                      {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(year => (
                        <option key={year} value={year.toString()}>{year}</option>
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

              {/* Row 4: Description */}
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="description" className="text-slate-600 dark:text-slate-400 font-medium">Description</Label>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleGenerateDescription}
                      disabled={aiDescLoading || !formData.jobTitle}
                      className="h-8 gap-1.5 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      {aiDescLoading ? (
                        <>Generating...</>
                      ) : (
                        <>
                          <Sparkles className="h-3.5 w-3.5" />
                          Auto-Generate
                        </>
                      )}
                    </Button>
                  </div>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={handleChange as any}
                    placeholder="Describe your responsibilities and achievements..."
                    className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px] resize-y bg-white dark:bg-black focus-visible:ring-blue-500 ring-1 ring-transparent border-slate-200 dark:border-zinc-800"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
        </div>

        {/* Right Side: Live Preview Highlighted */}
        <div className={`w-full lg:w-1/2 xl:w-5/12 bg-slate-100 dark:bg-zinc-900/50 border-l border-slate-200 dark:border-zinc-800 flex flex-col relative overflow-hidden ${showMobilePreview ? 'flex' : 'hidden lg:flex'}`}>
          
          {/* Mobile Preview Header */}
          <div className="lg:hidden flex items-center justify-between gap-2 border-b border-slate-200 dark:border-zinc-800 px-3 sm:px-4 py-2 sm:py-3 bg-white dark:bg-zinc-900 flex-shrink-0">
            <span className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">Resume Preview</span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowMobilePreview(false)}
              className="gap-2 text-xs sm:text-sm h-8 px-2"
            >
              <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" />
              Back
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 flex flex-col items-center justify-start scrollbar-hide">
             <ResumePreview liveExperience={isFormActive ? { ...formData, isCurrent: currentlyWorkHere } : undefined} />
             
             {/* Action Button below template */}
             <div className="mt-6 sm:mt-8 pb-12">
               <TemplateSelector>
                 <Button variant="outline" className="rounded-full border-blue-200 dark:border-blue-900/50 bg-white dark:bg-zinc-950 text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 px-6 sm:px-8 md:px-10 h-10 sm:h-12 text-sm sm:text-base shadow-md transition-all hover:shadow-lg">
                   <Layout className="h-4 w-4 mr-2" />
                   Change template
                 </Button>
               </TemplateSelector>
             </div>
          </div>

          {/* AI Help button for desktop */}
          <div className="hidden lg:block border-t border-slate-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={getAiHelp}
              disabled={aiLoading}
              className="w-full gap-2 border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
            >
              <Wand2 className="h-4 w-4" />
              {aiLoading ? "Thinking..." : "Get AI Help"}
            </Button>
          </div>
        </div>


      </div>

      {/* Bottom Sticky Footer */}
      <div className="fixed bottom-0 right-0 left-0 lg:left-[18rem] bg-white dark:bg-black border-t border-slate-200 dark:border-zinc-800 p-3 sm:p-4 md:px-8 flex items-center justify-between z-20">
        <Link href="/builder/experience-intro">
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
            {loading ? "Saving..." : (resumeData.experience.length > 0 && !formData.jobTitle ? "Continue" : "Save & Continue")}
          </Button>
        </div>
      </div>


      <AiSuggestionDialog
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        suggestion={aiSuggestion}
      />
    </div>
  );
}

