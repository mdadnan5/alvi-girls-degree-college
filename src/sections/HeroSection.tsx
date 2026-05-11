"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1562774053-701939374585?w=1920&q=80"
        alt="College campus"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/90 via-indigo-900/80 to-slate-900/85" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 rounded-full px-4 py-2 text-indigo-300 text-sm font-medium">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            Admissions Open 2024–25
          </div>

          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
            Shape Your{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Future
            </span>{" "}
            With Us
          </h1>

          <p className="text-lg text-indigo-200 leading-relaxed max-w-xl">
            Alvi Girls Degree College — a premier institution dedicated to academic excellence, innovation, and holistic student development since 2011.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/admissions" className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-cyan-600 shadow-lg transition-all group">
              Apply Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/about" className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 hover:border-white/50 transition-all">
              Learn More
            </Link>
          </div>

          <div className="flex flex-wrap gap-8 pt-2">
            {[["5000+", "Students"], ["50+", "Faculty"], ["10+", "Courses"], ["15+", "Years"]].map(([num, label]) => (
              <div key={label}>
                <div className="text-2xl font-bold text-white">{num}</div>
                <div className="text-sm text-indigo-300">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden lg:block"
        >
          <div className="relative h-[520px]">
            {/* Main large card */}
            <div className="absolute top-0 right-0 w-72 h-80 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20">
              <Image
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80"
                alt="Students"
                fill
                sizes="288px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-bold text-sm">Academic Excellence</p>
                <p className="text-xs text-indigo-200">NAAC A+ Accredited</p>
              </div>
            </div>

            {/* Bottom left card */}
            <div className="absolute bottom-0 left-0 w-56 h-56 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20">
              <Image
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80"
                alt="Campus life"
                fill
                sizes="224px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <p className="font-bold text-xs">Campus Life</p>
              </div>
            </div>

            {/* Floating stat badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute top-44 left-8 bg-white rounded-2xl shadow-2xl p-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-xl">🏆</div>
              <div>
                <p className="font-bold text-gray-900 text-sm">#1 College</p>
                <p className="text-xs text-gray-400">District Ranking</p>
              </div>
            </motion.div>

            {/* Floating placement badge */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-16 right-4 bg-white rounded-2xl shadow-2xl p-4"
            >
              <p className="text-2xl font-bold text-indigo-600">90%</p>
              <p className="text-xs text-gray-400">Placement Rate</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
