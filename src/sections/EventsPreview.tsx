"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { IEvent } from "@/types";
import { driveImage } from "@/lib/driveImage";

const eventImages = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80",
];

const fallback: IEvent[] = [
  { _id: "1", title: "Annual Science Exhibition", description: "Students showcase innovative science projects and experiments.", date: "2024-12-15", location: "Main Auditorium", image: "", createdAt: "" },
  { _id: "2", title: "Cultural Fest 2024", description: "A vibrant celebration of arts, music, dance, and culture.", date: "2024-12-20", location: "College Ground", image: "", createdAt: "" },
  { _id: "3", title: "Career Guidance Seminar", description: "Expert speakers guide students on career paths and opportunities.", date: "2024-12-25", location: "Seminar Hall", image: "", createdAt: "" },
];

export default function EventsPreview({ events }: { events?: IEvent[] }) {
  const data = events?.length ? events.slice(0, 3) : fallback;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Campus Life</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2">Upcoming Events</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {data.map((event, i) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Event image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={driveImage(event.image) || eventImages[i % eventImages.length]}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {/* Date badge */}
                <div className="absolute top-3 left-3 bg-white rounded-xl px-3 py-1.5 text-center shadow-md">
                  <p className="text-indigo-600 font-bold text-sm leading-none">
                    {new Date(event.date).getDate()}
                  </p>
                  <p className="text-gray-400 text-xs uppercase">
                    {new Date(event.date).toLocaleString("en-IN", { month: "short" })}
                  </p>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-gray-900 mb-1">{event.title}</h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">{event.description}</p>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <MapPin className="w-3.5 h-3.5" />{event.location}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/events" className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:gap-3 transition-all">
            View All Events <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
