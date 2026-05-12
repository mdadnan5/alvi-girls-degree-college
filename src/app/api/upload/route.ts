import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
  const url = await uploadToCloudinary(buffer, filename);

  return NextResponse.json({ url });
}
