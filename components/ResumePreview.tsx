"use client";

import { useState, useEffect, useRef } from "react";
import { useResume } from "@/lib/context/ResumeContext";
import { Sparkles, Loader2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTemplateComponent } from "@/lib/templates";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const A4_W = 794;  // A4 width in px at 96 dpi
const A4_H = 1123; // A4 height in px at 96 dpi

export function ResumePreview({
  liveExperience,
  liveEducation,
  customTemplateId,
}: {
  liveExperience?: any;
  liveEducation?: any;
  customTemplateId?: string;
}) {
  const { resumeData } = useResume();
  const settings = resumeData.settings || { templateId: "modern-classic" };
  const activeTemplateId = (
    customTemplateId ||
    settings.templateId ||
    "modern-classic"
  ).toLowerCase();

  const [scale, setScale] = useState(0.5);
  const [exporting, setExporting] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);

  // Compute scale so the full A4 width fits the available container width
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const availableW = containerRef.current.clientWidth - 32; // 16px padding each side
      setScale(Math.max(0.2, Math.min(1, availableW / A4_W)));
    };
    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const handleDownload = async () => {
    if (!resumeRef.current) return;
    setExporting(true);
    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`resume-${resumeData.header.firstName || "cv"}.pdf`);
    } catch (err) {
      console.error("Export error:", err);
    } finally {
      setExporting(false);
    }
  };

  const TemplateComponent = getTemplateComponent(activeTemplateId);

  const currentData = {
    ...resumeData,
    experience: liveExperience
      ? [...resumeData.experience, liveExperience]
      : resumeData.experience,
    education: liveEducation
      ? [...resumeData.education, liveEducation]
      : resumeData.education,
  };

  // Outer wrapper = scaled pixel dimensions so it takes up exactly the right space
  const scaledW = A4_W * scale;
  const scaledH = A4_H * scale;

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex flex-col items-center overflow-y-auto bg-slate-100 dark:bg-zinc-900/60 py-4 px-4 gap-4"
    >
      {/* ── Action Bar ── */}
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
          onClick={handleDownload}
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

      {/* ── Stage ──
          The outer div collapses to the *visual* (scaled) size so the layout
          never overflows. The inner div is full A4 and gets CSS-scaled down. */}
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
          <TemplateComponent data={currentData} />
        </div>
      </div>

      {/* Label */}
      <p className="flex-shrink-0 pb-4 text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em] self-center">
        {activeTemplateId} · template active
      </p>
    </div>
  );
}
