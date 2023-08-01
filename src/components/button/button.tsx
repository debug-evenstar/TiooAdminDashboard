

export default function Button({ children, className }: { children: string, className?: string }) {
    return (
        <button className={`px-4 py-1 font-[600] rounded-[8px] bg-main ${className}`}>{children}</button>
    )
}
