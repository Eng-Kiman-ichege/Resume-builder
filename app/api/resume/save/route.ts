import { auth } from "@clerk/nextjs/server";
import { supabaseServer as supabase } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { section, data, resumeId } = await req.json();

    const updateData: any = { 
      user_id: userId, 
      updated_at: new Date().toISOString()
    };

    if (section === "settings") {
      updateData.template_id = data.templateId;
      updateData.colors = data;
    } else {
      updateData[section] = data;
    }

    let result;
    if (resumeId) {
      // Update specific resume
      result = await supabase
        .from("resumes")
        .update(updateData)
        .eq("id", resumeId)
        .eq("user_id", userId);
    } else {
      // Create new resume (Auto-save behavior)
      result = await supabase
        .from("resumes")
        .insert(updateData);
    }

    if (result.error) {
      console.error("Supabase error:", result.error);
      return new NextResponse("Database Error", { status: 500 });
    }

    return NextResponse.json({ success: true, id: result.data?.[0]?.id });
  } catch (error) {
    console.error("API Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
