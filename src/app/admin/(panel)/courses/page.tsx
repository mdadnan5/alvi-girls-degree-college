"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseSchema, CourseInput } from "@/validations";
import { ICourse } from "@/types";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ImageUpload } from "@/components/ui/ImageUpload";
import AdminTable from "@/components/admin/AdminTable";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchCourses, createCourse, updateCourse, deleteCourse } from "@/store/slices/coursesSlice";

export default function AdminCoursesPage() {
  const dispatch = useAppDispatch();
  const { data: courses, loading } = useAppSelector((s) => s.courses);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ICourse | null>(null);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } = useForm<CourseInput>({ resolver: zodResolver(courseSchema) });

  useEffect(() => { dispatch(fetchCourses()); }, [dispatch]);

  const openCreate = () => { setEditing(null); reset({}); setModalOpen(true); };
  const openEdit = (course: ICourse) => {
    setEditing(course);
    reset({ title: course.title, description: course.description, duration: course.duration, fees: course.fees, eligibility: course.eligibility, image: course.image });
    setModalOpen(true);
  };

  const onSubmit = async (data: CourseInput) => {
    try {
      if (editing) {
        await dispatch(updateCourse({ id: editing._id, body: data })).unwrap();
        toast.success("Course updated!");
      } else {
        await dispatch(createCourse(data)).unwrap();
        toast.success("Course created!");
      }
      setModalOpen(false);
    } catch { toast.error("Something went wrong"); }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this course?")) return;
    await dispatch(deleteCourse(id)).unwrap();
    toast.success("Course deleted");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-500 text-sm mt-1">Manage academic programs and courses</p>
        </div>
        <Button onClick={openCreate} className="gap-2"><Plus className="w-4 h-4" /> Add Course</Button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <AdminTable
          data={courses}
          loading={loading}
          columns={[
            { key: "title", label: "Title" },
            { key: "duration", label: "Duration" },
            { key: "fees", label: "Fees" },
            { key: "eligibility", label: "Eligibility" },
          ]}
          onEdit={openEdit}
          onDelete={onDelete}
        />
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Course" : "Add Course"} className="max-w-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Course Title" placeholder="Bachelor of Arts" error={errors.title?.message} {...register("title")} />
          <Textarea label="Description" placeholder="Course description..." rows={3} error={errors.description?.message} {...register("description")} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Duration" placeholder="3 Years" error={errors.duration?.message} {...register("duration")} />
            <Input label="Fees" placeholder="₹15,000/yr" error={errors.fees?.message} {...register("fees")} />
          </div>
          <Input label="Eligibility" placeholder="10+2 Pass" error={errors.eligibility?.message} {...register("eligibility")} />
          <ImageUpload label="Image (optional)" value={watch("image")} onChange={(url) => setValue("image", url)} />
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)} className="flex-1">Cancel</Button>
            <Button type="submit" loading={isSubmitting} className="flex-1">{editing ? "Update" : "Create"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
