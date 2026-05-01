"use client";

import { useState } from "react";
import { ArrowLeft, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

export default function BuilderPage() {
  const [includeProfile, setIncludeProfile] = useState(false);

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-zinc-950">
      {/* Top Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Form */}
        <div className="w-full lg:w-1/2 xl:w-7/12 flex flex-col h-full overflow-y-auto px-8 md:px-12 pt-12 pb-32">
          <div className="max-w-2xl w-full mx-auto space-y-8">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight mb-3 text-slate-900 dark:text-white">
                Let&apos;s start with your header
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Include your full name and multiple ways for employers to reach you.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-zinc-900 p-8 rounded-xl border border-slate-100 dark:border-zinc-800 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-slate-600 dark:text-slate-400 font-medium">First Name</Label>
                  <Input 
                    id="firstName" 
                    placeholder="e.g. John" 
                    className="bg-white dark:bg-black h-12 focus-visible:ring-blue-500 border-blue-500 ring-1 ring-blue-500" 
                    defaultValue="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="surname" className="text-slate-600 dark:text-slate-400 font-medium">Surname</Label>
                  <Input 
                    id="surname" 
                    placeholder="e.g. Doe" 
                    className="bg-white dark:bg-black h-12" 
                    defaultValue="Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="postalCode" className="text-slate-600 dark:text-slate-400 font-medium">Postal Code</Label>
                  <Input id="postalCode" placeholder="e.g. 00623" className="bg-white dark:bg-black h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-slate-600 dark:text-slate-400 font-medium">City - Province</Label>
                  <Input id="city" placeholder="e.g. Nairobi, Nairobi" className="bg-white dark:bg-black h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-slate-600 dark:text-slate-400 font-medium">Country</Label>
                  <Input id="country" placeholder="e.g. Kenya" className="bg-white dark:bg-black h-12" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-600 dark:text-slate-400 font-medium">Phone</Label>
                  <Input id="phone" placeholder="e.g. +254-20553273" className="bg-white dark:bg-black h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-600 dark:text-slate-400 font-medium">Email*</Label>
                  <Input id="email" type="email" placeholder="e.g. user@example.com" className="bg-white dark:bg-black h-12" />
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
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      <Label htmlFor="profile-label" className="text-xs text-slate-400">PROFILE LABEL</Label>
                      <select 
                        id="profile-label" 
                        className="w-full h-11 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="linkedin">LinkedIn</option>
                        <option value="github">GitHub</option>
                        <option value="portfolio">Portfolio Website</option>
                        <option value="twitter">Twitter</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Live Preview */}
        <div className="hidden lg:flex w-1/2 xl:w-5/12 bg-slate-100 dark:bg-zinc-900/50 border-l border-slate-200 dark:border-zinc-800 flex-col items-center justify-center p-8 relative">
          
          <div className="w-full max-w-md aspect-[1/1.414] bg-white shadow-xl rounded-sm border border-slate-200 relative overflow-hidden transition-all hover:scale-[1.02] duration-300">
            {/* Mock Resume Content */}
            <div className="p-8 h-full flex flex-col text-slate-800">
              <div className="text-center mb-6 border-b border-orange-200 pb-4">
                <div className="w-12 h-12 mx-auto border border-slate-300 rounded-full flex items-center justify-center text-lg font-serif mb-2">
                  JD
                </div>
                <h2 className="text-2xl font-serif tracking-widest uppercase">John Doe</h2>
                <div className="mt-2 text-[10px] text-orange-500 uppercase tracking-widest border border-orange-200 py-1 bg-orange-50/50">
                  user@example.com | +254-20553273 | Nairobi, Kenya
                </div>
              </div>
              
              <div className="flex-1 text-[8px] leading-tight flex flex-col gap-4">
                <div>
                  <h3 className="font-bold border-b border-slate-200 mb-1 pb-1">Summary</h3>
                  <p className="text-slate-500">Customer-focused professional with solid understanding of dynamics, marketing and customer service. Offering five years of experience providing quality product recommendations and solutions to meet customer needs and exceed expectations.</p>
                </div>
                
                <div>
                  <h3 className="font-bold border-b border-slate-200 mb-1 pb-1">Skills</h3>
                  <div className="grid grid-cols-2 text-slate-500 gap-1">
                    <div>• Customer Service</div>
                    <div>• Retail Sales</div>
                    <div>• Point of Sale Systems</div>
                    <div>• Inventory Management</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold border-b border-slate-200 mb-1 pb-1">Experience</h3>
                  <div className="mb-2 text-slate-500">
                    <div className="flex justify-between font-semibold text-slate-700">
                      <span>Retail Sales Associate</span>
                      <span>2019 - Present</span>
                    </div>
                    <div>• Increased monthly sales by 10% through up-selling and cross-selling.</div>
                    <div>• Prevented store losses by leveraging awareness and attention to detail.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Zoom Button */}
            <button className="absolute bottom-4 right-4 w-12 h-12 bg-orange-200 hover:bg-orange-300 rounded-full shadow-lg flex items-center justify-center text-orange-900 transition-colors">
              <ZoomIn className="h-5 w-5" />
            </button>
          </div>

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
        <Link href="/builder/experience-intro">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 h-12 rounded-full text-lg shadow-md transition-all hover:shadow-lg">
            Continue
          </Button>
        </Link>
      </div>
    </div>
  );
}
