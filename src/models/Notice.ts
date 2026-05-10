import mongoose, { Schema } from "mongoose";

const NoticeSchema = new Schema({
  title: { type: String, required: true },
  fileUrl: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.models.Notice || mongoose.model("Notice", NoticeSchema);
