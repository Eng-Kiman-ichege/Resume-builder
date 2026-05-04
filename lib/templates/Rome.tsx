"use client";

import { ResumeData } from "@/lib/context/ResumeContext";

export const Rome = ({ data }: { data: ResumeData }) => {
  const { header, summary, experience, education, skills, settings } = data;
  const accentColor = settings?.color || "#451a03";

  return (
    <div className="bg-[#fffcf0] w-full h-full p-20 flex flex-col font-serif text-slate-900 border-[20px] border-[#f0e6d2]">
      <header className="border-b-2 border-slate-900 pb-12 mb-16 text-center">
        <h1 className="text-6xl font-bold tracking-tight mb-4 uppercase">
          {header.firstName} {header.surname}
        </h1>
        <p className="text-xl italic text-slate-600 mb-8 font-medium">{header.jobTitle}</p>
        <div className="flex justify-center gap-10 text-xs font-black uppercase tracking-[0.3em] text-slate-400">
           <span>{header.email}</span>
           <span>|</span>
           <span>{header.phone}</span>
           <span>|</span>
           <span>{header.city}</span>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-16 flex-1">
        <div className="col-span-8 space-y-16">
           <section>
              <h2 className="text-xs font-black uppercase tracking-[0.5em] text-slate-300 mb-8 border-b border-slate-100 pb-2">Profile</h2>
              <p className="text-lg leading-relaxed text-slate-800 font-medium first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                {summary.content}
              </p>
           </section>

           <section>
              <h2 className="text-xs font-black uppercase tracking-[0.5em] text-slate-300 mb-10 border-b border-slate-100 pb-2">Professional Experience</h2>
              <div className="space-y-12">
                {experience.map((exp, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between items-baseline">
                       <h3 className="text-2xl font-bold text-slate-900">{exp.jobTitle}</h3>
                       <span className="text-sm font-bold italic text-slate-400">{exp.startYear} — {exp.endYear}</span>
                    </div>
                    <p className="text-sm font-black uppercase tracking-widest" style={{ color: accentColor }}>{exp.employer}</p>
                    <p className="text-base text-slate-600 leading-relaxed font-medium">{exp.description}</p>
                  </div>
                ))}
              </div>
           </section>
        </div>

        <div className="col-span-4 space-y-16">
           <section>
              <h2 className="text-xs font-black uppercase tracking-[0.5em] text-slate-300 mb-8 border-b border-slate-100 pb-2">Academic</h2>
              {education.map((edu, i) => (
                <div key={i} className="mb-6">
                   <h4 className="text-lg font-bold text-slate-900">{edu.degree}</h4>
                   <p className="text-sm italic text-slate-500 mt-1">{edu.institution}</p>
                </div>
              ))}
           </section>

           <section>
              <h2 className="text-xs font-black uppercase tracking-[0.5em] text-slate-300 mb-8 border-b border-slate-100 pb-2">Competencies</h2>
              <div className="space-y-4">
                 {skills.content.split(',').map((skill, i) => (
                   <div key={i} className="text-sm font-bold text-slate-700 border-b border-slate-50 pb-2">
                      {skill.trim()}
                   </div>
                 ))}
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};
