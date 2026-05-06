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
      .from("cover_letters")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Fetch cover letters error:", error);
      // Check if table doesn't exist (Postgres code 42P01)
      if (error.code === "42P01" || error.message.includes("does not exist")) {
        return new NextResponse("Table 'cover_letters' does not exist. Please create it in Supabase.", { status: 404 });
      }
      return new NextResponse(error.message, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
