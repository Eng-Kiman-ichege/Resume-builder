"use client";

import { Sidebar } from "./Sidebar";
import { ResumeProvider } from "@/lib/context/ResumeContext";

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ResumeProvider>
      <div className="flex h-screen w-full bg-slate-50 dark:bg-zinc-950 overflow-hidden">
        <Sidebar />
        {/* Main Content */}
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          {children}
        </main>
      </div>
    </ResumeProvider>
  );
}
