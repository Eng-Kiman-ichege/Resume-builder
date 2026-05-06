"use client";

import { ResumeData } from "@/lib/context/ResumeContext";

export const Barcelona = ({ data }: { data: ResumeData }) => {
  const { header, summary, experience, education, skills, settings } = data;
  const accentColor = settings?.color || "#f43f5e";

  return (
    <div className="bg-white w-full h-full flex flex-col font-sans overflow-hidden">
      <div className="h-6 w-full flex">
         <div className="flex-1" style={{ backgroundColor: accentColor }} />
         <div className="flex-1 bg-slate-900" />
         <div className="flex-1 opacity-20" style={{ backgroundColor: accentColor }} />
      </div>
      
      <header className="p-16 pb-0 flex justify-between items-end">
        <div>
           <h1 className="text-7xl font-black tracking-tighter text-slate-900 leading-[0.8]">
             {header.firstName}<br />
             <span style={{ color: accentColor }}>{header.surname}</span>
           </h1>
           <p className="text-2xl font-bold text-slate-300 mt-6 lowercase italic">{header.jobTitle}</p>
        </div>
        <div className="text-right text-xs font-black uppercase tracking-[0.2em] text-slate-400 space-y-1">
           <div>{header.email}</div>
           <div>{header.phone}</div>
           {header.profileLink && (<div>{header.profileLink}</div>)}
           <div>{header.city}</div>
        </div>
      </header>

      <div className="p-16 grid grid-cols-12 gap-16">
        <div className="col-span-4 space-y-12">
           <section>
              <h2 className="text-xs font-black uppercase text-white bg-slate-900 px-4 py-1 inline-block mb-6">Expertise</h2>
              <div className="flex flex-col gap-2">
                 {(skills?.content || "").split(",").filter(Boolean).map((skill, i) => (
                   <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                      <span className="text-sm font-bold text-slate-600 uppercase tracking-widest">{skill.trim()}</span>
                   </div>
                 ))}
              </div>
           </section>

           <section>
              <h2 className="text-xs font-black uppercase text-white bg-slate-900 px-4 py-1 inline-block mb-6">Education</h2>
              {education.map((edu, i) => (
                <div key={i} className="mb-6">
                   <h4 className="text-base font-black text-slate-900 leading-tight">{edu.degree}{edu.field ? " in " + edu.field : ""}</h4>
                   <p className="text-xs font-bold text-slate-400 mt-1">{edu.institution}</p>
                </div>
              ))}
           </section>
        </div>

        <div className="col-span-8 space-y-12">
           <section>
              <p className="text-xl font-medium leading-relaxed text-slate-500 border-l-4 pl-8" style={{ borderColor: accentColor }}>
                {summary.content}
              </p>
           </section>

           <section>
              <h2 className="text-xs font-black uppercase text-white bg-slate-900 px-4 py-1 inline-block mb-8">Experience</h2>
              <div className="space-y-10">
                {experience.map((exp, i) => (
                  <div key={i} className="relative pl-8 border-l-2 border-slate-100">
                    <div className="absolute left-[-6px] top-1 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor }} />
                    <h3 className="text-2xl font-black text-slate-900 leading-none mb-1">{exp.jobTitle}</h3>
                    <p className="text-sm font-black uppercase tracking-widest mb-4" style={{ color: accentColor }}>{exp.employer} / {exp.startYear} — {exp.endYear}</p>
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
