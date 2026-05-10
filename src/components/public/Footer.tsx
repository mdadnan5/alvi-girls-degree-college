import Link from "next/link";
import { GraduationCap, Mail, Phone, MapPin, Globe, Share2, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-xl">
              <GraduationCap className="w-7 h-7 text-indigo-400" />
              <span>Alvi Girls GDC</span>
            </div>
            <p className="text-sm leading-relaxed">
              Alvi Girls Degree College — premier institution committed to academic excellence and holistic development since 2011.
            </p>
            <div className="flex gap-3">
              {[Globe, Share2, ExternalLink].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[["About", "/about"], ["Courses", "/courses"], ["Faculty", "/faculty"], ["Events", "/events"], ["Admissions", "/admissions"]].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-indigo-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Academics</h3>
            <ul className="space-y-2 text-sm">
              {["B.A. Program", "B.Sc. Program", "B.Com Program", "M.A. Program", "Research"].map((item) => (
                <li key={item}><Link href="/courses" className="hover:text-indigo-400 transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-indigo-400 shrink-0" /><span>Chak Abusaed Urf Pooremiya, Uttar Pradesh 212402</span></li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-indigo-400" /><span>+91 96702 34968</span></li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-indigo-400" /><span>info@alvigirlsgdc.edu</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Alvi Girls Degree College. All rights reserved.
      </div>
    </footer>
  );
}
