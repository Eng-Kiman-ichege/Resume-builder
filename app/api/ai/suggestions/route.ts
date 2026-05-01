import { generateResumeSuggestions } from "@/lib/ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { section, data } = await req.json();

    const suggestions = await generateResumeSuggestions(section, data);

    if (!suggestions) {
      return NextResponse.json({ error: "AI Generation Failed" }, { status: 500 });
    }

    return NextResponse.json({ suggestions });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message || "Internal Error" }, { status: 500 });
  }
}
