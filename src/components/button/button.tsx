import { MouseEventHandler } from "react";


export default function Button({ onClick,children, className }: { onClick: MouseEventHandler , children: string, className?: string }) {
    return (
        <button onClick={onClick} className={`text-white w-[114px] h-[43px] font-[600] rounded-[8px] bg-main ${className}`}>{children}</button>
    )
}
