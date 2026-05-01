"use client";

import { useResume } from "@/lib/context/ResumeContext";
import { ZoomIn } from "lucide-react";

export function ResumePreview({ 
  liveExperience, 
  liveEducation,
  onPartClick 
}: { 
  liveExperience?: any, 
  liveEducation?: any,
  onPartClick?: (part: "title" | "layout" | "accent") => void
}) {
  const { resumeData } = useResume();
  const { header, skills, summary } = resumeData;
  const settings = resumeData.settings || { color: "#3b82f6", titleColor: "#0f172a", backgroundColor: "#ffffff" };
  
  // Ensure we have arrays
  const experience = Array.isArray(resumeData.experience) ? resumeData.experience : [];
  const education = Array.isArray(resumeData.education) ? resumeData.education : [];

  // Combine saved data with live typing data only if it has content
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

  return (
    <div 
      className="w-full max-w-md aspect-[1/1.414] shadow-2xl rounded-sm border border-slate-200 relative overflow-hidden transition-all duration-300"
      style={{ backgroundColor: bgColor }}
      onClick={(e) => {
        onPartClick?.("layout");
      }}
    >
      <div className="p-8 h-full flex flex-col text-slate-800 pointer-events-none">
        {/* Header Section */}
        <div className="text-center mb-6 pb-4 pointer-events-auto">
          <div 
            className="w-12 h-12 mx-auto border rounded-full flex items-center justify-center text-lg font-serif mb-2 transition-colors cursor-pointer hover:scale-110"
            style={{ borderColor: accentColor, color: accentColor }}
            onClick={(e) => {
              e.stopPropagation();
              onPartClick?.("accent");
            }}
          >
            {initials}
          </div>
          <h2 
            className="text-2xl font-serif tracking-widest uppercase font-bold cursor-pointer hover:bg-slate-100/50 rounded px-2 transition-all inline-block"
            style={{ color: titleColor }}
            onClick={(e) => {
              e.stopPropagation();
              onPartClick?.("title");
            }}
          >
            {fullName}
          </h2>
          <div className="mt-2 text-[10px] text-slate-500 uppercase tracking-widest flex flex-wrap justify-center gap-1">
            <span>{header.email || "EMAIL@EXAMPLE.COM"}</span>
            {header.phone && <span>| {header.phone}</span>}
            {header.city && <span>| {header.city}, {header.country}</span>}
          </div>
        </div>

        <div className="flex-1 text-[8px] leading-tight flex flex-col gap-4 overflow-y-auto pr-1">
          {/* Summary Section */}
          {summary.content && (
            <div>
              <h3 
                className="font-bold border-b mb-1 pb-1 text-xs transition-colors"
                style={{ borderColor: accentColor + "33", color: accentColor }}
              >
                Summary
              </h3>
              <p className="text-slate-600 whitespace-pre-wrap">{summary.content}</p>
            </div>
          )}

          {/* Skills Section */}
          {skills.content && (
            <div>
              <h3 
                className="font-bold border-b mb-1 pb-1 text-xs transition-colors"
                style={{ borderColor: accentColor + "33", color: accentColor }}
              >
                Skills
              </h3>
              <div className="text-slate-600 whitespace-pre-wrap">
                {skills.content}
              </div>
            </div>
          )}

          {/* Experience Section */}
          {displayExperience.length > 0 && (
            <div>
              <h3 
                className="font-bold border-b mb-2 pb-1 text-xs transition-colors"
                style={{ borderColor: accentColor + "33", color: accentColor }}
              >
                Experience
              </h3>
              {displayExperience.map((exp: any, i: number) => {
                const hasData = exp.jobTitle || exp.employer || exp.city;
                if (!hasData) return null;
                
                return (
                  <div key={i} className="mb-3 last:mb-0">
                    <div className="flex justify-between font-semibold text-slate-700">
                      <span>{exp.jobTitle}</span>
                      {(exp.startYear || exp.endYear || exp.isCurrent) && (
                        <span>
                          {exp.startMonth && `${exp.startMonth}/`}{exp.startYear}
                          {(exp.startYear || exp.endYear || exp.isCurrent) ? " - " : ""}
                          {exp.isCurrent ? "Present" : (exp.endYear ? `${exp.endMonth ? `${exp.endMonth}/` : ""}${exp.endYear}` : "")}
                        </span>
                      )}
                    </div>
                    {(exp.employer || exp.city) && (
                      <div className="italic text-slate-500">
                        {exp.employer}{exp.employer && exp.city && " | "}{exp.city}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Education Section */}
          {displayEducation.length > 0 && (
            <div>
              <h3 className="font-bold border-b border-slate-200 mb-2 pb-1 text-xs">Education</h3>
              {displayEducation.map((edu: any, i: number) => {
                const hasData = edu.degree || edu.institution;
                if (!hasData) return null;

                return (
                  <div key={i} className="mb-2 last:mb-0">
                    <div className="flex justify-between font-semibold text-slate-700">
                      <span>{edu.degree}</span>
                      <span>{edu.gradYear}</span>
                    </div>
                    <div className="text-slate-500">{edu.institution}</div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>


      {/* Zoom Button */}
      <button className="absolute bottom-4 right-4 w-10 h-10 bg-amber-200 hover:bg-amber-300 rounded-full shadow-lg flex items-center justify-center text-amber-900 transition-colors z-20">
        <ZoomIn className="h-4 w-4" />
      </button>
    </div>
  );
}
