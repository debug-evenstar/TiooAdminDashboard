type TProfile = {
    image: string,
    name: string,
    title: string
};

function Profile({image,name,title}: TProfile){
    return (
        <div className="flex items-center space-x-2">
            <img className="w-[40px] h-[40px] rounded-full border" src={image} alt="" />
            <div className="block">
                <h1 className="text-md">{name}</h1>
                <h2 className="text-xs mt-1 text-gray-400">{title}</h2>
            </div>
        </div>
    );
}

const user = {
    image: "some image",
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
