import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import coursesReducer from "./slices/coursesSlice";
import eventsReducer from "./slices/eventsSlice";
import noticesReducer from "./slices/noticesSlice";
import facultyReducer from "./slices/facultySlice";
import galleryReducer from "./slices/gallerySlice";
import admissionsReducer from "./slices/admissionsSlice";

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    events: eventsReducer,
    notices: noticesReducer,
    faculty: facultyReducer,
    gallery: galleryReducer,
    admissions: admissionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
