"use client";

import { ResumeData } from "@/lib/context/ResumeContext";
import { Mail, Phone, MapPin, AtSign, Smartphone, Globe } from "lucide-react";

export const London = ({ data }: { data: ResumeData }) => {
  const { header, summary, experience, education, skills, settings } = data;
  const accentColor = settings?.color || "#1e293b";

  return (
    <div className="bg-white w-full h-full flex font-sans text-slate-800">
      {/* Left Sidebar */}
      <aside className="w-1/3 bg-slate-50 border-r border-slate-100 p-8 flex flex-col gap-8">
        <div>
          <div className="w-24 h-24 rounded-2xl bg-white shadow-sm mb-6 flex items-center justify-center border border-slate-100 overflow-hidden">
             {header.photo ? (
               <img src={header.photo} alt="Profile" className="w-full h-full object-cover" />
             ) : (
               <div className="text-2xl font-black text-slate-200 uppercase">{header.firstName?.[0]}{header.surname?.[0]}</div>
             )}
          </div>
          <h1 className="text-2xl font-black text-slate-900 leading-tight">
            {header.firstName}<br />
            <span style={{ color: accentColor }}>{header.surname}</span>
          </h1>
          <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">{header.jobTitle}</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Contact</h2>
          <div className="space-y-3 text-[11px] font-medium text-slate-600">
            <div className="flex items-center gap-3"><AtSign className="h-3.5 w-3.5 opacity-50" /> {header.email}</div>
            <div className="flex items-center gap-3"><Smartphone className="h-3.5 w-3.5 opacity-50" /> {header.phone}</div>
            {header.profileLink && (<div className="flex items-center gap-3">{header.profileLabel || "Link"}:  {header.profileLink}</div>)}
            <div className="flex items-center gap-3"><MapPin className="h-3.5 w-3.5 opacity-50" /> {header.city}</div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {(skills?.content || "").split(",").filter(Boolean).map((skill, i) => (
              <span key={i} className="px-2 py-1 bg-white border border-slate-100 text-[9px] font-bold text-slate-500 rounded uppercase">
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto">
           <div className="h-1 w-12 rounded-full" style={{ backgroundColor: accentColor }} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 flex flex-col gap-10">
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-4">About Me</h2>
          <p className="text-sm leading-relaxed text-slate-600 font-medium">
            {summary.content}
          </p>
        </section>

        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-6">Experience</h2>
          <div className="space-y-8">
            {experience.map((exp, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-base font-black text-slate-900">{exp.jobTitle}</h3>
                  <span className="text-[10px] font-bold text-slate-400">{exp.startYear} — {exp.endYear || "Present"}</span>
                </div>
                <p className="text-xs font-black uppercase tracking-wider" style={{ color: accentColor }}>{exp.employer}</p>
                <p className="text-[13px] text-slate-500 font-medium leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-6">Education</h2>
          <div className="grid grid-cols-1 gap-6">
            {education.map((edu, i) => (
              <div key={i}>
                <h4 className="text-sm font-black text-slate-900">{edu.degree}{edu.field ? " in " + edu.field : ""}</h4>
                <p className="text-xs font-bold text-slate-500">{edu.institution}</p>
                <p className="text-[10px] font-bold uppercase mt-1" style={{ color: accentColor }}>{edu.startYear} — {edu.endYear}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
