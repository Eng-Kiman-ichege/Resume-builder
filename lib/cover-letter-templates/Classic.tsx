import React from "react";
import { CoverLetterData } from "@/lib/context/CoverLetterContext";

export default function Classic({ data }: { data: CoverLetterData }) {
  const { sender, recipient, content, settings } = data;
  const accentColor = settings.color || "#3b82f6";

  return (
    <div className="p-12 text-slate-800 font-serif leading-relaxed text-[11px] h-full flex flex-col">
      {/* Header */}
      <div className="border-b-2 mb-8 pb-4" style={{ borderColor: accentColor }}>
        <h1 className="text-3xl font-bold uppercase tracking-widest text-slate-900">{sender.name || "Your Name"}</h1>
        <p className="text-sm font-medium mt-1 uppercase" style={{ color: accentColor }}>{sender.jobTitle || "Your Profession"}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-slate-500 font-sans italic">
          {sender.email && <span>{sender.email}</span>}
          {sender.phone && <span>{sender.phone}</span>}
          {sender.address && <span>{sender.address}</span>}
        </div>
      </div>

      {/* Date */}
      <div className="mb-8 font-sans">
        {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
      </div>

      {/* Recipient */}
      <div className="mb-8 font-sans">
        <p className="font-bold text-slate-900">{recipient.name || "Hiring Manager"}</p>
        <p className="text-slate-600">{recipient.jobTitle || "Job Title"}</p>
        <p className="font-bold">{recipient.company || "Company Name"}</p>
        <p className="text-slate-500">{recipient.address || "Company Address"}</p>
      </div>

      {/* Content */}
      <div className="flex-1 whitespace-pre-line text-justify">
        <p className="mb-6">Dear {recipient.name || "Hiring Manager"},</p>
        {content.body || "Start writing your cover letter content here..."}
        <p className="mt-8">Sincerely,</p>
        <p className="mt-4 font-bold text-lg">{sender.name || "Your Name"}</p>
      </div>
    </div>
  );
}
