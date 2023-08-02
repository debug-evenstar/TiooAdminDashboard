export type TMenuProps = {
    name: string;
    id: number;
};

export default function Menu({ close,className, values }: { close?: () => void ,className?: string, values: TMenuProps[] }) {
    return (
        <div className={`py-5 text-[#030036] l-0 text-sm text-left z-[10000] border bg-white w-fit rounded-[8px] shadow-lg ${className}`}>
            <ul>
                {
                    values.map((menu, index) => (
                        <li onClick={close} key={index} className="cursor-pointer py-3 px-8 mr-2 hover:bg-light">{menu.name}</li>
                    ))
                }
            </ul>
        </div>
    );
}