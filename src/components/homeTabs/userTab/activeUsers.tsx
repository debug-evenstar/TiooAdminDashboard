import { TLineGraphProps } from "../../lineGraph/lineGraph";
import ActiveUsersGraph from "./activeUserGraph";
import TotalActiveUsers, { TPiechartDataProps } from "./totalActiveUsers";

export default function ActiveUsers() {

    const pieChartData: TPiechartDataProps[] = [
        { x: 'Freelancers', y: 72 },
        { x: 'Schools', y: 72 },
        { x: 'Students', y: 72 },
        { x: 'Teachers', y: 72 },
        { x: 'Hybrid', y: 72 }
    ];


    const lineGraphData: TLineGraphProps[] = [
        { x: '2-8', y: 3 },
        { x: '9-15', y: 10 },
        { x: '16-20', y: 50 },
        { x: '21-25', y: 14 },
        { x: '26-29', y: 39 },
    ];

    return (
        <div className="mt-16">
            <h1 className="text-[24px]">Active Users</h1>
            <ActiveUsersGraph data={lineGraphData} />
            <TotalActiveUsers data={pieChartData} />
        </div>
    );
}
