import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IAdmission } from "@/types";

interface State { data: IAdmission[]; loading: boolean; error: string | null; page: number; pages: number; total: number }
const initial: State = { data: [], loading: false, error: null, page: 1, pages: 1, total: 0 };

export const fetchAdmissions = createAsyncThunk("admissions/fetch", async (page: number = 1) => {
  const res = await fetch(`/api/admissions?page=${page}&limit=10`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json() as Promise<{ data: IAdmission[]; pages: number; total: number }>;
});

export const deleteAdmission = createAsyncThunk("admissions/delete", async (id: string) => {
  await fetch(`/api/admissions/${id}`, { method: "DELETE" });
  return id;
});

const slice = createSlice({
  name: "admissions",
  initialState: initial,
  reducers: {
    setPage: (s, a) => { s.page = a.payload; },
  },
  extraReducers: (b) => {
    b.addCase(fetchAdmissions.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchAdmissions.fulfilled, (s, a) => {
        s.loading = false;
        s.data = a.payload.data;
        s.pages = a.payload.pages;
        s.total = a.payload.total;
      })
      .addCase(fetchAdmissions.rejected, (s, a) => { s.loading = false; s.error = a.error.message ?? null; })
      .addCase(deleteAdmission.fulfilled, (s, a) => { s.data = s.data.filter((x) => x._id !== a.payload); s.total -= 1; });
  },
});

export const { setPage } = slice.actions;
export default slice.reducer;
