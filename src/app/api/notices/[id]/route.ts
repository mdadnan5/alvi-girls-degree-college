import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Notice from "@/models/Notice";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const body = await req.json();
  const updated = await Notice.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  await Notice.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}
