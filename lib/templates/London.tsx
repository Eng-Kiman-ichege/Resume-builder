import { EditableText } from "@/components/EditableText";
import { ResumeData } from "@/lib/context/ResumeContext";
import { Mail, Phone, MapPin, AtSign, Smartphone, Globe } from "lucide-react";

export const London = ({ 
  data,
  onUpdate
}: { 
  data: ResumeData,
  onUpdate?: (section: any, value: any) => void 
}) => {
  const { header, summary, experience, education, skills, settings } = data;
  const accentColor = settings?.color || "#1e293b";

  return (
    <div className="bg-white w-full h-full flex font-sans text-slate-800">
      {/* Left Sidebar */}
      <aside className="w-1/3 bg-slate-50 border-r border-slate-100 p-8 flex flex-col gap-8">
        <div>
          <div className="w-24 h-24 rounded-2xl bg-white shadow-sm mb-6 flex items-center justify-center border border-slate-100 overflow-hidden">
             {header.photo ? (
               <img src={header.photo} alt="Profile" className="w-full h-full object-cover" />
             ) : (
               <div className="text-2xl font-black text-slate-200 uppercase">{header.firstName?.[0]}{header.surname?.[0]}</div>
             )}
          </div>
          <h1 className="text-2xl font-black text-slate-900 leading-tight">
            <EditableText 
              value={header.firstName || "First"} 
              onUpdate={(val) => onUpdate?.("header", { ...header, firstName: val })}
            /><br />
            <span style={{ color: accentColor }}>
              <EditableText 
                value={header.surname || "Surname"} 
                onUpdate={(val) => onUpdate?.("header", { ...header, surname: val })}
              />
            </span>
          </h1>
          <EditableText 
            value={header.jobTitle || "Professional Title"} 
            onUpdate={(val) => onUpdate?.("header", { ...header, jobTitle: val })}
            className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest block"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Contact</h2>
          <div className="space-y-3 text-[11px] font-medium text-slate-600">
            <div className="flex items-center gap-3">
              <AtSign className="h-3.5 w-3.5 opacity-50" /> 
              <EditableText 
                value={header.email || "Email"} 
                onUpdate={(val) => onUpdate?.("header", { ...header, email: val })}
              />
            </div>
            <div className="flex items-center gap-3">
              <Smartphone className="h-3.5 w-3.5 opacity-50" /> 
              <EditableText 
                value={header.phone || "Phone"} 
                onUpdate={(val) => onUpdate?.("header", { ...header, phone: val })}
              />
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-3.5 w-3.5 opacity-50" /> 
              <EditableText 
                value={header.city || "City"} 
                onUpdate={(val) => onUpdate?.("header", { ...header, city: val })}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Skills</h2>
          <EditableText 
            value={skills.content} 
            onUpdate={(val) => onUpdate?.("skills", { ...skills, content: val })}
            className="text-[11px] font-bold text-slate-600 leading-relaxed bg-white p-4 rounded-xl border border-slate-100"
            multiline
          />
        </div>

        <div className="mt-auto">
           <div className="h-1 w-12 rounded-full" style={{ backgroundColor: accentColor }} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 flex flex-col gap-10">
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-4">About Me</h2>
          <EditableText 
            value={summary.content} 
            onUpdate={(val) => onUpdate?.("summary", { ...summary, content: val })}
            className="text-sm leading-relaxed text-slate-600 font-medium"
            multiline
          />
        </section>

        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-6">Experience</h2>
          <div className="space-y-8">
            {experience.map((exp, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <EditableText 
                    value={exp.jobTitle || "Job Title"} 
                    onUpdate={(val) => {
                      const newExperience = [...experience];
                      newExperience[i] = { ...newExperience[i], jobTitle: val };
                      onUpdate?.("experience", newExperience);
                    }}
                    className="text-base font-black text-slate-900"
                  />
                  <div className="text-[10px] font-bold text-slate-400 flex gap-1">
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
                  className="text-xs font-black uppercase tracking-wider block" 
                  style={{ color: accentColor }}
                />
                <EditableText 
                  value={exp.description} 
                  onUpdate={(val) => {
                    const newExperience = [...experience];
                    newExperience[i] = { ...newExperience[i], description: val };
                    onUpdate?.("experience", newExperience);
                  }}
                  className="text-[13px] text-slate-500 font-medium leading-relaxed"
                  multiline
                />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-6">Education</h2>
          <div className="grid grid-cols-1 gap-6">
            {education.map((edu, i) => (
              <div key={i}>
                <EditableText 
                  value={edu.degree || "Degree"} 
                  onUpdate={(val) => {
                    const newEdu = [...education];
                    newEdu[i] = { ...newEdu[i], degree: val };
                    onUpdate?.("education", newEdu);
                  }}
                  className="text-sm font-black text-slate-900 block"
                />
                <EditableText 
                  value={edu.institution || "Institution"} 
                  onUpdate={(val) => {
                    const newEdu = [...education];
                    newEdu[i] = { ...newEdu[i], institution: val };
                    onUpdate?.("education", newEdu);
                  }}
                  className="text-xs font-bold text-slate-500 block"
                />
                <div className="text-[10px] font-bold uppercase mt-1 flex gap-1" style={{ color: accentColor }}>
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
      </main>
    </div>
  );
};
