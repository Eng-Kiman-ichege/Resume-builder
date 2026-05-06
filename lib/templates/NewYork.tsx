"use client";

import { ResumeData } from "@/lib/context/ResumeContext";
import { AtSign, Smartphone, MapPin, Globe } from "lucide-react";

export const NewYork = ({ data }: { data: ResumeData }) => {
  const { header, summary, experience, education, skills, settings } = data;
  const accentColor = settings?.color || "#2563eb";

  return (
    <div className="bg-white w-full h-full p-16 flex flex-col font-sans text-slate-900">
      {/* Header */}
      <header className="flex justify-between items-start mb-16">
        <div className="flex-1">
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter uppercase mb-2">
            {header.firstName}<br />
            <span style={{ color: accentColor }}>{header.surname}</span>
          </h1>
          <div className="h-2 w-32 rounded-full mt-4" style={{ backgroundColor: accentColor }} />
        </div>
        <div className="flex flex-col items-end gap-3 text-sm font-black uppercase tracking-widest text-slate-400">
          <p className="text-xl text-slate-900 mb-4">{header.jobTitle}</p>
          <div className="flex items-center gap-3">{header.email} <AtSign className="h-4 w-4" style={{ color: accentColor }} /></div>
          <div className="flex items-center gap-3">{header.phone} <Smartphone className="h-4 w-4" style={{ color: accentColor }} /></div>
          {header.profileLink && (<div className="flex items-center gap-3">{header.profileLink} {header.profileLabel || "Link"}: </div>)}
          <div className="flex items-center gap-3">{header.city}, {header.country} <MapPin className="h-4 w-4" style={{ color: accentColor }} /></div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-20">
        {/* Main Column */}
        <div className="col-span-8 space-y-16">
          <section>
             <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900 mb-8 pb-4 border-b-4 border-slate-100">Professional Summary</h2>
             <p className="text-lg leading-relaxed text-slate-600 font-medium">
               {summary.content}
             </p>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900 mb-10 pb-4 border-b-4 border-slate-100">Work History</h2>
            <div className="space-y-12">
              {experience.map((exp, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="w-24 flex-shrink-0 pt-1">
                    <span className="text-xs font-black text-slate-300 uppercase tracking-widest">{exp.startYear} — {exp.endYear || "Present"}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors" style={{ color: i === 0 ? accentColor : undefined }}>{exp.jobTitle}</h3>
                    <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4">{exp.employer}</p>
                    <p className="text-base text-slate-500 font-medium leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="col-span-4 space-y-16">
          <section>
            <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900 mb-8 pb-4 border-b-4 border-slate-100">Education</h2>
            <div className="space-y-8">
              {education.map((edu, i) => (
                <div key={i}>
                  <h4 className="text-lg font-black text-slate-900">{edu.degree}{edu.field ? " in " + edu.field : ""}</h4>
                  <p className="text-sm font-bold text-slate-500 mt-1 uppercase tracking-wider" style={{ color: accentColor }}>{edu.institution}</p>
                  <p className="text-xs font-black text-slate-300 uppercase mt-2">{edu.startYear} — {edu.endYear}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900 mb-8 pb-4 border-b-4 border-slate-100">Core Skills</h2>
            <div className="space-y-4">
              {(skills?.content || "").split(",").filter(Boolean).map((skill, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                     <span className="text-slate-600">{skill.trim()}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                     <div className="h-full bg-slate-900 rounded-full" style={{ width: `${80 + Math.random() * 20}%`, backgroundColor: accentColor }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
