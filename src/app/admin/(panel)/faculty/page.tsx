"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { facultySchema, FacultyInput } from "@/validations";
import { IFaculty } from "@/types";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ImageUpload } from "@/components/ui/ImageUpload";
import AdminTable from "@/components/admin/AdminTable";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchFaculty, createFaculty, updateFaculty, deleteFaculty } from "@/store/slices/facultySlice";

export default function AdminFacultyPage() {
  const dispatch = useAppDispatch();
  const { data: faculty, loading } = useAppSelector((s) => s.faculty);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<IFaculty | null>(null);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } = useForm<FacultyInput>({ resolver: zodResolver(facultySchema) });

  useEffect(() => { dispatch(fetchFaculty()); }, [dispatch]);

  const openCreate = () => { setEditing(null); reset({}); setModalOpen(true); };
  const openEdit = (member: IFaculty) => {
    setEditing(member);
    reset({ name: member.name, designation: member.designation, department: member.department, image: member.image, socialLinks: member.socialLinks });
    setModalOpen(true);
  };

  const onSubmit = async (data: FacultyInput) => {
    try {
      if (editing) {
        await dispatch(updateFaculty({ id: editing._id, body: data })).unwrap();
        toast.success("Faculty updated!");
      } else {
        await dispatch(createFaculty(data)).unwrap();
        toast.success("Faculty added!");
      }
      setModalOpen(false);
    } catch { toast.error("Something went wrong"); }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this faculty member?")) return;
    await dispatch(deleteFaculty(id)).unwrap();
    toast.success("Faculty deleted");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Faculty</h1>
          <p className="text-gray-500 text-sm mt-1">Manage faculty members and their profiles</p>
        </div>
        <Button onClick={openCreate} className="gap-2"><Plus className="w-4 h-4" /> Add Faculty</Button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <AdminTable
          data={faculty}
          loading={loading}
          columns={[
            { key: "name", label: "Name" },
            { key: "designation", label: "Designation" },
            { key: "department", label: "Department" },
          ]}
          onEdit={openEdit}
          onDelete={onDelete}
        />
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Faculty" : "Add Faculty"} className="max-w-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Full Name" placeholder="Dr. John Doe" error={errors.name?.message} {...register("name")} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Designation" placeholder="Professor" error={errors.designation?.message} {...register("designation")} />
            <Input label="Department" placeholder="Mathematics" error={errors.department?.message} {...register("department")} />
          </div>
          <ImageUpload label="Photo (optional)" value={watch("image")} onChange={(url) => setValue("image", url)} />
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">Social Links (optional)</p>
            <Input placeholder="LinkedIn URL" {...register("socialLinks.linkedin")} />
            <Input placeholder="Twitter URL" {...register("socialLinks.twitter")} />
            <Input placeholder="Email" {...register("socialLinks.email")} />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)} className="flex-1">Cancel</Button>
            <Button type="submit" loading={isSubmitting} className="flex-1">{editing ? "Update" : "Add"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
