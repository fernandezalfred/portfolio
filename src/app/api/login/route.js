import connectToDB from "@/database";
import User from "@/models/User";
import { compare, hash } from "bcryptjs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();
    const { username, password } = await req.json();
    const checkUser = await User.findOne({ username });

    if (!checkUser) {
      return NextResponse.json({
        success: false,
        message: "User name is not present Please try again",
      });
    }

    const checkPassword = await compare(password, checkUser.password);

    if (!checkPassword) {
      return NextResponse.json({
        success: false,
        message: "Wrong Password. Please try again",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Login Sucessfull",
    });
  } catch (e) {
    console.log(e);
  }
}

