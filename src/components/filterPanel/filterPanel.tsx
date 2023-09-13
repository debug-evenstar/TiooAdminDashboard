import { useState } from "react";
import { IListProps } from "../list/list";

export default function FilterPanel({ data, setRows, panels }: { data?: IListProps[], setRows?: any, panels: string[] }) {

    const [active, setActive] = useState(0);

    const filterList = (field: string) => {
        let result = data;
        switch (field) {
            case 'All':
                result = data?.filter(() => true);
                setRows(result)
                break;
            case 'Recently Joined':
                setRows(data?.slice().reverse());
                break;

            case 'Active':
                result = data?.filter((item) => item.subscription);
                setRows(result)
                break;
            default:
                break;
        }
    }
    return (
        <div className="rounded-[8px] bg-gray-400 ">
            <ul className="flex py-1 px-[0.1rem] bg-[#e5e5e5] rounded-[8px] duration-300 text-gray-500 items-center space-x-2">
                {
                    panels?.map((panel, index) => (
                        <li onClick={() => { filterList(panel); setActive(index) }} key={index} className={`py-2 duration-300 cursor-pointer rounded-[8px] px-5 ${active === index ? "bg-white text-main " : null}`}>{panel}</li>
                    ))
                }
            </ul>
        </div>
    );
}