

export default function Button({ children, className }: { children: string, className?: string }) {
    return (
        <button className={`text-white w-[114px] h-[43px] font-[600] rounded-[8px] bg-main ${className}`}>{children}</button>
    )
}
