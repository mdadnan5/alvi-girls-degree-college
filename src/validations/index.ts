import { z } from "zod";

export const admissionSchema = z.object({
  studentName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  course: z.string().min(1, "Please select a course"),
  message: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const courseSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  duration: z.string().min(1),
  fees: z.string().min(1),
  eligibility: z.string().min(1),
  image: z.string().optional(),
});

export const facultySchema = z.object({
  name: z.string().min(2),
  designation: z.string().min(2),
  department: z.string().min(2),
  image: z.string().optional(),
  socialLinks: z.object({
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    email: z.string().optional(),
  }).optional(),
});

export const eventSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  date: z.string().min(1),
  image: z.string().optional(),
  location: z.string().min(2),
});

export const noticeSchema = z.object({
  title: z.string().min(2),
  fileUrl: z.string().optional(),
});

export const gallerySchema = z.object({
  image: z.string().min(1),
  category: z.string().min(1),
});

export type AdmissionInput = z.infer<typeof admissionSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CourseInput = z.infer<typeof courseSchema>;
export type FacultyInput = z.infer<typeof facultySchema>;
export type EventInput = z.infer<typeof eventSchema>;
export type NoticeInput = z.infer<typeof noticeSchema>;
export type GalleryInput = z.infer<typeof gallerySchema>;
