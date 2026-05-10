"use client";
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema, EventInput } from "@/validations";
import { IEvent } from "@/types";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import AdminTable from "@/components/admin/AdminTable";
import { toast } from "sonner";
import { Plus } from "lucide-react";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<IEvent | null>(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<EventInput>({ resolver: zodResolver(eventSchema) });

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  const openCreate = () => { setEditing(null); reset({}); setModalOpen(true); };
  const openEdit = (event: IEvent) => {
    setEditing(event);
    reset({ title: event.title, description: event.description, date: event.date.split("T")[0], location: event.location, image: event.image });
    setModalOpen(true);
  };

  const onSubmit = async (data: EventInput) => {
    try {
      const url = editing ? `/api/events/${editing._id}` : "/api/events";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error();
      toast.success(editing ? "Event updated!" : "Event created!");
      setModalOpen(false);
      fetchEvents();
    } catch { toast.error("Something went wrong"); }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    await fetch(`/api/events/${id}`, { method: "DELETE" });
    toast.success("Event deleted");
    fetchEvents();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-500 text-sm mt-1">Manage college events and activities</p>
        </div>
        <Button onClick={openCreate} className="gap-2"><Plus className="w-4 h-4" /> Add Event</Button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <AdminTable
          data={events}
          loading={loading}
          columns={[
            { key: "title", label: "Title" },
            { key: "date", label: "Date", render: (r) => new Date(r.date).toLocaleDateString("en-IN") },
            { key: "location", label: "Location" },
          ]}
          onEdit={openEdit}
          onDelete={onDelete}
        />
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Event" : "Add Event"} className="max-w-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Title" placeholder="Event title" error={errors.title?.message} {...register("title")} />
          <Textarea label="Description" placeholder="Event description" rows={3} error={errors.description?.message} {...register("description")} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Date" type="date" error={errors.date?.message} {...register("date")} />
            <Input label="Location" placeholder="Venue" error={errors.location?.message} {...register("location")} />
          </div>
          <Input label="Image URL (optional)" placeholder="https://..." {...register("image")} />
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)} className="flex-1">Cancel</Button>
            <Button type="submit" loading={isSubmitting} className="flex-1">{editing ? "Update" : "Create"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
