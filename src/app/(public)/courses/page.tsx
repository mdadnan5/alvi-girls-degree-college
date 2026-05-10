import type { Metadata } from "next";
import { Clock, DollarSign, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ICourse } from "@/types";
import { connectDB } from "@/lib/db";
import Course from "@/models/Course";

export const metadata: Metadata = { title: "Courses" };

const fallback: ICourse[] = [
  { _id: "1", title: "Bachelor of Arts (B.A.)", description: "A comprehensive program covering humanities, social sciences, languages, and literature. Specializations available in English, History, Political Science, and Sociology.", duration: "3 Years", fees: "₹15,000/yr", eligibility: "10+2 Pass from any stream", image: "", createdAt: "" },
  { _id: "2", title: "Bachelor of Science (B.Sc.)", description: "Rigorous science program with specializations in Physics, Chemistry, Mathematics, Biology, and Computer Science.", duration: "3 Years", fees: "₹18,000/yr", eligibility: "10+2 with Science stream", image: "", createdAt: "" },
  { _id: "3", title: "Bachelor of Commerce (B.Com)", description: "Commerce program covering accounting, finance, taxation, business law, and management principles.", duration: "3 Years", fees: "₹16,000/yr", eligibility: "10+2 Pass from any stream", image: "", createdAt: "" },
  { _id: "4", title: "Master of Arts (M.A.)", description: "Advanced postgraduate program with research focus in English Literature, History, and Political Science.", duration: "2 Years", fees: "₹20,000/yr", eligibility: "Bachelor's degree in relevant subject", image: "", createdAt: "" },
  { _id: "5", title: "Master of Science (M.Sc.)", description: "Postgraduate science program with advanced research in Mathematics, Physics, and Chemistry.", duration: "2 Years", fees: "₹22,000/yr", eligibility: "B.Sc. in relevant subject", image: "", createdAt: "" },
  { _id: "6", title: "Master of Commerce (M.Com)", description: "Advanced commerce program focusing on advanced accounting, financial management, and business strategy.", duration: "2 Years", fees: "₹21,000/yr", eligibility: "B.Com or equivalent", image: "", createdAt: "" },
];

async function getCourses(): Promise<ICourse[]> {
  try {
    await connectDB();
    const data = await Course.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(data));
  } catch {
    return fallback;
  }
}

export default async function CoursesPage() {
  const courses = await getCourses();
  const data = courses.length ? courses : fallback;

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-indigo-900 to-slate-900 py-24 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Our Programs</h1>
          <p className="text-indigo-200 text-lg">Explore our diverse range of undergraduate and postgraduate programs</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((course) => (
              <div key={course._id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="h-3 bg-gradient-to-r from-indigo-500 to-cyan-500" />
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{course.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-indigo-500" />
                      <span><strong>Duration:</strong> {course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign className="w-4 h-4 text-indigo-500" />
                      <span><strong>Fees:</strong> {course.fees}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                      <span><strong>Eligibility:</strong> {course.eligibility}</span>
                    </div>
                  </div>
                  <Link href="/admissions" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors group">
                    Apply Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
