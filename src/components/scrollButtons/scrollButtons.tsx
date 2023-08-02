import { MouseEventHandler } from "react";
import chevronLeft from './../../assets/icons/chevron-left.svg';

export default function ScrollButton({ prevHandler, nextHandler }: { nextHandler?: MouseEventHandler, prevHandler?: MouseEventHandler }) {
    return (
        <div className="flex items-center space-x-3 ">
            <button onClick={prevHandler} className="rounded-full w-[32px] h-[32px] border flex items-center justify-center">
                <img src={chevronLeft} alt="" />
            </button>
            <button onClick={nextHandler} className="rounded-full w-[32px] h-[32px] border flex items-center justify-center border-main">
                <img src={chevronLeft} className="rotate-180" alt="" />
            </button>
        </div>
    );
}