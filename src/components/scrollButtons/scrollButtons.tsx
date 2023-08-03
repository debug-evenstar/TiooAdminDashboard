import { MouseEventHandler } from "react";
import ChevronLeft from "../../assets/icons/components/common/chevronLeft";
import ChevronRight from "../../assets/icons/components/common/chevronRight";

export type TScrollBtnProps = { nextHandler?: MouseEventHandler, prevHandler?: MouseEventHandler };

export default function ScrollButton({ prevHandler, nextHandler}: TScrollBtnProps ) {
    return (
        <div className="flex items-center space-x-3 ">
            <button onClick={prevHandler} className="rounded-full w-[32px] h-[32px] border flex items-center justify-center">
                <ChevronLeft />
            </button>
            <button onClick={nextHandler} className="rounded-full w-[32px] h-[32px] border flex items-center justify-center border-main">
                <ChevronRight fill="#5A51E6" />
            </button>
        </div>
    );
}