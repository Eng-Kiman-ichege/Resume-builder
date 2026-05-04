"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { ResumeProvider } from "@/lib/context/ResumeContext";

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ResumeProvider>
      <div className="flex h-screen w-full bg-slate-50 dark:bg-zinc-950 overflow-hidden flex-col lg:flex-row">
        {/* Mobile Header with Hamburger */}
        <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#1a2332] flex items-center px-4 z-30 border-b border-slate-800">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="ml-3 font-bold text-white text-lg tracking-tight">CV Craft.</span>
        </div>

        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Main Content */}
        <main className="flex-1 flex flex-col h-full min-h-0 overflow-hidden relative pt-14 lg:pt-0">
          {children}
        </main>
      </div>
    </ResumeProvider>
  );
}
