"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCoverLetter } from "@/lib/context/CoverLetterContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, User, Eye, EyeOff } from "lucide-react";
import { CoverLetterPreview } from "@/components/CoverLetterPreview";

export default function SenderPage() {
  const router = useRouter();
  const { coverLetterData, updateSection } = useCoverLetter();
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    updateSection("sender", { ...coverLetterData.sender, [id]: value });
  };

  const handleNext = () => {
    router.push("/cover-letter-builder/recipient");
  };

  return (
    <div className="flex h-full w-full">
      {/* Left: Form */}
      <div className={`flex-1 flex flex-col h-full overflow-hidden ${showPreview ? 'hidden lg:flex' : 'flex'}`}>
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 md:p-16">
          <div className="max-w-2xl mx-auto space-y-10">
            <div className="space-y-4">
              <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner">
                <User className="h-6 w-6" />
              </div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Your Details</h1>
              <p className="text-lg text-slate-500">How should employers contact you?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-600 font-bold uppercase tracking-widest text-[10px]">Full Name</Label>
                <Input 
                  id="name" 
                  value={coverLetterData.sender.name} 
                  onChange={handleChange} 
                  placeholder="John Doe"
                  className="h-12 border-slate-200 focus:ring-blue-500 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="text-slate-600 font-bold uppercase tracking-widest text-[10px]">Your Current Job Title</Label>
                <Input 
                  id="jobTitle" 
                  value={coverLetterData.sender.jobTitle} 
                  onChange={handleChange} 
                  placeholder="Software Engineer"
                  className="h-12 border-slate-200 focus:ring-blue-500 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-600 font-bold uppercase tracking-widest text-[10px]">Email Address</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={coverLetterData.sender.email} 
                  onChange={handleChange} 
                  placeholder="john@example.com"
                  className="h-12 border-slate-200 focus:ring-blue-500 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-600 font-bold uppercase tracking-widest text-[10px]">Phone Number</Label>
                <Input 
                  id="phone" 
                  value={coverLetterData.sender.phone} 
                  onChange={handleChange} 
                  placeholder="+1 234 567 890"
                  className="h-12 border-slate-200 focus:ring-blue-500 rounded-xl"
                />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="address" className="text-slate-600 font-bold uppercase tracking-widest text-[10px]">Location / Address</Label>
                <Input 
                  id="address" 
                  value={coverLetterData.sender.address} 
                  onChange={handleChange} 
                  placeholder="Nairobi, Kenya"
                  className="h-12 border-slate-200 focus:ring-blue-500 rounded-xl"
                />
              </div>
            </div>

            <div className="pt-10 flex justify-between items-center border-t border-slate-100">
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
                className="ml-auto bg-slate-900 hover:bg-slate-800 text-white rounded-full px-10 h-14 font-bold text-lg group transition-all shadow-xl hover:shadow-slate-200"
              >
                Next: Recipient
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
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
