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
      <header className="text-white p-8 text-center flex flex-col items-center" style={{ backgroundColor: accentColor }}>
        <h1 className="text-4xl font-bold tracking-tight mb-2 uppercase flex flex-wrap justify-center gap-4 px-8">
          <EditableText 
            value={header.firstName || "First"} 
            onUpdate={(val) => onUpdate?.("header", { ...header, firstName: val })}
            className="hover:bg-white/10 break-words"
          />
          <EditableText 
            value={header.surname || "Surname"} 
            onUpdate={(val) => onUpdate?.("header", { ...header, surname: val })}
            className="hover:bg-white/10 break-words"
          />
        </h1>
        <div className="w-20 h-1 bg-white/30 rounded-full mb-6" />
          <EditableText 
            value={header.jobTitle || "Professional Title"} 
            onUpdate={(val) => onUpdate?.("header", { ...header, jobTitle: val })}
            className="text-base tracking-[0.4em] opacity-80 font-medium uppercase italic px-4 py-1 break-words max-w-2xl"
          />
      </header>
      
      {/* Floating Contact Bar ... */}
      {/* Floating Contact Bar */}
      <div className="bg-slate-900 text-white py-3 flex flex-wrap justify-center gap-x-10 gap-y-2 text-[10px] font-black uppercase tracking-[0.2em] px-8">
         <div className="flex items-center gap-2 break-all">
           <AtSign className="h-3 w-3" style={{ color: accentColor }} /> 
           <EditableText 
             value={header.email || "Email"} 
             onUpdate={(val) => onUpdate?.("header", { ...header, email: val })}
           />
         </div>
         <div className="flex items-center gap-2 break-all">
           <Smartphone className="h-3 w-3" style={{ color: accentColor }} /> 
           <EditableText 
             value={header.phone || "Phone"} 
             onUpdate={(val) => onUpdate?.("header", { ...header, phone: val })}
           />
         </div>
         <div className="flex items-center gap-2 break-all">
           <MapPin className="h-3 w-3" style={{ color: accentColor }} /> 
           <EditableText 
             value={header.city || "City"} 
             onUpdate={(val) => onUpdate?.("header", { ...header, city: val })}
           />
         </div>
      </div>

      <div className="p-10 grid grid-cols-12 gap-8">
        <div className="col-span-12 space-y-10">
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] mb-4 pb-2 border-b-2 border-slate-100" style={{ color: accentColor }}>Executive Profile</h2>
            <EditableText 
              value={summary.content} 
              onUpdate={(val) => onUpdate?.("summary", { ...summary, content: val })}
              className="text-[16px] leading-relaxed text-slate-700 font-medium p-2"
              multiline
            />
          </section>

          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] mb-6 pb-2 border-b-2 border-slate-100" style={{ color: accentColor }}>Professional Experience</h2>
            <div className="space-y-8">
              {experience.map((exp, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between items-baseline font-bold">
                      <EditableText 
                        value={exp.jobTitle || "Job Title"} 
                        onUpdate={(val) => {
                          const newExperience = [...experience];
                          newExperience[i] = { ...newExperience[i], jobTitle: val };
                          onUpdate?.("experience", newExperience);
                        }}
                        className="text-xl text-slate-900 tracking-tight leading-tight break-words pr-4"
                      />
                    <div className="text-xs text-slate-400 font-black flex gap-1">
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
                    className="text-sm font-black text-slate-400 uppercase tracking-widest block" 
                  />
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
             <h2 className="text-[10px] font-black uppercase tracking-[0.5em] mb-6 pb-2 border-b-2 border-slate-100" style={{ color: accentColor }}>Academic Background</h2>
             <div className="grid grid-cols-2 gap-6">
               {education.map((edu, i) => (
                 <div key={i} className="space-y-1">
                    <EditableText 
                      value={edu.degree || "Degree"} 
                      onUpdate={(val) => {
                        const newEdu = [...education];
                        newEdu[i] = { ...newEdu[i], degree: val };
                        onUpdate?.("education", newEdu);
                      }}
                      className="text-lg font-bold text-slate-900 leading-tight break-words pr-2"
                    />
                    <EditableText 
                      value={edu.institution || "Institution"} 
                      onUpdate={(val) => {
                        const newEdu = [...education];
                        newEdu[i] = { ...newEdu[i], institution: val };
                        onUpdate?.("education", newEdu);
                      }}
                      className="text-sm font-medium text-slate-500 block"
                    />
                    <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex gap-1">
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
      </div>
    </div>
  );
};
