import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { resumeData, section } = await req.json();

    const apiKey = process.env.OPENROUTER_API_KEY;
    const model = process.env.OPENROUTER_MODEL || "nvidia/nemotron-4-340b-instruct";

    // Build a rich prompt based on what section we're analyzing
    let prompt = "";

    if (section === "experience" && resumeData.experience?.length > 0) {
      const exp = resumeData.experience.map((e: any) =>
        `- ${e.jobTitle} at ${e.employer} (${e.startYear}–${e.endYear || "Present"}): ${e.description || "No description yet"}`
      ).join("\n");

      prompt = `You are a professional resume writer. Review this work experience and suggest ONE improved, detailed bullet-point description (3-4 sentences) that uses strong action verbs, quantifies achievements, and is ATS-friendly. Return ONLY the improved description text, no explanation.

Experience:
${exp}

Improved description:`;
    } else if (section === "summary") {
      prompt = `You are a professional resume writer. Write a compelling, 3-sentence professional summary for this person. Use active voice, highlight their strengths, and make it ATS-friendly. Return ONLY the summary text.

Name: ${resumeData.header?.firstName} ${resumeData.header?.surname}
Job Title: ${resumeData.header?.jobTitle}
Current Summary: ${resumeData.summary?.content || "None"}
Skills: ${resumeData.skills?.content || "Not specified"}
Experience: ${resumeData.experience?.map((e: any) => `${e.jobTitle} at ${e.employer}`).join(", ") || "None"}

Improved summary:`;
    } else if (section === "skills") {
      prompt = `You are a professional resume writer. Based on this person's job title and experience, suggest 10-15 additional relevant skills (comma-separated) that would make their resume more ATS-friendly. Return ONLY a comma-separated list of skills.

Job Title: ${resumeData.header?.jobTitle}
Current Skills: ${resumeData.skills?.content || "None"}
Experience: ${resumeData.experience?.map((e: any) => `${e.jobTitle}`).join(", ") || "None"}

Suggested skills (comma-separated):`;
    } else {
      // General full-resume analysis
      const hasExperience = resumeData.experience?.length > 0;
      const hasSummary = !!resumeData.summary?.content && resumeData.summary.content.length > 50;
      const hasSkills = !!resumeData.skills?.content;
      const hasEducation = resumeData.education?.length > 0;

      prompt = `You are a professional resume coach. Analyze this resume data and provide a structured review with 4-5 specific, actionable bullet points. Be direct, helpful, and specific. Format as bullet points starting with •.

Name: ${resumeData.header?.firstName} ${resumeData.header?.surname}
Job Title: ${resumeData.header?.jobTitle}
Summary: ${resumeData.summary?.content || "Missing"}
Skills: ${resumeData.skills?.content || "Missing"}
Experience (${resumeData.experience?.length || 0} entries): ${resumeData.experience?.map((e: any) => `${e.jobTitle} at ${e.employer}`).join(", ") || "None"}
Education (${resumeData.education?.length || 0} entries): ${resumeData.education?.map((e: any) => `${e.degree} from ${e.institution}`).join(", ") || "None"}

Resume analysis:`;
    }

    if (apiKey) {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://cvcraft.app",
          "X-Title": "CV Craft"
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: prompt }],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (response.ok) {
        const data = await response.json();
        const analysis = data.choices?.[0]?.message?.content?.trim();
        if (analysis) {
          return NextResponse.json({ analysis });
        }
      }
    }

    // Fallback if no API key or request fails
    await new Promise(resolve => setTimeout(resolve, 800));

    const fallbacks: Record<string, string> = {
      experience: `Spearheaded end-to-end software development lifecycle, collaborating with cross-functional teams to design, build, and deploy scalable solutions. Optimized system performance by 30% through strategic code refactoring and implementation of best practices. Delivered high-quality features on time, mentoring junior team members and contributing to a culture of continuous improvement.`,
      summary: `Results-driven ${resumeData.header?.jobTitle || "professional"} with proven expertise in delivering high-impact solutions across complex environments. Known for exceptional problem-solving abilities, strong communication skills, and a track record of exceeding performance targets. Passionate about leveraging technical expertise to drive organizational growth and innovation.`,
      skills: `Project Management, Agile Methodology, Team Leadership, Data Analysis, Problem Solving, Communication, Strategic Planning, Microsoft Office Suite, Time Management, Critical Thinking`,
      default: `• Your summary should be 3-4 sentences highlighting your top achievements and value proposition.\n• Add quantifiable metrics to each experience bullet (e.g., "increased efficiency by 25%").\n• Expand your skills section with industry-specific keywords to pass ATS screening.\n• Consider adding a dedicated Achievements or Key Projects section to stand out.\n• Ensure consistent date formatting and verb tense throughout your experience section.`
    };

    return NextResponse.json({ analysis: fallbacks[section] || fallbacks.default });
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
