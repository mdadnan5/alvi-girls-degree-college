"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gallerySchema, GalleryInput } from "@/validations";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { toast } from "sonner";
import { Plus, Trash2, ImageIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchGallery, createGalleryItem, deleteGalleryItem } from "@/store/slices/gallerySlice";
import { driveImage } from "@/lib/driveImage";
import { ImageUpload } from "@/components/ui/ImageUpload";

const categories = ["Campus", "Events", "Sports", "Cultural", "Academic"];

export default function AdminGalleryPage() {
  const dispatch = useAppDispatch();
  const { data: items, loading } = useAppSelector((s) => s.gallery);
  const [modalOpen, setModalOpen] = useState(false);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } = useForm<GalleryInput>({ resolver: zodResolver(gallerySchema) });

  useEffect(() => { dispatch(fetchGallery()); }, [dispatch]);

  const onSubmit = async (data: GalleryInput) => {
    try {
      await dispatch(createGalleryItem(data)).unwrap();
      toast.success("Image added!");
      setModalOpen(false);
      reset();
    } catch { toast.error("Something went wrong"); }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    await dispatch(deleteGalleryItem(id)).unwrap();
    toast.success("Image deleted");
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
                <img src={driveImage(item.image)} alt={item.category} className="w-full h-full object-cover" />
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
          <ImageUpload label="Image" value={watch("image")} onChange={(url) => setValue("image", url)} />
          {errors.image && <p className="text-xs text-red-500">{errors.image.message}</p>}
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
