import Profile, { TProfile } from "../profile/profile"
import userImage from '../../assets/images/user.png'
import { useNavigate } from "react-router-dom"
const user: TProfile = {
  image: userImage,
  name: "Praise Joe",
  title: "Admin",
}

export default function Header({ variant, title }: { variant?: boolean, title: string }) {
  const navigate = useNavigate();

  return (
    <>
      {
        (!variant) ?
          <div className="px-[24px] h-[80px] flex items-center justify-between border-b">
            <h1 className="text-primary text-[22px]">{title}</h1>
            <Profile {...user} />
          </div>
          :
          <div className="px-[32px] h-[95px] flex items-center justify-between border-b">
            <div className="flex space-x-6 items-center">
              <button onClick={() => navigate(-1)} className="border-main border rounded-[8px] py-[11px] font-[500] px-[50px] h-[47px] text-main ">Back</button>
              <h1 className="text-primary text-[24px]">{title}</h1>
            </div>
            <Profile {...user} />
          </div>
      }
    </>
  )
}
