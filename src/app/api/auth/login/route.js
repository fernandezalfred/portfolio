import connectToDB from "@/lib/db";
import User from "@/models/User";
import { compare } from "bcryptjs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();
    const { username, password } = await req.json();
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ success: false, message: "Username not found. Please try again" });
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ success: false, message: "Wrong password. Please try again" });
    }

    return NextResponse.json({ success: true, message: "Login successful" });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ success: false, message: "Something went wrong" });
  }
}
