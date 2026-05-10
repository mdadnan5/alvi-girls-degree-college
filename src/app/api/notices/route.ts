import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Notice from "@/models/Notice";

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const query = search ? { title: { $regex: search, $options: "i" } } : {};
  const data = await Notice.find(query).sort({ createdAt: -1 }).lean();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const notice = await Notice.create(body);
  return NextResponse.json(notice, { status: 201 });
}
