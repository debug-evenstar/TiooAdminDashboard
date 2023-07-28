import Analytics, { TUserAnalyticsProps } from "./analytics";
import DoughnutChart from "./doughnutChart";
import PieChart, { TPiechartDataProps } from "./pieChart";

export default function Users(){

    const analyticsData: TUserAnalyticsProps = {
        schools: 52,
        teachers: 1000,
        hybrid: 600,
        students: 1500,
        freelancers: 30
    }

    const pieChartData: TPiechartDataProps[] = [
        {x: 'schools',y: 96},
        {x: 'students',y: 43},
        {x: 'freelancers',y: 90},
        {x: 'teachers',y: 20}
    ];

    return (
        <>
            <h1 className="mt-12 text-[24px]">Users</h1>
            <div className="flex mt-4 w-full justify-start space-x-4 items-center">
                <Analytics {...analyticsData}/>
                <PieChart data={pieChartData}/>
                <DoughnutChart percent={60}/>
            </div>
        </>
    );
}
