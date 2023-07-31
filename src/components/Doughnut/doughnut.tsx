import { Cell, Pie, PieChart } from "recharts";

export type TDoughnutProps = {
    width: number;
    percent: number;
    height: number;
    innerRadius?: string;
    className?: string;
}

export default function Doughnut({ innerRadius = '75%', percent, width, height, className = "" }: TDoughnutProps) {

    const data = [
        { id: "1", name: "L1", value: 100 - percent },
        { id: "2", name: "L2", value: percent },
    ];


    return (
        <PieChart width={width} height={height}>
            <text
                className={className}
                x={width / 2}
                y={height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
            >
                {percent}%
            </text>
            <Pie
                data={data}
                dataKey="value"
                innerRadius={innerRadius}
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
    );
}
