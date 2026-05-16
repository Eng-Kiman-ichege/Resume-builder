"use client";

import { ResumeData } from "@/lib/context/ResumeContext";
import { Mail, Phone, MapPin, AtSign, Smartphone, Globe } from "lucide-react";

import { EditableText } from "@/components/EditableText";

export const Minimalist = ({ 
  data, 
  onUpdate 
}: { 
  data: ResumeData, 
  onUpdate?: (section: any, value: any) => void 
}) => {
  const { header, summary, experience, education, skills, settings } = data;
  const accentColor = settings?.color || "#000000";

  return (
    <div className="bg-white w-full h-full flex flex-col font-sans text-slate-900">
      {/* Top Section with Photo and Header */}
      <header className="p-8 pb-6 flex items-start gap-8 border-b border-slate-100">
        {/* Photo Placeholder */}
        <div className="w-32 h-32 rounded-full bg-slate-100 border-4 border-white shadow-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
          {header.photo ? (
            <img src={header.photo} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="text-slate-300 font-black text-4xl">
              {header.firstName?.[0]}{header.surname?.[0]}
            </div>
          )}
        </div>

        <div className="flex-1 pt-2">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase mb-1 flex flex-wrap gap-2">
            <EditableText 
              value={header.firstName || "First"} 
              onUpdate={(val) => onUpdate?.("header", { ...header, firstName: val })}
            />
            <EditableText 
              value={header.surname || "Surname"} 
              onUpdate={(val) => onUpdate?.("header", { ...header, surname: val })}
            />
          </h1>
          <EditableText 
            value={header.jobTitle || "Professional Title"} 
            onUpdate={(val) => onUpdate?.("header", { ...header, jobTitle: val })}
            className="text-lg font-bold uppercase tracking-[0.2em] mb-4 block"
            style={{ color: accentColor }}
          />
          
          <div className="flex flex-wrap gap-y-2 gap-x-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            <div className="flex items-center gap-1.5"><AtSign className="h-3 w-3" style={{ color: accentColor }} /> <EditableText value={header.email || "email@example.com"} onUpdate={(val) => onUpdate?.("header", { ...header, email: val })} /></div>
            <div className="flex items-center gap-1.5"><Smartphone className="h-3 w-3" style={{ color: accentColor }} /> <EditableText value={header.phone || "Phone"} onUpdate={(val) => onUpdate?.("header", { ...header, phone: val })} /></div>
            <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3" style={{ color: accentColor }} /> <EditableText value={header.city || "City"} onUpdate={(val) => onUpdate?.("header", { ...header, city: val })} /></div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col p-8 pt-6 gap-8">
        {/* Summary */}
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4 flex items-center gap-4">
            Profile <div className="h-px flex-1 bg-slate-100" />
          </h2>
          <EditableText 
            value={summary.content} 
            onUpdate={(val) => onUpdate?.("summary", { ...summary, content: val })}
            className="text-[14px] leading-relaxed text-slate-600 font-medium p-1 block"
            multiline
          />
        </section>

        <div className="grid grid-cols-12 gap-12">
          {/* Main Column */}
          <div className="col-span-8 space-y-10">
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 flex items-center gap-4">
                Experience <div className="h-px flex-1 bg-slate-100" />
              </h2>
              <div className="space-y-6">
                {experience.map((exp, i) => (
                  <div key={i} className="relative pl-6 border-l-2 border-slate-50 group">
                    <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-slate-200 group-hover:bg-blue-600 transition-colors" style={{ backgroundColor: i === 0 ? accentColor : undefined }} />
                    <div className="flex justify-between items-baseline mb-1">
                      <EditableText 
                        value={exp.jobTitle || "Job Title"} 
                        onUpdate={(val) => {
                          const newExperience = [...experience];
                          newExperience[i] = { ...newExperience[i], jobTitle: val };
                          onUpdate?.("experience", newExperience);
                        }}
                        className="text-lg font-bold text-slate-900 pr-2"
                      />
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter flex gap-1">
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
                      className="text-xs font-black uppercase tracking-widest mb-2 block" 
                      style={{ color: accentColor }}
                    />
                    <EditableText 
                      value={exp.description} 
                      onUpdate={(val) => {
                        const newExperience = [...experience];
                        newExperience[i] = { ...newExperience[i], description: val };
                        onUpdate?.("experience", newExperience);
                      }}
                      className="text-[13px] text-slate-500 font-medium leading-relaxed whitespace-pre-wrap p-1 block"
                      multiline
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="col-span-4 space-y-10">
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6">Education</h2>
              <div className="space-y-6">
                {education.map((edu, i) => (
                  <div key={i}>
                    <EditableText 
                      value={edu.degree || "Degree"} 
                      onUpdate={(val) => {
                        const newEdu = [...education];
                        newEdu[i] = { ...newEdu[i], degree: val };
                        onUpdate?.("education", newEdu);
                      }}
                      className="text-sm font-bold text-slate-900 block"
                    />
                    <EditableText 
                      value={edu.institution || "Institution"} 
                      onUpdate={(val) => {
                        const newEdu = [...education];
                        newEdu[i] = { ...newEdu[i], institution: val };
                        onUpdate?.("education", newEdu);
                      }}
                      className="text-[11px] font-bold uppercase tracking-wider mt-1 block" 
                      style={{ color: accentColor }}
                    />
                    <div className="text-[10px] font-medium text-slate-400 mt-0.5 flex gap-1">
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

            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6">Skills</h2>
              <EditableText 
                value={skills.content} 
                onUpdate={(val) => onUpdate?.("skills", { ...skills, content: val })}
                className="text-[13px] leading-relaxed text-slate-600 font-medium p-1 block"
                multiline
              />
            </section>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="mt-auto p-8 pt-0 flex justify-end">
        <div className="w-12 h-1 rounded-full opacity-20" style={{ backgroundColor: accentColor }} />
      </footer>
    </div>
  );
};
