import { Cell, Pie, PieChart } from "recharts";
export default function DoughnutChart() {

    const percent = 60;

    const data = [
        { id: "1", name: "L1", value:  100 -percent},
        { id: "2", name: "L2", value: percent },
        ];

    return (
    <div className="w-[190px] text-center h-[240px] p-3 rounded-[8px]">
        <h1>Overall Progress</h1>
        <h2 className="text-xs text-gray-400">Keep improving the quality of your reach</h2>
        <div className="w-fit mx-auto mt-4">
            <PieChart width={130} height={130}>
                <text
                    className="text-xl font-bold"
                    x={65}
                    y={65}
                    textAnchor="middle"
                    dominantBaseline="middle"
                >
                    {percent}%
                </text>
                <Pie
                    data={data}
                    dataKey="value"
                    innerRadius="75%"
                    outerRadius="100%"
                    fill="#4F46E5"
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={-9}
                    cornerRadius={10}
                    // blendStroke
                >
                    <Cell
                    key="test"
                    fill="#ddd"
                    />
                </Pie>
            </PieChart>
        </div>
    </div>
  )
}
