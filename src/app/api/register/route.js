import connectToDB from "@/database";
import User from "@/models/User";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();

    const { username, password } = await req.json();

    // 1️⃣ Validate input
    if (!username || !password) {
      return NextResponse.json({
        success: false,
        message: "Username and password are required",
      });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "User already exists",
      });
    }

    // 3️⃣ Hash password
    const hashedPassword = await hash(password, 12);

    // 4️⃣ Create new user
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      userId: newUser._id,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
