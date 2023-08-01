import Button from "../../button/button";
import Analytics, { TUserAnalyticsProps } from "./analytics";
import DoughnutChart from "./doughnutChart";
import PieChart, { TPiechartDataProps } from "./pieChart";

export default function Users() {

    const analyticsData: TUserAnalyticsProps = {
        Schools: 52,
        Teachers: 1000,
        Hybrid: 600,
        Students: 1500,
        Freelancers: 30
    }

    const pieChartData: TPiechartDataProps[] = [
        { x: 'schools', y: 96 },
        { x: 'students', y: 43 },
        { x: 'freelancers', y: 90 },
        { x: 'teachers', y: 20 }
    ];

    return (
        <>
            <div className="mb-3 mt-12 flex items-center justify-between">
                <h1 className="text-[24px]">Users</h1>
                <Button>Export CSV</Button>
            </div>
            <div className="flex mt-4 w-full justify-start space-x-4 items-center">
                <Analytics {...analyticsData} />
                <PieChart data={pieChartData} />
                <DoughnutChart percent={60} />
            </div>
        </>
    );
}
