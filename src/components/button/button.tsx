import { MouseEventHandler } from "react";


export default function Button({ handler, children, className }: { handler?: MouseEventHandler, children: string, className?: string }) {
    return (
        <button onClick={handler} className={`text-white w-[114px] h-[41px] font-[500] rounded-[8px] bg-main ${className}`}>{children}</button>
    )
}
