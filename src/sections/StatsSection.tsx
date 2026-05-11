"use client";
import { motion } from "framer-motion";
import { Users, BookOpen, Award, Building } from "lucide-react";

const stats = [
  { icon: Users, value: "5,000+", label: "Students Enrolled", color: "text-indigo-600", bg: "bg-indigo-50" },
  { icon: BookOpen, value: "40+", label: "Courses Offered", color: "text-cyan-600", bg: "bg-cyan-50" },
  { icon: Award, value: "50+", label: "Expert Faculty", color: "text-purple-600", bg: "bg-purple-50" },
  { icon: Building, value: "35+", label: "Years of Excellence", color: "text-emerald-600", bg: "bg-emerald-50" },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
