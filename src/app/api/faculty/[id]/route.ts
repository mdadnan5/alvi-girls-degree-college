import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Faculty from "@/models/Faculty";
import { driveImage } from "@/lib/driveImage";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const body = await req.json();
  if (body.image) body.image = driveImage(body.image);
  const updated = await Faculty.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  await Faculty.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}
