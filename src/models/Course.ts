import mongoose, { Schema } from "mongoose";

const CourseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  fees: { type: String, required: true },
  eligibility: { type: String, required: true },
  image: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);
