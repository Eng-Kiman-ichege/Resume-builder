"use client";

import { useState } from "react";
import { ArrowLeft, ZoomIn, Layout, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { Wand2 } from "lucide-react";

import { useResume } from "@/lib/context/ResumeContext";
import { ResumePreview } from "@/components/ResumePreview";
import { TemplateSelector } from "@/components/TemplateSelector";

export default function BuilderPage() {
  const router = useRouter();
  const { resumeData, updateSection } = useResume();
  const [includeProfile, setIncludeProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  
  const formData = resumeData.header;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    updateSection("header", { ...formData, [id]: value });
  };

  const handleSaveAndContinue = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/resume/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "header", data: formData })
      });
      
      if (response.status === 401) {
        // Redirect to Clerk sign-in
        router.push("/sign-in?redirect_url=" + window.location.href);
        return;
      }

      if (response.ok) {
        router.push("/builder/experience-intro");
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
        body: JSON.stringify({ section: "header", data: formData })
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
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
        
        {/* Left Side: Form */}
        <div className={`w-full lg:w-1/2 xl:w-7/12 flex flex-col h-full overflow-hidden min-h-0 ${showMobilePreview ? 'hidden lg:flex' : 'flex'}`}>
          {/* Mobile Preview Toggle */}
          <div className="lg:hidden sticky top-0 z-20 flex items-center justify-between gap-2 border-b border-slate-200 dark:border-zinc-800 px-3 sm:px-4 py-2 sm:py-3 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md flex-shrink-0">
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
          <div className="flex-1 min-h-0 overflow-y-auto px-3 sm:px-6 md:px-10 pt-0 pb-32 lg:pb-24">
            <div className="max-w-2xl w-full mx-auto space-y-6 sm:space-y-8">
              <div className="flex flex-col gap-3 sm:gap-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Let&apos;s start with your header
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400">
                  Include your full name and multiple ways for employers to reach you.
                </p>
              </div>

            <div className="bg-slate-50 dark:bg-zinc-900 p-3 sm:p-5 md:p-7 rounded-lg sm:rounded-xl border border-slate-100 dark:border-zinc-800 space-y-5 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">First Name</Label>
                  <Input 
                    id="firstName" 
                    placeholder="e.g. John" 
                    className="bg-white dark:bg-black h-10 sm:h-11 md:h-12 text-sm focus-visible:ring-blue-500 border-blue-500 ring-1 ring-blue-500" 
                    value={formData.firstName || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="surname" className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">Surname</Label>
                  <Input 
                    id="surname" 
                    placeholder="e.g. Doe" 
                    className="bg-white dark:bg-black h-10 sm:h-11 md:h-12 text-sm" 
                    value={formData.surname || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="postalCode" className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">Postal Code</Label>
                  <Input id="postalCode" placeholder="e.g. 00623" className="bg-white dark:bg-black h-10 sm:h-11 md:h-12 text-sm" value={formData.postalCode || ""} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">City - Province</Label>
                  <Input id="city" placeholder="e.g. Nairobi, Nairobi" className="bg-white dark:bg-black h-10 sm:h-11 md:h-12 text-sm" value={formData.city || ""} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">Country</Label>
                  <Input id="country" placeholder="e.g. Kenya" className="bg-white dark:bg-black h-10 sm:h-11 md:h-12 text-sm" value={formData.country || ""} onChange={handleChange} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">Phone</Label>
                  <Input id="phone" placeholder="e.g. +254-20553273" className="bg-white dark:bg-black h-10 sm:h-11 md:h-12 text-sm" value={formData.phone || ""} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">Email*</Label>
                  <Input id="email" type="email" placeholder="e.g. user@example.com" className="bg-white dark:bg-black h-10 sm:h-11 md:h-12 text-sm" value={formData.email || ""} onChange={handleChange} />
                </div>
              </div>

              {/* Online Profile Section */}
              <div className="pt-2 sm:pt-4">
                <h3 className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 sm:mb-4">Online Profile</h3>
                <div className="border border-slate-200 dark:border-zinc-800 rounded-lg p-3 sm:p-4 md:p-5 bg-white dark:bg-black">
                  <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                    <Switch 
                      id="online-profile" 
                      checked={includeProfile} 
                      onCheckedChange={setIncludeProfile} 
                      className="data-[state=checked]:bg-blue-600"
                    />
                    <Label htmlFor="online-profile" className="font-medium text-sm cursor-pointer">
                      Include your online profile link
                    </Label>
                  </div>
                  
                  {includeProfile && (
                    <div className="space-y-3 sm:space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="space-y-2">
                        <Label htmlFor="profileLabel" className="text-xs text-slate-400 uppercase">PROFILE LABEL</Label>
                        <select 
                          id="profileLabel" 
                          value={formData.profileLabel}
                          onChange={handleChange}
                          className="w-full h-10 sm:h-11 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="linkedin">LinkedIn</option>
                          <option value="github">GitHub</option>
                          <option value="portfolio">Portfolio Website</option>
                          <option value="twitter">Twitter</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="profileLink" className="text-xs text-slate-400 uppercase">PROFILE LINK</Label>
                        <Input id="profileLink" placeholder="e.g. linkedin.com/in/user" className="bg-white dark:bg-black h-10 sm:h-11 text-sm" value={formData.profileLink || ""} onChange={handleChange} />
                      </div>
                    </div>
                  )}
                </div>
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
            </div>
          </div>
        </div>
        </div>

        {/* Right Side: Live Preview */}
        <div className={`w-full lg:w-1/2 xl:w-5/12 bg-slate-100 dark:bg-zinc-900/50 border-l border-slate-200 dark:border-zinc-800 flex flex-col relative overflow-hidden ${showMobilePreview ? 'flex' : 'hidden lg:flex'}`}>
          
          {/* Mobile Preview Header */}
          <div className="lg:hidden sticky top-0 z-20 flex items-center justify-between gap-2 border-b border-slate-200 dark:border-zinc-800 px-3 sm:px-4 py-2 sm:py-3 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md flex-shrink-0">
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
             <ResumePreview />
             
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
      <div className="fixed bottom-0 right-0 left-0 lg:left-[18rem] bg-white dark:bg-black border-t border-slate-200 dark:border-zinc-800 p-2 sm:p-3 md:p-4 flex items-center gap-2 sm:gap-3 md:gap-4 z-20">
        <Link href="/" className="flex-1 sm:flex-initial">
          <Button variant="ghost" className="w-full sm:w-auto text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 sm:px-6 h-10 sm:h-12 text-sm sm:text-base">
            <ArrowLeft className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        </Link>
        <Button 
          onClick={handleSaveAndContinue}
          disabled={loading}
          className="flex-1 sm:flex-initial bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 sm:px-10 h-10 sm:h-12 rounded-full text-sm sm:text-base shadow-md transition-all hover:shadow-lg disabled:opacity-50"
        >
          {loading ? "Saving..." : "Continue"}
        </Button>
      </div>
    </div>
  );
}
