import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import AdminLayout from "./layout/admin";
import {
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
} from "./pages/admin";

import StudentProfile from './pages/admin/studentProfile';
import Login from './pages/auth/login';
import PricingTab from './pages/admin/settingsPages/pricing';
import UserLevels from './pages/admin/settingsPages/userLevels';
import CouponTab from './pages/admin/settingsPages/coupon';
import Notification from './components/notification/notification';
// import ViewLesson from './pages/admin/library/viewLesson.old';
import AdminLayoutExt from "./layout/school";
import SchoolProfile from "./pages/admin/schoolProfile";
import TeacherProfile from "./pages/admin/teacherProfile";
import FreelancerProfile from "./pages/admin/freelancerProfile";
import Lessons from './pages/admin/lessons/index';
import { ROUTES } from './global/routes';
import UploadedLesson from "./pages/admin/lessons/uploaded-lessons";
import EditSlides from "./pages/admin/library/components/editSlides";

function App() {
  return (
    <>
      <Notification />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* school dashboard routes */}
          <Route element={<AdminLayoutExt />}>
            <Route index path="schools/:id/home" element={<SchoolHome />} />
            <Route index path="schools/:id/students" element={<SchoolStudents />} />
            <Route index path="schools/:id/lesson" element={<SchoolLessons />} />
            <Route index path="schools/:id/teachers" element={<SchoolTeachers />} />
            <Route index path="schools/:id/subjects" element={<SchoolSubjects />} />
            <Route index path="schools/:id/lesson/:lessonid/:activeid" element={<LessonsDisplay />} />
          </Route>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Home />} />

            {/* Manage Freelancers */}
            <Route path="freelancers" element={<Freelancers />} />
            <Route path="freelancers/profile/:id" element={<FreelancerProfile />} />

            {/* Manage Teachers */}
            <Route path="teachers" element={<Teachers />} />
            <Route path="teachers/profile/:id" element={<TeacherProfile />} />

            {/* Manage Schools */}
            <Route path="schools" element={<Schools />} />
            <Route path="schools/profile/:id" element={<SchoolProfile />} />

            {/* Manage Students */}
            <Route path="students" element={<Students />} />
            <Route path="students/profile/:id" element={<StudentProfile />} />



            {/* Library */}
            <Route path="library">
              <Route path="/library" element={<Library />} />
              <Route path={'/library/' + ROUTES.LESSONS} element={<Lessons />} />
              <Route path={'/library/' + ROUTES.UPLOADED_LESSONS} element={<UploadedLesson />} />

              {/* <Route path="library/view/:id" element={<ViewLesson />} /> */}
            </Route>

            {/* Settings */}
            <Route path="settings" element={<Settings />}>
              <Route index path="pricing" element={<PricingTab />} />
              <Route path="userlevels" element={<UserLevels />} />
              <Route path="password" element={<h1>Password</h1>} />
              <Route path="coupon" element={<CouponTab />} />
              <Route path="*" element={<Navigate to="pricing"></Navigate>} />
            </Route>
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="*" element={<Navigate to="/"></Navigate>} />
          </Route>
          <Route path="/library/lesson/editSlides/:id" element={<EditSlides />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
