"use client";

import { useState, useEffect, useRef } from "react";
import { useResume, ResumeContext, type ResumeData } from "@/lib/context/ResumeContext";
import { useContext } from "react";
import { Sparkles, Loader2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTemplateComponent } from "@/lib/templates";
import { toPng, toJpeg } from "html-to-image";
import jsPDF from "jspdf";
import { usePathname } from "next/navigation";

const A4_W = 794;  // A4 width in px at 96 dpi
const A4_H = 1123; // A4 height in px at 96 dpi

import { forwardRef, useImperativeHandle } from "react";

export const ResumePreview = forwardRef(({
  liveExperience,
  liveEducation,
  customTemplateId,
  data: propData,
  manualScale,
  onUpdate,
}: {
  liveExperience?: any;
  liveEducation?: any;
  customTemplateId?: string;
  data?: any;
  manualScale?: number;
  onUpdate?: (section: any, value: any) => void;
}, ref) => {
  const context = useContext(ResumeContext);
  const resumeData = propData || context?.resumeData;
  const settings = resumeData?.settings || { templateId: "modern-classic" };
  const activeTemplateId = (
    customTemplateId ||
    settings.templateId ||
    "modern-classic"
  ).toLowerCase();

  const pathname = usePathname();
  const isFinalizePage = pathname === "/dashboard/finalize" || pathname === "/builder/review";
  const showDownloadButton = isFinalizePage && !customTemplateId;

  const [scale, setScale] = useState(manualScale || 0.5);
  const [exporting, setExporting] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  // Auto-scale inner content to strictly fit within A4 height (1 page)
  const contentRef = useRef<HTMLDivElement>(null);
  const [innerScale, setInnerScale] = useState(1);

  // Compute scale so the full A4 width fits the available container width
  useEffect(() => {
    if (manualScale) {
      setScale(manualScale);
      return;
    }
    const updateScale = () => {
      if (!containerRef.current) return;
      const availableW = containerRef.current.clientWidth - 32; // 16px padding each side
      setScale(Math.max(0.2, Math.min(1, availableW / A4_W)));
    };
    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [manualScale]);

  const handleDownload = async (action: "download" | "print" | "email" = "download") => {
    if (!resumeRef.current) return;
    setExporting(true);
    try {
      const originalTransform = resumeRef.current.style.transform;
      resumeRef.current.style.transform = "none";
      
      // Wait for DOM to register transform reset (optional, but safer)
      await new Promise(resolve => setTimeout(resolve, 0));
      
      const dataUrl = await toJpeg(resumeRef.current, {
        quality: 1.0,
        pixelRatio: 3,
        backgroundColor: "#ffffff",
        style: {
          transform: "none",
        }
      });
      
      const elementHeight = A4_H; // Since we auto-scale, we capture exactly A4 height
      const elementWidth = A4_W;
      
      resumeRef.current.style.transform = originalTransform;
      
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // --- ATS-Friendly Invisible Text Layer ---
      // We extract all text and embed it behind the image so PDF scanners can read it.
      pdf.setTextColor(0, 0, 0); 
      
      // --- ATS-Friendly Invisible Text Layer ---
      // We build the text directly from the data object to guarantee extraction.
      pdf.setTextColor(0, 0, 0); 
      
      let rawText = "";
      if (currentData.header) {
        rawText += `${currentData.header.firstName || ""} ${currentData.header.surname || ""}\n`;
        rawText += `${currentData.header.jobTitle || ""}\n`;
        rawText += `${currentData.header.email || ""} | ${currentData.header.phone || ""} | ${currentData.header.city || ""}, ${currentData.header.country || ""}\n\n`;
      }
      if (currentData.summary?.content) {
        rawText += `Summary\n${currentData.summary.content}\n\n`;
      }
      if (currentData.experience?.length) {
        rawText += `Experience\n`;
        currentData.experience.forEach((exp: any) => {
          rawText += `${exp.jobTitle || ""} at ${exp.employer || ""}\n`;
          rawText += `${exp.startYear || ""} - ${exp.endYear || "Present"}\n`;
          rawText += `${exp.description || ""}\n\n`;
        });
      }
      if (currentData.education?.length) {
        rawText += `Education\n`;
        currentData.education.forEach((edu: any) => {
          rawText += `${edu.degree || ""} ${edu.field ? "in " + edu.field : ""} at ${edu.institution || ""}\n`;
          rawText += `${edu.startYear || ""} - ${edu.endYear || ""}\n\n`;
        });
      }
      if (currentData.skills?.content) {
        rawText += `Skills\n${currentData.skills.content}\n\n`;
      }

      if (rawText.trim()) {
        pdf.setFontSize(10);
        const lines = pdf.splitTextToSize(rawText.trim(), pdfWidth - 10);
        pdf.text(lines, 5, 5);
      }
      // ------------------------------------------
      
      pdf.addImage(dataUrl, "JPEG", 0, 0, pdfWidth, pdfHeight);
      
      if (action === "print") {
        pdf.autoPrint();
        const blobUrl = pdf.output("bloburl");
        window.open(blobUrl, "_blank");
      } else if (action === "email") {
        const blob = pdf.output("blob");
        const file = new File([blob], `resume-${resumeData.header?.firstName || "cv"}.pdf`, { type: "application/pdf" });
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              title: "My Resume",
              files: [file],
            });
          } catch (e) {
            console.error("Share failed", e);
            pdf.save(`resume-${resumeData.header?.firstName || "cv"}.pdf`);
            window.location.href = "mailto:?subject=My Resume";
          }
        } else {
          pdf.save(`resume-${resumeData.header?.firstName || "cv"}.pdf`);
          window.location.href = "mailto:?subject=My Resume&body=I have attached my resume to this email.";
        }
      } else {
        pdf.save(`resume-${resumeData.header?.firstName || "cv"}.pdf`);
      }
    } catch (err) {
      console.error("Export error:", err);
    } finally {
      setExporting(false);
    }
  };

  useImperativeHandle(ref, () => ({
    download: () => handleDownload("download"),
    print: () => handleDownload("print"),
    email: () => handleDownload("email"),
  }));

  const TemplateComponent = getTemplateComponent(activeTemplateId);

  const handleLiveUpdate = (section: keyof ResumeData, value: any) => {
    if (context?.updateSection) {
      context.updateSection(section, value);
      
      // Save to DB
      fetch("/api/resume/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, data: value })
      });
    }
  };

  const currentData = {
    ...resumeData,
    experience: liveExperience
      ? [...resumeData.experience, liveExperience]
      : resumeData.experience,
    education: liveEducation
      ? [...resumeData.education, liveEducation]
      : resumeData.education,
  };

  useEffect(() => {
    const checkHeight = () => {
      if (!contentRef.current) return;
      // Reset transform to measure raw height
      contentRef.current.style.transform = "none";
      const scrollHeight = contentRef.current.scrollHeight;
      
      if (scrollHeight > A4_H) {
        // Leave a tiny margin of error so it doesn't clip
        setInnerScale((A4_H - 10) / scrollHeight);
      } else {
        setInnerScale(1);
      }
    };
    
    // Slight delay to allow DOM to render new content before measuring
    const timeoutId = setTimeout(checkHeight, 50);
    return () => clearTimeout(timeoutId);
  }, [currentData, activeTemplateId]);

  // Outer wrapper = scaled pixel dimensions so it takes up exactly the right space
  const scaledW = A4_W * scale;
  const scaledH = A4_H * scale;

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex flex-col items-center overflow-y-auto bg-slate-100 dark:bg-zinc-900/60 py-4 px-4 gap-4"
    >
      {/* ── Action Bar ── */}
      {showDownloadButton && (
        <div className="flex-shrink-0 self-center flex items-center gap-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl px-3 py-2 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-lg">
          <div className="flex items-center gap-2 px-3 py-1 border-r border-slate-100 dark:border-zinc-800">
            <Sparkles className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
              Live Canva Engine
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDownload("download")}
            disabled={exporting}
            className="h-auto py-1 text-[9px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 hover:bg-blue-50 gap-1.5"
          >
            {exporting ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Download className="h-3 w-3" />
            )}
            {exporting ? "Exporting..." : "Download PDF"}
          </Button>
        </div>
      )}

      {/* ── Stage ── */}
      <div
        className="flex-shrink-0 relative shadow-2xl"
        style={{ width: scaledW, height: scaledH }}
      >
        <div
          ref={resumeRef}
          style={{
            width: A4_W,
            minHeight: A4_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
          className="bg-white"
        >
          <div
            ref={contentRef}
            style={{
              width: "100%",
              transform: `scale(${innerScale})`,
              transformOrigin: "top left",
            }}
          >
            <TemplateComponent 
              data={currentData} 
              onUpdate={handleLiveUpdate}
            />
          </div>
        </div>
      </div>

      {/* Label */}
      <p className="flex-shrink-0 pb-4 text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em] self-center">
        {activeTemplateId} · template active
      </p>
    </div>
  );
});
