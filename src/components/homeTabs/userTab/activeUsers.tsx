import LineGraph, { TLineGraphProps } from "../../lineGraph/lineGraph";
import TotalActiveUsers, { TPiechartDataProps } from "./totalActiveUsers";

export default function ActiveUsers() {

    const pieChartData: TPiechartDataProps[] = [
        {x: 'Freelancers',y: 72},
        {x: 'Schools',y: 72},
        {x: 'Students',y: 72},
        {x: 'Teachers',y: 72},
        {x: 'Hybrid',y: 72}
    ];

    const lineGraphData: TLineGraphProps[] = [
        {x: 'Freelancers',y: 72},
        {x: 'Schools',y: 72},
        {x: 'Students',y: 72},
        {x: 'Teachers',y: 72},
        {x: 'Hybrid',y: 72}
    ];

    return (
        <div className="mt-16">
            <h1 className="text-[24px]">Active Users</h1>
            <LineGraph data={lineGraphData}/>
            <TotalActiveUsers data={pieChartData}/>
        </div>
    );
}
