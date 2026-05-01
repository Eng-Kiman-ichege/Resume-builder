import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { resumeData } = await req.json();

    // In a real app, you would send this to Gemini or OpenRouter
    // For this demo, we'll generate a high-quality simulated response based on the data
    
    const hasExperience = resumeData.experience.length > 0;
    const hasSummary = !!resumeData.summary.content;
    const hasSkills = !!resumeData.skills.content;

    let analysis = "Your resume structure is solid! ";
    
    if (!hasSummary) {
      analysis += "Add a professional summary to grab the recruiter's attention in the first 6 seconds. ";
    } else if (resumeData.summary.content.length < 100) {
      analysis += "Your summary is a bit short. Try to include 2-3 key achievements. ";
    }

    if (hasExperience) {
      analysis += "Your experience section is well-documented. Try to use more action verbs like 'Spearheaded', 'Optimized', or 'Orchestrated'. ";
    } else {
      analysis += "Since you're early in your career, focus on projects, internships, or volunteer work in your experience section. ";
    }

    if (!hasSkills) {
      analysis += "Don't forget to add a Skills section with keywords from the job description to beat the ATS scan.";
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
