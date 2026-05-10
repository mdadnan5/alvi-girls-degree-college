import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Faculty from "@/models/Faculty";

export async function GET() {
  await connectDB();
  const data = await Faculty.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const faculty = await Faculty.create(body);
  return NextResponse.json(faculty, { status: 201 });
}
