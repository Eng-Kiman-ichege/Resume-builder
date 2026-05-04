"use client";

import { ResumeData } from "@/lib/context/ResumeContext";

export const Seattle = ({ data }: { data: ResumeData }) => {
  const { header, summary, experience, education, skills, settings } = data;
  const accentColor = settings?.color || "#0369a1";

  return (
    <div className="bg-white w-full h-full flex flex-col font-sans text-slate-800">
      <header className="bg-slate-900 text-white p-16 flex justify-between items-center relative overflow-hidden">
         {/* Decorative circle */}
         <div className="absolute right-[-50px] top-[-50px] w-64 h-64 rounded-full opacity-10" style={{ backgroundColor: accentColor }} />
         
         <div className="relative z-10">
            <h1 className="text-6xl font-black tracking-tighter uppercase leading-none mb-4">
               {header.firstName}<br />
               <span style={{ color: accentColor }}>{header.surname}</span>
            </h1>
            <p className="text-xl font-bold uppercase tracking-[0.4em] opacity-40">{header.jobTitle}</p>
         </div>
         
         <div className="text-right text-[11px] font-black uppercase tracking-widest space-y-3 opacity-60 relative z-10">
            <div>{header.email}</div>
            <div>{header.phone}</div>
            <div>{header.city}</div>
         </div>
      </header>

      <div className="p-16 grid grid-cols-12 gap-16 flex-1">
         <div className="col-span-4 space-y-12">
            <section>
               <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-6">Expertise</h2>
               <div className="space-y-4">
                  {skills.content.split(',').map((skill, i) => (
                    <div key={i} className="space-y-2">
                       <div className="flex justify-between text-[10px] font-black uppercase">
                          <span>{skill.trim()}</span>
                       </div>
                       <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${60 + Math.random() * 40}%`, backgroundColor: accentColor }} />
                       </div>
                    </div>
                  ))}
               </div>
            </section>

            <section>
               <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-6">Education</h2>
               <div className="space-y-6">
                  {education.map((edu, i) => (
                    <div key={i}>
                       <h4 className="text-base font-black text-slate-900">{edu.degree}</h4>
                       <p className="text-xs font-bold text-slate-400 mt-1">{edu.institution}</p>
                       <p className="text-[10px] font-black mt-2 opacity-30">{edu.startYear} — {edu.endYear}</p>
                    </div>
                  ))}
               </div>
            </section>
         </div>

         <div className="col-span-8 space-y-12">
            <section>
               <p className="text-lg leading-relaxed text-slate-600 font-medium bg-slate-50 p-8 rounded-3xl border border-slate-100 italic">
                  {summary.content}
               </p>
            </section>

            <section>
               <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-10">Professional Path</h2>
               <div className="space-y-12">
                  {experience.map((exp, i) => (
                    <div key={i} className="group border-l-4 pl-8 transition-colors" style={{ borderColor: i === 0 ? accentColor : '#f1f5f9' }}>
                       <div className="flex justify-between items-baseline mb-2">
                          <h3 className="text-2xl font-black text-slate-900 leading-none">{exp.jobTitle}</h3>
                          <span className="text-xs font-black text-slate-200 uppercase">{exp.startYear} — {exp.endYear}</span>
                       </div>
                       <p className="text-sm font-black uppercase tracking-widest mb-4 opacity-40">{exp.employer}</p>
                       <p className="text-base text-slate-500 font-medium leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
               </div>
            </section>
         </div>
      </div>
    </div>
  );
};
