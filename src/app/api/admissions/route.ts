import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Admission from "@/models/Admission";

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    Admission.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Admission.countDocuments(),
  ]);
  return NextResponse.json({ data, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const admission = await Admission.create(body);
  return NextResponse.json(admission, { status: 201 });
}
