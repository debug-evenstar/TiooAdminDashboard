
import { lazy } from "react"

import SchoolHome from './schoolDashboard/home';
import SchoolLessons from './schoolDashboard/lesson';
import SchoolStudents from "./schoolDashboard/students";
import SchoolTeachers from "./schoolDashboard/teachers";
import SchoolSubjects from "./schoolDashboard/subjects";

const Home = lazy(() => import('./home'));
const Schools = lazy(() => import('./schools'));
const Library = lazy(() => import('./library'));
const Teachers = lazy(() => import('./teachers'));
const Students = lazy(() => import('./students'));
const Settings = lazy(() => import('./settings'));
const Marketplace = lazy(() => import('./marketplace'));
const Freelancers = lazy(() => import('./freelancers'));
// const SchoolHome = lazy(() => import('./schoolDashboard/home'))
// const SchoolLessons = lazy(() => import('./schoolDashboard/lesson'))
const LessonsDisplay = lazy(() => import('./schoolDashboard/lessonDisplay'))



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
    SchoolSubjects
}