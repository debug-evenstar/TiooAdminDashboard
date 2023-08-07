import PricingTab from './admin/settingsPages/pricing';
import UserLevels from './admin/settingsPages/userLevels';
import StudentProfile from './admin/studentProfile';
import {
    Home,
    Library,
    Schools,
    Students,
    Settings,
    Teachers,
    Freelancers,
    Marketplace

} from './admin';


import { Routes, Route, Navigate } from 'react-router-dom';
import CouponTab from './admin/settingsPages/coupon';

export default function AdminRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="schools" element={<Schools />}></Route>
            <Route path="freelancers" element={<Freelancers />}></Route>
            <Route path="teachers" element={<Teachers />}></Route>
            <Route path="students/profile" element={<StudentProfile />}></Route>
            <Route path="students" element={<Students />}></Route>
            <Route path="library" element={<Library />}></Route>
            <Route path="settings" element={<Settings />}>
                <Route index path="pricing" element={<PricingTab />} />
                <Route path="userlevels" element={<UserLevels />} />
                <Route path="password" element={<h1>Password</h1>} />
                <Route path="coupon" element={<CouponTab/> } />
                <Route path="*" element={<Navigate to="pricing"></Navigate>}></Route>
            </Route>

            <Route path="/marketplace" element={<Marketplace />}></Route>
            {/* <Route path="*" element={<h1>Not Found in admin</h1>}></Route> */}

            <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
        </Routes>
    );
}