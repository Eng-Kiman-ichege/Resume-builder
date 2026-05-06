"use client";

import { ResumeData } from "@/lib/context/ResumeContext";

export const Milan = ({ data }: { data: ResumeData }) => {
  const { header, summary, experience, education, skills, settings } = data;
  const accentColor = settings?.color || "#be123c";

  return (
    <div className="bg-[#fffefe] w-full h-full p-20 flex flex-col font-serif text-slate-900 items-center">
      <header className="text-center mb-20 w-full">
         <div className="h-0.5 w-full bg-slate-900 mb-4" />
         <h1 className="text-8xl font-black uppercase tracking-tighter text-slate-900 leading-none">
            {header.firstName}
         </h1>
         <h1 className="text-8xl font-black uppercase tracking-tighter text-slate-900 leading-none opacity-10 -mt-8">
            {header.surname}
         </h1>
         <div className="flex justify-between items-center mt-8 text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">
            <span>{header.city}</span>
            <span className="text-2xl font-light opacity-20 px-8">/</span>
            <span style={{ color: accentColor }}>{header.jobTitle}</span>
            <span className="text-2xl font-light opacity-20 px-8">/</span>
            <span>{header.email}</span>
            {header.profileLink && (
              <>
                <span className="text-2xl font-light opacity-20 px-8">/</span>
                <span>{header.profileLabel || "Link"}: {header.profileLink}</span>
              </>
            )}
         </div>
         <div className="h-0.5 w-full bg-slate-900 mt-4" />
      </header>

      <div className="max-w-3xl space-y-20">
         <section className="text-center">
            <p className="text-2xl leading-relaxed font-light text-slate-500 italic">
               "{summary.content}"
            </p>
         </section>

         <section>
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 text-center mb-12">Experience</h2>
            <div className="space-y-16">
               {experience.map((exp, i) => (
                 <div key={i} className="flex flex-col items-center text-center group">
                    <h3 className="text-3xl font-black text-slate-900 mb-2 group-hover:italic transition-all duration-500">{exp.jobTitle}</h3>
                    <p className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: accentColor }}>{exp.employer} | {exp.startYear} — {exp.endYear}</p>
                    <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl">{exp.description}</p>
                 </div>
               ))}
            </div>
         </section>

         <div className="grid grid-cols-2 gap-20 pt-20 border-t border-slate-100">
            <section className="space-y-8">
               <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300">Education</h2>
               <div className="space-y-8">
                  {education.map((edu, i) => (
                    <div key={i}>
                       <h4 className="text-xl font-bold text-slate-900">{edu.degree}{edu.field ? " in " + edu.field : ""}</h4>
                       <p className="text-sm italic text-slate-400 mt-1">{edu.institution}</p>
                       <p className="text-xs font-black text-slate-200 mt-3">{edu.startYear} — {edu.endYear}</p>
                    </div>
                  ))}
               </div>
            </section>

            <section className="space-y-8">
               <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300">Skills</h2>
               <div className="flex flex-col gap-4">
                  {(skills?.content || "").split(",").filter(Boolean).map((skill, i) => (
                    <div key={i} className="flex items-center justify-between group">
                       <span className="text-sm font-bold text-slate-700 uppercase tracking-widest group-hover:translate-x-2 transition-transform">{skill.trim()}</span>
                       <div className="w-12 h-0.5 bg-slate-100 group-hover:w-20 transition-all duration-500" style={{ backgroundColor: accentColor }} />
                    </div>
                  ))}
               </div>
            </section>
         </div>
      </div>
      
      <footer className="mt-20 opacity-10 text-[10px] font-black uppercase tracking-[1em]">
         Curriculum Vitae
      </footer>
    </div>
  );
};
