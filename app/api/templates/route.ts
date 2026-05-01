import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { templates } = await req.json();

    // In a real production app, we would loop through and handle file uploads to Supabase Storage first.
    // For this implementation, we are saving the template metadata to the 'templates' table.
    
    const { error } = await supabase
      .from("templates")
      .upsert(
        templates.map((t: any) => ({
          id: t.id,
          name: t.name,
          thumbnail: t.thumbnail || "",
          is_pdf: t.isPdf || false,
          file_name: t.fileName || "",
          file_size: t.fileSize || "",
          updated_at: new Date().toISOString()
        }))
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

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
