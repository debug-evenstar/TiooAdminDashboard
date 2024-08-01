import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
    redirect,
} from "react-router-dom";

import AdminLayout from "../layouts/admin";
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
} from "../pages/admin";

import StudentProfile from "../pages/admin/students/studentProfile";
import Login from "../pages/auth/login";
import PricingTab from "../pages/admin/settings/settingsPages/pricing";
import UserLevels from "../pages/admin/settings/settingsPages/userLevels";
import CouponTab from "../pages/admin/settings/settingsPages/coupon";
import AdminLayoutExt from "../layouts/school";
import SchoolProfile from "../pages/admin/schools/schoolProfile";
import TeacherProfile from "../pages/admin/teachers/teacherProfile";
import FreelancerProfile from "../pages/admin/freelancers/freelancerProfile";
import store from "@/redux/store";
import { useEffect, useState } from "react";
import SharedRoutes from "@/shared/routes";
import library from "@/redux/slices/library";
// import Notification from "./components/notification/notification";
// import { ROUTES } from "./global/routes";

function AdministratorRoutes() {
    const SHARED_ROUTES_PROPS = {};

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            {/* school dashboard routes */}
            <Route element={<AdminLayoutExt />}>
                <Route index path="schools/:id/home" element={<SchoolHome />} />
                <Route
                    index
                    path="schools/:id/students"
                    element={<SchoolStudents />}
                />
                <Route
                    index
                    path="schools/:id/lesson"
                    element={<SchoolLessons />}
                />
                <Route
                    index
                    path="schools/:id/teachers"
                    element={<SchoolTeachers />}
                />
                <Route
                    index
                    path="schools/:id/subjects"
                    element={<SchoolSubjects />}
                />
                <Route
                    index
                    path="schools/:id/lesson/:lessonid/:activeid"
                    element={<LessonsDisplay />}
                />
            </Route>
            <Route element={<AdminLayout />}>
                <Route path="/" element={<Home />} />

                {/* Manage Freelancers */}
                <Route path="freelancers" element={<Freelancers />} />
                <Route
                    path="freelancers/profile/:id"
                    element={<FreelancerProfile />}
                />

                {/* Manage Teachers */}
                <Route path="teachers" element={<Teachers />} />
                <Route
                    path="teachers/profile/:id"
                    element={<TeacherProfile />}
                />

                {/* Manage Schools */}
                <Route path="schools/:page?" element={<Schools />} />
                <Route path="schools/profile/:id" element={<SchoolProfile />} />

                {/* Manage Students */}
                <Route path="students" element={<Students />} />
                <Route
                    path="students/profile/:id"
                    element={<StudentProfile />}
                />

                {/* Settings */}
                <Route path="settings" element={<Settings />}>
                    <Route index path="pricing" element={<PricingTab />} />
                    <Route path="userlevels" element={<UserLevels />} />
                    <Route path="password" element={<h1>Password</h1>} />
                    <Route path="coupon" element={<CouponTab />} />
                    <Route
                        path="*"
                        element={<Navigate to="pricing"></Navigate>}
                    />
                </Route>
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="*" element={<Navigate to="/"></Navigate>} />
                {SharedRoutes(SHARED_ROUTES_PROPS)}
            </Route>
        </Routes>
    );
}

export default AdministratorRoutes;
