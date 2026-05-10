import mongoose, { Schema } from "mongoose";

const GallerySchema = new Schema({
  image: { type: String, required: true },
  category: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Gallery || mongoose.model("Gallery", GallerySchema);
