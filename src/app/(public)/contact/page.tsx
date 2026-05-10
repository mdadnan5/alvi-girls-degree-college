"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
});
type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Message sent! We'll get back to you soon.");
    setSent(true);
    reset();
  };

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-indigo-900 to-slate-900 py-24 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-indigo-200 text-lg">Alvi Girls Degree College — We'd love to hear from you</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send a Message</h2>
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                {sent ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-500 mb-4">We'll respond within 24 hours.</p>
                    <Button onClick={() => setSent(false)} variant="outline">Send Another</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Input label="Your Name" placeholder="Full name" error={errors.name?.message} {...register("name")} />
                      <Input label="Email" type="email" placeholder="your@email.com" error={errors.email?.message} {...register("email")} />
                    </div>
                    <Input label="Subject" placeholder="How can we help?" error={errors.subject?.message} {...register("subject")} />
                    <Textarea label="Message" placeholder="Your message..." rows={5} error={errors.message?.message} {...register("message")} />
                    <Button type="submit" size="lg" loading={isSubmitting} className="w-full">Send Message</Button>
                  </form>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 text-lg mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  {[
                    { icon: MapPin, label: "Address", value: "Chak Abusaed Urf Pooremiya, Uttar Pradesh 212402" },
                    { icon: Phone, label: "Phone", value: "+91 96702 34968" },
                    { icon: Mail, label: "Email", value: "info@alvigirlsgdc.edu" },
                    { icon: Clock, label: "Office Hours", value: "Mon–Sat: 9 AM – 5 PM" },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 font-medium">{label}</div>
                        <div className="text-sm text-gray-700">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-72">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.1!2d82.088626!3d25.5267785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399aac33f2404b61%3A0xb1e6e21a284e066!2sAlvi+Girls+Degree+College!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href="https://maps.app.goo.gl/xTkucaW4kvgC3WFEA"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-colors text-sm"
              >
                <MapPin className="w-4 h-4" /> Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
