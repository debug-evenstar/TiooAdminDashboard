import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import userImage from './../../assets/images/user.png'
import { useEffect, useRef, useState } from "react";



const DropDown = ({ active, setActive }: { active: boolean, setActive: any }) => {

    const menuRef = useRef<any>(null);

    const handleClickOutside = (e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setActive(false);
        }
    }

    const logout = () => {
        localStorage.clear();
        window.location.assign('/login');
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)
        return () => {document.removeEventListener('click', handleClickOutside)}
    }, []);

    return active? (
        <ul className="absolute rounded-[8px] w-[12rem] border shadow bg-white mt-28 right-1">
            <li onClick={logout} className="hover:bg-light px-4 py-3 cursor-pointer">Logout</li>
        </ul>
    ) : <></>;
}

export default function Profile() {
    const user = useSelector((state: RootState) => state.user.user);
    const [active, setActive] = useState<boolean>(false);

    useEffect(() => {
        console.log(" I don mount profile");
    }, [])

    return (
        <>
            <div onClick={() => setActive(!active)} className="flex items-center cursor-pointer text-primary space-x-2">
                <img className="w-[40px] h-[40px] rounded-full" src={userImage} alt="" />
                <div className="block">
                    <h1 className="text-md">{user.name}</h1>
                    <h2 className="text-xs mt-1 text-gray-400">{user.account_type}</h2>
                </div>
                <DropDown {...{active,setActive}}/>
            </div>
        </>
    );
}
