import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import Notice from "@/models/Notice";

const notices = [
  {
    title: "Examination Schedule Notice — Exams Starting from 18th May 2026",
    fileUrl: "",
    // We set createdAt manually so it appears in correct order
  },
  {
    title: "Admit Card Distribution — Collect Your Admit Card on 11th May 2026 at 10:00 AM",
    fileUrl: "",
  },
];

const noticeDetails = [
  {
    title: "Examination Schedule Notice — Exams Starting from 18th May 2026",
    body: "This is to inform all students that the college examinations will commence from 18th May 2026. All students are advised to prepare accordingly and report to the examination hall on time with their admit cards. Further details regarding the exam timetable will be shared shortly.",
    fileUrl: "",
  },
  {
    title: "Admit Card Distribution — 11th May 2026 at 10:00 AM Sharp",
    body: "All students are hereby notified that admit cards for the upcoming examinations will be distributed on 11th May 2026 starting at 10:00 AM at the college premises. Students are requested to arrive on time and collect their admit cards in person. No admit card will be issued after the scheduled time without prior permission.",
    fileUrl: "",
  },
];

export async function GET() {
  await connectDB();

  // Seed admin
  const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
  if (!existing) {
    const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);
    await Admin.create({ name: "Admin", email: process.env.ADMIN_EMAIL, password: hashed });
  }

  // Seed notices (only if not already present)
  for (const notice of noticeDetails) {
    const exists = await Notice.findOne({ title: notice.title });
    if (!exists) {
      await Notice.create({ title: notice.title, fileUrl: notice.fileUrl });
    }
  }

  return NextResponse.json({ message: "Seeded successfully — admin + notices added." });
}
