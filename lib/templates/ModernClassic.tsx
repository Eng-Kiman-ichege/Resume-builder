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
    <div className="bg-white w-full h-full p-8 flex flex-col gap-6 font-sans text-slate-800">
      {/* Header */}
      <header className="border-b-4 border-slate-900 pb-4 flex justify-between items-end gap-4 overflow-hidden">
        <div className="flex-1 min-w-0">
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase flex flex-wrap gap-x-2 gap-y-1">
            <EditableText 
              value={header.firstName || "First"} 
              onUpdate={(val) => onUpdate?.("header", { ...header, firstName: val })}
              className="px-1 break-words"
            />
            <EditableText 
              value={header.surname || "Surname"} 
              onUpdate={(val) => onUpdate?.("header", { ...header, surname: val })}
              style={{ color: accentColor }}
              className="px-1 break-words"
            />
          </h1>
          <EditableText 
            value={header.jobTitle || "Professional Title"} 
            onUpdate={(val) => onUpdate?.("header", { ...header, jobTitle: val })}
            className="text-xl font-bold text-slate-400 mt-2 uppercase tracking-[0.2em] px-1 break-words"
          />
        </div>
        <div className="text-right text-sm font-bold space-y-1 text-slate-500 uppercase tracking-wider max-w-[40%] shrink-0">
          <div className="flex items-center justify-end gap-2 break-all">
            <AtSign className="h-3.5 w-3.5" style={{ color: accentColor }} /> 
            <EditableText 
              value={header.email || "email@example.com"} 
              onUpdate={(val) => onUpdate?.("header", { ...header, email: val })}
            />
          </div>
          <div className="flex items-center justify-end gap-2 break-all">
            <Smartphone className="h-3.5 w-3.5" style={{ color: accentColor }} /> 
            <EditableText 
              value={header.phone || "Phone"} 
              onUpdate={(val) => onUpdate?.("header", { ...header, phone: val })}
            />
          </div>
          <div className="flex items-center justify-end gap-2 break-all">
            <MapPin className="h-3.5 w-3.5" style={{ color: accentColor }} /> 
            <EditableText 
              value={header.city || "Location"} 
              onUpdate={(val) => onUpdate?.("header", { ...header, city: val })}
            />
          </div>
        </div>
      </header>

      {/* Summary */}
      <section>
        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2">Professional Summary</h2>
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
        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4">Work Experience</h2>
        <div className="space-y-6">
          {experience.map((exp, i) => (
            <div key={i} className="group relative pl-8 border-l-2 border-slate-50">
              <div 
                className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full group-hover:scale-150 transition-transform" 
                style={{ backgroundColor: accentColor }}
              />
              <div className="flex justify-between items-baseline mb-1">
                <EditableText 
                  value={exp.jobTitle || "Job Title"} 
                  onUpdate={(val) => {
                    const newExperience = [...experience];
                    newExperience[i] = { ...newExperience[i], jobTitle: val };
                    onUpdate?.("experience", newExperience);
                  }}
                  className="text-xl font-bold text-slate-900 leading-tight break-words pr-4"
                />
                <div className="text-[11px] font-black text-slate-300 uppercase tracking-widest flex gap-1">
                  <EditableText 
                    value={exp.startYear || "Start"} 
                    onUpdate={(val) => {
                      const newExperience = [...experience];
                      newExperience[i] = { ...newExperience[i], startYear: val };
                      onUpdate?.("experience", newExperience);
                    }}
                  />
                  <span>—</span>
                  <EditableText 
                    value={exp.endYear || "Present"} 
                    onUpdate={(val) => {
                      const newExperience = [...experience];
                      newExperience[i] = { ...newExperience[i], endYear: val };
                      onUpdate?.("experience", newExperience);
                    }}
                  />
                </div>
              </div>
              <EditableText 
                value={exp.employer || "Employer"} 
                onUpdate={(val) => {
                  const newExperience = [...experience];
                  newExperience[i] = { ...newExperience[i], employer: val };
                  onUpdate?.("experience", newExperience);
                }}
                className="text-sm font-black uppercase tracking-[0.1em] mb-4 block" 
                style={{ color: accentColor }}
              />
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

      {/* Skills */}
      <section>
        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2">Core Expertise</h2>
        <EditableText 
          value={skills.content} 
          onUpdate={(val) => onUpdate?.("skills", { ...skills, content: val })}
          className="text-[14px] text-slate-600 font-bold leading-relaxed p-2 bg-slate-50 rounded-xl border-dashed border-2 border-slate-100"
          multiline
        />
      </section>

      {/* Education */}
      <section>
        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4">Education</h2>
        <div className="space-y-4">
          {education.map((edu, i) => (
            <div key={i} className="flex justify-between items-start">
              <div className="flex-1">
                <EditableText 
                  value={edu.degree || "Degree"} 
                  onUpdate={(val) => {
                    const newEdu = [...education];
                    newEdu[i] = { ...newEdu[i], degree: val };
                    onUpdate?.("education", newEdu);
                  }}
                  className="text-lg font-bold text-slate-900 leading-tight break-words"
                />
                <EditableText 
                  value={edu.institution || "Institution"} 
                  onUpdate={(val) => {
                    const newEdu = [...education];
                    newEdu[i] = { ...newEdu[i], institution: val };
                    onUpdate?.("education", newEdu);
                  }}
                  className="text-sm font-bold uppercase tracking-widest block" 
                  style={{ color: accentColor }}
                />
              </div>
              <div className="text-[11px] font-black text-slate-300 uppercase flex gap-1">
                <EditableText 
                  value={edu.startYear || "Year"} 
                  onUpdate={(val) => {
                    const newEdu = [...education];
                    newEdu[i] = { ...newEdu[i], startYear: val };
                    onUpdate?.("education", newEdu);
                  }}
                />
                <span>—</span>
                <EditableText 
                  value={edu.endYear || "Year"} 
                  onUpdate={(val) => {
                    const newEdu = [...education];
                    newEdu[i] = { ...newEdu[i], endYear: val };
                    onUpdate?.("education", newEdu);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
