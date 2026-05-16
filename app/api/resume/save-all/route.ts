import { auth } from "@clerk/nextjs/server";
import { supabaseServer as supabase } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { resumeData, resumeId } = await req.json();

    if (!resumeData) {
      return new NextResponse("Resume data is required", { status: 400 });
    }

    const payload = { 
      user_id: userId, 
      header: resumeData.header,
      experience: resumeData.experience,
      education: resumeData.education,
      skills: resumeData.skills,
      summary: resumeData.summary,
      additional: resumeData.additional,
      template_id: resumeData.settings?.templateId || 'modern-classic',
      colors: resumeData.settings,
      updated_at: new Date().toISOString()
    };

    let result;
    if (resumeId) {
      result = await supabase
        .from("resumes")
        .update(payload)
        .eq("id", resumeId)
        .eq("user_id", userId)
        .select();
    } else {
      result = await supabase
        .from("resumes")
        .insert(payload)
        .select();
    }

    if (result.error) {
      console.error("Supabase error:", result.error);
      return new NextResponse("Database Error", { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
