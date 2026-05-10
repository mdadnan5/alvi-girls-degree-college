"use client";
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noticeSchema, NoticeInput } from "@/validations";
import { INotice } from "@/types";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import AdminTable from "@/components/admin/AdminTable";
import { toast } from "sonner";
import { Plus } from "lucide-react";

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<INotice[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<INotice | null>(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<NoticeInput>({
    resolver: zodResolver(noticeSchema),
  });

  const fetchNotices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/notices");
      const data = await res.json();
      setNotices(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchNotices(); }, [fetchNotices]);

  const openCreate = () => { setEditing(null); reset({}); setModalOpen(true); };
  const openEdit = (notice: INotice) => { setEditing(notice); reset({ title: notice.title, fileUrl: notice.fileUrl }); setModalOpen(true); };

  const onSubmit = async (data: NoticeInput) => {
    try {
      const url = editing ? `/api/notices/${editing._id}` : "/api/notices";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error();
      toast.success(editing ? "Notice updated!" : "Notice created!");
      setModalOpen(false);
      fetchNotices();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this notice?")) return;
    await fetch(`/api/notices/${id}`, { method: "DELETE" });
    toast.success("Notice deleted");
    fetchNotices();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notices</h1>
          <p className="text-gray-500 text-sm mt-1">Manage college notices and announcements</p>
        </div>
        <Button onClick={openCreate} className="gap-2"><Plus className="w-4 h-4" /> Add Notice</Button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <AdminTable
          data={notices}
          loading={loading}
          columns={[
            { key: "title", label: "Title" },
            { key: "fileUrl", label: "File", render: (r) => r.fileUrl ? <a href={r.fileUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 text-xs hover:underline">View File</a> : <span className="text-gray-300 text-xs">No file</span> },
            { key: "createdAt", label: "Date", render: (r) => new Date(r.createdAt).toLocaleDateString("en-IN") },
          ]}
          onEdit={openEdit}
          onDelete={onDelete}
        />
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Notice" : "Add Notice"}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Title" placeholder="Notice title" error={errors.title?.message} {...register("title")} />
          <Input label="File URL (optional)" placeholder="https://..." error={errors.fileUrl?.message} {...register("fileUrl")} />
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)} className="flex-1">Cancel</Button>
            <Button type="submit" loading={isSubmitting} className="flex-1">{editing ? "Update" : "Create"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
