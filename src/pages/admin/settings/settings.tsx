import { Outlet } from "react-router-dom";
import Header from "../../../components/AppHeader";
import SettingsNav from "../../../components/settingsNav/settingsNav";

export default function Settings() {
  return (
    <div>
      <Header title="Settings" />
      <div className="mt-14 pr-10 flex border rounded-[8px] min-h-[70vh] shadow mx-10 mb-10">
        <div className="w-[20%] border-r">
          <SettingsNav />
        </div>
        <div className="w-[80%] pl-6 pb-10 pt-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
