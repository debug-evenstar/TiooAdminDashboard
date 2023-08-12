import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import userImage from './../../assets/images/user.png'



export default function Profile() {
    const user = useSelector((state: RootState) => state.user.user);
    console.log(user)
    return (
        <div className="flex items-center text-primary space-x-2">
            <img className="w-[40px] h-[40px] rounded-full" src={userImage} alt="" />
            <div className="block">
                <h1 className="text-md">{user.name}</h1>
                <h2 className="text-xs mt-1 text-gray-400">{user.account_type}</h2>
            </div>
        </div>
    );
}
