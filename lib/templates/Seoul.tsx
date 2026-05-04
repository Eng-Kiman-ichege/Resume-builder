"use client";

import { ResumeData } from "@/lib/context/ResumeContext";

export const Seoul = ({ data }: { data: ResumeData }) => {
  const { header, summary, experience, education, skills, settings } = data;
  const accentColor = settings?.color || "#1e293b";

  return (
    <div className="bg-white w-full h-full p-16 flex font-sans text-slate-800">
      <div className="w-1 bg-slate-100 mr-12 h-full rounded-full" />
      <div className="flex-1 space-y-16">
        <header className="space-y-4">
           <h1 className="text-6xl font-black tracking-tighter text-slate-900 leading-none">
             {header.firstName} {header.surname}
           </h1>
           <div className="flex items-center gap-6 text-sm font-bold text-slate-400 uppercase tracking-widest">
              <span className="px-3 py-1 bg-slate-900 text-white rounded shadow-lg">{header.jobTitle}</span>
              <span>{header.email}</span>
              <span>{header.phone}</span>
           </div>
        </header>

        <section className="max-w-2xl">
           <p className="text-xl font-medium leading-relaxed text-slate-600 border-l-8 pl-10" style={{ borderColor: accentColor }}>
             {summary.content}
           </p>
        </section>

        <div className="grid grid-cols-2 gap-20">
          <section className="space-y-12">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Experience</h2>
            <div className="space-y-10">
              {experience.map((exp, i) => (
                <div key={i} className="space-y-2">
                   <h3 className="text-xl font-black text-slate-900">{exp.jobTitle}</h3>
                   <p className="text-xs font-black uppercase" style={{ color: accentColor }}>{exp.employer} // {exp.startYear} — {exp.endYear}</p>
                   <p className="text-sm text-slate-500 font-medium leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="space-y-16">
             <section className="space-y-8">
               <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Skills</h2>
               <div className="flex flex-wrap gap-3">
                  {skills.content.split(',').map((skill, i) => (
                    <span key={i} className="px-3 py-1 border-2 border-slate-100 text-[11px] font-black uppercase text-slate-500 hover:border-slate-900 hover:text-slate-900 transition-colors">
                      {skill.trim()}
                    </span>
                  ))}
               </div>
             </section>

             <section className="space-y-8">
               <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Education</h2>
               <div className="space-y-6">
                  {education.map((edu, i) => (
                    <div key={i}>
                       <h4 className="text-base font-black text-slate-900">{edu.degree}</h4>
                       <p className="text-xs font-bold text-slate-400 mt-1">{edu.institution}</p>
                    </div>
                  ))}
               </div>
             </section>
          </div>
        </div>
      </div>
    </div>
  );
};
