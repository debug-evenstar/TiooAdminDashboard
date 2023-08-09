import { ChangeEvent, useState } from 'react';
import searchImage from '../../assets/images/search-md.png';



export type TUserChecklistProps = {
    id: number;
    value: {name: string,email: string};
}


export default function UserChecklist({ selection,onApply, className, setSelection, data, close }: { className?: string, onApply: () => void,selection: any, setSelection: any, data: TUserChecklistProps[], close: (state: boolean) => void }) {

    const [searchInput, setSearchInput] = useState<string>('');

    const [list, setList] = useState<TUserChecklistProps[]>(data);

    const handleCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
        let updatedList = [...selection];
        const value: number = Number.parseInt(e.target.value);

        if(e.target.checked){
            updatedList = [...selection, value]
        }else{
            updatedList = selection.filter((i: number) => i !== value);
        }
        setSelection(updatedList);
    }

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value: string = e.target.value;
        setSearchInput(value);
        const newList = data.filter((item) => item.value.name.toLowerCase().includes(value.toLocaleLowerCase()))
        setList(newList);
    }

    return (
        <div className={`w-[320px] min-h-[370px] bg-white rounded-[8px] shadow-lg border border-[#e3e3e3] ${className}`}>
            <div className="w-full shadow py-3 flex items-center p-4 space-x-1">
                <img src={searchImage} alt="" className='w-5 h-5' />
                <input
                    onChange={handleSearchChange}
                    type="text" value={searchInput} placeholder="Search"
                    className="outline-none text-sm w-full" />
            </div>
            <div className="relative h-[276px] overflow-y-auto">
                {
                    list.map(({ id, value }) => (
                        <div key={id} className="hover:bg-neutral-100 px-4 flex items-center border-b py-3 space-x-3">
                            <input type="checkbox" onChange={handleCheckChange} className="w-[18px] cursor-pointer h-[18px] outline-none border-0" value={id} />
                            <div className='flex items-center space-x-2'>
                                <div className="h-[40px] w-[40px] bg-light rounded-full"></div>
                                <div>
                                    <h1 className='text-gray-900 text-sm'>
                                        {value.name}
                                    </h1>
                                    <p className='text-sm text-gray-400'>{value.email}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='h-[60px] relative bottom-0 p-4 flex items-center border justify-between'>
                <button onClick={() => close(false)} className="rounded-[8px] outline-none border px-3 py-1.5 text-sm">Cancel</button>
                <button onClick={() => onApply() } disabled={selection.length === 0 } className={`${selection.length > 0? "bg-main":"bg-gray-300"} rounded-[8px] outline-none text-white border px-3 py-1.5 text-sm`}>Apply</button>
            </div>
        </div>
    )
}
