import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";

export async function POST(req: NextRequest) {
  const { name, email, phone, subject, message } = await req.json();
  await connectDB();
  await Contact.create({ name, email, phone, subject, message });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.CONTACT_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"Alvi Girls Degree College" <info@alvigirlsgdc.edu>`,
    to: process.env.CONTACT_EMAIL,
    replyTo: email,
    subject: `Contact Form: ${subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  });

  return NextResponse.json({ success: true });
}
