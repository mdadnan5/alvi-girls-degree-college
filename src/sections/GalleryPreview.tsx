"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const galleryImages = [
  // { src: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80", label: "Campus" },
  { src: "/agdc-img1.png", label: "Campus" },
  { src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80", label: "Library" },
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80", label: "Events" },
  { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80", label: "Classroom" },
  { src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&q=80", label: "Sports" },
  { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80", label: "Cultural" },
];

export default function GalleryPreview() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-end justify-between mb-10">
          <div>
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Campus Life</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Photo Gallery</h2>
          </div>
          <Link href="/gallery" className="hidden sm:inline-flex items-center gap-2 text-indigo-600 font-semibold hover:gap-3 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${i === 0 ? "md:col-span-2 md:row-span-2 h-64 md:h-full" : "h-40 sm:h-48"}`}
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-3 text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {img.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-6 sm:hidden">
          <Link href="/gallery" className="inline-flex items-center gap-2 text-indigo-600 font-semibold">
            View All Photos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
