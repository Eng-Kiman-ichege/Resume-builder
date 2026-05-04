"use client";

import { ResumeData } from "@/lib/context/ResumeContext";
import { AtSign, Smartphone, MapPin } from "lucide-react";

export const Singapore = ({ data }: { data: ResumeData }) => {
  const { header, summary, experience, education, skills, settings } = data;
  const accentColor = settings?.color || "#2dd4bf";

  return (
    <div className="bg-white w-full h-full flex font-sans text-slate-800">
      {/* Sidebar */}
      <div className="w-[300px] bg-slate-900 text-white p-12 flex flex-col gap-12">
         <div className="w-32 h-32 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center text-4xl font-black">
            {header.firstName?.[0]}{header.surname?.[0]}
         </div>
         
         <div className="space-y-6">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Contact Info</h2>
            <div className="space-y-4 text-[11px] font-bold tracking-widest text-white/80">
               <div className="flex items-center gap-3"><AtSign className="h-3.5 w-3.5 text-teal-400" style={{ color: accentColor }} /> {header.email}</div>
               <div className="flex items-center gap-3"><Smartphone className="h-3.5 w-3.5 text-teal-400" style={{ color: accentColor }} /> {header.phone}</div>
               <div className="flex items-center gap-3"><MapPin className="h-3.5 w-3.5 text-teal-400" style={{ color: accentColor }} /> {header.city}</div>
            </div>
         </div>

         <div className="space-y-6">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Competencies</h2>
            <div className="flex flex-col gap-3">
               {skills.content.split(',').map((skill, i) => (
                 <div key={i} className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-black uppercase tracking-widest">{skill.trim()}</span>
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full rounded-full" style={{ width: `${70 + Math.random() * 30}%`, backgroundColor: accentColor }} />
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="mt-auto opacity-20 text-[9px] font-black tracking-[0.5em] uppercase">
            Professional Resume
         </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-16 flex flex-col gap-16">
         <header>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase mb-4">
               {header.firstName}<br />
               <span style={{ color: accentColor }}>{header.surname}</span>
            </h1>
            <p className="text-sm font-black uppercase tracking-[0.5em] text-slate-300">{header.jobTitle}</p>
         </header>

         <section>
            <p className="text-lg leading-relaxed text-slate-600 font-medium">
               {summary.content}
            </p>
         </section>

         <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-10 pb-2 border-b-2 border-slate-50">Professional History</h2>
            <div className="space-y-12">
               {experience.map((exp, i) => (
                 <div key={i} className="group">
                    <div className="flex justify-between items-baseline mb-2">
                       <h3 className="text-2xl font-black text-slate-900">{exp.jobTitle}</h3>
                       <span className="text-xs font-black text-slate-300 uppercase tracking-widest">{exp.startYear} — {exp.endYear}</span>
                    </div>
                    <p className="text-sm font-black uppercase tracking-widest mb-4" style={{ color: accentColor }}>{exp.employer}</p>
                    <p className="text-base text-slate-500 font-medium leading-relaxed">{exp.description}</p>
                 </div>
               ))}
            </div>
         </section>

         <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-8 pb-2 border-b-2 border-slate-50">Education</h2>
            <div className="grid grid-cols-2 gap-10">
               {education.map((edu, i) => (
                 <div key={i}>
                    <h4 className="text-lg font-black text-slate-900">{edu.degree}</h4>
                    <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest" style={{ color: accentColor }}>{edu.institution}</p>
                 </div>
               ))}
            </div>
         </section>
      </div>
    </div>
  );
};
