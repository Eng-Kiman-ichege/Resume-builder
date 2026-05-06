"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCoverLetter } from "@/lib/context/CoverLetterContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Mail, Eye, EyeOff } from "lucide-react";
import { CoverLetterPreview } from "@/components/CoverLetterPreview";

export default function RecipientPage() {
  const router = useRouter();
  const { coverLetterData, updateSection } = useCoverLetter();
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    updateSection("recipient", { ...coverLetterData.recipient, [id]: value });
  };

  const handleNext = () => {
    router.push("/cover-letter-builder/content");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex h-full w-full">
      {/* Left: Form */}
      <div className={`flex-1 flex flex-col h-full overflow-hidden ${showPreview ? 'hidden lg:flex' : 'flex'}`}>
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 md:p-16">
          <div className="max-w-2xl mx-auto space-y-10">
            <div className="space-y-4">
              <div className="h-12 w-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center shadow-inner">
                <Mail className="h-6 w-6" />
              </div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Recipient Info</h1>
              <p className="text-lg text-slate-500">Who are you writing to?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-600 font-bold uppercase tracking-widest text-[10px]">Hiring Manager Name</Label>
                <Input 
                  id="name" 
                  value={coverLetterData.recipient.name} 
                  onChange={handleChange} 
                  placeholder="e.g. Jane Smith (or leave empty)"
                  className="h-12 border-slate-200 focus:ring-blue-500 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-slate-600 font-bold uppercase tracking-widest text-[10px]">Company Name</Label>
                <Input 
                  id="company" 
                  value={coverLetterData.recipient.company} 
                  onChange={handleChange} 
                  placeholder="e.g. Google"
                  className="h-12 border-slate-200 focus:ring-blue-500 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="text-slate-600 font-bold uppercase tracking-widest text-[10px]">Role You're Applying For</Label>
                <Input 
                  id="jobTitle" 
                  value={coverLetterData.recipient.jobTitle} 
                  onChange={handleChange} 
                  placeholder="e.g. Senior Product Designer"
                  className="h-12 border-slate-200 focus:ring-blue-500 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-slate-600 font-bold uppercase tracking-widest text-[10px]">Company Address</Label>
                <Input 
                  id="address" 
                  value={coverLetterData.recipient.address} 
                  onChange={handleChange} 
                  placeholder="e.g. Mountain View, CA"
                  className="h-12 border-slate-200 focus:ring-blue-500 rounded-xl"
                />
              </div>
            </div>

            <div className="pt-10 flex justify-between items-center border-t border-slate-100">
              <Button variant="ghost" onClick={handleBack} className="rounded-full px-8 h-12 font-bold">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setShowPreview(!showPreview)}
                  className="lg:hidden gap-2"
                >
                  {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {showPreview ? "Hide Preview" : "Show Preview"}
                </Button>
                <Button 
                  onClick={handleNext} 
                  className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-10 h-14 font-bold text-lg group transition-all shadow-xl hover:shadow-slate-200"
                >
                  Next: Content
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Preview */}
      <div className={`w-full lg:w-1/2 xl:w-5/12 border-l border-slate-200 bg-slate-50 ${showPreview ? 'flex' : 'hidden lg:flex'}`}>
        <CoverLetterPreview />
      </div>
    </div>
  );
}
