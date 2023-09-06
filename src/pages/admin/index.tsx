
import { lazy } from "react"

const Freelancers = lazy(() => import('./freelancers'));
const Home = lazy(() => import('./home'));
const Teachers = lazy(() => import('./teachers'));
const Library = lazy(() => import('./library'));
const Students = lazy(() => import('./students'));
const Schools = lazy(() => import('./schools'));
const Marketplace = lazy(() => import('./marketplace'));
const Settings = lazy(() => import('./settings'));
const SchoolHome = lazy(() => import('./schoolDashboard/home'))
const SchoolLessons = lazy(() => import('./schoolDashboard/lesson'))
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
    SchoolHome
}