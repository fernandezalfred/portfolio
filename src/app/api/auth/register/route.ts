import connectToDB from "@/lib/db";
import User from "@/models/User";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function errorMessage(e: unknown): string {
  return e instanceof Error ? e.message : "Unexpected server error";
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await connectToDB();
    const { username, password }: { username: string; password: string } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username and password are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 12);
    const newUser = await User.create({ username, password: hashedPassword });

    return NextResponse.json({ success: true, message: "User registered successfully", userId: newUser._id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: errorMessage(e) }, { status: 500 });
  }
}
