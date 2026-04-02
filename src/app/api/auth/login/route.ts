import connectToDB from "@/lib/db";
import User from "@/models/User";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function errorMessage(e: unknown): string {
  return e instanceof Error ? e.message : "Unexpected server error";
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await connectToDB();
    const { username, password }: { username: string; password: string } = await req.json();
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Username not found. Please try again" },
        { status: 401 }
      );
    }

    const passwordMatch = await compare(password, user.password as string);

    if (!passwordMatch) {
      return NextResponse.json(
        { success: false, message: "Wrong password. Please try again" },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, message: "Login successful" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: errorMessage(e) }, { status: 500 });
  }
}
