import { useState } from "react";
import { AreaChart, CartesianGrid, Tooltip, XAxis, Area, YAxis } from "recharts";


export type TLineGraphProps = {
    x: string;
    y: number;
};



function LineGraph() {
    const data: TLineGraphProps[] = [
        { x: '2-8',y: 3},
        { x: '9-15',y: 10},
        { x: '16-20',y: 50},
        { x: '21-25',y: 14},
        { x: '26-29',y: 39},
    ];
    return (
        <div className="text-orange-400">
            <AreaChart width={900} height={250} data={data}
                margin={{ top: 40, right: 30, left: 0, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#5A51E6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#5A51E6" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="x" tickLine={false} padding={{ left:10 }} />
                <YAxis axisLine={false} tickLine={false}/>
                <CartesianGrid strokeDasharray="0.3 0.1" vertical={false}/>
                <Tooltip />
                <Area type="linear" dataKey="y" stroke="#5A51E6" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
        </div>
    );
}


export default function LineGraphs({ data }: { data: TLineGraphProps[] }) {
    const [active, setActive] = useState(2);
    console.log(data);
    const tabsPanels: string[] = [
        'Schools',
        'Teachers',
        'Freelancers',
        'Hybrid',
        'Students'
    ];

    return (
        <div className="w-full shadow border rounded-[8px] p-8 h-full">
            <div className="w-full flex justify-between items-center">
                <ul className="flex items-center bg-gray-100 text-gray-400 rounded-[8px] text-sm w-fit">
                    {
                        tabsPanels.map((tab,key) => (
                            <li 
                                onClick={() => setActive(key)}
                                key={key}
                                className={`${key === active? "rounded-[8px] bg-white shadow text-gray-500":""} w-fit px-4 py-1.5 cursor-pointer hover:text-main`}>{tab}</li>
                        ))
                    }
                </ul>
                <div>
                    <select name="year" id="select-year">
                        <option value="July">July</option>
                    </select>
                </div>
            </div>
            <div>
                <LineGraph />
            </div>
        </div>
    );
}
