type TReportCardProps = {
    title: string,
    icon: string,
    accent: string[],
    percent: number,
    value: number
}

export default function ReportCard({title,icon,accent,value,percent}: TReportCardProps): JSX.Element{
    return (
        <div 
            style={{ backgroundColor: accent[1] }}
            className="w-[237px] rounded-[8px] h-[90px] p-4 flex items-center space-x-2 "
            >
            <div style={{backgroundColor: accent[0]}} className="w-[50px] flex items-center justify-center h-[50px] rounded-full">
                <img src={icon} alt="card image"/>
            </div>
            <div className="block text-gray-800">
                <h1 className="">{title}</h1>
                <div className="mt-1 flex items-center">
                    <h2 className="text-2xl">{value}</h2>
                    <p className="text-sm">
                        <span className="text-[#249B11] mx-2">+{percent}%</span>
                        <span>increase</span>
                    </p>
                </div>
            </div>
        </div>
    );
}