import image from '@/assets/images/image_34-removebg-preview 1.png';

export type TUserAnalyticsProps = {
    Schools: number,
    Teachers: number,
    Hybrid: number,
    Students: number,
    Freelancers: number,
}


export default function Analytics(data: TUserAnalyticsProps){


    return(
        <div className="w-[560px] p-4 text-white bg-[#4F46E5] h-[240px] rounded-[8px]">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[30px]">Analytics</h1>
                    <h2 className="text-gray-200 text-sm">Total Sabikid Users</h2>
                </div>
                <img src={image} alt="" />
            </div>
            <div className="grid grid-cols-3 mt-6">
                {
                    Object.entries(data).map((entry,index) => (
                        <div key={index} className="flex items-center drop-shadow-md mt-4 space-x-2">
                            <div className="flex items-center justify-center rounded w-[61px] font-[500] h-[32px] bg-[#3673CA]">{entry[1]}</div>
                            <h1 className="text-xl">{entry[0]}</h1>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

