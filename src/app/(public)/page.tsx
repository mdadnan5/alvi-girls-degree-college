import HeroSection from "@/sections/HeroSection";
import StatsSection from "@/sections/StatsSection";
import CoursesPreview from "@/sections/CoursesPreview";
import EventsPreview from "@/sections/EventsPreview";
import NoticeBoard from "@/sections/NoticeBoard";
import Testimonials from "@/sections/Testimonials";
import GalleryPreview from "@/sections/GalleryPreview";
import AdmissionCTA from "@/sections/AdmissionCTA";
import { connectDB } from "@/lib/db";
import CourseModel from "@/models/Course";
import EventModel from "@/models/Event";
import NoticeModel from "@/models/Notice";
import { ICourse, IEvent, INotice } from "@/types";

async function getData() {
  try {
    await connectDB();
    const [courses, events, notices] = await Promise.all([
      CourseModel.find().sort({ createdAt: -1 }).limit(3).lean(),
      EventModel.find().sort({ date: 1 }).limit(3).lean(),
      NoticeModel.find().sort({ createdAt: -1 }).limit(4).lean(),
    ]);
    return {
      courses: JSON.parse(JSON.stringify(courses)) as ICourse[],
      events: JSON.parse(JSON.stringify(events)) as IEvent[],
      notices: JSON.parse(JSON.stringify(notices)) as INotice[],
    };
  } catch {
    return { courses: [], events: [], notices: [] };
  }
}

export default async function HomePage() {
  const { courses, events, notices } = await getData();
  return (
    <>
      <HeroSection />
      <StatsSection />
      <CoursesPreview courses={courses} />
      <EventsPreview events={events} />
      <NoticeBoard notices={notices} />
      <GalleryPreview />
      <Testimonials />
      <AdmissionCTA />
    </>
  );
}
