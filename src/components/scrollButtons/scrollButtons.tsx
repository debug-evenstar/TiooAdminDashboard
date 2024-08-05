import { useState } from "react";
import ChevronLeft from "@/assets/icons/components/common/chevronLeft";
import ChevronRight from "@/assets/icons/components/common/chevronRight";

export type TScrollBtnProps = {
    units: number,
    max: number,
    setUnits: any,
    scrollMargin: number
};

export default function ScrollButton({max,units,setUnits, scrollMargin}: TScrollBtnProps) {
    const [ status, setStatus ] = useState<boolean>(true);
    const scrollLeft = () => {
        if (units < 0)
            setUnits((units: number) => units + scrollMargin);
        else{
            setStatus(true);
        }
    }
    const scrollRight = () => {
        if (units >= -max)
            setUnits((units: number) => units - scrollMargin);
        else
            setStatus(false);
    }
    return (
        <div className="flex items-center space-x-3 ">
            <button onClick={scrollLeft} className={`rounded-full w-[32px] h-[32px] border flex items-center justify-center ${!status ? "border-main" : ""}`}>
                <ChevronLeft fill={!status ? "#5A51E6" : "#d3d3d3"} />
            </button>
            <button onClick={scrollRight} className={`rounded-full w-[32px] h-[32px] border flex items-center justify-center ${status ? "border-main" : ""}`}>
                <ChevronRight fill={status ? "#5A51E6" : "#d3d3d3"} />
            </button>
        </div>
    );
}