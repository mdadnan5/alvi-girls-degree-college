import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ICourse } from "@/types";

interface State { data: ICourse[]; loading: boolean; error: string | null }
const initial: State = { data: [], loading: false, error: null };

export const fetchCourses = createAsyncThunk("courses/fetch", async () => {
  const res = await fetch("/api/courses");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json() as Promise<ICourse[]>;
});

export const createCourse = createAsyncThunk("courses/create", async (body: Partial<ICourse>) => {
  const res = await fetch("/api/courses", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error("Failed");
  return res.json() as Promise<ICourse>;
});

export const updateCourse = createAsyncThunk("courses/update", async ({ id, body }: { id: string; body: Partial<ICourse> }) => {
  const res = await fetch(`/api/courses/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error("Failed");
  return res.json() as Promise<ICourse>;
});

export const deleteCourse = createAsyncThunk("courses/delete", async (id: string) => {
  await fetch(`/api/courses/${id}`, { method: "DELETE" });
  return id;
});

const slice = createSlice({
  name: "courses",
  initialState: initial,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchCourses.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchCourses.fulfilled, (s, a) => { s.loading = false; s.data = a.payload; })
      .addCase(fetchCourses.rejected, (s, a) => { s.loading = false; s.error = a.error.message ?? null; })
      .addCase(createCourse.fulfilled, (s, a) => { s.data.unshift(a.payload); })
      .addCase(updateCourse.fulfilled, (s, a) => { const i = s.data.findIndex((x) => x._id === a.payload._id); if (i !== -1) s.data[i] = a.payload; })
      .addCase(deleteCourse.fulfilled, (s, a) => { s.data = s.data.filter((x) => x._id !== a.payload); });
  },
});

export default slice.reducer;
