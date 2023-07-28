import {
    BagIcon,
    BookIcon,
    HomeIcon,
    UserIcon,
    UsersIcon,
    SchoolIcon,
} from '../../assets/icons/sidebar';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logos/sabikidfirst.png';



type TMenu = {
    title: string
    route: string,
    icon: any,
}

export default function Sidebar(): JSX.Element {

    const [active, setActive] = useState(0);

    const menus: TMenu[] = [
        { route: '/', icon: HomeIcon, title: 'Home' },
        { route: '/schools', icon: SchoolIcon, title: 'Manage Schools' },
        { route: '/freelancers', icon: UserIcon, title: 'Manage Freelancers' },
        { route: '/teachers', icon: UserIcon, title: 'Manage Teachers' },
        { route: '/students', icon: UsersIcon, title: 'Manage Students' },
        { route: '/library', icon: BookIcon, title: 'Library' },
        { route: '/marketplace', icon: BagIcon, title: 'Marketplace' },
    ];
    return (
        <div className="bg-orange p-5 pr-1 h-screen overflow-y-auto relative w-[19%] border-r border-gray-200">
            <div className="">
                <img className="" src={logo} alt="" />
            </div>
            <div className='text-gray-500 px-2 mt-10 text-sm'>
                <ul>
                    {
                        menus.map((menu, key) => (
                            <Link to={menu.route}>
                                <li
                                    key={key}
                                    onClick={() => setActive(key)}
                                    className={` px-3 my-[0.3rem] flex items-center space-x-2 rounded-[8px] hover:bg-light cursor-pointer  py-[10px] border-l-[4px]  ${(key === active) ? "bg-light text-main font-[600] border-main" : "border-white hover:border-light"}`}>
                                    <div className="pr-4 fill-main">
                                        {<menu.icon fill={key === active ? "#5A51E6" : "#aaa"} />}
                                    </div>
                                    {menu.title}
                                </li>
                            </Link>
                        ))
                    }
                </ul>
                {/* <div className="mt-64"></div> */}
            </div>
        </div>
    )
}
