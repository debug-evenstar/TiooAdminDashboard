import "./App.css";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

import Notification from "./components/notification/notification";
import PublisherRoutes from "./apps/publisher/routes";
import { isDomain } from "./utils/url";
import { useEffect } from "react";
import { ConfigureLibrary } from "@Praxeum-ai/LearnBlocks";
import AdministratorRoutes from "./apps/administrator/routes";

const env = import.meta.env;

function App() {
    // Handle routing based on domain in request
    const PUBLISHER_DOMAIN = env.VITE_PUBLISHER_DOMAIN;
    const SENTINEL_DOMAIN = env.VITE_SENTINEL_DOMAIN;
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        ConfigureLibrary.save({
            baseUrl: env.VITE_API_KEY,
            token: token ?? "",
            authType: "admin"
        });
    }, []);

    return (
        <>
            <Notification />
            <Router>
                {isDomain(SENTINEL_DOMAIN) && <AdministratorRoutes />}
                {isDomain(PUBLISHER_DOMAIN) && <PublisherRoutes />}
            </Router>
        </>
    );
}

export default App;
