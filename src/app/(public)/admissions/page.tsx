import type { Metadata } from "next";
import AdmissionForm from "./AdmissionForm";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = { title: "Admissions" };

const requirements = [
  "Completed 10+2 or equivalent examination",
  "Valid ID proof (Aadhar/Passport)",
  "Mark sheets of previous examinations",
  "Passport size photographs (4 copies)",
  "Migration certificate (if applicable)",
];

export default function AdmissionsPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-indigo-900 to-slate-900 py-24 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Admissions 2024–25</h1>
          <p className="text-indigo-200 text-lg">Begin your journey towards academic excellence</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Apply Online</h2>
              <p className="text-gray-500 mb-8">Fill out the form below to submit your application. Our admissions team will contact you within 2-3 business days.</p>
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <AdmissionForm />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 text-lg mb-4">Requirements</h3>
                <ul className="space-y-3">
                  {requirements.map((req) => (
                    <li key={req} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Important Dates</h3>
                <div className="space-y-2 text-sm">
                  {[["Application Opens", "Nov 1, 2024"], ["Last Date", "Dec 31, 2024"], ["Merit List", "Jan 10, 2025"], ["Classes Begin", "Jan 20, 2025"]].map(([label, date]) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-indigo-100">{label}</span>
                      <span className="font-semibold">{date}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 text-lg mb-3">Need Help?</h3>
                <p className="text-gray-500 text-sm mb-3">Contact our admissions office for assistance.</p>
                <div className="text-sm space-y-1">
                  <p className="text-gray-700"><strong>Phone:</strong> +91 9670234968</p>
                  <p className="text-gray-700"><strong>Email:</strong> admissions@alvigdc.edu</p>
                  <p className="text-gray-700"><strong>Hours:</strong> Mon–Sat, 9 AM – 5 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
