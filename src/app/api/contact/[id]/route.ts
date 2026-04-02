import connectToDB from "@/lib/db";
import Contact from "@/models/Contact";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";

function errorMessage(e: unknown): string {
  return e instanceof Error ? e.message : "Unexpected server error";
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    await connectToDB();
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid ID format" }, { status: 400 });
    }

    const result = await Contact.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ success: true, message: "Contact deleted successfully" });
    }
    return NextResponse.json({ success: false, message: "Contact not found or already deleted" }, { status: 404 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: errorMessage(e) }, { status: 500 });
  }
}
