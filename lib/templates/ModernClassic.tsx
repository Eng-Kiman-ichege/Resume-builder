"use client";

import { EditableText } from "@/components/EditableText";
import { Mail, Phone, MapPin, Globe, AtSign, Smartphone } from "lucide-react";
import { ResumeData } from "@/lib/context/ResumeContext";

export const ModernClassic = ({ 
  data, 
  onUpdate 
}: { 
  data: ResumeData, 
  onUpdate?: (section: any, value: any) => void 
}) => {
  const { header, summary, experience, education, skills, settings } = data;
  const accentColor = settings?.color || "#3b82f6";

  return (
    <div className="bg-white w-full h-full p-12 flex flex-col gap-10 font-sans text-slate-800">
      {/* Header */}
      <header className="border-b-4 border-slate-900 pb-8 flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 uppercase flex gap-2">
            <EditableText 
              value={header.firstName || "First"} 
              onUpdate={(val) => onUpdate?.("header", { ...header, firstName: val })}
              className="px-1"
            />
            <EditableText 
              value={header.surname || "Surname"} 
              onUpdate={(val) => onUpdate?.("header", { ...header, surname: val })}
              style={{ color: accentColor }}
              className="px-1"
            />
          </h1>
          <EditableText 
            value={header.jobTitle || "Professional Title"} 
            onUpdate={(val) => onUpdate?.("header", { ...header, jobTitle: val })}
            className="text-xl font-bold text-slate-400 mt-2 uppercase tracking-[0.2em] px-1"
          />
        </div>
        <div className="text-right text-sm font-bold space-y-1 text-slate-500 uppercase tracking-wider">
          <div className="flex items-center justify-end gap-2"><AtSign className="h-3.5 w-3.5" style={{ color: accentColor }} /> {header.email}</div>
          <div className="flex items-center justify-end gap-2"><Smartphone className="h-3.5 w-3.5" style={{ color: accentColor }} /> {header.phone}</div>
          {header.profileLink && (<div className="flex items-center justify-end gap-2">{header.profileLabel || "Link"}:  {header.profileLink}</div>)}
          <div className="flex items-center justify-end gap-2"><MapPin className="h-3.5 w-3.5" style={{ color: accentColor }} /> {header.city}</div>
        </div>
      </header>

      {/* Summary */}
      <section>
        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-4">Professional Summary</h2>
        <EditableText 
          value={summary.content} 
          onUpdate={(val) => onUpdate?.("summary", { ...summary, content: val })}
          className="text-[15px] leading-relaxed font-medium text-slate-600 border-l-4 pl-6 italic rounded-r-md"
          style={{ borderLeftColor: `${accentColor}1a` }}
          multiline
        />
      </section>

      {/* Experience */}
      <section>
        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-8">Work Experience</h2>
        <div className="space-y-10">
          {experience.map((exp, i) => (
            <div key={i} className="group relative pl-8 border-l-2 border-slate-50">
              <div 
                className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full group-hover:scale-150 transition-transform" 
                style={{ backgroundColor: accentColor }}
              />
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-xl font-bold text-slate-900">{exp.jobTitle}</h3>
                <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest">
                  {(exp.startYear || exp.startDate) || "Start"} — {(exp.endYear || exp.endDate) || "Present"}
                </span>
              </div>
              <p className="text-sm font-black uppercase tracking-[0.1em] mb-4" style={{ color: accentColor }}>{exp.employer}</p>
              <EditableText 
                value={exp.description} 
                onUpdate={(val) => {
                  const newExperience = [...experience];
                  newExperience[i] = { ...newExperience[i], description: val };
                  onUpdate?.("experience", newExperience);
                }}
                className="text-[14px] text-slate-500 font-medium leading-relaxed whitespace-pre-wrap p-1 rounded-md"
                multiline
              />
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-8">Education</h2>
        <div className="space-y-6">
          {education.map((edu, i) => (
            <div key={i} className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-bold text-slate-900">
                  {edu.degree}{(edu.field || edu.fieldOfStudy) ? " in " + (edu.field || edu.fieldOfStudy) : ""}
                </h4>
                <p className="text-sm font-bold uppercase tracking-widest" style={{ color: accentColor }}>
                  {edu.institution || edu.schoolName}
                </p>
              </div>
              <span className="text-[11px] font-black text-slate-300 uppercase">
                {edu.startYear || ""} {edu.startYear && (edu.endYear || edu.gradYear) ? "—" : ""} {edu.endYear || edu.gradYear}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
