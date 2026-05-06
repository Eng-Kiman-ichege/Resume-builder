"use client";

import { ResumeData } from "@/lib/context/ResumeContext";
import { Mail, Phone, MapPin, Globe, AtSign, Smartphone } from "lucide-react";

export const ModernClassic = ({ data }: { data: ResumeData }) => {
  const { header, summary, experience, education, skills, settings } = data;
  const accentColor = settings?.color || "#3b82f6";

  return (
    <div className="bg-white w-full h-full p-12 flex flex-col gap-10 font-sans text-slate-800">
      {/* Header */}
      <header className="border-b-4 border-slate-900 pb-8 flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 uppercase">
            {header.firstName || "First"} <span style={{ color: accentColor }}>{header.surname || "Surname"}</span>
          </h1>
          <p className="text-xl font-bold text-slate-400 mt-2 uppercase tracking-[0.2em]">
            {header.jobTitle || "Professional Title"}
          </p>
        </div>
        <div className="text-right text-sm font-bold space-y-1 text-slate-500 uppercase tracking-wider">
          <div className="flex items-center justify-end gap-2"><AtSign className="h-3.5 w-3.5" style={{ color: accentColor }} /> {header.email}</div>
          <div className="flex items-center justify-end gap-2"><Smartphone className="h-3.5 w-3.5" style={{ color: accentColor }} /> {header.phone}</div>
          {header.profileLink && (<div className="flex items-center justify-end gap-2">{header.profileLabel || "Link"}:  {header.profileLink}</div>)}
          <div className="flex items-center justify-end gap-2"><MapPin className="h-3.5 w-3.5" style={{ color: accentColor }} /> {header.city}</div>
        </div>
      </header>

      {/* Summary */}
      <section>
        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-4">Professional Summary</h2>
        <p 
          className="text-[15px] leading-relaxed font-medium text-slate-600 border-l-4 pl-6 italic"
          style={{ borderLeftColor: `${accentColor}1a` }}
        >
          {summary.content}
        </p>
      </section>

      {/* Experience */}
      <section>
        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-8">Work Experience</h2>
        <div className="space-y-10">
          {experience.map((exp, i) => (
            <div key={i} className="group relative pl-8 border-l-2 border-slate-50">
              <div 
                className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full group-hover:scale-150 transition-transform" 
                style={{ backgroundColor: accentColor }}
              />
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-xl font-bold text-slate-900">{exp.jobTitle}</h3>
                <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest">{exp.startYear} — {exp.endYear || "Present"}</span>
              </div>
              <p className="text-sm font-black uppercase tracking-[0.1em] mb-4" style={{ color: accentColor }}>{exp.employer}</p>
              <p className="text-[14px] text-slate-500 font-medium leading-relaxed whitespace-pre-wrap">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-8">Education</h2>
        <div className="space-y-6">
          {education.map((edu, i) => (
            <div key={i} className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-bold text-slate-900">{edu.degree}{edu.field ? " in " + edu.field : ""}</h4>
                <p className="text-sm font-bold uppercase tracking-widest" style={{ color: accentColor }}>{edu.institution}</p>
              </div>
              <span className="text-[11px] font-black text-slate-300 uppercase">{edu.startYear} — {edu.endYear}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
