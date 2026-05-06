import { NextResponse } from "next/server";
import { generateCoverLetter } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const { jobTitle, company, resumeData } = await req.json();

    const body = await generateCoverLetter(jobTitle, company, resumeData);

    if (!body) {
      return new NextResponse("Failed to generate cover letter", { status: 500 });
    }

    return NextResponse.json({ body });
  } catch (error) {
    console.error("AI API Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
