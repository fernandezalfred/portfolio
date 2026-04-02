import connectToDB from "@/lib/db";
import Home from "@/models/Home";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function errorMessage(e: unknown): string {
  return e instanceof Error ? e.message : "Unexpected server error";
}

export async function GET(): Promise<NextResponse> {
  try {
    await connectToDB();
    const data = await Home.find({});
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
    const saved = await Home.create(body);
    if (saved) return NextResponse.json({ success: true, message: "Data saved successfully" });
    return NextResponse.json({ success: false, message: "Failed to save data" }, { status: 500 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: errorMessage(e) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    await connectToDB();
    const { _id, heading, summary } = await req.json();
    const updated = await Home.findByIdAndUpdate({ _id }, { heading, summary }, { new: true });
    if (updated) return NextResponse.json({ success: true, message: "Updated successfully" });
    return NextResponse.json({ success: false, message: "Record not found — nothing was updated" }, { status: 404 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: errorMessage(e) }, { status: 500 });
  }
}
