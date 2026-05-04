"use client";

import { ResumeData } from "@/lib/context/ResumeContext";

export const Madrid = ({ data }: { data: ResumeData }) => {
  const { header, summary, experience, education, skills, settings } = data;
  const accentColor = settings?.color || "#f97316";

  return (
    <div className="bg-white w-full h-full flex flex-col font-sans text-slate-800">
      <header className="p-16 flex justify-between items-center bg-slate-900 text-white rounded-b-[4rem]">
         <div className="space-y-4">
            <h1 className="text-5xl font-black tracking-tighter italic">
               {header.firstName} <span style={{ color: accentColor }}>{header.surname}</span>
            </h1>
            <p className="text-xl font-bold opacity-60 uppercase tracking-widest">{header.jobTitle}</p>
         </div>
         <div className="text-right text-xs font-black uppercase tracking-[0.2em] space-y-2 opacity-60">
            <div>{header.email}</div>
            <div>{header.phone}</div>
            <div>{header.city}</div>
         </div>
      </header>

      <div className="p-16 grid grid-cols-12 gap-16">
         <div className="col-span-8 space-y-12">
            <section>
               <h2 className="text-3xl font-black tracking-tighter mb-6 underline decoration-4 underline-offset-8" style={{ textDecorationColor: accentColor }}>About Me</h2>
               <p className="text-lg leading-relaxed text-slate-600 font-medium">
                  {summary.content}
               </p>
            </section>

            <section>
               <h2 className="text-3xl font-black tracking-tighter mb-10 underline decoration-4 underline-offset-8" style={{ textDecorationColor: accentColor }}>Experience</h2>
               <div className="space-y-12">
                  {experience.map((exp, i) => (
                    <div key={i} className="group relative pl-10">
                       <div className="absolute left-0 top-2 w-4 h-4 rounded-full border-4 border-slate-100" style={{ backgroundColor: accentColor }} />
                       <div className="flex justify-between items-baseline mb-2">
                          <h3 className="text-2xl font-black text-slate-900">{exp.jobTitle}</h3>
                          <span className="text-xs font-black text-slate-300 uppercase">{exp.startYear} — {exp.endYear}</span>
                       </div>
                       <p className="text-sm font-black uppercase tracking-widest mb-4 opacity-40">{exp.employer}</p>
                       <p className="text-base text-slate-500 font-medium leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
               </div>
            </section>
         </div>

         <div className="col-span-4 space-y-12">
            <section>
               <h2 className="text-xl font-black uppercase mb-8 border-b-4 border-slate-900 inline-block">Skills</h2>
               <div className="flex flex-wrap gap-2">
                  {skills.content.split(',').map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 bg-slate-100 rounded-xl text-[10px] font-black uppercase text-slate-600 border border-slate-200">
                       {skill.trim()}
                    </span>
                  ))}
               </div>
            </section>

            <section>
               <h2 className="text-xl font-black uppercase mb-8 border-b-4 border-slate-900 inline-block">Education</h2>
               <div className="space-y-8">
                  {education.map((edu, i) => (
                    <div key={i}>
                       <h4 className="text-lg font-black text-slate-900">{edu.degree}</h4>
                       <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">{edu.institution}</p>
                       <p className="text-[10px] font-black mt-3" style={{ color: accentColor }}>{edu.startYear} — {edu.endYear}</p>
                    </div>
                  ))}
               </div>
            </section>
         </div>
      </div>
    </div>
  );
};
