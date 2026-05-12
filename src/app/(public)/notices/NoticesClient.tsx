"use client";
import { useState, useEffect } from "react";
import { Bell, Download, Search } from "lucide-react";
import { INotice } from "@/types";
import { TableSkeleton } from "@/components/ui/Skeleton";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchNotices } from "@/store/slices/noticesSlice";

const STATIC_NOTICES: INotice[] = [
  { _id: "s1", title: "Examination Schedule Notice — College Exams Starting from 18th May 2026", fileUrl: "", createdAt: "2026-05-01" },
  { _id: "s2", title: "Admit Card Distribution — Collect Your Admit Card on 11th May 2026 at 10:00 AM Sharp", fileUrl: "", createdAt: "2026-04-28" },
];

export default function NoticesClient() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((s) => s.notices);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => { dispatch(fetchNotices(search)); }, 300);
    return () => clearTimeout(timer);
  }, [search, dispatch]);

  const notices = data.length ? data : STATIC_NOTICES;
  const filtered = search ? notices.filter((n) => n.title.toLowerCase().includes(search.toLowerCase())) : notices;

  return (
    <div className="space-y-6">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notices..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {loading ? (
        <TableSkeleton rows={6} />
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No notices found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((notice) => (
            <div key={notice._id} className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0">
                <Bell className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm">{notice.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{new Date(notice.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
              </div>
              {notice.fileUrl ? (
                <a href={notice.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-indigo-600 font-medium bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
                  <Download className="w-3.5 h-3.5" /> Download
                </a>
              ) : (
                <span className="text-xs text-gray-300 bg-gray-50 px-3 py-1.5 rounded-lg">No file</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
