import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { INotice } from "@/types";

interface State { data: INotice[]; loading: boolean; error: string | null }
const initial: State = { data: [], loading: false, error: null };

export const fetchNotices = createAsyncThunk("notices/fetch", async (search: string = "") => {
  const res = await fetch(`/api/notices?search=${encodeURIComponent(search)}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json() as Promise<INotice[]>;
});

export const createNotice = createAsyncThunk("notices/create", async (body: Partial<INotice>) => {
  const res = await fetch("/api/notices", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error("Failed");
  return res.json() as Promise<INotice>;
});

export const updateNotice = createAsyncThunk("notices/update", async ({ id, body }: { id: string; body: Partial<INotice> }) => {
  const res = await fetch(`/api/notices/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error("Failed");
  return res.json() as Promise<INotice>;
});

export const deleteNotice = createAsyncThunk("notices/delete", async (id: string) => {
  await fetch(`/api/notices/${id}`, { method: "DELETE" });
  return id;
});

const slice = createSlice({
  name: "notices",
  initialState: initial,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchNotices.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchNotices.fulfilled, (s, a) => { s.loading = false; s.data = a.payload; })
      .addCase(fetchNotices.rejected, (s, a) => { s.loading = false; s.error = a.error.message ?? null; })
      .addCase(createNotice.fulfilled, (s, a) => { s.data.unshift(a.payload); })
      .addCase(updateNotice.fulfilled, (s, a) => { const i = s.data.findIndex((x) => x._id === a.payload._id); if (i !== -1) s.data[i] = a.payload; })
      .addCase(deleteNotice.fulfilled, (s, a) => { s.data = s.data.filter((x) => x._id !== a.payload); });
  },
});

export default slice.reducer;
