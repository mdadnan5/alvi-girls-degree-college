import type { Metadata } from "next";
import { Globe, Share2, Mail } from "lucide-react";
import { IFaculty } from "@/types";
import { connectDB } from "@/lib/db";
import Faculty from "@/models/Faculty";

export const metadata: Metadata = { title: "Faculty" };

const fallback: IFaculty[] = [
  { _id: "1", name: "Dr. Aisha Khan", designation: "Professor & HOD", department: "Mathematics", image: "", socialLinks: { linkedin: "", twitter: "", email: "aisha@alvigdc.edu" }, createdAt: "" },
  { _id: "2", name: "Prof. Ravi Kumar", designation: "Associate Professor", department: "Physics", image: "", socialLinks: { linkedin: "", twitter: "", email: "ravi@alvigdc.edu" }, createdAt: "" },
  { _id: "3", name: "Dr. Sunita Patel", designation: "Professor", department: "English", image: "", socialLinks: { linkedin: "", twitter: "", email: "sunita@alvigdc.edu" }, createdAt: "" },
  { _id: "4", name: "Prof. Mohan Das", designation: "Assistant Professor", department: "Commerce", image: "", socialLinks: { linkedin: "", twitter: "", email: "mohan@alvigdc.edu" }, createdAt: "" },
  { _id: "5", name: "Dr. Fatima Begum", designation: "Professor & HOD", department: "Chemistry", image: "", socialLinks: { linkedin: "", twitter: "", email: "fatima@alvigdc.edu" }, createdAt: "" },
  { _id: "6", name: "Prof. Arjun Sharma", designation: "Associate Professor", department: "History", image: "", socialLinks: { linkedin: "", twitter: "", email: "arjun@alvigdc.edu" }, createdAt: "" },
];

async function getFaculty(): Promise<IFaculty[]> {
  try {
    await connectDB();
    const data = await Faculty.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(data));
  } catch {
    return fallback;
  }
}

export default async function FacultyPage() {
  const faculty = await getFaculty();
  const data = faculty.length ? faculty : fallback;

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-indigo-900 to-slate-900 py-24 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Our Faculty</h1>
          <p className="text-indigo-200 text-lg">Meet our distinguished team of educators and researchers</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((member) => (
              <div key={member._id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center group">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{member.name}</h3>
                <p className="text-indigo-600 text-sm font-medium mt-1">{member.designation}</p>
                <p className="text-gray-400 text-sm mt-0.5">{member.department}</p>
                <div className="flex justify-center gap-3 mt-4">
                  {member.socialLinks?.linkedin && (
                    <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-indigo-100 hover:text-indigo-600 transition-colors">
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                  {member.socialLinks?.twitter && (
                    <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-indigo-100 hover:text-indigo-600 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </a>
                  )}
                  {member.socialLinks?.email && (
                    <a href={`mailto:${member.socialLinks.email}`} className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-indigo-100 hover:text-indigo-600 transition-colors">
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
