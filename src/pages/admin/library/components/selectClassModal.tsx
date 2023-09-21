import { useEffect, useState } from "react";

import axiosInstance from "../../../../services/api";
import { useNavigate } from "react-router-dom";


type TLibraryModalError = {
    age?: string;
    file?: string;
    title?: string;
    class?: string;
    chapter?: string;
    objective?: string;
}


type TOptionProps = {
    id: number, name: number | string,
}


export default function SelectClassModal({ modal, setModal, materialProps,}: { materialProps?: any, modal: boolean, setModal: (state: boolean) => void }) {


    const navigate = useNavigate();
    // const [ classes, setClasses ] = useState<any>([]);
    const [ classId, setClassId ] = useState<number>(0)

    const handleSubmit = () => {
        navigate(`/library/lessons/${materialProps?.id}/${classId}`, { state: {material: materialProps}})
    }
  

    return (
        <div className={`fixed text-primary z-[90] bg-[#00000044] duration-0 inset-0 h-screen w-screen ${modal ? "" : "-translate-y-full"}`}>
            <div className={`${modal ? "translate-y-[3rem]" : "translate-y-0"} z-[100] bg-white rounded duration-300 w-[380px] mx-auto `}>
                <div className="p-2 border-b px-4 flex items-center justify-between">
                    <h1>Select Class</h1>
                    <button className="text-2xl" onClick={() => setModal(false)}>&times;</button>
                </div>
                <div onSubmit={handleSubmit}>
                    <div className={`px-4 mt-4 h-[10rem] overflow-y-auto`}>
                        {
                            materialProps?.classes.map((item: any) => (
                                <div key={item.id} onClick={() => setClassId(item.id)} className="flex items-center rounded-[4px] cursor-pointer hover:bg-light duration-300 space-x-2 px-3 py-2 w-full shadow mb-2">
                                    <input type="radio" readOnly className="w-4" checked={classId === item.id} />
                                    <span>{item.naming}</span>
                                </div>
                            ))
                        }
                    </div>
                    <div className="px-4 w-full h-[4rem] mt-[2px] flex border-t items-center">
                        <button disabled={classId == 0} onClick={handleSubmit} 
                            className={`bg-main outline-none focus:shadow-lg outline-none w-full text-sm text-center py-2 
                                shadow-md shadow-main rounded text-white font-[500] ${classId == 0? 'bg-gray-400':''}`}>
                            <span>View</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
