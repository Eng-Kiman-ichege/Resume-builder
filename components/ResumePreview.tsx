"use client";

import { useResume } from "@/lib/context/ResumeContext";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export function ResumePreview({ 
  liveExperience, 
  liveEducation,
  onPartClick,
  customTemplateId 
}: { 
  liveExperience?: any, 
  liveEducation?: any,
  onPartClick?: (part: "title" | "layout" | "accent") => void,
  customTemplateId?: string
}) {
  const { resumeData } = useResume();
  const { header, skills, summary } = resumeData;
  const settings = resumeData.settings || { color: "#3b82f6", titleColor: "#0f172a", backgroundColor: "#ffffff", templateId: "classic" };
  const templateId = customTemplateId || settings.templateId;
  
  // Ensure we have arrays
  const experience = Array.isArray(resumeData.experience) ? resumeData.experience : [];
  const education = Array.isArray(resumeData.education) ? resumeData.education : [];

  const displayExperience = (liveExperience && (liveExperience.jobTitle || liveExperience.employer)) 
    ? [...experience, liveExperience] 
    : experience;
    
  const displayEducation = (liveEducation && (liveEducation.degree || liveEducation.institution)) 
    ? [...education, liveEducation] 
    : education;

  const accentColor = settings.color;
  const titleColor = settings.titleColor;
  const bgColor = settings.backgroundColor;
  
  const fullName = `${header.firstName || ""} ${header.surname || ""}`.trim() || "JOHN DOE";
  const initials = `${(header.firstName || "J")[0]}${(header.surname || "D")[0]}`.toUpperCase();

  // 1. MINIMALIST LAYOUT
  if (templateId.includes("minimal")) {
    return (
      <div 
        className="w-full max-w-2xl aspect-[1/1.414] shadow-2xl rounded-sm border border-slate-200 relative overflow-hidden transition-all duration-300 p-12 flex flex-col gap-8"
        style={{ backgroundColor: bgColor }}
        onClick={() => onPartClick?.("layout")}
      >
        <header className="text-center border-b-2 pb-6" style={{ borderColor: accentColor }}>
          <h1 className="text-5xl font-light tracking-tighter" style={{ color: titleColor }}>{fullName}</h1>
          <p className="text-sm uppercase tracking-[0.3em] mt-2 text-slate-500 font-medium">{header.jobTitle || "Professional"}</p>
          <div className="flex justify-center gap-4 mt-4 text-[10px] text-slate-400">
            {header.email && <span>{header.email}</span>}
            {header.phone && <span>• {header.phone}</span>}
            {header.city && <span>• {header.city}</span>}
          </div>
        </header>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: accentColor }}>Profile</h3>
          <p className="text-[11px] leading-relaxed text-slate-600">{summary.content}</p>
        </section>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: accentColor }}>Experience</h3>
          <div className="space-y-6">
            {displayExperience.map((exp: any, i: number) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-sm font-bold text-slate-800">{exp.jobTitle}</h4>
                  <span className="text-[10px] text-slate-400">{exp.startYear} — {exp.endYear || "Present"}</span>
                </div>
                <p className="text-[11px] font-medium text-slate-500 italic mb-2">{exp.employer}, {exp.city}</p>
                <p className="text-[10px] text-slate-500 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // 2. BOLD EXECUTIVE LAYOUT
  if (templateId.includes("bold")) {
    return (
      <div 
        className="w-full max-w-2xl aspect-[1/1.414] shadow-2xl rounded-sm border border-slate-200 relative overflow-hidden transition-all duration-300 flex flex-col"
        style={{ backgroundColor: bgColor }}
        onClick={() => onPartClick?.("layout")}
      >
        <div className="h-4 w-full" style={{ backgroundColor: accentColor }} />
        <div className="p-12 flex flex-col gap-10">
          <header className="flex justify-between items-start">
            <div className="max-w-[60%]">
              <h1 className="text-6xl font-black uppercase leading-[0.8]" style={{ color: titleColor }}>{header.firstName}<br /><span className="opacity-50">{header.surname}</span></h1>
              <p className="text-lg font-bold mt-4" style={{ color: accentColor }}>{header.jobTitle}</p>
            </div>
            <div className="text-right text-[10px] font-bold space-y-1 text-slate-400">
               <p>{header.phone}</p>
               <p>{header.email}</p>
               <p>{header.city}</p>
            </div>
          </header>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-4 border-r border-slate-100 pr-8">
               <section className="mb-8">
                 <h3 className="text-[10px] font-black uppercase mb-3 tracking-tighter">Expertise</h3>
                 <div className="space-y-2 text-[10px] font-bold text-slate-500">
                    {skills.content.split('\n').map((s, i) => s && <div key={i}>{s}</div>)}
                 </div>
               </section>
               <section>
                 <h3 className="text-[10px] font-black uppercase mb-3 tracking-tighter">Education</h3>
                 {displayEducation.map((edu, i) => (
                   <div key={i} className="mb-4">
                     <p className="text-[10px] font-black">{edu.gradYear}</p>
                     <p className="text-[9px] text-slate-500">{edu.degree}</p>
                   </div>
                 ))}
               </section>
            </div>
            <div className="col-span-8">
               <section className="mb-10">
                 <p className="text-[12px] font-medium leading-relaxed text-slate-700">{summary.content}</p>
               </section>
               <section>
                 <h3 className="text-xs font-black uppercase mb-6 border-b-4 inline-block" style={{ borderColor: accentColor }}>Work History</h3>
                 <div className="space-y-8">
                    {displayExperience.map((exp, i) => (
                      <div key={i}>
                        <p className="text-[10px] font-black text-slate-400 mb-1">{exp.startYear} - {exp.endYear || "Present"}</p>
                        <h4 className="text-sm font-black text-slate-900">{exp.jobTitle}</h4>
                        <p className="text-[11px] font-bold text-slate-500 mb-3">{exp.employer}</p>
                        <p className="text-[10px] text-slate-600 leading-relaxed">{exp.description}</p>
                      </div>
                    ))}
                 </div>
               </section>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. MODERN SIDEBAR (Default for other templates)
  if (templateId !== "classic") {
    return (
      <div 
        className="w-full max-w-2xl aspect-[1/1.414] shadow-2xl rounded-sm border border-slate-200 relative overflow-hidden transition-all duration-300 flex"
        style={{ backgroundColor: bgColor }}
        onClick={() => onPartClick?.("layout")}
      >
        {/* Left Sidebar */}
        <div className="w-[35%] bg-[#323b4c] text-white flex flex-col p-8 gap-8 overflow-y-auto shrink-0">
          <div className="w-32 h-32 mx-auto rounded-full border-4 border-white/20 overflow-hidden bg-slate-400 flex items-center justify-center shrink-0">
             <span className="text-4xl font-bold opacity-30">{initials}</span>
          </div>

          <section>
            <h3 className="font-bold border-b border-white/20 pb-2 mb-4 text-sm tracking-widest uppercase">Contact</h3>
            <div className="space-y-3 text-[10px] opacity-90">
               {header.phone && <div className="flex items-center gap-2"><Phone className="h-3 w-3" /> {header.phone}</div>}
               {header.email && <div className="flex items-center gap-2"><Mail className="h-3 w-3" /> {header.email}</div>}
               {header.city && <div className="flex items-center gap-2"><MapPin className="h-3 w-3" /> {header.city}</div>}
            </div>
          </section>

          <section>
            <h3 className="font-bold border-b border-white/20 pb-2 mb-4 text-sm tracking-widest uppercase">Education</h3>
            <div className="space-y-4">
               {displayEducation.map((edu: any, i: number) => (
                 <div key={i} className="text-[10px]">
                   <p className="font-bold">{edu.gradYear}</p>
                   <p className="opacity-90">{edu.degree}</p>
                   <p className="opacity-70 italic">{edu.institution}</p>
                 </div>
               ))}
            </div>
          </section>

          <section>
            <h3 className="font-bold border-b border-white/20 pb-2 mb-4 text-sm tracking-widest uppercase">Expertise</h3>
            <div className="text-[10px] space-y-1 opacity-90">
               {skills.content.split('\n').map((s, i) => s && <div key={i}>• {s}</div>)}
            </div>
          </section>
        </div>

        {/* Right Content */}
        <div className="flex-1 bg-white p-10 flex flex-col gap-8 overflow-y-auto pointer-events-none">
          <header className="pointer-events-auto">
            <h1 
              className="text-4xl font-bold tracking-tight text-slate-900 cursor-pointer hover:bg-slate-50 transition-all px-2 rounded"
              style={{ color: titleColor }}
              onClick={(e) => { e.stopPropagation(); onPartClick?.("title"); }}
            >
              {fullName}
            </h1>
            <p className="text-xl text-slate-600 mt-1 font-medium">{header.jobTitle || "Professional"}</p>
            {summary.content && <p className="mt-4 text-[11px] leading-relaxed text-slate-500 whitespace-pre-wrap">{summary.content}</p>}
          </header>

          <section>
            <h3 className="font-bold border-b-2 border-slate-100 pb-2 mb-6 text-sm tracking-widest uppercase text-slate-800">Experience</h3>
            <div className="space-y-8">
               {displayExperience.map((exp: any, i: number) => (
                 <div key={i} className="relative pl-6 border-l border-slate-200">
                   <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full border-2 border-slate-400 bg-white" />
                   <p className="text-[10px] font-bold text-slate-400 mb-1">
                     {exp.startYear} - {exp.isCurrent ? "Present" : exp.endYear}
                   </p>
                   <p className="text-xs font-bold text-slate-800 uppercase tracking-tight">{exp.employer}</p>
                   <p className="text-[11px] font-bold text-slate-600 mt-0.5">{exp.jobTitle}</p>
                   <p className="text-[10px] text-slate-500 mt-2 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                 </div>
               ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // 4. CLASSIC LAYOUT (Fallback)
  return (
    <div 
      className="w-full max-w-md aspect-[1/1.414] shadow-2xl rounded-sm border border-slate-200 relative overflow-hidden transition-all duration-300"
      style={{ backgroundColor: bgColor }}
      onClick={() => onPartClick?.("layout")}
    >
      <div className="p-8 h-full flex flex-col text-slate-800 pointer-events-none">
        <div className="text-center mb-6 pb-4 pointer-events-auto">
          <div 
            className="w-12 h-12 mx-auto border rounded-full flex items-center justify-center text-lg font-serif mb-2 transition-colors cursor-pointer hover:scale-110"
            style={{ borderColor: accentColor, color: accentColor }}
            onClick={(e) => { e.stopPropagation(); onPartClick?.("accent"); }}
          >
            {initials}
          </div>
          <h2 
            className="text-2xl font-serif tracking-widest uppercase font-bold cursor-pointer hover:bg-slate-100/50 rounded px-2 transition-all inline-block"
            style={{ color: titleColor }}
            onClick={(e) => { e.stopPropagation(); onPartClick?.("title"); }}
          >
            {fullName}
          </h2>
          <div className="mt-2 text-[10px] text-slate-500 uppercase tracking-widest flex flex-wrap justify-center gap-1">
            <span>{header.email}</span>
            {header.phone && <span>| {header.phone}</span>}
          </div>
        </div>

        <div className="flex-1 text-[8px] leading-tight flex flex-col gap-4 overflow-y-auto pr-1">
          {summary.content && (
            <div>
              <h3 className="font-bold border-b mb-1 pb-1 text-xs transition-colors" style={{ borderColor: accentColor + "33", color: accentColor }}>Summary</h3>
              <p className="text-slate-600 whitespace-pre-wrap">{summary.content}</p>
            </div>
          )}
          {displayExperience.length > 0 && (
            <div>
              <h3 className="font-bold border-b mb-2 pb-1 text-xs transition-colors" style={{ borderColor: accentColor + "33", color: accentColor }}>Experience</h3>
              {displayExperience.map((exp: any, i: number) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between font-semibold text-slate-700">
                    <span>{exp.jobTitle}</span>
                    <span>{exp.startYear} - {exp.isCurrent ? "Present" : exp.endYear}</span>
                  </div>
                  <div className="italic text-slate-500">{exp.employer}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
