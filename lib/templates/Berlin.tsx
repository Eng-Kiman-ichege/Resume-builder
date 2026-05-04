"use client";

import { ResumeData } from "@/lib/context/ResumeContext";

export const Berlin = ({ data }: { data: ResumeData }) => {
  const { header, summary, experience, education, skills, settings } = data;
  const accentColor = settings?.color || "#000000";

  return (
    <div className="bg-white w-full h-full p-12 flex flex-col font-mono text-black border-[12px] border-black">
      <header className="border-b-4 border-black pb-8 mb-12">
        <h1 className="text-6xl font-black uppercase tracking-tighter leading-[0.8] mb-4">
          {header.firstName}<br />
          {header.surname}
        </h1>
        <p className="text-xl font-black uppercase bg-black text-white px-4 py-1 inline-block">
          {header.jobTitle}
        </p>
        <div className="mt-8 grid grid-cols-3 text-[10px] font-black uppercase">
          <div>E: {header.email}</div>
          <div>P: {header.phone}</div>
          <div>L: {header.city}</div>
        </div>
      </header>

      <div className="flex-1 space-y-12">
        <section>
          <h2 className="text-2xl font-black uppercase mb-4 border-b-2 border-black inline-block">Profile</h2>
          <p className="text-sm font-bold leading-tight uppercase">
            {summary.content}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black uppercase mb-8 border-b-2 border-black inline-block">Experience</h2>
          <div className="space-y-10">
            {experience.map((exp, i) => (
              <div key={i} className="border-l-4 border-black pl-6">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="text-xl font-black uppercase leading-none">{exp.jobTitle}</h3>
                   <span className="text-[10px] font-black">{exp.startYear} — {exp.endYear}</span>
                </div>
                <p className="text-xs font-black uppercase mb-4" style={{ color: accentColor }}>{exp.employer}</p>
                <p className="text-sm font-bold uppercase opacity-60 leading-tight">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-12 pt-12 border-t-4 border-black">
           <section>
             <h2 className="text-xl font-black uppercase mb-6">Education</h2>
             {education.map((edu, i) => (
               <div key={i} className="mb-4">
                 <h4 className="text-base font-black uppercase">{edu.degree}</h4>
                 <p className="text-xs font-bold uppercase">{edu.institution}</p>
               </div>
             ))}
           </section>
           <section>
             <h2 className="text-xl font-black uppercase mb-6">Skills</h2>
             <div className="flex flex-wrap gap-2">
                {skills.content.split(',').map((skill, i) => (
                  <span key={i} className="border-2 border-black px-2 py-1 text-[10px] font-black uppercase">
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
