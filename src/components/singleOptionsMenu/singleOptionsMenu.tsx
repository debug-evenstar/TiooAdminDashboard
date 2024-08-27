import { useState, ChangeEvent } from "react";

export default function SingleOptionsMenu({ options, selection, setSelection }: { selection: number, setSelection: (s: number) => void, options: { id: number, value: string }[] }) {
    const [active, setActive] = useState(false);
    const [currentValue, setCurrentValue] = useState<number | string>('');

    const handleSelection = (e: ChangeEvent<HTMLInputElement>, value: number | string) => {
        setCurrentValue(value);
        const id = Number.parseInt(e.target.value);
        setSelection(id);
    }

    return (
        <div className="relative">
            <div onClick={() => setActive(!active)} className="mt-2 cursor-pointer  outline-none rounded w-full px-3 py-2 border flex justify-between">
                <span>{ options.find((i: any) => i.id == selection)?.value }</span>
                <div

                    className={`text-xs duration-300  w-4 h-4 flex items-center justify-center
                cursor-pointer ${!active ? "rotate-180" : ""}`}
                >
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.7071 7.70711C13.3166 8.09763 12.6834 8.09763 12.2929 7.70711L7 2.41421L1.70711 7.70711C1.31658 8.09763 0.683417 8.09763 0.292893 7.70711C-0.0976315 7.31658 -0.0976316 6.68342 0.292893 6.29289L6.29289 0.292894C6.68342 -0.0976303 7.31658 -0.0976304 7.70711 0.292894L13.7071 6.29289C14.0976 6.68342 14.0976 7.31658 13.7071 7.70711Z" fill="#030036" fillOpacity="0.74" />
                    </svg>
                </div>
            </div>
            {
                active &&
                <ul className="border shadow px-3 max-h-[18rem] w-full bg-white z-[20] absolute overflow-y-auto">
                    {
                        options.map(({ id, value }: any) => (
                            <li key={id} onClick={() => { setCurrentValue(value); setSelection(id); setActive(false) }} className="my-2 cursor-pointer rounded-sm py-1.5 px-3 shadow flex items-center space-x-3">
                                <input className="outline-none cursor-pointer" checked={selection === id} onChange={(e) => handleSelection(e, value)} type="radio" readOnly value={id} />
                                <span className="text-gray-500">{value}</span>
                            </li>
                        ))
                    }
                </ul>
            }
        </div>
    );
}
