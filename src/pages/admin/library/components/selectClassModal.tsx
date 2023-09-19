import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";

import { useDispatch } from "react-redux";
import axiosInstance from "../../../../services/api";


type TLibraryModalError = {
    title?: string;
    class?: string;
    age?: string;
    objective?: string;
    file?: string;
    chapter?: string;
}


type TOptionProps = {
    id: number, name: number | string,
}


export default function SelectClassModal({ modal, setModal, subjectId,}: { subjectId?: number, modal: boolean, setModal: (state: boolean) => void }) {


    const dispatch = useDispatch();


    const handleSubmit = (e: any) => {

    }

    // useEffect(() => {
    //     if (variant) {
    //         // console.log(classId);
    //     } else {
    //         axiosInstance.get('https://api.hellotioo.com/tio/classes')
    //             .then((response) => {
    //                 setClassOptions(response.data.data);
    //             })
    //             .catch((error => console.log(error.response.message)));

    //     }
    // }, []);

  

    

    return (
        <div className={`fixed text-primary z-[90] bg-[#00000044] duration-0 inset-0 h-screen w-screen ${modal ? "" : "-translate-y-full"}`}>
            <div className={`${modal ? "translate-y-[3rem]" : "translate-y-0"} z-[100] bg-white rounded duration-1000 w-[380px] mx-auto `}>
                <div className="p-2 border-b px-4 flex items-center justify-between">
                    <h1>Select Class</h1>
                    <button className="text-2xl" onClick={() => setModal(false)}>&times;</button>
                </div>
                <div onSubmit={handleSubmit}>
                    <div className={`px-4 mt-4 h-[10rem] overflow-y-auto`}>

                    </div>
                    <div className="px-4 w-full h-[3rem] mt-[2px] flex border-t items-center">
                        <button onClick={handleSubmit} className="bg-main focus:shadow-lg outline-none w-full text-sm text-center py-1.5 rounded text-white font-[500]">
                            <span>View</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
