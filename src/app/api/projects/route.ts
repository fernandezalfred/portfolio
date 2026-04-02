import connectToDB from "@/lib/db";
import Project from "@/models/Project";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function errorMessage(e: unknown): string {
  return e instanceof Error ? e.message : "Unexpected server error";
}

export async function GET(): Promise<NextResponse> {
  try {
    await connectToDB();
    const data = await Project.find({});
    return NextResponse.json({ success: true, data });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: errorMessage(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await connectToDB();
    const body = await req.json();
    const saved = await Project.create(body);
    if (saved) return NextResponse.json({ success: true, message: "Data saved successfully" });
    return NextResponse.json({ success: false, message: "Failed to save data" }, { status: 500 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: errorMessage(e) }, { status: 500 });
  }
}
