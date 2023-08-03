
export default function Select({children,className}: {className?: string,children: any}){
    return (
        <select className={`outline-none rounded-[8px] cursor-pointer bg-gray-100 text-sm px-2 py-2 ${className}`}>
            {children}
        </select>

    );
}