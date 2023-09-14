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
  SchoolSubjects
} from "./pages/admin";

import StudentProfile from './pages/admin/studentProfile';
import Login from './pages/auth/login';
import PricingTab from './pages/admin/settingsPages/pricing';
import UserLevels from './pages/admin/settingsPages/userLevels';
import CouponTab from './pages/admin/settingsPages/coupon';
import Notification from './components/notification/notification';
import ViewLesson from './pages/admin/library/viewLesson';
import AdminLayoutExt from "./layout/school";
import SchoolProfile from "./pages/admin/schoolProfile";
import TeacherProfile from "./pages/admin/teacherProfile";
import FreelancerProfile from "./pages/admin/freelancerProfile";

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
            <Route path="freelancers" element={<Freelancers />} />
            <Route path="freelancers/profile/:id" element={<FreelancerProfile />} />

            <Route path="teachers" element={<Teachers />} />
            <Route path="teachers/profile/:id" element={<TeacherProfile />} />

            <Route path="schools" element={<Schools />} />
            <Route path="schools/profile/:id" element={<SchoolProfile />} />

            <Route path="students" element={<Students />} />
            <Route path="students/profile/:id" element={<StudentProfile />} />

            <Route path="library" element={<Library />}></Route>
            <Route path="library/view/:id" element={<ViewLesson />} />

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
