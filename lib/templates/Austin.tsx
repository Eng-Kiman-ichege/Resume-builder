"use client";

import { ResumeData } from "@/lib/context/ResumeContext";

export const Austin = ({ data }: { data: ResumeData }) => {
  const { header, summary, experience, education, skills, settings } = data;
  const accentColor = settings?.color || "#4f46e5";

  return (
    <div className="bg-white w-full h-full p-12 flex flex-col font-sans text-slate-700">
      <header className="flex flex-col items-start gap-4 mb-16 border-l-8 pl-10" style={{ borderColor: accentColor }}>
         <h1 className="text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            {header.firstName}<br />
            {header.surname}
         </h1>
         <p className="text-xl font-bold text-slate-400 uppercase tracking-[0.3em]">{header.jobTitle}</p>
         <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest opacity-60">
            <span>{header.email}</span>
            <span>{header.phone}</span>
            {header.profileLink && (<span>{header.profileLink}</span>)}
            <span>{header.city}</span>
         </div>
      </header>

      <div className="grid grid-cols-1 gap-16">
         <section>
            <p className="text-xl font-medium leading-relaxed text-slate-500 max-w-3xl">
               {summary.content}
            </p>
         </section>

         <section>
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-10">Working History</h2>
            <div className="space-y-12">
               {experience.map((exp, i) => (
                 <div key={i} className="grid grid-cols-12 gap-8 group">
                    <div className="col-span-3 pt-1">
                       <span className="text-[10px] font-black text-slate-300 uppercase">{exp.startYear} — {exp.endYear}</span>
                    </div>
                    <div className="col-span-9">
                       <h3 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors" style={{ color: i === 0 ? accentColor : undefined }}>{exp.jobTitle}</h3>
                       <p className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">{exp.employer}</p>
                       <p className="text-base text-slate-500 font-medium leading-relaxed">{exp.description}</p>
                    </div>
                 </div>
               ))}
            </div>
         </section>

         <div className="grid grid-cols-2 gap-16 pt-16 border-t border-slate-100">
            <section>
               <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-8">Education</h2>
               {education.map((edu, i) => (
                 <div key={i} className="mb-6">
                    <h4 className="text-lg font-black text-slate-900">{edu.degree}{edu.field ? " in " + edu.field : ""}</h4>
                    <p className="text-sm font-bold text-slate-400 mt-1">{edu.institution}</p>
                 </div>
               ))}
            </section>
            <section>
               <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-8">Tech Stack</h2>
               <div className="flex flex-wrap gap-2">
                  {(skills?.content || "").split(",").filter(Boolean).map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 bg-slate-900 text-white rounded text-[10px] font-black uppercase tracking-widest">
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
