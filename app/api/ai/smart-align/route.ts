import { generateOptimizedResume } from "@/lib/ai";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { cvText, jobDescription } = await req.json();

    if (!cvText || !jobDescription) {
      return NextResponse.json(
        { error: "CV text and Job Description are required" },
        { status: 400 }
      );
    }

    const optimizedResume = await generateOptimizedResume(cvText, jobDescription);

    return NextResponse.json(optimizedResume);
  } catch (error: any) {
    console.error("API Error:", error);

    // Surface rate limit errors with a clear, actionable message
    if (error?.status === 429 || error?.code === 429) {
      return NextResponse.json(
        {
          error:
            "AI rate limit reached. You've used all free daily requests. Please add credits at openrouter.ai or try again tomorrow.",
        },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Internal Error" },
      { status: 500 }
    );
  }
}
