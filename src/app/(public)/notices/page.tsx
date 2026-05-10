import type { Metadata } from "next";
import NoticesClient from "./NoticesClient";

export const metadata: Metadata = { title: "Notices" };

export default function NoticesPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-indigo-900 to-slate-900 py-24 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Notice Board</h1>
          <p className="text-indigo-200 text-lg">Latest announcements and circulars from the college</p>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <NoticesClient />
        </div>
      </section>
    </div>
  );
}
