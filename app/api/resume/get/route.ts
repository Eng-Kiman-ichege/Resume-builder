import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { supabaseServer as supabase } from "@/lib/supabaseServer";

export async function GET(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    let query = supabase.from("resumes").select("*");

    if (id) {
      query = query.eq("id", id).eq("user_id", userId);
    } else {
      query = query.eq("user_id", userId).order("updated_at", { ascending: false }).limit(1);
    }

    const { data, error } = await query;

    if (error) {
      return new NextResponse(error.message, { status: 500 });
    }

    const resume = Array.isArray(data) ? data[0] : data;

    if (resume) {
      // Map database columns back to the frontend ResumeData structure
      const formattedData = {
        ...resume,
        settings: resume.colors || {
          templateId: resume.template_id || 'modern-classic',
          color: "#3b82f6",
          titleColor: "#0f172a",
          backgroundColor: "#ffffff",
        }
      };
      // Ensure templateId is correctly set if colors doesn't have it
      if (formattedData.settings && !formattedData.settings.templateId) {
        formattedData.settings.templateId = resume.template_id || 'modern-classic';
      }
      return NextResponse.json(formattedData);
    }

    return NextResponse.json(null);
  } catch (error: any) {
    console.error("GET Resume Error:", error);
    return new NextResponse(error.message, { status: 500 });
  }
}
