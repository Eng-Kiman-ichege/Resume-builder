import React from "react";
import { CoverLetterData } from "@/lib/context/CoverLetterContext";

export default function Minimalist({ data }: { data: CoverLetterData }) {
  const { sender, recipient, content, settings } = data;
  const accentColor = settings.color || "#3b82f6";

  return (
    <div className="p-16 text-slate-600 font-light leading-loose text-[11px] h-full flex flex-col bg-white">
      {/* Centered Header */}
      <div className="text-center mb-16">
        <h1 className="text-2xl font-light tracking-[0.4em] text-slate-900 uppercase">{sender.name || "YOUR NAME"}</h1>
        <div className="mt-4 flex items-center justify-center gap-4 text-[9px] uppercase tracking-widest text-slate-400">
          <span>{sender.email}</span>
          <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
          <span>{sender.phone}</span>
          <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
          <span>{sender.address}</span>
        </div>
      </div>

      <div className="max-w-[85%] mx-auto w-full">
        {/* Date & Recipient */}
        <div className="mb-12 flex justify-between items-end border-b border-slate-100 pb-4">
          <div className="space-y-0.5">
            <p className="font-bold text-slate-900 text-xs">{recipient.name || "Hiring Manager"}</p>
            <p className="tracking-widest uppercase text-[9px]">{recipient.company}</p>
          </div>
          <p className="text-[9px] uppercase tracking-widest opacity-50">
            {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 whitespace-pre-line text-justify">
          <p className="mb-8 font-medium text-slate-800">To the hiring team at {recipient.company || "the company"},</p>
          {content.body || "Start writing your cover letter content here..."}
          <div className="mt-16 space-y-1">
            <p className="text-[9px] uppercase tracking-widest opacity-50">With thanks,</p>
            <p className="text-sm font-medium text-slate-900" style={{ color: accentColor }}>{sender.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
