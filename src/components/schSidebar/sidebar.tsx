import {
    // BagIcon,
    // HelpIcon,
    BookIcon,
    HomeIcon,
    UserIcon,
    // UsersIcon,
    // SchoolIcon,
} from '@/assets/icons/components/sidebar';

import { Link, useLocation } from 'react-router-dom';
import logo from '@/assets/logos/logo.png';


import './sidebar.css';
import { useAppSelector } from '@/redux/store';

type TMenu = {
    title: string
    route: string,
    icon: any,
    path: string
}

export default function SchoolSidebar({ menus }: { menus?: TMenu[] }): JSX.Element {
    const activeId = useAppSelector((state) => state.school.activeSchool.id)
    if (!menus) {
        menus = [
            { route: `schools/${activeId}/home`, icon: HomeIcon, title: 'Home', path: 'home' },
            // { route: '/schools', icon: SchoolIcon, title: 'Manage Schools' },
            // { route: '/freelancers', icon: UserIcon, title: 'Manage Freelancers' },
            { route: `schools/${activeId}/subjects`, icon: BookIcon, title: 'Subjects', path:'subjects' },
            { route: `schools/${activeId}/teachers`, icon: UserIcon, title: 'Teachers', path:'teachers' },
            { route: `schools/${activeId}/students`, icon: UserIcon, title: 'Students', path: 'students' },
            { route: `schools/${activeId}/lesson`, icon: BookIcon, title: 'Lessons', path:'lesson' },
        ];
    }

    const location = useLocation();
    const locay = location.pathname.split("/")
    // console.log(locay)
    console.log(locay[3]);
    
    const checkActive = (route: string,match=false) => {
        if(!match){
            return (locay[3] === route) ? "bg-light text-main font-[600] border-main" : "border-white hover:border-light";}
        return (location.pathname.includes(route)) ? "bg-light text-main font-[600] border-main" : "border-white hover:border-light";
        }

    return (
        <div id="sidebar" className="bg-orange p-5 pr-1 h-screen overflow-y-auto relative w-[19%] border-r border-gray-200">
            <div className="w-fit">
                <a href="/">
                    <img className="" src={logo} alt="" />
                </a>
            </div>
            <div className='text-gray-500 px-2 mt-10 text-sm flex flex-col justify-between h-full'>
                <ul className="h-fit">
                    {
                        menus.map((menu, key) => (
                            <Link to={menu.route} key={key}>
                                <li
                                    className={` px-3 my-[0.3rem] flex items-center space-x-2 rounded-[8px] hover:bg-light cursor-pointer  py-[10px] border-l-[4px]  ${checkActive(menu.path)}`}>
                                    <div className="pr-4 fill-main">
                                        {<menu.icon fill={locay[3] === menu.path ? "#5A51E6" : "#aaa"} />}
                                    </div>
                                    {menu.title}
                                </li>
                            </Link>
                        ))
                    }
                </ul>
                {/* <ul className="h-fit">
                    <Link to="/settings/pricing">
                    <li className={` px-3 my-[0.3rem] flex items-center space-x-2 rounded-[8px] hover:bg-light cursor-pointer  py-[10px] border-l-[4px] ${checkActive('/settings',true)}`}>
                        <div className="pr-4 fill-main">
                            <BookIcon fill={location.pathname.includes('settings')? "#5A51E6" : "#aaa"} />
                        </div>
                        Settings
                    </li>
                    </Link>

                    <li className={` px-3 my-[0.3rem] flex items-center space-x-2 rounded-[8px] hover:bg-light cursor-pointer  py-[10px] border-white border-l-[4px] ${checkActive('/help')}`}>
                        <div className="pr-4 fill-main">
                            <HelpIcon fill='#aaa' />
                        </div>
                        Help/Support
                    </li>
                </ul> */}
                {/* <div className="mt-64"></div> */}
            </div>
        </div>
    )
}
