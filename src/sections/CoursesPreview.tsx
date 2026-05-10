"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Clock, DollarSign, ArrowRight } from "lucide-react";
import { ICourse } from "@/types";

// All verified 200 OK
const courseImages = [
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80",
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
];

const fallbackCourses: ICourse[] = [
  { _id: "1", title: "Bachelor of Arts", description: "Comprehensive arts program covering humanities, social sciences, and languages.", duration: "3 Years", fees: "₹15,000/yr", eligibility: "10+2 Pass", image: "", createdAt: "" },
  { _id: "2", title: "Bachelor of Science", description: "Science program with specializations in Physics, Chemistry, and Mathematics.", duration: "3 Years", fees: "₹18,000/yr", eligibility: "10+2 (Science)", image: "", createdAt: "" },
  { _id: "3", title: "Bachelor of Commerce", description: "Commerce program covering accounting, finance, and business management.", duration: "3 Years", fees: "₹16,000/yr", eligibility: "10+2 Pass", image: "", createdAt: "" },
];

export default function CoursesPreview({ courses }: { courses?: ICourse[] }) {
  const data = courses?.length ? courses.slice(0, 3) : fallbackCourses;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Academics</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2">Our Programs</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Explore our diverse range of undergraduate and postgraduate programs designed for the modern world.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {data.map((course, i) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={course.image || courseImages[i % courseImages.length]}
                  alt={course.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {course.duration}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{course.description}</p>
                <div className="flex gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-indigo-400" />{course.duration}</span>
                  <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-indigo-400" />{course.fees}</span>
                </div>
                <Link href="/courses" className="text-indigo-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/courses" className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:gap-3 transition-all">
            View All Courses <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
