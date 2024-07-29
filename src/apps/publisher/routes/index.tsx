import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
    redirect,
} from "react-router-dom";

import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import PublisherLayout from "../layouts/main.layout";
import VerifyOTP from "../pages/auth/verifyOtp";
import Home from "../pages/dashboard/home";
import store from "@/redux/store";
import InactiveAccount from "../pages/misc/inactiveAccount";
import { useEffect, useState } from "react";
import { getAccount } from "../services/account.service";
import SharedRoutes from "@/shared/routes";
import library from "@/redux/slices/library";
// import Notification from "./components/notification/notification";
// import { ROUTES } from "./global/routes";

function PublisherRoutes() {
    const localProfile = localStorage.getItem("profile");
    const [profile, setProfile] = useState<any>(
        localProfile ? JSON.parse(localProfile) : null
    );
    const isActive = () => profile && profile.flag == "active";

    const SHARED_ROUTES_PROPS = {
        library: {
            libraryTabs: [{ name: "Textbooks", tabId: 0 }],
        },
    };

    const isAuthenticated = !!localProfile;

    useEffect(() => {
        if (!isAuthenticated && window.location.pathname == "/") {
            location.replace("/login");
        }
        if (isAuthenticated) {
            getAccount().then((response: any) => {
                setProfile(response.data);
                localStorage.setItem("profile", JSON.stringify(response.data));
            });
        }
    }, []);

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<VerifyOTP />} />

            {isAuthenticated ? (
                isActive() ? (
                    <Route element={<PublisherLayout />}>
                        <Route path="/" element={<Home />} />
                        {/* INCLUDE SHARED ROUTES HERE */}
                        {SharedRoutes(SHARED_ROUTES_PROPS)}
                    </Route>
                ) : (
                    <Route path="/" element={<InactiveAccount />} />
                )
            ) : (
                <Route path="/" element={<Login />} />
            )}
        </Routes>
    );
}

export default PublisherRoutes;
