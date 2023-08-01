import ReportCard from "./reportCard";
import schoolImage from '../../../assets/icons/school.svg';
import freelancerImage from '../../../assets/icons/freelancers.svg';
import teacherImage from '../../../assets/icons/teachers.svg';
import studentImage from '../../../assets/icons/students.svg';
import Button from "../../button/button";


export default function WeeklyReport(): JSX.Element{
    const reports = [
        {title: "Schools",icon:schoolImage,value: 11,percent: 5},
        {title: "Freelancers",icon:freelancerImage,value: 9,percent: 2},
        {title: "Teachers",icon:teacherImage,value: 15,percent: 7},
        {title: "Students",icon:studentImage,value: 9,percent: 2}
    ];
    
    const accents = [
        ['#96543C','#FCECEC'],
        ['#8E89D0','#DAD8F1'],
        ['#291CCF','#EEEDFB'],
        ['#366449','#ECFAFA']
    ];

    return (
        <>
            <div className="mb-3 flex items-center justify-between">
                <h1 className="text-[24px]">Weekly Report</h1>
                <Button>Export CSV</Button>
            </div>
            <div className="flex mt-4 w-full flex-wrap justify-between">
                { reports.map((report,key) => <ReportCard key={key} {...report}  accent={accents[key]} />)}
            </div>
        </>
    );
}
