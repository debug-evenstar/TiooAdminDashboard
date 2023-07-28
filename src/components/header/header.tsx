import Profile, { TProfile } from "../profile/profile"
import userImage from '../../assets/images/user.png'
const user: TProfile = {
    image: userImage,
    name: "Praise Joe",
    title: "Admin",
}

export default function Header({title}: {title:string}) {
  return (
    <div className="px-[24px] h-[95px] flex items-center justify-between border-b">
        <h1 className="text-gray-600 text-[24px]">{title}</h1>
        <Profile {...user} />
    </div>
  )
}
