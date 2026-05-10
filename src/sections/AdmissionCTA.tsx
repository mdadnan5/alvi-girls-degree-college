"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function AdmissionCTA() {
  return (
    <section className="relative py-24 overflow-hidden min-h-[320px]">
      <Image
        src="https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1920&q=80"
        alt="College campus"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-700/90 to-cyan-700/85" />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="inline-block bg-white/20 border border-white/30 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            Admissions Open 2024–25
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of students who have transformed their lives through quality education at Alvi Girls Degree College. Applications for 2024–25 are now open.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/admissions" className="inline-flex items-center gap-2 bg-white text-indigo-600 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg group">
              Apply Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 border-2 border-white/50 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors">
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
