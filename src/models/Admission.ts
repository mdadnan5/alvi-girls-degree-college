import mongoose, { Schema } from "mongoose";

const AdmissionSchema = new Schema({
  studentName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  course: { type: String, required: true },
  message: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.models.Admission || mongoose.model("Admission", AdmissionSchema);
