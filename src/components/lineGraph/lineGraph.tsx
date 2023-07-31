import { AreaChart, CartesianGrid, Tooltip, XAxis, Area, YAxis } from "recharts";

export type TLineGraphProps = {
    x: string;
    y: number;
};


export default function LineGraph({ data }: { data: TLineGraphProps[] }) {
    return (
        <div className="text-orange-400">
            <AreaChart width={900} height={250} data={data}
                margin={{ top: 40, right: 30, left: 0, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#5A51E655" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#5A51E6" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis stroke="#aaa" fontSize={12} dataKey="x" tickLine={false} padding={{ left: 10 }} />
                <YAxis stroke="#aaa" fontSize={12} axisLine={false} tickLine={false} />
                <CartesianGrid strokeDasharray="0.3 0.1" vertical={false} />
                <Tooltip />
                <Area type="linear" dataKey="y" stroke="#5A51E6" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
        </div>
    );
}