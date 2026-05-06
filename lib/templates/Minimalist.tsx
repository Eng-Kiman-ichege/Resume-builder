"use client";

import { ResumeData } from "@/lib/context/ResumeContext";
import { Mail, Phone, MapPin, AtSign, Smartphone, Globe } from "lucide-react";

export const Minimalist = ({ data }: { data: ResumeData }) => {
  const { header, summary, experience, education, skills, settings } = data;
  const accentColor = settings?.color || "#000000";

  return (
    <div className="bg-white w-full h-full flex flex-col font-sans text-slate-900">
      {/* Top Section with Photo and Header */}
      <header className="p-12 pb-8 flex items-start gap-8 border-b border-slate-100">
        {/* Photo Placeholder */}
        <div className="w-32 h-32 rounded-full bg-slate-100 border-4 border-white shadow-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
          {header.photo ? (
            <img src={header.photo} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="text-slate-300 font-black text-4xl">
              {header.firstName?.[0]}{header.surname?.[0]}
            </div>
          )}
        </div>

        <div className="flex-1 pt-2">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase mb-1">
            {header.firstName || "First"} {header.surname || "Surname"}
          </h1>
          <p 
            className="text-lg font-bold uppercase tracking-[0.2em] mb-4"
            style={{ color: accentColor }}
          >
            {header.jobTitle || "Professional Title"}
          </p>
          
          <div className="flex flex-wrap gap-y-2 gap-x-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            <div className="flex items-center gap-1.5"><AtSign className="h-3 w-3" style={{ color: accentColor }} /> {header.email}</div>
            <div className="flex items-center gap-1.5"><Smartphone className="h-3 w-3" style={{ color: accentColor }} /> {header.phone}</div>
            {header.profileLink && (<div className="flex items-center gap-1.5">{header.profileLabel || "Link"}:  {header.profileLink}</div>)}
            <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3" style={{ color: accentColor }} /> {header.city}, {header.country}</div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col p-12 pt-8 gap-10">
        {/* Summary */}
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4 flex items-center gap-4">
            Profile <div className="h-px flex-1 bg-slate-100" />
          </h2>
          <p className="text-[14px] leading-relaxed text-slate-600 font-medium">
            {summary.content}
          </p>
        </section>

        <div className="grid grid-cols-12 gap-12">
          {/* Main Column */}
          <div className="col-span-8 space-y-10">
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 flex items-center gap-4">
                Experience <div className="h-px flex-1 bg-slate-100" />
              </h2>
              <div className="space-y-8">
                {experience.map((exp, i) => (
                  <div key={i} className="relative pl-6 border-l-2 border-slate-50 group">
                    <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-slate-200 group-hover:bg-blue-600 transition-colors" style={{ backgroundColor: i === 0 ? accentColor : undefined }} />
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-lg font-bold text-slate-900">{exp.jobTitle}</h3>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{exp.startYear} — {exp.endYear || "Present"}</span>
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: accentColor }}>{exp.employer}</p>
                    <p className="text-[13px] text-slate-500 font-medium leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="col-span-4 space-y-10">
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6">Education</h2>
              <div className="space-y-6">
                {education.map((edu, i) => (
                  <div key={i}>
                    <h4 className="text-sm font-bold text-slate-900">{edu.degree}{edu.field ? " in " + edu.field : ""}</h4>
                    <p className="text-[11px] font-bold uppercase tracking-wider mt-1" style={{ color: accentColor }}>{edu.institution}</p>
                    <p className="text-[10px] font-medium text-slate-400 mt-0.5">{edu.startYear} — {edu.endYear}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {(skills?.content || "").split(",").filter(Boolean).map((skill, i) => (
                  <span key={i} className="px-2.5 py-1 bg-slate-50 text-[10px] font-bold text-slate-600 rounded-md uppercase tracking-wider border border-slate-100">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="mt-auto p-12 pt-0 flex justify-end">
        <div className="w-12 h-1 rounded-full opacity-20" style={{ backgroundColor: accentColor }} />
      </footer>
    </div>
  );
};
