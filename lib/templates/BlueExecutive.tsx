"use client";

import { ResumeData } from "@/lib/context/ResumeContext";
import { Mail, Phone, MapPin, AtSign, Smartphone } from "lucide-react";

export const BlueExecutive = ({ data }: { data: ResumeData }) => {
  const { header, summary, experience, education, skills, settings } = data;
  const accentColor = settings?.color || "#0052cc";

  return (
    <div className="bg-white w-full h-full flex flex-col font-serif text-slate-900">
      {/* Top Banner */}
      <header className="text-white p-12 text-center flex flex-col items-center" style={{ backgroundColor: accentColor }}>
        <h1 className="text-5xl font-bold tracking-tight mb-2 uppercase">
          {header.firstName || "First"} {header.surname || "Surname"}
        </h1>
        <div className="w-20 h-1 bg-white/30 rounded-full mb-6" />
        <p className="text-lg tracking-[0.4em] opacity-80 font-medium uppercase italic">
          {header.jobTitle || "Professional Title"}
        </p>
      </header>
      
      {/* Floating Contact Bar */}
      <div className="bg-slate-900 text-white py-3 flex justify-center gap-10 text-[10px] font-black uppercase tracking-[0.2em]">
         <div className="flex items-center gap-2"><AtSign className="h-3 w-3" style={{ color: accentColor }} /> {header.email}</div>
         <div className="flex items-center gap-2"><Smartphone className="h-3 w-3" style={{ color: accentColor }} /> {header.phone}</div>
         {header.profileLink && (<div className="flex items-center gap-2">{header.profileLabel || "Link"}:  {header.profileLink}</div>)}
         <div className="flex items-center gap-2"><MapPin className="h-3 w-3" style={{ color: accentColor }} /> {header.city}</div>
      </div>

      <div className="p-16 grid grid-cols-12 gap-16">
        <div className="col-span-12 space-y-16">
          <section>
            <h2 className="text-[11px] font-black uppercase tracking-[0.5em] mb-8 pb-2 border-b-2 border-slate-100" style={{ color: accentColor }}>Executive Profile</h2>
            <p className="text-[16px] leading-relaxed text-slate-700 font-medium whitespace-pre-wrap">
              {summary.content}
            </p>
          </section>

          <section>
            <h2 className="text-[11px] font-black uppercase tracking-[0.5em] mb-10 pb-2 border-b-2 border-slate-100" style={{ color: accentColor }}>Professional Experience</h2>
            <div className="space-y-12">
              {experience.map((exp, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between items-baseline font-bold">
                    <h3 className="text-2xl text-slate-900 tracking-tight">{exp.jobTitle}</h3>
                    <span className="text-xs text-slate-400 font-black">{exp.startYear} — {exp.endYear}</span>
                  </div>
                  <p className="text-sm font-black text-slate-400 uppercase tracking-widest">{exp.employer}</p>
                  <p className="text-[15px] text-slate-600 leading-relaxed pt-2 font-medium whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
             <h2 className="text-[11px] font-black uppercase tracking-[0.5em] mb-8 pb-2 border-b-2 border-slate-100" style={{ color: accentColor }}>Academic Background</h2>
             <div className="grid grid-cols-2 gap-8">
               {education.map((edu, i) => (
                 <div key={i} className="space-y-1">
                   <h4 className="text-lg font-bold text-slate-900">{edu.degree}{edu.field ? " in " + edu.field : ""}</h4>
                   <p className="text-sm font-medium text-slate-500">{edu.institution}</p>
                   <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{edu.startYear} — {edu.endYear}</p>
                 </div>
               ))}
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};
