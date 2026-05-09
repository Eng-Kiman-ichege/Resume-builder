import { EditableText } from "@/components/EditableText";
import { ResumeData } from "@/lib/context/ResumeContext";
import { Mail, Phone, MapPin, AtSign, Smartphone } from "lucide-react";

export const Paris = ({ 
  data,
  onUpdate
}: { 
  data: ResumeData,
  onUpdate?: (section: any, value: any) => void 
}) => {
  const { header, summary, experience, education, skills, settings } = data;
  const accentColor = settings?.color || "#1e293b";

  return (
    <div className="bg-[#fcfcf9] w-full h-full p-16 flex flex-col items-center font-serif text-slate-800">
      {/* Header */}
      <header className="text-center mb-12 flex flex-col items-center">
        <h1 className="text-5xl font-light tracking-widest text-slate-900 mb-4 uppercase flex justify-center gap-4 px-8">
          <EditableText 
            value={header.firstName || "First"} 
            onUpdate={(val) => onUpdate?.("header", { ...header, firstName: val })}
          /> 
          <span className="font-bold" style={{ color: accentColor }}>
            <EditableText 
              value={header.surname || "Surname"} 
              onUpdate={(val) => onUpdate?.("header", { ...header, surname: val })}
            />
          </span>
        </h1>
        <div className="h-px w-24 bg-slate-200 mb-4" />
        <EditableText 
          value={header.jobTitle || "Professional Title"} 
          onUpdate={(val) => onUpdate?.("header", { ...header, jobTitle: val })}
          className="text-lg italic text-slate-500 mb-6 font-medium block"
        />
        
        <div className="flex justify-center gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-400 flex-wrap">
           <EditableText 
             value={header.email || "Email"} 
             onUpdate={(val) => onUpdate?.("header", { ...header, email: val })}
           />
           <span>•</span>
           <EditableText 
             value={header.phone || "Phone"} 
             onUpdate={(val) => onUpdate?.("header", { ...header, phone: val })}
           />
           <span>•</span>
           <EditableText 
             value={header.city || "City"} 
             onUpdate={(val) => onUpdate?.("header", { ...header, city: val })}
           />
        </div>
      </header>

      <div className="w-full max-w-2xl space-y-12">
        <section className="text-center">
           <EditableText 
             value={summary.content} 
             onUpdate={(val) => onUpdate?.("summary", { ...summary, content: val })}
             className="text-base leading-relaxed text-slate-600 font-medium italic italic-serif block"
             multiline
           />
        </section>

        <section>
          <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-300 text-center mb-8">Professional History</h2>
          <div className="space-y-10">
            {experience.map((exp, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <EditableText 
                  value={exp.jobTitle || "Job Title"} 
                  onUpdate={(val) => {
                    const newExperience = [...experience];
                    newExperience[i] = { ...newExperience[i], jobTitle: val };
                    onUpdate?.("experience", newExperience);
                  }}
                  className="text-xl font-bold text-slate-900 mb-1"
                />
                <div className="text-xs font-bold uppercase tracking-widest mb-3 flex gap-2 justify-center" style={{ color: accentColor }}>
                  <EditableText 
                    value={exp.employer || "Employer"} 
                    onUpdate={(val) => {
                      const newExperience = [...experience];
                      newExperience[i] = { ...newExperience[i], employer: val };
                      onUpdate?.("experience", newExperience);
                    }}
                  />
                  <span>/</span>
                  <div className="flex gap-1">
                    <EditableText 
                      value={exp.startYear || "Year"} 
                      onUpdate={(val) => {
                        const newExperience = [...experience];
                        newExperience[i] = { ...newExperience[i], startYear: val };
                        onUpdate?.("experience", newExperience);
                      }}
                    />
                    <span>—</span>
                    <EditableText 
                      value={exp.endYear || "Year"} 
                      onUpdate={(val) => {
                        const newExperience = [...experience];
                        newExperience[i] = { ...newExperience[i], endYear: val };
                        onUpdate?.("experience", newExperience);
                      }}
                    />
                  </div>
                </div>
                <EditableText 
                  value={exp.description} 
                  onUpdate={(val) => {
                    const newExperience = [...experience];
                    newExperience[i] = { ...newExperience[i], description: val };
                    onUpdate?.("experience", newExperience);
                  }}
                  className="text-[14px] text-slate-600 font-medium leading-relaxed max-w-lg block"
                  multiline
                />
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-12 pt-8 border-t border-slate-100">
          <section>
            <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-300 mb-6">Education</h2>
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
                    className="text-base font-bold text-slate-900 block"
                  />
                  <EditableText 
                    value={edu.institution || "Institution"} 
                    onUpdate={(val) => {
                      const newEdu = [...education];
                      newEdu[i] = { ...newEdu[i], institution: val };
                      onUpdate?.("education", newEdu);
                    }}
                    className="text-xs font-medium text-slate-500 italic mt-1 block"
                  />
                  <div className="text-[10px] font-bold uppercase mt-2 flex gap-1" style={{ color: accentColor }}>
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
            <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-300 mb-6">Expertise</h2>
            <EditableText 
              value={skills.content} 
              onUpdate={(val) => onUpdate?.("skills", { ...skills, content: val })}
              className="text-xs font-bold text-slate-600 uppercase tracking-widest leading-loose p-4 bg-slate-50/50 rounded-xl border border-dashed border-slate-200"
              multiline
            />
          </section>
        </div>
      </div>
    </div>
  );
};
