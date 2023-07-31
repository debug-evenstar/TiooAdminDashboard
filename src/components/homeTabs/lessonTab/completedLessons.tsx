type TCompletedLessonCardProps = {
    title: string;
    value: number;
    color?: string;
}
function CompletedLessonCard({ title, value, color }: TCompletedLessonCardProps) {

    return (
        <div className={`w-[300px] flex flex-col items-center justify-between h-[250px] rounded-[8px] border shadow ${color}`}>
            <div className="h-full text-white text-center p-4 font-bold">
                <h1 className="text-3xl mt-10 mb-2 ">{value.toLocaleString()}</h1>
                <h2>{title}</h2>
            </div>
            <button className="flex text-lg items-center  space-x-2 p-4 bg-[#F8F5F0] h-[60px] w-full">
                <span>Full Detail</span>
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7071 0.292893C11.3166 -0.0976311 10.6834 -0.0976311 10.2929 0.292893C9.90237 0.683417 9.90237 1.31658 10.2929 1.70711L14.5858 6H1C0.447715 6 0 6.44772 0 7C0 7.55228 0.447715 8 1 8H14.5858L10.2929 12.2929C9.90237 12.6834 9.90237 13.3166 10.2929 13.7071C10.6834 14.0976 11.3166 14.0976 11.7071 13.7071L17.7071 7.70711C18.0976 7.31658 18.0976 6.68342 17.7071 6.29289L11.7071 0.292893Z" fill="#030036" fill-opacity="0.74" /></svg>
            </button>
        </div>
    );
}

export default function CompletedLessons() {
    const data: TCompletedLessonCardProps[] = [
        { title: 'Total Lessons Completed', value: 5000 },
        { title: 'Lessons Completed from teachers', value: 4000 },
        { title: 'Lessons Completed from freelancers', value: 4000 }
    ];

    const colors: string[] = [
        'bg-[#325D88]',
        'bg-[#29ABE0]',
        'bg-[#F47C3C]'
    ];
    return (
        <div className="mt-10">
            <h1 className="text-[24px]">Completed Lessons</h1>
            <div className="flex mt-4 w-fit space-x-7 justify-between">
                {
                    data.map((props, index) => (
                        <CompletedLessonCard key={index} color={colors[index]}{...props} />
                    ))
                }
            </div>
        </div>
    );
}
