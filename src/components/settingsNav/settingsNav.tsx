import { NavLink, useLocation } from "react-router-dom";
import PriceTagIcon from "../../assets/icons/components/settingsNav/priceTag";
import LockIcon from "../../assets/icons/components/settingsNav/lock";
import UserIcon from "../../assets/icons/components/settingsNav/user";
import CouponIcon from "../../assets/icons/components/settingsNav/coupon";

export default function SettingsNav() {
    const settingsNavItems = [
        { name: "Pricing", icon: PriceTagIcon, route: "/settings/pricing" },
        { name: "Coupon", icon: CouponIcon, route: "/settings/coupon" },
        { name: "User Levels", icon: UserIcon, route: "/settings/userlevels" },
        { name: "Password", icon: LockIcon, route: "/settings/password" }
    ];

    const location = useLocation();

    const checkActive = (route: string) => {
        return (location.pathname === route) ? "bg-light text-main font-[500] border-main" : "border-white hover:border-light";
    }

    return (
        <ul className="flex mt-10 flex-col text-gray-400 text-sm">
            {
                settingsNavItems.map((item, index) => (
                    <NavLink key={index} to={item.route}>
                        <li className={`${checkActive(item.route)} flex items-center space-x-3 px-3 pr-4 rounded-r-[8px] w-fit py-3 mb-1 hover:font-[500] hover:text-main`}>
                            {<item.icon fill={location.pathname === item.route ? "#5A51E6" : "#aaa"} />}
                            <span>{item.name}</span>
                        </li>
                    </NavLink>
                ))
            }
        </ul>
    );
}
