import { Outlet } from "react-router-dom";
import Header from "../../components/header";
import SettingsNav from "../../components/settingsNav/settingsNav";

export default function Settings() {
    return (
        <div>
            <Header title="Settings" />
            <div className="mt-14 px-10 flex ">
                <div className="w-[20%] border-r h-screen">
                    <SettingsNav />
                </div>
                <div className="w-[80%] pl-6 pt-10">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
