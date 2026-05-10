import type { Metadata } from "next";
import { Calendar, MapPin } from "lucide-react";
import { IEvent } from "@/types";
import { connectDB } from "@/lib/db";
import Event from "@/models/Event";

export const metadata: Metadata = { title: "Events" };

const fallback: IEvent[] = [
  { _id: "1", title: "Annual Science Exhibition 2024", description: "Students from all science departments showcase their innovative projects, experiments, and research findings. Open to all students and faculty.", date: "2024-12-15", location: "Main Auditorium", image: "", createdAt: "" },
  { _id: "2", title: "Cultural Fest — Utsav 2024", description: "A vibrant three-day celebration of arts, music, dance, drama, and cultural diversity. Inter-college competitions and performances.", date: "2024-12-20", location: "College Ground", image: "", createdAt: "" },
  { _id: "3", title: "Career Guidance Seminar", description: "Industry experts and alumni share insights on career opportunities, competitive exams, and professional development.", date: "2024-12-25", location: "Seminar Hall", image: "", createdAt: "" },
  { _id: "4", title: "Sports Day 2024", description: "Annual inter-department sports competition featuring athletics, cricket, football, volleyball, and indoor games.", date: "2025-01-10", location: "Sports Ground", image: "", createdAt: "" },
];

async function getEvents(): Promise<IEvent[]> {
  try {
    await connectDB();
    const data = await Event.find().sort({ date: 1 }).lean();
    return JSON.parse(JSON.stringify(data));
  } catch {
    return fallback;
  }
}

export default async function EventsPage() {
  const events = await getEvents();
  const data = events.length ? events : fallback;

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-indigo-900 to-slate-900 py-24 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Events</h1>
          <p className="text-indigo-200 text-lg">Stay updated with upcoming college events and activities</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {data.map((event) => (
              <div key={event._id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex">
                <div className="w-2 bg-gradient-to-b from-indigo-500 to-cyan-500 shrink-0" />
                <div className="p-6 flex-1">
                  <div className="flex items-center gap-2 text-xs text-indigo-600 font-medium mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(event.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">{event.description}</p>
                  <div className="flex items-center gap-1.5 text-sm text-gray-400">
                    <MapPin className="w-4 h-4" />{event.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
