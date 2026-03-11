import connectToDB from "@/lib/db";
import User from "@/models/User";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ success: false, message: "Username and password are required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await hash(password, 12);
    const newUser = await User.create({ username, password: hashedPassword });

    return NextResponse.json({ success: true, message: "User registered successfully", userId: newUser._id });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ success: false, message: "Something went wrong" });
  }
}
