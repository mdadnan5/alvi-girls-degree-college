import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../.env.local") });

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

await mongoose.connect(process.env.MONGODB_URI);

const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
if (existing) {
  console.log("Admin already exists");
} else {
  const hashed = await bcrypt.hash(process.env.MANAGER_PASSWORD, 10);
  await Admin.create({ name: "Manager", email: process.env.MANAGER_EMAIL, password: hashed });
  console.log("Admin created successfully");
}

await mongoose.disconnect();
