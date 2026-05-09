"use client";

import { EditableText } from "@/components/EditableText";
import { ResumeData } from "@/lib/context/ResumeContext";
import { Mail, Phone, MapPin, AtSign, Smartphone } from "lucide-react";

export const BlueExecutive = ({ 
  data, 
  onUpdate 
}: { 
  data: ResumeData, 
  onUpdate?: (section: any, value: any) => void 
}) => {
  const { header, summary, experience, education, skills, settings } = data;
  const accentColor = settings?.color || "#0052cc";

  return (
    <div className="bg-white w-full h-full flex flex-col font-serif text-slate-900">
      {/* Top Banner */}
      <header className="text-white p-12 text-center flex flex-col items-center" style={{ backgroundColor: accentColor }}>
        <h1 className="text-5xl font-bold tracking-tight mb-2 uppercase flex gap-4">
          <EditableText 
            value={header.firstName || "First"} 
            onUpdate={(val) => onUpdate?.("header", { ...header, firstName: val })}
            className="hover:bg-white/10"
          />
          <EditableText 
            value={header.surname || "Surname"} 
            onUpdate={(val) => onUpdate?.("header", { ...header, surname: val })}
            className="hover:bg-white/10"
          />
        </h1>
        <div className="w-20 h-1 bg-white/30 rounded-full mb-6" />
        <EditableText 
          value={header.jobTitle || "Professional Title"} 
          onUpdate={(val) => onUpdate?.("header", { ...header, jobTitle: val })}
          className="text-lg tracking-[0.4em] opacity-80 font-medium uppercase italic px-4 py-1"
        />
      </header>
      
      {/* Floating Contact Bar ... */}
      <div className="bg-slate-900 text-white py-3 flex justify-center gap-10 text-[10px] font-black uppercase tracking-[0.2em]">
         <div className="flex items-center gap-2"><AtSign className="h-3 w-3" style={{ color: accentColor }} /> {header.email}</div>
         <div className="flex items-center gap-2"><Smartphone className="h-3 w-3" style={{ color: accentColor }} /> {header.phone}</div>
         {header.profileLink && (<div className="flex items-center gap-2">{header.profileLabel || "Link"}:  {header.profileLink}</div>)}
         <div className="flex items-center gap-2"><MapPin className="h-3 w-3" style={{ color: accentColor }} /> {header.city}</div>
      </div>

      <div className="p-16 grid grid-cols-12 gap-16">
        <div className="col-span-12 space-y-16">
          <section>
            <h2 className="text-[11px] font-black uppercase tracking-[0.5em] mb-8 pb-2 border-b-2 border-slate-100" style={{ color: accentColor }}>Executive Profile</h2>
            <EditableText 
              value={summary.content} 
              onUpdate={(val) => onUpdate?.("summary", { ...summary, content: val })}
              className="text-[16px] leading-relaxed text-slate-700 font-medium p-2"
              multiline
            />
          </section>

          <section>
            <h2 className="text-[11px] font-black uppercase tracking-[0.5em] mb-10 pb-2 border-b-2 border-slate-100" style={{ color: accentColor }}>Professional Experience</h2>
            <div className="space-y-12">
              {experience.map((exp, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between items-baseline font-bold">
                    <h3 className="text-2xl text-slate-900 tracking-tight">{exp.jobTitle}</h3>
                    <span className="text-xs text-slate-400 font-black">
                      {(exp.startYear || exp.startDate) || "Start"} — {(exp.endYear || exp.endDate) || "Present"}
                    </span>
                  </div>
                  <p className="text-sm font-black text-slate-400 uppercase tracking-widest">{exp.employer}</p>
                  <EditableText 
                    value={exp.description} 
                    onUpdate={(val) => {
                      const newExperience = [...experience];
                      newExperience[i] = { ...newExperience[i], description: val };
                      onUpdate?.("experience", newExperience);
                    }}
                    className="text-[15px] text-slate-600 leading-relaxed pt-2 font-medium p-2"
                    multiline
                  />
                </div>
              ))}
            </div>
          </section>

          <section>
             <h2 className="text-[11px] font-black uppercase tracking-[0.5em] mb-8 pb-2 border-b-2 border-slate-100" style={{ color: accentColor }}>Academic Background</h2>
             <div className="grid grid-cols-2 gap-8">
               {education.map((edu, i) => (
                 <div key={i} className="space-y-1">
                   <h4 className="text-lg font-bold text-slate-900">
                     {edu.degree}{(edu.field || edu.fieldOfStudy) ? " in " + (edu.field || edu.fieldOfStudy) : ""}
                   </h4>
                   <p className="text-sm font-medium text-slate-500">{edu.institution || edu.schoolName}</p>
                   <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                     {edu.startYear || ""} {edu.startYear && (edu.endYear || edu.gradYear) ? "—" : ""} {edu.endYear || edu.gradYear}
                   </p>
                 </div>
               ))}
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};
