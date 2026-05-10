"use client";
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gallerySchema, GalleryInput } from "@/validations";
import { IGallery } from "@/types";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { toast } from "sonner";
import { Plus, Trash2, ImageIcon } from "lucide-react";
import Image from "next/image";

const categories = ["Campus", "Events", "Sports", "Cultural", "Academic"];

export default function AdminGalleryPage() {
  const [items, setItems] = useState<IGallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<GalleryInput>({ resolver: zodResolver(gallerySchema) });

  const fetchGallery = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchGallery(); }, [fetchGallery]);

  const onSubmit = async (data: GalleryInput) => {
    try {
      const res = await fetch("/api/gallery", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error();
      toast.success("Image added!");
      setModalOpen(false);
      reset();
      fetchGallery();
    } catch { toast.error("Something went wrong"); }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    toast.success("Image deleted");
    fetchGallery();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
          <p className="text-gray-500 text-sm mt-1">Manage gallery images</p>
        </div>
        <Button onClick={() => { reset(); setModalOpen(true); }} className="gap-2"><Plus className="w-4 h-4" /> Add Image</Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className="aspect-square bg-gray-100 rounded-xl animate-pulse" />)}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 text-gray-400 bg-white rounded-2xl border border-gray-100">
          <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No images yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item._id} className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
              {item.image ? (
                <Image src={item.image} alt={item.category} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-gray-300" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <span className="text-white text-xs font-medium bg-black/40 px-2 py-1 rounded-full">{item.category}</span>
                <button onClick={() => onDelete(item._id)} className="p-1.5 bg-red-500 rounded-lg text-white hover:bg-red-600 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Gallery Image">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Image URL" placeholder="https://images.unsplash.com/..." error={errors.image?.message} {...register("image")} />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Category</label>
            <select {...register("category")} className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100">
              <option value="">Select category</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)} className="flex-1">Cancel</Button>
            <Button type="submit" loading={isSubmitting} className="flex-1">Add Image</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
