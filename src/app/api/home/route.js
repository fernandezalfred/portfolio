import connectToDB from "@/lib/db";
import Home from "@/models/Home";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDB();
    const data = await Home.find({});
    return NextResponse.json({ success: true, data });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ success: false, message: "Something went wrong" });
  }
}

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const saved = await Home.create(body);
    if (saved) return NextResponse.json({ success: true, message: "Data saved successfully" });
    return NextResponse.json({ success: false, message: "Something went wrong" });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ success: false, message: "Something went wrong" });
  }
}

export async function PUT(req) {
  try {
    await connectToDB();
    const { _id, heading, summary } = await req.json();
    const updated = await Home.findByIdAndUpdate({ _id }, { heading, summary }, { new: true });
    if (updated) return NextResponse.json({ success: true, message: "Updated successfully" });
    return NextResponse.json({ success: false, message: "Something went wrong" });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ success: false, message: "Something went wrong" });
  }
}
