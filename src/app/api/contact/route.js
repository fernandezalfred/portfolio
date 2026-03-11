import connectToDB from "@/lib/db";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDB();
    const data = await Contact.find({});
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
    const saved = await Contact.create(body);
    if (saved) return NextResponse.json({ success: true, message: "Data saved successfully" });
    return NextResponse.json({ success: false, message: "Something went wrong" });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ success: false, message: "Something went wrong" });
  }
}
