"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ImageIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchGallery } from "@/store/slices/gallerySlice";
import { CardSkeleton } from "@/components/ui/Skeleton";
import { driveImage } from "@/lib/driveImage";

const categories = ["All", "Campus", "Events", "Sports", "Cultural", "Academic"];

export default function GalleryClient() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((s) => s.gallery);
  const [active, setActive] = useState("All");
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => { dispatch(fetchGallery()); }, [dispatch]);

  const filtered = active === "All" ? data : data.filter((i) => i.category === active);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${active === cat ? "bg-indigo-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No images in this category yet</p>
        </div>
      ) : (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filtered.map((item) => (
            <div
              key={item._id}
              className="break-inside-avoid cursor-pointer rounded-xl overflow-hidden hover:opacity-90 transition-opacity"
              onClick={() => setPreview(driveImage(item.image))}
            >
              <div className="relative aspect-square bg-gradient-to-br from-indigo-100 to-cyan-100 flex items-center justify-center">
                {item.image ? (
                  <img src={driveImage(item.image)} alt={item.category} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-indigo-300" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {preview && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setPreview(null)}>
          <button className="absolute top-4 right-4 text-white p-2 rounded-full bg-white/10 hover:bg-white/20">
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full">
            <img src={preview!} alt="Preview" className="w-full h-full object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
