import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IEvent } from "@/types";

interface State { data: IEvent[]; loading: boolean; error: string | null }
const initial: State = { data: [], loading: false, error: null };

export const fetchEvents = createAsyncThunk("events/fetch", async () => {
  const res = await fetch("/api/events");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json() as Promise<IEvent[]>;
});

export const createEvent = createAsyncThunk("events/create", async (body: Partial<IEvent>) => {
  const res = await fetch("/api/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error("Failed");
  return res.json() as Promise<IEvent>;
});

export const updateEvent = createAsyncThunk("events/update", async ({ id, body }: { id: string; body: Partial<IEvent> }) => {
  const res = await fetch(`/api/events/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error("Failed");
  return res.json() as Promise<IEvent>;
});

export const deleteEvent = createAsyncThunk("events/delete", async (id: string) => {
  await fetch(`/api/events/${id}`, { method: "DELETE" });
  return id;
});

const slice = createSlice({
  name: "events",
  initialState: initial,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchEvents.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchEvents.fulfilled, (s, a) => { s.loading = false; s.data = a.payload; })
      .addCase(fetchEvents.rejected, (s, a) => { s.loading = false; s.error = a.error.message ?? null; })
      .addCase(createEvent.fulfilled, (s, a) => { s.data.unshift(a.payload); })
      .addCase(updateEvent.fulfilled, (s, a) => { const i = s.data.findIndex((x) => x._id === a.payload._id); if (i !== -1) s.data[i] = a.payload; })
      .addCase(deleteEvent.fulfilled, (s, a) => { s.data = s.data.filter((x) => x._id !== a.payload); });
  },
});

export default slice.reducer;
