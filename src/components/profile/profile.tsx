

export type TProfile = {
    image: string;
    name: string;
    title: string;
};

export default function Profile({ image, name, title }: TProfile) {
    return (
        <div className="flex items-center text-primary space-x-2">
            <img className="w-[40px] h-[40px] rounded-full" src={image} alt="" />
            <div className="block">
                <h1 className="text-md">{name}</h1>
                <h2 className="text-xs mt-1 text-gray-400">{title}</h2>
            </div>
        </div>
    );
}
