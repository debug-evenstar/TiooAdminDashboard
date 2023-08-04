import { NavLink, useLocation } from "react-router-dom";
import PriceTagIcon from "../../assets/icons/components/settingsNav/priceTag";
import PlusIcon from "../../assets/icons/components/settingsNav/plus";
import LockIcon from "../../assets/icons/components/settingsNav/lock";

export default function SettingsNav() {
    const settingsNavItems = [
        { name: "Pricing", icon: PriceTagIcon, route: "/settings/pricing" },
        { name: "Add Users", icon: PlusIcon, route: "/settings/addusers" },
        { name: "Password", icon: LockIcon, route: "/settings/password" }
    ];

    const location = useLocation();

    const checkActive = (route: string) => {
        return (location.pathname === route) ? "bg-light text-main font-[500] border-main" : "border-white hover:border-light";
    }
    return (
        <ul className="flex flex-col text-gray-400 text-sm">
            {
                settingsNavItems.map((item, index) => (
                    <NavLink key={index} to={item.route}>
                        <li className={`${checkActive(item.route)} flex items-center space-x-3 px-3 pr-4 rounded-r-[8px] w-fit py-3  hover:font-[500] hover:text-main`}>
                            {<item.icon fill={location.pathname === item.route ? "#5A51E6" : "#aaa"} />}
                            <span>{item.name}</span>
                        </li>
                    </NavLink>
                ))
            }
        </ul>
    );
}
