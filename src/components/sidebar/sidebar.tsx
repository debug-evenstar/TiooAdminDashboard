import { useState } from 'react';
import logo from '../../assets/logos/sabikidfirst.png';

import {
    BagIcon,
    BookIcon,
    HomeIcon,
    UserIcon,
    UsersIcon,
    SchoolIcon,
} from '../../assets/icons/sidebar';


type TMenu = {
    title: string
    route: string,
    icon: JSX.Element,
}

const menus: TMenu[] = [
    {route: '/',icon: <HomeIcon/>,title: 'Home'},
    {route: '/',icon: <SchoolIcon/>,title: 'Manage Schools'},
    {route: '/',icon: <UserIcon/>,title: 'Manage Freelancers'},
    {route: '/',icon: <UserIcon/>,title: 'Manage Teachers'},
    {route: '/',icon: <UsersIcon/>,title: 'Manage Students'},
    {route: '/',icon: <BookIcon/>,title: 'Library'},
    {route: '/',icon: <BagIcon/>,title: 'Marketplace'},
];

export default function Sidebar(): JSX.Element {
    const [ active, setActive ] = useState(0);

    return (
    <div className="bg-orange p-5 pr-1 h-screen overflow-y-auto relative w-[19%] border-r border-gray-200">
        <div className="">
            <img  className="" src={logo} alt="" />
        </div>
        <div className='text-gray-500 px-2 mt-10 text-sm'>
            <ul>
                {
                    menus.map((menu,key) => (
                        <li 
                            key={key}
                            onClick={() => setActive(key)}
                            className={` px-3 my-[0.3rem] flex items-center space-x-2 rounded-[8px] border-main hover:bg-light cursor-pointer  py-[13px] ${ (key === active) ? "bg-light text-main font-[600] border-l-[4px] ": ""}`}>
                            <div className="pr-4 fill-main">
                                {menu.icon}
                            </div>
                            {menu.title}
                        </li>                        
                    ))
                }
            </ul>
            <div className="mt-64"></div>
        </div>
    </div>
  )
}
