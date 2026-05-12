import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IFaculty } from "@/types";

interface State { data: IFaculty[]; loading: boolean; error: string | null }
const initial: State = { data: [], loading: false, error: null };

export const fetchFaculty = createAsyncThunk("faculty/fetch", async () => {
  const res = await fetch("/api/faculty");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json() as Promise<IFaculty[]>;
});

export const createFaculty = createAsyncThunk("faculty/create", async (body: unknown) => {
  const res = await fetch("/api/faculty", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error("Failed");
  return res.json() as Promise<IFaculty>;
});

export const updateFaculty = createAsyncThunk("faculty/update", async ({ id, body }: { id: string; body: unknown }) => {
  const res = await fetch(`/api/faculty/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error("Failed");
  return res.json() as Promise<IFaculty>;
});

export const deleteFaculty = createAsyncThunk("faculty/delete", async (id: string) => {
  await fetch(`/api/faculty/${id}`, { method: "DELETE" });
  return id;
});

const slice = createSlice({
  name: "faculty",
  initialState: initial,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchFaculty.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchFaculty.fulfilled, (s, a) => { s.loading = false; s.data = a.payload; })
      .addCase(fetchFaculty.rejected, (s, a) => { s.loading = false; s.error = a.error.message ?? null; })
      .addCase(createFaculty.fulfilled, (s, a) => { s.data.unshift(a.payload); })
      .addCase(updateFaculty.fulfilled, (s, a) => { const i = s.data.findIndex((x) => x._id === a.payload._id); if (i !== -1) s.data[i] = a.payload; })
      .addCase(deleteFaculty.fulfilled, (s, a) => { s.data = s.data.filter((x) => x._id !== a.payload); });
  },
});

export default slice.reducer;
