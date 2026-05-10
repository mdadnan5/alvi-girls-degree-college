import mongoose, { Schema } from "mongoose";

const FacultySchema = new Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  department: { type: String, required: true },
  image: { type: String, default: "" },
  socialLinks: {
    linkedin: { type: String, default: "" },
    twitter: { type: String, default: "" },
    email: { type: String, default: "" },
  },
}, { timestamps: true });

export default mongoose.models.Faculty || mongoose.model("Faculty", FacultySchema);
