"use client";

import { ResumeData } from "@/lib/context/ResumeContext";
import { Mail, Phone, MapPin, AtSign, Smartphone } from "lucide-react";

export const Paris = ({ data }: { data: ResumeData }) => {
  const { header, summary, experience, education, skills, settings } = data;
  const accentColor = settings?.color || "#1e293b";

  return (
    <div className="bg-[#fcfcf9] w-full h-full p-16 flex flex-col items-center font-serif text-slate-800">
      {/* Header */}
      <header className="text-center mb-12 flex flex-col items-center">
        <h1 className="text-5xl font-light tracking-widest text-slate-900 mb-4 uppercase">
          {header.firstName} <span className="font-bold" style={{ color: accentColor }}>{header.surname}</span>
        </h1>
        <div className="h-px w-24 bg-slate-200 mb-4" />
        <p className="text-lg italic text-slate-500 mb-6 font-medium">{header.jobTitle}</p>
        
        <div className="flex justify-center gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-400">
           <span>{header.email}</span>
           <span>•</span>
           <span>{header.phone}</span>
           {header.profileLink && (<span>{header.profileLink}</span>)}
           <span>•</span>
           <span>{header.city}</span>
        </div>
      </header>

      <div className="w-full max-w-2xl space-y-12">
        <section className="text-center">
           <p className="text-base leading-relaxed text-slate-600 font-medium italic italic-serif">
             "{summary.content}"
           </p>
        </section>

        <section>
          <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-300 text-center mb-8">Professional History</h2>
          <div className="space-y-10">
            {experience.map((exp, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{exp.jobTitle}</h3>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accentColor }}>{exp.employer} / {exp.startYear} — {exp.endYear}</p>
                <p className="text-[14px] text-slate-600 font-medium leading-relaxed max-w-lg">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-12 pt-8 border-t border-slate-100">
          <section>
            <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-300 mb-6">Education</h2>
            <div className="space-y-6">
              {education.map((edu, i) => (
                <div key={i}>
                  <h4 className="text-base font-bold text-slate-900">{edu.degree}{edu.field ? " in " + edu.field : ""}</h4>
                  <p className="text-xs font-medium text-slate-500 italic mt-1">{edu.institution}</p>
                  <p className="text-[10px] font-bold uppercase mt-2" style={{ color: accentColor }}>{edu.startYear} — {edu.endYear}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-300 mb-6">Expertise</h2>
            <div className="flex flex-wrap justify-start gap-x-6 gap-y-3">
              {(skills?.content || "").split(",").filter(Boolean).map((skill, i) => (
                <span key={i} className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                  {skill.trim()}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
