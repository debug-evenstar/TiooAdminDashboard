import Select from "../../select/select";

type TLessonCardProps = {
    value: number,
    title: string,
    percentage: number,
    description: string,
    gradient?: string
}

// function LessonCard({ title, percentage, description, month }: TLessonCardProps) {
function LessonCard({ value, title, percentage, description, gradient }: TLessonCardProps) {
    return (
        <div className="w-[32%] shadow overflow-hidden h-[220px] border rounded-[8px]">
            {/* <div className="w-[323px] shadow overflow-hidden h-[220px] border rounded-[8px]"> */}
            <div className={`h-[77px] text-center p-5 flex items-center justify-between w-full bg-gradient-to-r ${gradient}`}>
                <h1 className="text-left leading-5 text-white text-lg">{title}</h1>
                <Select>
                    <option>July</option>
                </Select>
            </div>
            <div className="w-full h-full flex items-center mt-12 flex-col">
                <h2 className="font-bold text-3xl">{value.toLocaleString()}</h2>
                <span className="text-gray-400">{percentage}% {description}</span>
            </div>
        </div>
    );
}

export default function MonthlyUploadedLessons() {

    const data: TLessonCardProps[] = [
        { title: 'Total lessons uploaded', value: 6000, percentage: 5, description: 'higher than last month' },
        { title: 'Lessons uploaded by teachers', value: 3000, percentage: 5, description: 'higher than last month' },
        { title: 'Lessons uploaded by freelancers', value: 3000, percentage: 5, description: 'higher than last month' },
    ];

    const gradients: string[] = [
        "from-[#73386F] to-[#B74679]",
        "from-[#E96183] to-[#E96183]",
        "from-[#CD4D7D] to-[#CD4D7D]",
    ];

    return (
        <div className="mt-10">
            <h1 className="text-[24px]">Monthly Uploaded Lessons</h1>
            <div className="flex mt-4 w-full justify-between">
                {
                    data.map((props, index) => (
                        <LessonCard key={index} {...props} gradient={gradients[index]} />
                    ))
                }
            </div>
        </div>
    );
}
