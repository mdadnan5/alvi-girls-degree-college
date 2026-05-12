"use client";
import { useEffect } from "react";
import HeroSection from "@/sections/HeroSection";
import StatsSection from "@/sections/StatsSection";
import CoursesPreview from "@/sections/CoursesPreview";
import EventsPreview from "@/sections/EventsPreview";
import NoticeBoard from "@/sections/NoticeBoard";
import Testimonials from "@/sections/Testimonials";
import GalleryPreview from "@/sections/GalleryPreview";
import AdmissionCTA from "@/sections/AdmissionCTA";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchCourses } from "@/store/slices/coursesSlice";
import { fetchEvents } from "@/store/slices/eventsSlice";
import { fetchNotices } from "@/store/slices/noticesSlice";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const courses = useAppSelector((s) => s.courses.data.slice(0, 3));
  const events = useAppSelector((s) => s.events.data.slice(0, 3));
  const notices = useAppSelector((s) => s.notices.data.slice(0, 4));

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchEvents());
    dispatch(fetchNotices(""));
  }, [dispatch]);

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
