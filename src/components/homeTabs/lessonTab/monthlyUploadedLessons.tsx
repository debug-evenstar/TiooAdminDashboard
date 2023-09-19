import { useState } from "react";
import ExportMenuBtn from "../../exportMenuBtn/exportMenuBtn";
import { TMenuProps } from "../../menu/menu";
import ScrollButton from "../../scrollButtons/scrollButtons";
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
        <div className="w-[310px] shadow overflow-hidden h-[220px] border rounded-[8px]">
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
        { title: 'Lessons uploaded by schools', value: 3000, percentage: 5, description: 'higher than last month' },
        { title: 'Lessons uploaded by teachers', value: 3000, percentage: 5, description: 'higher than last month' },
        { title: 'Lessons uploaded by freelancers', value: 3000, percentage: 5, description: 'higher than last month' },
        { title: 'Lessons uploaded by hybrid', value: 3000, percentage: 5, description: 'higher than last month' },
    ];

    const gradients: string[] = [
        "from-[#73386F] to-[#B74679]",
        "from-[#4F4D55] to-[#4F4D55]",
        "from-[#E96183] to-[#E96183]",
        "from-[#CD4D7D] to-[#CD4D7D]",
        "from-[#BB13A0] to-[#BB13A0]",
    ];

    const exportMenuEntries: TMenuProps[] = [
        { id: 1, name: 'Lessons Uploaded' },
        { id: 1, name: 'Lessons Completed' },
        { id: 1, name: 'Lessons Uncompleted' },
    ];

    const [units,setUnits] = useState<number>(0)
    const scrollMargin = 320 + 24;
    const max = 600;


    return (
        <div className="mt-12">
            <div className="flex items-center justify-between">
                <h1 className="text-[24px]">Monthly Uploaded Lessons</h1>
                <div className="flex items-center space-x-6">
                    <ExportMenuBtn entries={exportMenuEntries}>Export CSV</ExportMenuBtn>
                    <ScrollButton max={max} scrollMargin={scrollMargin} {...{units, setUnits}} />
                </div>
            </div>
            <div className="flex items-center py-2 w-full overflow-hidden">
                <div className="flex mt-4 space-x-5 duration-300 justify-between"  style={{ transform: `translateX(${units}px)` }}>
                    {
                        data.map((props, index) => (
                            <LessonCard key={index} {...props} gradient={gradients[index]} />
                            ))
                        }
                </div>
            </div>
        </div>
    );
}
