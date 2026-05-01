import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";

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

    if (error && error.code !== "PGRST116") { // PGRST116 is "No rows found"
      return new NextResponse(error.message, { status: 500 });
    }

    return NextResponse.json(data || null);
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
