import { Metadata } from "next";

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
      {/* Sidebar Stepper */}
      <aside className="w-20 lg:w-24 bg-[#1e293b] flex flex-col items-center py-8 border-r border-slate-800 z-10 flex-shrink-0">
        <div className="w-10 h-12 bg-white/10 rounded mb-8 flex items-center justify-center text-white font-serif italic text-xl border border-white/20">
          C
        </div>
        
        <div className="flex flex-col items-center flex-1 gap-6 w-full mt-4">
          {/* Step 1: Active */}
          <div className="relative flex flex-col items-center group">
            <div className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center font-bold text-sm z-10">
              1
            </div>
            <div className="w-0.5 h-12 bg-white/20 absolute top-8"></div>
          </div>
          
          {/* Step 2 */}
          <div className="relative flex flex-col items-center group mt-4">
            <div className="w-8 h-8 rounded-full border-2 border-white/30 text-white/50 flex items-center justify-center font-bold text-sm z-10 bg-[#1e293b]">
              2
            </div>
            <div className="w-0.5 h-12 bg-white/20 absolute top-8"></div>
          </div>
          
          {/* Step 3 */}
          <div className="relative flex flex-col items-center group mt-4">
            <div className="w-8 h-8 rounded-full border-2 border-white/30 text-white/50 flex items-center justify-center font-bold text-sm z-10 bg-[#1e293b]">
              3
            </div>
            <div className="w-0.5 h-12 bg-white/20 absolute top-8"></div>
          </div>
          
          {/* Step 4 */}
          <div className="relative flex flex-col items-center group mt-4">
            <div className="w-8 h-8 rounded-full border-2 border-white/30 text-white/50 flex items-center justify-center font-bold text-sm z-10 bg-[#1e293b]">
              4
            </div>
            <div className="w-0.5 h-12 bg-white/20 absolute top-8"></div>
          </div>
          
          {/* Step 5 */}
          <div className="relative flex flex-col items-center group mt-4">
            <div className="w-8 h-8 rounded-full border-2 border-white/30 text-white/50 flex items-center justify-center font-bold text-sm z-10 bg-[#1e293b]">
              5
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {children}
      </main>
    </div>
  );
}
