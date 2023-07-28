import ReportCard from "./reportCard";



export default function WeeklyReport(): JSX.Element{
    const reports = [
        {title: "Schools",icon:"",value: 11,percent: 5},
        {title: "Freelancers",icon:"",value: 9,percent: 2},
        {title: "Teachers",icon:"",value: 15,percent: 7},
        {title: "Students",icon:"",value: 9,percent: 2}
    ];
    
    const accents = [
        ['#96543C','#FCECEC'],
        ['#8E89D0','#DAD8F1'],
        ['#291CCF','#EEEDFB'],
        ['#366449','#ECFAFA']
    ];

    return (
        <>
            <h1 className="text-[24px]">Weekly Report</h1>
            <div className="flex mt-4 w-full flex-wrap justify-between">
                { reports.map((report,key) => <ReportCard key={key} {...report}  accent={accents[key]} />)}
            </div>
        </>
    );
}
