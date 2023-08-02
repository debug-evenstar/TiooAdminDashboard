export type TMenuProps = {
    name: string;
    id: number;
};
export default function Menu({ className, values }: { className?: string, values: TMenuProps[] }) {
    return (
        <div className={`py-5 pl-0 absolute border bg-white w-fit rounded-[8px] shadow-lg ${className}`}>
            <ul>
                {
                    values.map((menu, index) => (
                        <li key={index} className="cursor-pointer py-3 px-8 mr-2 hover:bg-light">{menu.name}</li>
                    ))
                }
            </ul>
        </div>
    );
}