import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Event from "@/models/Event";
import { driveImage } from "@/lib/driveImage";

export async function GET() {
  await connectDB();
  const data = await Event.find().sort({ date: 1 }).lean();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  if (body.image) body.image = driveImage(body.image);
  const event = await Event.create(body);
  return NextResponse.json(event, { status: 201 });
}
