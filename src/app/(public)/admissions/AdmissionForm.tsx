"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { admissionSchema, AdmissionInput } from "@/validations";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";
import { useState } from "react";

const courses = ["B.A.", "B.Sc.", "B.Com", "M.A.", "M.Sc.", "M.Com"];

export default function AdmissionForm() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<AdmissionInput>({
    resolver: zodResolver(admissionSchema),
  });

  const onSubmit = async (data: AdmissionInput) => {
    try {
      const res = await fetch("/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast.success("Application submitted successfully!");
      setSubmitted(true);
      reset();
    } catch {
      toast.error("Failed to submit. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
        <p className="text-gray-500 mb-6">We'll contact you within 2-3 business days.</p>
        <Button onClick={() => setSubmitted(false)} variant="outline">Submit Another</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Input label="Full Name" placeholder="Enter your full name" error={errors.studentName?.message} {...register("studentName")} />
        <Input label="Email Address" type="email" placeholder="your@email.com" error={errors.email?.message} {...register("email")} />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Input label="Phone Number" placeholder="+91 9670234968" error={errors.phone?.message} {...register("phone")} />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Course</label>
          <select
            {...register("course")}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
          >
            <option value="">Select a course</option>
            {courses.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.course && <p className="text-xs text-red-500">{errors.course.message}</p>}
        </div>
      </div>
      <Textarea label="Message (Optional)" placeholder="Any additional information..." rows={4} {...register("message")} />
      <Button type="submit" size="lg" loading={isSubmitting} className="w-full">
        Submit Application
      </Button>
    </form>
  );
}
