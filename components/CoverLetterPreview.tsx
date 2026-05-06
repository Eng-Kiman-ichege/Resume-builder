"use client";

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useCoverLetter, CoverLetterContext } from "@/lib/context/CoverLetterContext";
import { useContext } from "react";
import { Loader2, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCoverLetterTemplate } from "@/lib/cover-letter-templates";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

const A4_W = 794;  // A4 width in px at 96 dpi
const A4_H = 1123; // A4 height in px at 96 dpi

export const CoverLetterPreview = forwardRef(({
  showDownload = false,
  data: propData,
}: {
  showDownload?: boolean;
  data?: any;
}, ref) => {
  const context = useContext(CoverLetterContext);
  const coverLetterData = propData || context?.coverLetterData;
  const [scale, setScale] = useState(0.5);
  const [exporting, setExporting] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const availableW = containerRef.current.clientWidth - 32;
      setScale(Math.max(0.2, Math.min(1, availableW / A4_W)));
    };
    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const handleDownload = async (action: "download" | "print" = "download") => {
    if (!letterRef.current) return;
    setExporting(true);
    try {
      const originalTransform = letterRef.current.style.transform;
      letterRef.current.style.transform = "none";
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const dataUrl = await toPng(letterRef.current, {
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });
      
      const elementHeight = letterRef.current.offsetHeight;
      const elementWidth = letterRef.current.offsetWidth;
      letterRef.current.style.transform = originalTransform;
      
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (elementHeight * pdfWidth) / elementWidth;
      
      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      
      if (action === "print") {
        pdf.autoPrint();
        window.open(pdf.output("bloburl"), "_blank");
      } else {
        pdf.save(`cover-letter-${coverLetterData.sender.name || "document"}.pdf`);
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
  }));

  const TemplateComponent = getCoverLetterTemplate(coverLetterData.settings.templateId);

  const scaledW = A4_W * scale;
  const scaledH = A4_H * scale;

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center bg-slate-100 dark:bg-zinc-900/60 py-4 px-4 gap-4 overflow-y-auto scrollbar-hide">
      {showDownload && (
        <div className="flex-shrink-0 self-center flex items-center gap-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl px-3 py-2 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-lg">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDownload("download")}
            disabled={exporting}
            className="h-auto py-1 text-[9px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 hover:bg-blue-50 gap-1.5"
          >
            {exporting ? <Loader2 className="h-3 w-3 animate-spin" /> : <Download className="h-3 w-3" />}
            {exporting ? "Exporting..." : "Download PDF"}
          </Button>
        </div>
      )}

      <div className="flex-shrink-0 relative shadow-2xl" style={{ width: scaledW, height: scaledH }}>
        <div
          ref={letterRef}
          style={{
            width: A4_W,
            minHeight: A4_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
          className="bg-white"
        >
          <TemplateComponent data={coverLetterData} />
        </div>
      </div>
    </div>
  );
});

CoverLetterPreview.displayName = "CoverLetterPreview";
