import connectToDB from "@/lib/db";
import About from "@/models/About";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDB();
    const data = await About.find({});
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
    const saved = await About.create(body);
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
    const { _id, aboutme, noofprojects, yearofexerience, noofclients, skills } = await req.json();
    const updated = await About.findByIdAndUpdate(
      { _id },
      { aboutme, noofprojects, yearofexerience, noofclients, skills },
      { new: true }
    );
    if (updated) return NextResponse.json({ success: true, message: "Updated successfully" });
    return NextResponse.json({ success: false, message: "Something went wrong" });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ success: false, message: "Something went wrong" });
  }
}
