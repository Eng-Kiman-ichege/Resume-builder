"use client";

import { ResumeData } from "@/lib/context/ResumeContext";
import { Mail, Phone, MapPin } from "lucide-react";

export const Sydney = ({ data }: { data: ResumeData }) => {
  const { header, summary, experience, education, skills, settings } = data;
  const accentColor = settings?.color || "#6366f1";

  return (
    <div className="bg-white w-full h-full p-12 flex flex-col font-sans text-slate-700">
      <header className="bg-slate-50 rounded-[3rem] p-10 mb-12 flex items-center justify-between shadow-sm border border-slate-100">
        <div className="flex items-center gap-8">
           <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-lg" style={{ backgroundColor: accentColor }}>
              {header.firstName?.[0]}{header.surname?.[0]}
           </div>
           <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                {header.firstName} {header.surname}
              </h1>
              <p className="text-lg font-bold opacity-60 mt-1">{header.jobTitle}</p>
           </div>
        </div>
        <div className="text-[11px] font-bold text-right space-y-2 text-slate-400 uppercase tracking-widest">
           <div className="flex items-center justify-end gap-3">{header.email} <Mail className="h-3.5 w-3.5" style={{ color: accentColor }} /></div>
           <div className="flex items-center justify-end gap-3">{header.phone} <Phone className="h-3.5 w-3.5" style={{ color: accentColor }} /></div>
           {header.profileLink && (<div className="flex items-center justify-end gap-3">{header.profileLink} {header.profileLabel || "Link"}: </div>)}
           <div className="flex items-center justify-end gap-3">{header.city} <MapPin className="h-3.5 w-3.5" style={{ color: accentColor }} /></div>
        </div>
      </header>

      <div className="px-6 flex-1 flex flex-col gap-12">
        <section>
          <div className="flex items-center gap-4 mb-6">
             <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-300">Profile</h2>
             <div className="h-px flex-1 bg-slate-100" />
          </div>
          <p className="text-base leading-relaxed font-medium text-slate-500 italic">
            {summary.content}
          </p>
        </section>

        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-7 space-y-12">
            <section>
              <div className="flex items-center gap-4 mb-8">
                 <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-300">Experience</h2>
                 <div className="h-px flex-1 bg-slate-100" />
              </div>
              <div className="space-y-10">
                {experience.map((exp, i) => (
                  <div key={i} className="bg-slate-50/50 p-6 rounded-3xl border border-slate-50 hover:border-slate-200 transition-colors">
                    <div className="flex justify-between items-baseline mb-2">
                       <h3 className="text-xl font-black text-slate-900">{exp.jobTitle}</h3>
                       <span className="text-[10px] font-black text-slate-300">{exp.startYear} — {exp.endYear}</span>
                    </div>
                    <p className="text-sm font-bold mb-4" style={{ color: accentColor }}>{exp.employer}</p>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="col-span-5 space-y-12">
             <section>
                <div className="flex items-center gap-4 mb-8">
                   <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-300">Skills</h2>
                   <div className="h-px flex-1 bg-slate-100" />
                </div>
                <div className="flex flex-wrap gap-2">
                   {(skills?.content || "").split(",").filter(Boolean).map((skill, i) => (
                     <span key={i} className="px-4 py-2 bg-white rounded-full border border-slate-100 text-[11px] font-bold text-slate-600 shadow-sm hover:shadow-md transition-shadow">
                       {skill.trim()}
                     </span>
                   ))}
                </div>
             </section>

             <section>
                <div className="flex items-center gap-4 mb-8">
                   <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-300">Education</h2>
                   <div className="h-px flex-1 bg-slate-100" />
                </div>
                <div className="space-y-6">
                   {education.map((edu, i) => (
                     <div key={i} className="border-l-4 pl-4" style={{ borderColor: accentColor }}>
                        <h4 className="text-base font-black text-slate-900">{edu.degree}{edu.field ? " in " + edu.field : ""}</h4>
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
