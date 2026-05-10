import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Gallery from "@/models/Gallery";

export async function GET() {
  await connectDB();
  const data = await Gallery.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const item = await Gallery.create(body);
  return NextResponse.json(item, { status: 201 });
}
