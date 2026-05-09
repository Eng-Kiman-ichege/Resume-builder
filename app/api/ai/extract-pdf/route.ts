import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 🛡️ COMPREHENSIVE NODE.JS SHIMS
    // These prevent PDF.js from crashing when it looks for browser APIs
    if (typeof globalThis.DOMMatrix === "undefined") {
      (globalThis as any).DOMMatrix = class DOMMatrix {
        constructor() {}
        static fromFloat32Array() { return new DOMMatrix(); }
        static fromFloat64Array() { return new DOMMatrix(); }
      };
    }
    
    // Some versions of PDF.js check for Image or document
    if (typeof globalThis.Image === "undefined") {
      (globalThis as any).Image = class {};
    }

    // 🛠️ Use pdf-parse v2 (Named Export)
    const { PDFParse } = await import("pdf-parse");
    const parser = new (PDFParse as any)({ data: buffer });
    const result = await parser.getText();
    await parser.destroy();

    return NextResponse.json({ text: result.text });
  } catch (error: any) {
    console.error("PDF Extraction Error:", error);
    return NextResponse.json(
      { error: "Failed to extract text from PDF: " + error.message },
      { status: 500 }
    );
  }
}
