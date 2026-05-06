"use client";

import { ResumeData } from "@/lib/context/ResumeContext";

export const Stockholm = ({ data }: { data: ResumeData }) => {
  const { header, summary, experience, education, skills, settings } = data;
  const accentColor = settings?.color || "#94a3b8";

  return (
    <div className="bg-[#f8fafc] w-full h-full p-20 flex flex-col font-sans text-slate-600">
      <header className="mb-20">
         <h1 className="text-4xl font-light text-slate-900 tracking-tight mb-2">
            Hi, I'm <span className="font-black">{header.firstName} {header.surname}</span>
         </h1>
         <p className="text-xl font-medium text-slate-400">{header.jobTitle}</p>
         <div className="flex gap-8 mt-8 text-xs font-bold uppercase tracking-widest text-slate-400">
            <span>{header.email}</span>
            <span>{header.phone}</span>
            {header.profileLink && (<span>{header.profileLink}</span>)}
            <span>{header.city}</span>
         </div>
      </header>

      <div className="grid grid-cols-12 gap-20">
         <div className="col-span-8 space-y-20">
            <section>
               <p className="text-2xl leading-relaxed font-light text-slate-900/80">
                  {summary.content}
               </p>
            </section>

            <section>
               <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-10">Experience</h2>
               <div className="space-y-16">
                  {experience.map((exp, i) => (
                    <div key={i} className="group">
                       <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4 block">{exp.startYear} — {exp.endYear}</span>
                       <h3 className="text-2xl font-black text-slate-900 mb-2">{exp.jobTitle}</h3>
                       <p className="text-sm font-black uppercase tracking-widest mb-6" style={{ color: accentColor }}>{exp.employer}</p>
                       <p className="text-base text-slate-500 font-medium leading-relaxed max-w-xl">{exp.description}</p>
                    </div>
                  ))}
               </div>
            </section>
         </div>

         <div className="col-span-4 space-y-16">
            <section>
               <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-8">Expertise</h2>
               <div className="flex flex-wrap gap-2">
                  {(skills?.content || "").split(",").filter(Boolean).map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-white rounded-lg text-xs font-bold text-slate-600 shadow-sm">
                       {skill.trim()}
                    </span>
                  ))}
               </div>
            </section>

            <section>
               <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-8">Education</h2>
               <div className="space-y-8">
                  {education.map((edu, i) => (
                    <div key={i}>
                       <h4 className="text-base font-bold text-slate-900">{edu.degree}{edu.field ? " in " + edu.field : ""}</h4>
                       <p className="text-xs font-medium text-slate-400 mt-1">{edu.institution}</p>
                    </div>
                  ))}
               </div>
            </section>
         </div>
      </div>
    </div>
  );
};
