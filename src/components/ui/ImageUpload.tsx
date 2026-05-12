"use client";
import { useRef, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";

interface Props {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = "Image" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file: File) => {
    setError("");
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onChange(data.url);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div
        className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:border-indigo-400 transition-colors"
        onClick={() => inputRef.current?.click()}
      >
        {value ? (
          <div className="relative inline-block">
            <img src={value} alt="preview" className="h-24 w-24 object-cover rounded-lg mx-auto" />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange(""); }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : uploading ? (
          <div className="flex flex-col items-center gap-2 text-gray-400 py-2">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-sm">Uploading...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400 py-2">
            <Upload className="w-6 h-6" />
            <span className="text-sm">Click to upload PNG / JPG</span>
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
      />
    </div>
  );
}
