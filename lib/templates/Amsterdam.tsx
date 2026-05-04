"use client";

import { ResumeData } from "@/lib/context/ResumeContext";

export const Amsterdam = ({ data }: { data: ResumeData }) => {
  const { header, summary, experience, education, skills, settings } = data;
  const accentColor = settings?.color || "#000000";

  return (
    <div className="bg-white w-full h-full p-0 flex flex-col font-sans text-slate-900 border-[16px] border-slate-900">
      <div className="flex flex-1">
        {/* Left Column */}
        <div className="w-[400px] border-r-8 border-slate-900 p-12 space-y-12 bg-slate-50">
           <header className="space-y-6">
              <h1 className="text-6xl font-black uppercase tracking-tighter leading-none break-words">
                {header.firstName}<br />
                {header.surname}
              </h1>
              <div className="h-4 w-24 bg-slate-900" style={{ backgroundColor: accentColor }} />
              <p className="text-xl font-bold uppercase tracking-widest text-slate-400 leading-tight">{header.jobTitle}</p>
           </header>

           <section className="space-y-6">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-white bg-slate-900 px-3 py-1 inline-block">Contact</h2>
              <div className="space-y-3 text-xs font-black uppercase tracking-widest leading-relaxed">
                 <div>{header.email}</div>
                 <div>{header.phone}</div>
                 <div>{header.city}, {header.country}</div>
              </div>
           </section>

           <section className="space-y-6">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-white bg-slate-900 px-3 py-1 inline-block">Skills</h2>
              <div className="flex flex-wrap gap-2">
                 {skills.content.split(',').map((skill, i) => (
                   <span key={i} className="px-3 py-1 border-2 border-slate-900 text-[10px] font-black uppercase">
                      {skill.trim()}
                   </span>
                 ))}
              </div>
           </section>
        </div>

        {/* Right Column */}
        <div className="flex-1 p-12 space-y-16">
           <section>
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 border-b-8 border-slate-900 inline-block">Introduction</h2>
              <p className="text-lg leading-relaxed font-bold text-slate-600">
                {summary.content}
              </p>
           </section>

           <section>
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-10 border-b-8 border-slate-900 inline-block">Professional Path</h2>
              <div className="space-y-12">
                {experience.map((exp, i) => (
                  <div key={i} className="space-y-3">
                     <div className="flex justify-between items-baseline font-black uppercase tracking-tighter">
                        <h3 className="text-3xl leading-none">{exp.jobTitle}</h3>
                        <span className="text-sm opacity-30">{exp.startYear} — {exp.endYear}</span>
                     </div>
                     <p className="text-sm font-black uppercase tracking-widest" style={{ color: accentColor }}>{exp.employer}</p>
                     <p className="text-base text-slate-500 font-bold leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
           </section>

           <section>
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 border-b-8 border-slate-900 inline-block">Academic</h2>
              <div className="grid grid-cols-2 gap-8">
                 {education.map((edu, i) => (
                   <div key={i}>
                      <h4 className="text-lg font-black uppercase">{edu.degree}</h4>
                      <p className="text-xs font-bold text-slate-400 mt-1">{edu.institution}</p>
                   </div>
                 ))}
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};
