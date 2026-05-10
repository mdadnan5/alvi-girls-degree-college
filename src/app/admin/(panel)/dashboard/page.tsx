import { Bell, Calendar, Users, BookOpen, Image, ClipboardList } from "lucide-react";
import { connectDB } from "@/lib/db";
import Notice from "@/models/Notice";
import Event from "@/models/Event";
import Faculty from "@/models/Faculty";
import Course from "@/models/Course";
import Gallery from "@/models/Gallery";
import Admission from "@/models/Admission";
import Link from "next/link";

async function getStats() {
  try {
    await connectDB();
    const [notices, events, faculty, courses, gallery, admissions] = await Promise.all([
      Notice.countDocuments(),
      Event.countDocuments(),
      Faculty.countDocuments(),
      Course.countDocuments(),
      Gallery.countDocuments(),
      Admission.countDocuments(),
    ]);
    return { notices, events, faculty, courses, gallery, admissions };
  } catch {
    return { notices: 0, events: 0, faculty: 0, courses: 0, gallery: 0, admissions: 0 };
  }
}

export default async function DashboardPage() {
  const stats = await getStats();

  const cards = [
    { label: "Total Admissions", value: stats.admissions, icon: ClipboardList, color: "text-indigo-600", bg: "bg-indigo-50", href: "/admin/admissions" },
    { label: "Notices", value: stats.notices, icon: Bell, color: "text-cyan-600", bg: "bg-cyan-50", href: "/admin/notices" },
    { label: "Events", value: stats.events, icon: Calendar, color: "text-purple-600", bg: "bg-purple-50", href: "/admin/events" },
    { label: "Faculty", value: stats.faculty, icon: Users, color: "text-emerald-600", bg: "bg-emerald-50", href: "/admin/faculty" },
    { label: "Courses", value: stats.courses, icon: BookOpen, color: "text-orange-600", bg: "bg-orange-50", href: "/admin/courses" },
    { label: "Gallery Images", value: stats.gallery, icon: Image, color: "text-pink-600", bg: "bg-pink-50", href: "/admin/gallery" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here's an overview of your college website.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {cards.map(({ label, value, icon: Icon, color, bg, href }) => (
          <Link key={label} href={href} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5 group">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900">{value}</div>
            <div className="text-sm text-gray-500 mt-1">{label}</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { label: "Add Notice", href: "/admin/notices" },
            { label: "Add Event", href: "/admin/events" },
            { label: "Add Faculty", href: "/admin/faculty" },
            { label: "Add Course", href: "/admin/courses" },
            { label: "Upload Gallery", href: "/admin/gallery" },
            { label: "View Admissions", href: "/admin/admissions" },
          ].map(({ label, href }) => (
            <Link key={label} href={href} className="px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-colors text-center">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
