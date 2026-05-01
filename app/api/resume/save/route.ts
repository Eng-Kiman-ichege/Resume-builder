import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { section, data } = await req.json();

    // Update the resume record for this user
    // Note: This assumes a single resume per user for simplicity, or we'd need a resumeId
    const { error } = await supabase
      .from("resumes")
      .upsert(
        { 
          user_id: userId, 
          [section]: data,
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
