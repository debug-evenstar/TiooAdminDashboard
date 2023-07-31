import LineGraph, { TLineGraphProps } from "../../lineGraph/lineGraph";
import { useState } from 'react';
import Select from "../../select/select";

export default function ActiveUsersGraph({data}:{data: TLineGraphProps[]}) {
    const [active, setActive] = useState(2);

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
                        tabsPanels.map((tab, key) => (
                            <li
                                onClick={() => setActive(key)}
                                key={key}
                                className={`${key === active ? "rounded-[8px] bg-white shadow text-gray-500" : ""} w-fit px-4 py-1.5 cursor-pointer hover:text-main`}>{tab}</li>
                        ))
                    }
                </ul>
                <div>
                    <Select>
                        <option value="July">July</option>
                    </Select>
                </div>
            </div>
            <div>
                <LineGraph data={data}/>
            </div>
        </div>
    );
}
