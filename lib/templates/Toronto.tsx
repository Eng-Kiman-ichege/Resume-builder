"use client";

import { ResumeData } from "@/lib/context/ResumeContext";
import { Mail, Phone, MapPin, AtSign, Smartphone } from "lucide-react";

export const Toronto = ({ data }: { data: ResumeData }) => {
  const { header, summary, experience, education, skills, settings } = data;
  const accentColor = settings?.color || "#3b82f6";

  return (
    <div className="bg-white w-full h-full p-12 flex flex-col font-sans text-slate-800">
      <header className="flex items-center gap-10 mb-16">
        <div className="w-48 h-12 flex items-center justify-center bg-slate-900 text-white rounded-lg rotate-[-2deg] flex-shrink-0">
           <span className="text-xl font-black uppercase tracking-[0.2em]">{header.firstName}</span>
        </div>
        <div className="flex-1 border-b-8 border-slate-900 pb-2">
           <h1 className="text-5xl font-black text-slate-900 uppercase tracking-tighter">
             {header.surname}
           </h1>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-16 flex-1">
        <div className="col-span-4 space-y-12">
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-6">Contact</h2>
            <div className="space-y-4 text-sm font-bold">
               <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} /> {header.email}</div>
               <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} /> {header.phone}</div>
               <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} /> {header.city}</div>
            </div>
          </section>

          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-6">Core Skills</h2>
            <div className="space-y-3">
               {skills.content.split(',').map((skill, i) => (
                 <div key={i} className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors cursor-default">
                    {skill.trim()}
                 </div>
               ))}
            </div>
          </section>

          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-6">Academic</h2>
            <div className="space-y-6">
               {education.map((edu, i) => (
                 <div key={i}>
                    <h4 className="text-sm font-black text-slate-900">{edu.degree}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">{edu.institution}</p>
                 </div>
               ))}
            </div>
          </section>
        </div>

        <div className="col-span-8 space-y-16">
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-8 flex items-center gap-4">
              Overview <div className="h-2 w-2 rounded-full" style={{ backgroundColor: accentColor }} />
            </h2>
            <p className="text-lg leading-relaxed text-slate-600 font-medium">
              {summary.content}
            </p>
          </section>

          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-10 flex items-center gap-4">
              Professional <div className="h-2 w-2 rounded-full" style={{ backgroundColor: accentColor }} />
            </h2>
            <div className="space-y-12">
              {experience.map((exp, i) => (
                <div key={i} className="group relative">
                  <div className="flex justify-between items-baseline mb-2">
                     <h3 className="text-2xl font-black text-slate-900 group-hover:translate-x-2 transition-transform duration-300">{exp.jobTitle}</h3>
                     <span className="text-[10px] font-black text-slate-300 uppercase">{exp.startYear} — {exp.endYear}</span>
                  </div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] mb-4" style={{ color: accentColor }}>{exp.employer}</p>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
