import { Metadata } from "next";
import { Sidebar } from "./Sidebar";

export const metadata: Metadata = {
  title: "Builder - CV Craft",
  description: "Build your professional resume.",
};

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-zinc-950 overflow-hidden">
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {children}
      </main>
    </div>
  );
}
