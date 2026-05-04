"use client";

import { ResumeData } from "@/lib/context/ResumeContext";

export const Tokyo = ({ data }: { data: ResumeData }) => {
  const { header, summary, experience, education, skills, settings } = data;
  const accentColor = settings?.color || "#10b981";

  return (
    <div className="bg-[#0a0a0a] w-full h-full p-12 flex flex-col font-mono text-[#a0a0a0]">
      {/* Header */}
      <header className="border-b-2 border-zinc-800 pb-10 flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Resume</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase">
            {header.firstName} <span style={{ color: accentColor }}>{header.surname}</span>
          </h1>
          <p className="text-sm font-bold border border-zinc-800 px-3 py-1 inline-block text-zinc-400">
             &gt; {header.jobTitle}
          </p>
        </div>
        <div className="text-right text-[10px] font-bold space-y-1">
          <div>EMAIL: {header.email}</div>
          <div>PHONE: {header.phone}</div>
          <div>LOC: {header.city}</div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-10 mt-10 flex-1">
        {/* Left Column */}
        <div className="col-span-4 space-y-10 border-r-2 border-zinc-800 pr-10">
          <section>
            <h2 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
               [01] Skills
            </h2>
            <div className="space-y-4">
              {skills.content.split(',').map((skill, i) => (
                <div key={i} className="flex items-center justify-between group">
                   <span className="text-xs uppercase group-hover:text-white transition-colors">{skill.trim()}</span>
                   <div className="flex gap-1">
                      {[1,2,3,4,5].map(dot => (
                        <div key={dot} className="w-1.5 h-1.5 rounded-full bg-zinc-800" style={{ backgroundColor: dot <= 4 ? accentColor : undefined }} />
                      ))}
                   </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
               [02] Education
            </h2>
            <div className="space-y-6">
              {education.map((edu, i) => (
                <div key={i} className="space-y-1">
                  <h4 className="text-xs font-bold text-zinc-200 uppercase">{edu.degree}</h4>
                  <p className="text-[10px] text-zinc-500 font-black">{edu.institution}</p>
                  <p className="text-[10px] opacity-50" style={{ color: accentColor }}>{edu.startYear} - {edu.endYear}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="col-span-8 space-y-10">
          <section>
            <h2 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-6">
               [03] Profile
            </h2>
            <p className="text-xs leading-relaxed font-medium bg-zinc-900/50 p-6 border border-zinc-800 rounded-lg">
               {summary.content}
            </p>
          </section>

          <section>
            <h2 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-6">
               [04] Experience
            </h2>
            <div className="space-y-8">
              {experience.map((exp, i) => (
                <div key={i} className="space-y-3 relative pl-6 border-l border-zinc-800">
                  <div className="absolute left-[-4px] top-1 w-2 h-2 rotate-45" style={{ backgroundColor: accentColor }} />
                  <div className="flex justify-between items-baseline font-bold">
                    <h3 className="text-sm text-white uppercase">{exp.jobTitle}</h3>
                    <span className="text-[10px] opacity-40">{exp.startYear} // {exp.endYear}</span>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: accentColor }}>{exp.employer}</p>
                  <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <footer className="mt-auto pt-10 border-t border-zinc-800 flex justify-between items-end text-[8px] font-black uppercase tracking-widest opacity-20">
         <div>{header.firstName} {header.surname} · Resume</div>
         <div>&copy; {new Date().getFullYear()}</div>
      </footer>
    </div>
  );
};
