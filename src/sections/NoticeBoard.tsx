"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Bell, Download, ArrowRight } from "lucide-react";
import { INotice } from "@/types";

const fallback: INotice[] = [
  { _id: "1", title: "Examination Schedule Notice — College Exams Starting from 18th May 2026", fileUrl: "", createdAt: "2026-05-01" },
  { _id: "2", title: "Admit Card Distribution — Collect Your Admit Card on 11th May 2026 at 10:00 AM Sharp", fileUrl: "", createdAt: "2026-04-28" },
];

export default function NoticeBoard({ notices }: { notices?: INotice[] }) {
  const data = notices?.length ? notices.slice(0, 4) : fallback;

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-indigo-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-center lg:text-left">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Announcements</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">Notice Board</h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto lg:mx-0">Stay updated with the latest announcements, circulars, and important notices from the college.</p>
            <Link href="/notices" className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:gap-3 transition-all">
              View All Notices <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-3">
            {data.map((notice, i) => (
              <motion.div
                key={notice._id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start sm:items-center gap-3 sm:gap-4 bg-white rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm leading-snug line-clamp-2 sm:truncate">{notice.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{new Date(notice.createdAt).toLocaleDateString("en-IN")}</p>
                </div>
                {notice.fileUrl && (
                  <a href={notice.fileUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 sm:p-2 rounded-lg hover:bg-indigo-50 transition-colors shrink-0">
                    <Download className="w-4 h-4 text-indigo-600" />
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
