"use client";

import { useState } from "react";
import { ArrowLeft, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { Wand2 } from "lucide-react";

import { useResume } from "@/lib/context/ResumeContext";
import { ResumePreview } from "@/components/ResumePreview";

export default function BuilderPage() {
  const router = useRouter();
  const { resumeData, updateSection } = useResume();
  const [includeProfile, setIncludeProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  
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
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Form */}
        <div className="w-full lg:w-1/2 xl:w-7/12 flex flex-col h-full overflow-y-auto px-8 md:px-12 pt-12 pb-32">
          <div className="max-w-2xl w-full mx-auto space-y-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight mb-3 text-slate-900 dark:text-white">
                  Let&apos;s start with your header
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Include your full name and multiple ways for employers to reach you.
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={getAiHelp}
                disabled={aiLoading}
                className="gap-2 border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
              >
                <Wand2 className="h-4 w-4" />
                {aiLoading ? "Thinking..." : "AI Help"}
              </Button>
            </div>

            <div className="bg-slate-50 dark:bg-zinc-900 p-8 rounded-xl border border-slate-100 dark:border-zinc-800 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-slate-600 dark:text-slate-400 font-medium">First Name</Label>
                  <Input 
                    id="firstName" 
                    placeholder="e.g. John" 
                    className="bg-white dark:bg-black h-12 focus-visible:ring-blue-500 border-blue-500 ring-1 ring-blue-500" 
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="surname" className="text-slate-600 dark:text-slate-400 font-medium">Surname</Label>
                  <Input 
                    id="surname" 
                    placeholder="e.g. Doe" 
                    className="bg-white dark:bg-black h-12" 
                    value={formData.surname}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="postalCode" className="text-slate-600 dark:text-slate-400 font-medium">Postal Code</Label>
                  <Input id="postalCode" placeholder="e.g. 00623" className="bg-white dark:bg-black h-12" value={formData.postalCode} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-slate-600 dark:text-slate-400 font-medium">City - Province</Label>
                  <Input id="city" placeholder="e.g. Nairobi, Nairobi" className="bg-white dark:bg-black h-12" value={formData.city} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-slate-600 dark:text-slate-400 font-medium">Country</Label>
                  <Input id="country" placeholder="e.g. Kenya" className="bg-white dark:bg-black h-12" value={formData.country} onChange={handleChange} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-600 dark:text-slate-400 font-medium">Phone</Label>
                  <Input id="phone" placeholder="e.g. +254-20553273" className="bg-white dark:bg-black h-12" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-600 dark:text-slate-400 font-medium">Email*</Label>
                  <Input id="email" type="email" placeholder="e.g. user@example.com" className="bg-white dark:bg-black h-12" value={formData.email} onChange={handleChange} />
                </div>
              </div>

              {/* Online Profile Section */}
              <div className="pt-4">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Online Profile</h3>
                <div className="border border-slate-200 dark:border-zinc-800 rounded-lg p-5 bg-white dark:bg-black">
                  <div className="flex items-center space-x-3 mb-4">
                    <Switch 
                      id="online-profile" 
                      checked={includeProfile} 
                      onCheckedChange={setIncludeProfile} 
                      className="data-[state=checked]:bg-blue-600"
                    />
                    <Label htmlFor="online-profile" className="font-medium cursor-pointer">
                      Include your online profile link
                    </Label>
                  </div>
                  
                  {includeProfile && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="space-y-2">
                        <Label htmlFor="profileLabel" className="text-xs text-slate-400 uppercase">PROFILE LABEL</Label>
                        <select 
                          id="profileLabel" 
                          value={formData.profileLabel}
                          onChange={handleChange}
                          className="w-full h-11 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="linkedin">LinkedIn</option>
                          <option value="github">GitHub</option>
                          <option value="portfolio">Portfolio Website</option>
                          <option value="twitter">Twitter</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="profileLink" className="text-xs text-slate-400 uppercase">PROFILE LINK</Label>
                        <Input id="profileLink" placeholder="e.g. linkedin.com/in/user" className="bg-white dark:bg-black h-11" value={formData.profileLink} onChange={handleChange} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Live Preview */}
        <div className="hidden lg:flex w-1/2 xl:w-5/12 bg-slate-100 dark:bg-zinc-900/50 border-l border-slate-200 dark:border-zinc-800 flex-col items-center justify-center p-8 relative">
          <ResumePreview />
          
          <button className="mt-8 text-blue-600 dark:text-blue-400 font-bold hover:underline transition-all">
            Change template
          </button>
        </div>

      </div>

      {/* Bottom Sticky Footer */}
      <div className="fixed bottom-0 right-0 left-0 lg:left-20 bg-white dark:bg-black border-t border-slate-200 dark:border-zinc-800 p-4 md:px-8 flex items-center justify-between z-20">
        <Link href="/">
          <Button variant="ghost" className="text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 px-6 h-12">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <Button 
          onClick={handleSaveAndContinue}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 h-12 rounded-full text-lg shadow-md transition-all hover:shadow-lg disabled:opacity-50"
        >
          {loading ? "Saving..." : "Continue"}
        </Button>
      </div>
    </div>
  );
}
