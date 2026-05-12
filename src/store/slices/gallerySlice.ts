import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IGallery } from "@/types";

interface State { data: IGallery[]; loading: boolean; error: string | null }
const initial: State = { data: [], loading: false, error: null };

export const fetchGallery = createAsyncThunk("gallery/fetch", async () => {
  const res = await fetch("/api/gallery");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json() as Promise<IGallery[]>;
});

export const createGalleryItem = createAsyncThunk("gallery/create", async (body: Partial<IGallery>) => {
  const res = await fetch("/api/gallery", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error("Failed");
  return res.json() as Promise<IGallery>;
});

export const deleteGalleryItem = createAsyncThunk("gallery/delete", async (id: string) => {
  await fetch(`/api/gallery/${id}`, { method: "DELETE" });
  return id;
});

const slice = createSlice({
  name: "gallery",
  initialState: initial,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchGallery.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchGallery.fulfilled, (s, a) => { s.loading = false; s.data = a.payload; })
      .addCase(fetchGallery.rejected, (s, a) => { s.loading = false; s.error = a.error.message ?? null; })
      .addCase(createGalleryItem.fulfilled, (s, a) => { s.data.unshift(a.payload); })
      .addCase(deleteGalleryItem.fulfilled, (s, a) => { s.data = s.data.filter((x) => x._id !== a.payload); });
  },
});

export default slice.reducer;
