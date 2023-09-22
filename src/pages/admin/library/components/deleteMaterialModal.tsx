import { useEffect, useState } from "react";

import axiosInstance from "../../../../services/api";
import { useNavigate } from "react-router-dom";
import { setLibraryReload } from "../../../../redux/slices/library";
import { notify } from "../../../../components/notification/notification";
import { useDispatch } from "react-redux";
import { RiAlarmWarningLine, RiErrorWarningLine, RiFileWarningLine } from "react-icons/ri";
import { AiOutlineWarning } from "react-icons/ai";


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


const prompts = [
    { text: "Are you sure you want to delete this textbook?", color: "bg-main shadow-main" },
    { text: "Deleting this textbook is an irreversible process Delete?", color: "bg-red-400 shadow-red-500/50 focus:shadow-red-500/50" },
];


export default function DeleteMaterialModal({ modal, setModal, materialProps, }: { materialProps?: any, modal: boolean, setModal: (state: boolean) => void }) {
    const [index, setIndex] = useState<number>(0);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const deleteMaterial = () => {
        axiosInstance.delete('/library/' + materialProps.id)
            .then(() => {
                dispatch(setLibraryReload());
                notify.success("deleted library material")
            })
            .catch(error => console.log(error));
        setModal(false);
    }

    const close = () => {
        setIndex(0);
        setModal(false);
    }
    const handleSubmit = () => {
        // navigate(`/library/lessons/${materialProps?.id}/${classId}`, { state: { material: materialProps } })
        if (index == 1) {
            alert("deleted material");
        } else {
            setIndex(index => index + 1)
        }
    }


    return (
        <div className={`fixed text-primary z-[90] bg-[#00000044] duration-0 inset-0 h-screen w-screen ${modal ? "" : "-translate-y-full"}`}>
            <div className={`${modal ? "translate-y-[3rem]" : "translate-y-0"} z-[100] bg-white rounded duration-300 w-[380px] mx-auto `}>
                <div className="p-2 border-b px-4 flex items-center justify-between">
                    <h1 className="font-[500]">Delete Textbook</h1>
                    <button className="text-2xl" onClick={() => close()}>&times;</button>
                </div>
                <div onSubmit={handleSubmit}>
                    <div className={`px-4 mt-4 h-[10rem] overflow-y-auto flex flex-col space-y-3 justify-center items-center text-center font-[500] text-[1.1rem]`}>
                        <span className="text-4xl">
                            <AiOutlineWarning/>
                        </span>
                        <h1>
                            {prompts[index]?.text}
                        </h1>
                    </div>
                    <div className="px-4 w-full h-[4rem] mt-[2px] flex border-t items-center">
                        <button onClick={handleSubmit}
                            className={`outline-none focus:shadow-lg outline-none w-full text-sm text-center py-2 
                                shadow-md rounded text-white font-[500] ${prompts[index]?.color}`}>
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
