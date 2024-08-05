import Popup from 'reactjs-popup';
// import image from '@/assets/images/user.png';
import { ReactNode } from 'react';
import { useAppDispatch } from '@/redux/store';
import { saveActiveSchId } from '@/redux/slices/schools';

export type IListProps = {
    name: string;
    email: string;
    subscription: boolean;
    image?: string;
    id?: number;
};

export default function ListComponent({ menu, rows, selectRow }: { menu: ReactNode, rows: IListProps[], selectRow: (id: any) => void }) {
    const dispatch = useAppDispatch()

    const handleSelect = (entry: any) => {
        selectRow(entry.id)
        dispatch(saveActiveSchId(entry.id))
    }

    return (
        <div className="w-full text-left mt-10 ">
            <div className="text-gray-600 px-3 flex justify-between font-bold">
                <div className="w-[19rem] flex items-center space-x-3">Name</div>
                <div className="w-[14rem]">Email Address</div>
                <div className="w-[10rem]">Subscription</div>
                <div className="w-[5rem]">Actions</div>
            </div>
            <div className="w-full mt-3">
                {
                    rows?.map((entry: IListProps, index: number) => (
                        <div key={index} className="text-gray-600 text-sm flex items-center justify-between py-3.5 px-3 rounded-[8px] my-5 bg-light shadow">
                            <div className="w-[19rem] flex items-center space-x-2">
                                <div className="w-6 h-6 flex items-center justify-center text-white font-bold rounded-full bg-main overflow-hidden">
                                    {/* <img src={entry.image} className="w-full h-full" alt="" /> */}
                                    {/* <img src={image} className="w-full h-full" alt="" /> */}
                                    {entry?.name?.[0]}
                                </div>
                                <h1 className="font-bold">{entry.name}</h1>
                            </div>
                            <div className="w-[14rem]">{entry.email}</div>
                            <div className="w-[10rem]">
                                {
                                    entry.subscription ? <span className="text-green-600 font-semibold">Active</span>
                                        : <span className="text-red-600 font-semibold">Inactive</span>
                                }
                            </div>
                            <div className="w-[5rem] pl-3"  >
                                <Popup
                                    trigger={
                                        <h1 className="cursor-pointer text-xl font-bold rotate-[90deg] w-fit h-fit" >...</h1>
                                    }
                                    position="bottom right"
                                    on="click"
                                    onOpen={() => handleSelect(entry)}
                                >
                                    {menu}
                                </Popup>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}