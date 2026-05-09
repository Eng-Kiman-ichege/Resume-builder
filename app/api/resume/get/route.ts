import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { supabaseServer as supabase } from "@/lib/supabaseServer";

export async function GET(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { data, error } = await supabase
      .from("resumes")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (data) {
      // Map database columns back to the frontend ResumeData structure
      const formattedData = {
        ...data,
        settings: data.colors || {
          templateId: data.template_id || 'modern-classic',
          color: "#3b82f6",
          titleColor: "#0f172a",
          backgroundColor: "#ffffff",
        }
      };
      // Ensure templateId is correctly set if colors doesn't have it
      if (formattedData.settings && !formattedData.settings.templateId) {
        formattedData.settings.templateId = data.template_id || 'modern-classic';
      }
      return NextResponse.json(formattedData);
    }

    return NextResponse.json(null);
  } catch (error: any) {
    console.error("GET Resume Error:", error);
    return new NextResponse(error.message, { status: 500 });
  }
}
