import { generateJobDescription } from "@/lib/ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { jobTitle, employer } = await req.json();

    if (!jobTitle) {
      return NextResponse.json({ error: "Job title is required" }, { status: 400 });
    }

    const description = await generateJobDescription(jobTitle, employer);

    if (!description) {
      return NextResponse.json({ error: "AI Generation Failed" }, { status: 500 });
    }

    return NextResponse.json({ description });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message || "Internal Error" }, { status: 500 });
  }
}
