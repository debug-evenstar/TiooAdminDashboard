
export default function Select({children}: {children: any}){
    return (
        <select className="rounded [8px] cursor-pointer bg-gray-100 text-sm px-2 py-1">
            {children}
        </select>

    );
}