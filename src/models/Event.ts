import mongoose, { Schema } from "mongoose";

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  image: { type: String, default: "" },
  location: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
