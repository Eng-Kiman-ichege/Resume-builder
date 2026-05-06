import React from "react";
import { CoverLetterData } from "@/lib/context/CoverLetterContext";

export default function Modern({ data }: { data: CoverLetterData }) {
  const { sender, recipient, content, settings } = data;
  const accentColor = settings.color || "#3b82f6";

  return (
    <div className="p-0 text-slate-700 font-sans leading-relaxed text-[10px] h-full flex flex-row">
      {/* Sidebar */}
      <div className="w-1/3 bg-slate-900 text-white p-8 flex flex-col gap-8">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight leading-none">{sender.name || "YOUR NAME"}</h1>
          <p className="text-xs mt-2 font-bold opacity-80 uppercase tracking-widest">{sender.jobTitle || "PROFESSION"}</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-[9px] font-black uppercase tracking-[0.2em] border-b border-white/20 pb-1">Contact</h3>
          <div className="space-y-2 opacity-80">
            <p className="break-all">{sender.email}</p>
            <p>{sender.phone}</p>
            <p>{sender.address}</p>
          </div>
        </div>

        <div className="mt-auto opacity-50 text-[8px] uppercase tracking-widest">
          Created with CV Craft
        </div>
      </div>

      {/* Main Area */}
      <div className="w-2/3 p-12 bg-white flex flex-col">
        <div className="mb-10 flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Recipient</p>
            <h2 className="text-sm font-bold text-slate-900">{recipient.name || "Hiring Manager"}</h2>
            <p className="font-medium text-slate-600">{recipient.company}</p>
          </div>
          <div className="text-right">
            <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Date</p>
            <p className="text-sm font-bold text-slate-900">
              {new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
            </p>
          </div>
        </div>

        <div className="flex-1 whitespace-pre-line text-slate-800 text-[11px]">
          <p className="mb-6 font-bold" style={{ color: accentColor }}>Dear {recipient.name || "Hiring Manager"},</p>
          {content.body || "Start writing your cover letter content here..."}
          <div className="mt-12">
            <p className="font-medium text-slate-400 italic">Best Regards,</p>
            <p className="mt-2 text-xl font-black italic tracking-tighter" style={{ color: accentColor }}>{sender.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
