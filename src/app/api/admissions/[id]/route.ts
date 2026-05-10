import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Admission from "@/models/Admission";

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  await Admission.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}
