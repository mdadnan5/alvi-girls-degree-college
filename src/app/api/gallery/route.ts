import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Gallery from "@/models/Gallery";
import { driveImage } from "@/lib/driveImage";

export async function GET() {
  await connectDB();
  const data = await Gallery.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  if (body.image) body.image = driveImage(body.image);
  const item = await Gallery.create(body);
  return NextResponse.json(item, { status: 201 });
}
