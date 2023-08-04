// import Freelancers from "./freelancers";
// import Home from "./home";
// import Library from "./library";
// import Marketplace from "./marketplace";
// import Schools from "./schools";
// import Students from "./students";
// import Teachers from "./teachers";
// import Settings from "./settings";

import { lazy } from "react"

const Freelancers = lazy(() => import('./freelancers'));
const Home = lazy(() => import('./home'));
const Teachers = lazy(() => import('./teachers'));
const Library = lazy(() => import('./library'));
const Students = lazy(() => import('./students'));
const Schools = lazy(() => import('./schools'));
const Marketplace = lazy(() => import('./marketplace'));
const Settings = lazy(() => import('./settings'));


export {
    Home,
    Library,
    Schools,
    Students,
    Settings,
    Teachers,
    Freelancers,
    Marketplace
}