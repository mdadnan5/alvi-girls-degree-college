import type { Metadata } from "next";
import Image from "next/image";
import { Target, Eye, Award, Building2 } from "lucide-react";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 text-white text-center overflow-hidden min-h-[280px]">
        <Image
          src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1920&q=80"
          alt="College building"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/85 to-slate-900/80" />
        <div className="relative max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">About Alvi Girls GDC</h1>
          <p className="text-indigo-200 text-lg">A legacy of excellence in education since 2011</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Our Story</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">Building Tomorrow's Leaders</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Alvi Girls Degree College was established in 2011 with a vision to provide quality higher education to students from all walks of life. Over the decades, we have grown into one of the most respected institutions in the region.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our NAAC A+ accreditation reflects our commitment to academic excellence, research, and holistic student development. We offer a wide range of undergraduate and postgraduate programs across arts, science, and commerce streams.
            </p>
          </div>
          {/* Staggered image grid — all verified 200 OK */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-48 rounded-2xl overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&q=80" alt="Students" fill sizes="(max-width:1024px) 50vw, 25vw" className="object-cover" />
            </div>
            <div className="relative h-48 rounded-2xl overflow-hidden mt-6">
              <Image src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80" alt="Library" fill sizes="(max-width:1024px) 50vw, 25vw" className="object-cover" />
            </div>
            <div className="relative h-48 rounded-2xl overflow-hidden -mt-6">
              <Image src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80" alt="Classroom" fill sizes="(max-width:1024px) 50vw, 25vw" className="object-cover" />
            </div>
            <div className="relative h-48 rounded-2xl overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&q=80" alt="Campus" fill sizes="(max-width:1024px) 50vw, 25vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats banner */}
      <section className="py-12 bg-gradient-to-r from-indigo-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center text-white">
            {[["2011", "Established"], ["5000+", "Students"], ["A+", "NAAC Grade"], ["150+", "Faculty"]].map(([val, lbl]) => (
              <div key={lbl}>
                <div className="text-4xl font-bold">{val}</div>
                <div className="text-indigo-100 text-sm mt-1">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Vision & Mission</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">To be a premier institution of higher learning that fosters intellectual growth, ethical values, and social responsibility, producing graduates who contribute meaningfully to society and the nation.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">To provide accessible, quality education through innovative teaching methods, research opportunities, and industry partnerships that prepare students for the challenges of the 21st century.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Leadership</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Principal's Message</h2>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-cyan-50 rounded-3xl p-8 lg:p-12 border border-indigo-100 grid lg:grid-cols-3 gap-8 items-center">
            <div className="text-center lg:text-left">
              <div className="w-36 h-36 rounded-2xl overflow-hidden mx-auto lg:mx-0 mb-4 shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80"
                  alt="Principal"
                  width={144}
                  height={144}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="font-bold text-gray-900 text-lg">Dr. Ahmad Principal</div>
              <div className="text-indigo-600 text-sm">Principal, Alvi Girls GDC</div>
              <div className="text-gray-400 text-xs mt-1">Ph.D., M.Ed. | 25+ Years Experience</div>
            </div>
            <div className="lg:col-span-2 relative">
              <div className="text-7xl text-indigo-200 font-serif absolute -top-4 -left-2 leading-none">"</div>
              <p className="text-gray-700 text-lg leading-relaxed italic pt-6">
                Welcome to Alvi Girls Degree College. Our institution stands as a beacon of knowledge and opportunity. We are committed to nurturing not just academic excellence but also character, creativity, and compassion in every student who walks through our doors. Together, we build a brighter future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Our Achievements</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Award, title: "NAAC A+ Accreditation", desc: "Recognized for outstanding academic quality and infrastructure by the National Assessment and Accreditation Council.", img: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&q=80" },
              { icon: Building2, title: "State Best College Award", desc: "Awarded the Best Government College in the state for three consecutive years by the State Education Board.", img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&q=80" },
              { icon: Target, title: "100% Placement Record", desc: "Our students consistently achieve excellent placement rates with top companies and government organizations.", img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=80" },
            ].map(({ icon: Icon, title, desc, img }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative h-40">
                  <Image src={img} alt={title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-4 w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow">
                    <Icon className="w-5 h-5 text-indigo-600" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
