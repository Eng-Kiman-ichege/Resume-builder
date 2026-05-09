import { auth } from "@clerk/nextjs/server";
import { supabaseServer as supabase } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await req.json();
    const { id, ...payload } = data;

    const dbPayload = { 
      user_id: userId, 
      sender: data.sender,
      recipient: data.recipient,
      content: data.content,
      settings: data.settings,
      updated_at: new Date().toISOString()
    };

    let result;
    if (id) {
      // Update existing
      result = await supabase
        .from("cover_letters")
        .update(dbPayload)
        .eq("id", id)
        .eq("user_id", userId);
    } else {
      // Insert new
      result = await supabase
        .from("cover_letters")
        .insert(dbPayload);
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
