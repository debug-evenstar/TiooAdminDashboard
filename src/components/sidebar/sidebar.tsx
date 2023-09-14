import {
    BagIcon,
    HelpIcon,
    BookIcon,
    HomeIcon,
    UserIcon,
    UsersIcon,
    SchoolIcon,
} from '../../assets/icons/components/sidebar';

import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logos/logo.png';

import './sidebar.css';
import { useEffect, useState } from 'react';

type TMenu = {
    title: string
    route: string,
    icon: any,
    permission: string;
}

export default function Sidebar({ menus }: { menus?: TMenu[] }): JSX.Element {
    if (!menus) {
        menus = [
            // { route: '/', icon: HomeIcon, title: 'Home' },
            { permission: 'manage_school', route: '/schools', icon: SchoolIcon, title: 'Manage Schools' },
            { permission: 'manage_freelancer', route: '/freelancers', icon: UserIcon, title: 'Manage Freelancers' },
            { permission: 'manage_teacher', route: '/teachers', icon: UserIcon, title: 'Manage Teachers' },
            { permission: 'manage_students', route: '/students', icon: UsersIcon, title: 'Manage Students' },
            { permission: 'manage_library', route: '/library', icon: BookIcon, title: 'Library' },
            { permission: 'manage_marketplace', route: '/marketplace', icon: BagIcon, title: 'Marketplace' },
        ];
    }

    const [ permissions, setPermissions ] = useState<string[]>([]);

    const location = useLocation();

    useEffect(() => {
        const userProfile = localStorage.getItem('profile');
        if(userProfile){
            const perm = JSON.parse(userProfile);
            setPermissions(perm.authorization);
        }
    },[]);

    const checkActive = (route: string,match=false) => {
        if(!match)
            return (location.pathname === route) ? "bg-light text-main font-[600] border-main" : "border-white hover:border-light";
        return (location.pathname.includes(route)) ? "bg-light text-main font-[600] border-main" : "border-white hover:border-light";
        }

    return (
        <div id="sidebar" className="bg-orange p-5 pr-1 h-screen overflow-y-auto relative w-[19%] border-r border-gray-200">
            <div className="w-fit">
                <a href="/">
                    <img className="" src={logo} alt="" />
                </a>
            </div>
            <div className='text-gray-700 px-2 mt-10 text-sm flex flex-col justify-between h-full'>
                <ul className="h-fit">
                    <Link to="/">
                        <li className={` px-3 my-[0.3rem] flex items-center space-x-2 rounded-[8px] hover:bg-light cursor-pointer  py-[10px] border-l-[4px] ${checkActive('/')}`}>
                            <div className="pr-4 fill-main">
                                <HomeIcon fill={location.pathname === '/'? "#5A51E6" : "#aaa"} />
                            </div>
                            Home
                        </li>
                    </Link>
                    {
                        menus.map((menu, key) => {
                            if(permissions.includes(menu.permission))
                            return (
                            <Link to={menu.route} key={key}>
                                <li
                                    className={` px-3 my-[0.3rem] flex items-center space-x-2 rounded-[8px] hover:bg-light cursor-pointer  py-[10px] border-l-[4px]  ${checkActive(menu.route)}`}>
                                    <div className="pr-4 fill-main">
                                        {<menu.icon fill={location.pathname === menu.route ? "#5A51E6" : "#aaa"} />}
                                    </div>
                                    {menu.title}
                                </li>
                            </Link>
                        )})
                    }
                </ul>
                <ul className="h-fit">
                    {
                        permissions.includes("manage_admin") && 
                        <Link to="/settings/pricing">
                            <li className={` px-3 my-[0.3rem] flex items-center space-x-2 rounded-[8px] hover:bg-light cursor-pointer  py-[10px] border-l-[4px] ${checkActive('/settings',true)}`}>
                                <div className="pr-4 fill-main">
                                    <BookIcon fill={location.pathname.includes('settings')? "#5A51E6" : "#aaa"} />
                                </div>
                                Settings
                            </li>
                        </Link>
                    }

                    <li className={` px-3 my-[0.3rem] flex items-center space-x-2 rounded-[8px] hover:bg-light cursor-pointer  py-[10px] border-white border-l-[4px] ${checkActive('/help')}`}>
                        <div className="pr-4 fill-main">
                            <HelpIcon fill='#aaa' />
                        </div>
                        Help/Support
                    </li>
                </ul>
                {/* <div className="mt-64"></div> */}
            </div>
        </div>
    )
}
