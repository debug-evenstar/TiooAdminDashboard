import { useState } from "react";

export default function FilterPanel({ panels }: { panels: string[] }) {

    const [active, setActive] = useState(0);

    return (
        <div className="rounded-[8px] bg-zinc-200 ">
            <ul className="flex py-1 px-[0.1rem] duration-300 text-gray-500 items-center space-x-2">
                {
                    panels.map((panel, index) => (
                        <li onClick={() => setActive(index)} key={index} className={`py-2 duration-300 cursor-pointer rounded-[8px] px-5 ${active === index ? "bg-white text-main " : null}`}>{panel}</li>
                    ))
                }
            </ul>
        </div>
    );
}