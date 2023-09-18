import ReportCard from "./reportCard";
import schoolImage from '../../../assets/icons/school.svg';
import freelancerImage from '../../../assets/icons/freelancers.svg';
import teacherImage from '../../../assets/icons/teachers.svg';
import studentImage from '../../../assets/icons/students.svg';
import Button from "../../button/button";
import ScrollButton from "../../scrollButtons/scrollButtons";
import chevronImage from '../../../assets/icons/chevron-down.svg';
import { TMenuProps } from "../../menu/menu";
import Popup from "reactjs-popup";
import { useState } from "react";
import ExportCSVModal from "../../exportCSVModal/exportCSVModal";


function DropDownButton({ className, values }: { className?: string, values: TMenuProps[] }) {
    const [active, setActive] = useState(false);
    const [selection, setSelection] = useState(values[0].name);

    return (
        <Popup
            open={active}
            trigger={
                <button onClick={() => setActive(true)} className={`text-[24px] flex items-center space-x-2 ${className}`}>
                    <span>{selection}</span>
                    <img src={chevronImage} className="cursor-pointer" alt="" />
                </button>
            }
            position="bottom right"
            on="click"
            closeOnDocumentClick
            mouseLeaveDelay={300}
            mouseEnterDelay={0}
        >

            <div className={`py-5 text-[#030036] l-0 text-sm text-left z-[10000] border bg-white w-fit rounded-[8px] shadow-lg `}>
                <ul>
                    {
                        values.map((menu, index) => (
                            <li onClick={() => { setActive(false); setSelection(menu.name) }} key={index} className="cursor-pointer py-3 px-8 mr-2 hover:bg-light">{menu.name}</li>
                        ))
                    }
                </ul>
            </div>
        </Popup>


    );
}

export default function WeeklyReport(): JSX.Element {
    const [ modal, setModal ] = useState<boolean>(false);
    const reports = [
        { title: "Schools", icon: schoolImage, value: 11, percent: 5 },
        { title: "Freelancers", icon: freelancerImage, value: 9, percent: 2 },
        { title: "Teachers", icon: teacherImage, value: 15, percent: 7 },
        { title: "Hybrid", icon: studentImage, value: 4, percent: 2 },
        { title: "Students", icon: studentImage, value: 9, percent: 2 }
    ];

    const accents = [
        ['#96543C', '#FCECEC'],
        ['#8E89D0', '#DAD8F1'],
        ['#291CCF', '#EEEDFB'],
        ['#B1B50A', '#F6F8C2'],
        ['#366449', '#ECFAFA']
    ];

    const menuProps: TMenuProps[] = [
        { id: 1, name: 'Weekly Report' },
        { id: 2, name: 'Daily Report' },
        { id: 3, name: 'Monthly Report' }
    ];

    const scrollMargin = 277 + 24;
    const max = 400;

    const [units, setUnits] = useState(0);

    return (
        <>
            <ExportCSVModal {...{modal, setModal}}/>
            <div className="mb-3 flex items-center justify-between">
                <DropDownButton values={menuProps} />
                <div className="flex items-center space-x-7">
                    <Button handler={() => setModal(true)}>Export CSV</Button>
                    <ScrollButton {...{max,units,setUnits,scrollMargin}} />
                </div>
            </div>
            <div className="flex items-center overflow-hidden">
                <div className="flex duration-300 space-x-[24px] justify-between" style={{ transform: `translateX(${units}px)` }}>
                    {reports.map((report, key) => <ReportCard key={key} {...report} accent={accents[key]} />)}
                </div>
            </div>
        </>
    );
}
