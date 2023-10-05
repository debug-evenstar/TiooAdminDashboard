import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axiosInstance from "../../services/api";
import UploadFile from "../updateFile/uploadFile";
import { notify } from "../notification/notification";
import { useDispatch } from "react-redux";
import { setLibraryReload } from "../../redux/slices/library";
import WhiteSpinner from '../../components/whiteSpinner/spinner';


type TLibraryModalError = {
    title?: string;
    class?: string;
    age?: string;
    objective?: string;
    file?: string;
}


export default function EditLibraryLesson({ modal, setModal, id, data, refetch }: { data: any, modal: boolean, setModal: any,refetch: any, id: number }) {
    const [klass, setClass] = useState<number>(data?.Class?.id);
    const [age, setAge] = useState<number[]>([]);
    const [errors, setErrors] = useState<TLibraryModalError>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const dispatch = useDispatch();

    // probably wanted to try something sha
    const [formData, setFormData] = useState<{ title: string, objective: string }>({
        title: '',
        objective: '',
    });


    useEffect(() => {
        setClass(data?.Class?.id);
        setAge([data.age]);
        setFormData({
            title: data.topic,
            objective: JSON.parse(data.objective)
        })
    }, []);




    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let { name, value } = e.target;
        if (name == 'age') {
            value = value.replace(/\D/g, '');
        }
        setFormData({
            ...formData,
            [name]: value
        })
    }



    const validate = () => {
        const newErrors: TLibraryModalError = {};
        if (!formData.title || formData.title.length == 0)
            newErrors.title = "Please Enter a valid title"

        if (formData.objective == '')
            newErrors.objective = "Please fill in an objective";

        if (selectedFile === null)
            newErrors.file = "Please select a template";
        return newErrors;
    }

    const sendRequest = () => {
        const formdata = new FormData();
        formdata.append('topic',formData.title);
        formdata.append('objective',formData.objective);
        formdata.append('lesson',String(data.id));
        formdata.append('template', selectedFile as Blob, selectedFile?.name);

        axiosInstance.put('/updatelibrarylesson/template', formdata,{
            headers:{
                'Content-Type': 'multipart/form-data'   
            }
        })
            .then(response => {
                notify.success("updated library lesson ");
                // dispatch(setLibraryReload());
                refetch(data.SubjectId);
                setModal(false);
            })
            .catch(error => {
                notify.error(error);
            })
            .finally(() => setLoading(false));
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const newErrors = validate();
        if (Object.keys(newErrors).length === 0) {
            setErrors({});
            sendRequest();
        } else {
            setErrors(newErrors);
            setLoading(false);
        }
    }

    return (
        <div className={`fixed text-primary z-[90] bg-[#00000044] inset-0 h-screen w-screen ${modal ? "" : "-translate-y-full"}`}>
            <div className={`${modal ? "translate-y-[3rem]" : "translate-y-0"} z-[100] bg-white rounded duration-1000 h-[550px]s h-auto w-[380px] mx-auto `}>
                <div className="p-2 border-b px-4 flex items-center justify-between">
                    <h1>Edit Lesson </h1>
                    <button className="text-2xl" onClick={() => setModal(false)}>&times;</button>
                </div>
                <div onSubmit={handleSubmit}>
                    <div className={`px-4 mt-4 h-auto mb-10 overflow-y-auto`}>

                        <div className="text-sm mb-3">
                            <label htmlFor="" className="text-sm">Lesson title</label>
                            <input type="text" name="title" value={formData.title} onChange={handleOnChange} className="mt-1 outline-none rounded w-full px-3 py-2 border" />
                            <p className="text-red-500 text-xs mt-1">{errors?.title}</p>
                        </div>

                        <div className="text-sm mb-3">
                            <label htmlFor="" className="text-sm">Lesson Objective</label>
                            <textarea rows={3} style={{ resize: "none" }} name="objective" value={formData.objective} onChange={handleOnChange} className="mt-1 outline-none rounded w-full px-3 py-2 border" />
                            <p className="text-red-500 text-xs mt-1">{errors?.objective}</p>
                        </div>
                        <div className="flex flex-col">
                            <UploadFile {...{ selectedFile, setSelectedFile }} />
                            <p className="text-red-500 text-xs mt-1">{errors?.file}</p>
                            {selectedFile &&
                                <div className="text-main flex items-center space-x-2">
                                    <span className="text-xs">{selectedFile.name}</span>
                                    <button onClick={() => setSelectedFile(null)} className="text-red-500">&times;</button>
                                </div>
                            }
                            <span className="text-xs mt-[2px] text-gray-500">Your attached file should be in PDF or Word Format</span>
                        </div>

                    </div>
                    <div className="px-4 w-full h-[3rem] mt-[2px] flex border-t items-center">
                        <button disabled={loading} onClick={handleSubmit} className="bg-main focus:shadow-lg outline-none w-full text-sm text-center py-1.5 rounded text-white font-[500]">
                            {
                                loading ?
                                    <WhiteSpinner/>
                                    :
                                    <span>
                                        Update
                                    </span>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
