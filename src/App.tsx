import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import AdminLayout from './layout/admin';
import {
  Home,
  Library,
  Schools,
  Students,
  Settings,
  Teachers,
  Freelancers,
  Marketplace

} from './pages/admin';
import StudentProfile from './pages/admin/studentProfile';
import Login from './pages/auth/login';
import PricingTab from './pages/admin/settingsPages/pricing';
import UserLevels from './pages/admin/settingsPages/userLevels';
import CouponTab from './pages/admin/settingsPages/coupon';
import Notification from './components/notification/notification';
import ViewLesson from './pages/admin/library/viewLesson';
function App() {

  return (
    <>
      <Notification />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="schools" element={<Schools />}></Route>
            <Route path="freelancers" element={<Freelancers />}></Route>
            <Route path="teachers" element={<Teachers />}></Route>
            <Route path="students/profile" element={<StudentProfile />}></Route>
            <Route path="students" element={<Students />}></Route>
            <Route path="library/view/:id" element={<ViewLesson/>}></Route>
            <Route path="library" element={<Library />}></Route>
            <Route path="settings" element={<Settings />}>
              <Route index path="pricing" element={<PricingTab />} />
              <Route path="userlevels" element={<UserLevels />} />
              <Route path="password" element={<h1>Password</h1>} />
              <Route path="coupon" element={<CouponTab />} />
              <Route path="*" element={<Navigate to="pricing"></Navigate>}></Route>
            </Route>
            <Route path="/marketplace" element={<Marketplace />}></Route>
            <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
          </Route>

        </Routes>
      </Router>
    </>
  )
}

export default App
