import { generateAutoReview } from "@/lib/ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { data } = await req.json();

    if (!data) {
      return NextResponse.json({ error: "Resume data is required" }, { status: 400 });
    }

    const reviewJson = await generateAutoReview(data);

    if (!reviewJson || !reviewJson.suggestions) {
      return NextResponse.json({ error: "AI Generation Failed or returned invalid format" }, { status: 500 });
    }

    return NextResponse.json(reviewJson);
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message || "Internal Error" }, { status: 500 });
  }
}
