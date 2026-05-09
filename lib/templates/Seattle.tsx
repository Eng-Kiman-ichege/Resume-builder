"use client";

import { ResumeData } from "@/lib/context/ResumeContext";

import { EditableText } from "@/components/EditableText";

export const Seattle = ({ 
  data, 
  onUpdate 
}: { 
  data: ResumeData, 
  onUpdate?: (section: any, value: any) => void 
}) => {
  const { header, summary, experience, education, skills, settings } = data;
  const accentColor = settings?.color || "#0369a1";

  return (
    <div className="bg-white w-full h-full flex flex-col font-sans text-slate-800">
      <header className="bg-slate-900 text-white p-16 flex justify-between items-center relative overflow-hidden">
         {/* Decorative circle */}
         <div className="absolute right-[-50px] top-[-50px] w-64 h-64 rounded-full opacity-10" style={{ backgroundColor: accentColor }} />
         
         <div className="relative z-10 flex-1 min-w-0 mr-8">
            <h1 className="text-6xl font-black tracking-tighter uppercase leading-none mb-4 flex flex-col">
               <EditableText 
                 value={header.firstName || "First"} 
                 onUpdate={(val) => onUpdate?.("header", { ...header, firstName: val })}
                 className="hover:bg-white/10 break-words"
               />
               <EditableText 
                 value={header.surname || "Surname"} 
                 onUpdate={(val) => onUpdate?.("header", { ...header, surname: val })}
                 style={{ color: accentColor }}
                 className="hover:bg-white/10 break-words"
               />
            </h1>
            <EditableText 
              value={header.jobTitle || "Professional Title"} 
              onUpdate={(val) => onUpdate?.("header", { ...header, jobTitle: val })}
              className="text-xl font-bold uppercase tracking-[0.4em] opacity-40 hover:bg-white/10 break-words"
            />
         </div>
         
         <div className="text-right text-[11px] font-black uppercase tracking-widest space-y-3 opacity-60 relative z-10 max-w-[40%] shrink-0 break-all">
            <div>
               <EditableText 
                 value={header.email || "Email"} 
                 onUpdate={(val) => onUpdate?.("header", { ...header, email: val })}
               />
            </div>
            <div>
               <EditableText 
                 value={header.phone || "Phone"} 
                 onUpdate={(val) => onUpdate?.("header", { ...header, phone: val })}
               />
            </div>
            {header.profileLink && (
              <div>
                 <EditableText 
                   value={header.profileLink} 
                   onUpdate={(val) => onUpdate?.("header", { ...header, profileLink: val })}
                 />
              </div>
            )}
            <div>
               <EditableText 
                 value={header.city || "City"} 
                 onUpdate={(val) => onUpdate?.("header", { ...header, city: val })}
               />
            </div>
         </div>
      </header>

      <div className="p-16 grid grid-cols-12 gap-16 flex-1">
         <div className="col-span-4 space-y-12">
            <section>
               <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-6">Expertise</h2>
               <div className="space-y-4">
                  <EditableText 
                    value={skills.content} 
                    onUpdate={(val) => onUpdate?.("skills", { ...skills, content: val })}
                    className="text-sm font-bold text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border-dashed border border-slate-200"
                    multiline
                  />
               </div>
            </section>

            <section>
               <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-6">Education</h2>
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
                         className="text-base font-black text-slate-900 leading-tight break-words pr-4"
                       />
                       <EditableText 
                         value={edu.institution || "Institution"} 
                         onUpdate={(val) => {
                           const newEdu = [...education];
                           newEdu[i] = { ...newEdu[i], institution: val };
                           onUpdate?.("education", newEdu);
                         }}
                         className="text-xs font-bold text-slate-400 mt-1 block"
                       />
                       <div className="text-[10px] font-black mt-2 opacity-30 flex gap-1">
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

         <div className="col-span-8 space-y-12">
            <section>
               <EditableText 
                 value={summary.content} 
                 onUpdate={(val) => onUpdate?.("summary", { ...summary, content: val })}
                 className="text-lg leading-relaxed text-slate-600 font-medium bg-slate-50 p-8 rounded-3xl border border-slate-100 italic"
                 multiline
               />
            </section>

            <section>
               <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-10">Professional Path</h2>
               <div className="space-y-12">
                  {experience.map((exp, i) => (
                    <div key={i} className="group border-l-4 pl-8 transition-colors" style={{ borderColor: i === 0 ? accentColor : '#f1f5f9' }}>
                       <div className="flex justify-between items-baseline mb-2">
                          <EditableText 
                            value={exp.jobTitle || "Job Title"} 
                            onUpdate={(val) => {
                              const newExperience = [...experience];
                              newExperience[i] = { ...newExperience[i], jobTitle: val };
                              onUpdate?.("experience", newExperience);
                            }}
                            className="text-2xl font-black text-slate-900 leading-tight break-words pr-4"
                          />
                          <div className="text-xs font-black text-slate-200 uppercase tracking-widest flex gap-1">
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
                         className="text-sm font-black uppercase tracking-widest mb-4 opacity-40 block"
                       />
                       <EditableText 
                         value={exp.description} 
                         onUpdate={(val) => {
                           const newExperience = [...experience];
                           newExperience[i] = { ...newExperience[i], description: val };
                           onUpdate?.("experience", newExperience);
                         }}
                         className="text-base text-slate-500 font-medium leading-relaxed p-1"
                         multiline
                       />
                    </div>
                  ))}
               </div>
            </section>
         </div>
      </div>
    </div>
  );
};
