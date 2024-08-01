import { lazy } from "react";

import SchoolHome from "./schools/schoolDashboard/home";
import SchoolLessons from "./schools/schoolDashboard/lesson";
import SchoolStudents from "./schools/schoolDashboard/students";
import SchoolTeachers from "./schools/schoolDashboard/teachers";
import SchoolSubjects from "./schools/schoolDashboard/subjects";

const Home = lazy(() => import("./home/home"));
const Schools = lazy(() => import("./schools/schools"));
const Library = lazy(() => import("./library/library"));
const Teachers = lazy(() => import("./teachers/teachers"));
const Students = lazy(() => import("./students/students"));
const Settings = lazy(() => import("./settings/settings"));
const Marketplace = lazy(() => import("./marketplace/marketplace"));
const Freelancers = lazy(() => import("./freelancers/freelancers"));
// const SchoolHome = lazy(() => import('./schoolDashboard/home'))
// const SchoolLessons = lazy(() => import('./schoolDashboard/lesson'))
const LessonsDisplay = lazy(
  () => import("./schools/schoolDashboard/lessonDisplay")
);

export {
  Home,
  Library,
  Schools,
  Students,
  Settings,
  Teachers,
  Freelancers,
  Marketplace,
  SchoolLessons,
  LessonsDisplay,
  SchoolHome,
  SchoolStudents,
  SchoolTeachers,
  SchoolSubjects,
};
