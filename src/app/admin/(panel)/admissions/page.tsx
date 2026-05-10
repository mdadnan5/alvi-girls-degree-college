"use client";
import { useState, useEffect, useCallback } from "react";
import { IAdmission } from "@/types";
import AdminTable from "@/components/admin/AdminTable";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AdminAdmissionsPage() {
  const [admissions, setAdmissions] = useState<IAdmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState<IAdmission | null>(null);

  const fetchAdmissions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admissions?page=${page}&limit=10`);
      const data = await res.json();
      setAdmissions(data.data || []);
      setPages(data.pages || 1);
      setTotal(data.total || 0);
    } finally { setLoading(false); }
  }, [page]);

  useEffect(() => { fetchAdmissions(); }, [fetchAdmissions]);

  const onDelete = async (id: string) => {
    if (!confirm("Delete this admission?")) return;
    await fetch(`/api/admissions/${id}`, { method: "DELETE" });
    toast.success("Admission deleted");
    fetchAdmissions();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admissions</h1>
          <p className="text-gray-500 text-sm mt-1">{total} total applications received</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <AdminTable
          data={admissions}
          loading={loading}
          columns={[
            { key: "studentName", label: "Student Name" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Phone" },
            { key: "course", label: "Course" },
            { key: "createdAt", label: "Applied On", render: (r) => new Date(r.createdAt).toLocaleDateString("en-IN") },
          ]}
          onEdit={(row) => setSelected(row)}
          onDelete={onDelete}
        />

        {pages > 1 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">Page {page} of {pages}</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page === pages}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Admission Details">
        {selected && (
          <div className="space-y-3 text-sm">
            {[
              ["Student Name", selected.studentName],
              ["Email", selected.email],
              ["Phone", selected.phone],
              ["Course", selected.course],
              ["Message", selected.message || "—"],
              ["Applied On", new Date(selected.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })],
            ].map(([label, value]) => (
              <div key={label} className="flex gap-3">
                <span className="font-medium text-gray-500 w-32 shrink-0">{label}:</span>
                <span className="text-gray-900">{value}</span>
              </div>
            ))}
            <div className="pt-2">
              <Button onClick={() => setSelected(null)} className="w-full">Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
