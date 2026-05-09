import { auth } from "@clerk/nextjs/server";
import { supabaseServer as supabase } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { resumeData } = await req.json();

    if (!resumeData) {
      return new NextResponse("Resume data is required", { status: 400 });
    }

    // Update the resume record for this user
    // We upsert all fields at once, mapping settings to template_id and colors
    const { error } = await supabase
      .from("resumes")
      .upsert(
        { 
          user_id: userId, 
          header: resumeData.header,
          experience: resumeData.experience,
          education: resumeData.education,
          skills: resumeData.skills,
          summary: resumeData.summary,
          additional: resumeData.additional,
          template_id: resumeData.settings?.templateId || 'modern-classic',
          colors: resumeData.settings, // Store the full settings object in colors for retrieval
          updated_at: new Date().toISOString()
        },
        { onConflict: 'user_id' }
      );

    if (error) {
      console.error("Supabase error:", error);
      return new NextResponse("Database Error", { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
