import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import axiosInstance from "../../services/api";
import UploadFile from "../updateFile/uploadFile";
import { notify } from "../notification/notification";
import { useDispatch } from "react-redux";
import { setLibraryReload } from "../../redux/slices/library";
import SingleOptionsMenu from "../singleOptionsMenu/singleOptionsMenu";


type classOptionProps = {
    SchoolManagementId: number;
    id: number;
    naming: string;
    type: string;
}


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

function OptionsMenu({ selection, setSelection, options }: { selection: number[], setSelection: any, options: TOptionProps[] }) {
    const [active, setActive] = useState(false);


    const handleClick = (e: MouseEvent<HTMLLIElement>) => {
        const value = e.currentTarget.getAttribute('data-value');
        if (value) {
            const id: number = Number.parseInt(value);
            if (!selection.includes(id))
                setSelection([...selection, id]);
            else {
                setSelection(selection.filter((number: number) => number != id));
            }
        }
    }

    const min = Math.min(...selection);
    const minName = options?.find((i: any) => i.id == min)?.name;
    const max = Math.max(...selection);
    const maxName = options?.find((i: any) => i.id == max)?.name;
    return (
        <>
            <div onClick={() => setActive(!active)} className="mt-2 cursor-pointer relative outline-none rounded w-[21.9rem] px-3 py-2 border flex justify-between items-center">
                {
                    selection.length > 0 ?
                        <p className="text-xs">{minName + ' - ' + maxName}</p>
                        : <p></p>
                }

                <div
                    className={`text-xs duration-300  w-4 h-4 flex items-center justify-center
                cursor-pointer ${!active && "rotate-180"}`}
                >
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.7071 7.70711C13.3166 8.09763 12.6834 8.09763 12.2929 7.70711L7 2.41421L1.70711 7.70711C1.31658 8.09763 0.683417 8.09763 0.292893 7.70711C-0.0976315 7.31658 -0.0976316 6.68342 0.292893 6.29289L6.29289 0.292894C6.68342 -0.0976303 7.31658 -0.0976304 7.70711 0.292894L13.7071 6.29289C14.0976 6.68342 14.0976 7.31658 13.7071 7.70711Z" fill="#030036" fillOpacity="0.74" />
                    </svg>

                </div>
            </div>
            {active &&
                <div className="bg-white relative p-4 border shadow w-[21.9rem] z-[50]">
                    <ul className="">
                        {
                            options.map((option, index) => (
                                <li key={index} onClick={handleClick} data-value={option.id} className="flex items-center cursor-pointer space-x-3 py-1">
                                    <input type="checkbox" checked={selection.includes(option.id)} onChange={() => null} className=" w-4 h-4 rounded-full outline-none" />
                                    <span>{option.name}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            }
        </>
    );
}

const ageOptions = [...Array(18 - 5 + 1)].map(((_, index) => ({ id: index + 5, name: index + 5 })));
const chapterOptions = [...Array(20)].map(((_, index) => ({ id: index + 1, value: (index + 1).toString() })));


export default function AddLibraryLesson({ modal, setModal, lesson, materialProps }: { materialProps?: any, subjectId?: number, lesson?: any, modal: boolean, setModal: (state: boolean) => void }) {

    const classIDs = materialProps?.classes.map((item: any) => ({ id: item.id, name: item.naming }))
    console.log(classIDs)
    const [klass, setClass] = useState<number[]>(classIDs.map((i:any) => i.id));
    const [age, setAge] = useState<number[]>([]);
    const [errors, setErrors] = useState<TLibraryModalError>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [classOptions, setClassOptions] = useState<classOptionProps[]>([]);
    const [chapter, setChapter] = useState<number>(0);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const dispatch = useDispatch();

    // probably wanted to try something sha
    const [formData, setFormData] = useState<{ title: string, objective: string }>({
        title: '',
        objective: '',
    });

    useEffect(() => {
        const id = lesson?.SubjectId || materialProps?.subjectId;
        if (id) {

            axiosInstance.get('https://api.hellotioo.com/lesson/subjectlessons/' + id)
                .then((response) => {
                    setClassOptions(response.data.data.classes);
                })
                .catch((error => console.log(error.response.message)));
        }
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

        if (!lesson) {

            if (age.length == 0)
                newErrors.age = "Please enter a valid age ";

            if (klass.length == 0)
                newErrors.class = "Please select a class";
        }
        if (formData.objective == '')
            newErrors.objective = "Please fill in an objective";

        if (chapter == 0)
            newErrors.chapter = "Please select a chapter";

        if (!selectedFile)
            newErrors.file = "please select a file";

        if (chapter == 0) {
            newErrors.chapter = "please select a chapter";
        }

        return newErrors;
    }

    const sendRequest = () => {
        console.log(lesson);
        let payload = new FormData();
        payload.append('title', formData.title);
        payload.append('class', lesson?.ClassId || String(klass[0]));
        payload.append('objective', formData.objective);
        payload.append('age', lesson?.age || String(age[0]));
        payload.append('template', selectedFile as Blob, selectedFile?.name);
        payload.append('subject', lesson?.SubjectId || String(materialProps?.subjectId));
        payload.append('chapter', String(chapter));


        axiosInstance.post('/librarylesson/template', payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(() => {
                notify.success("Added lesson successfuly");
                dispatch(setLibraryReload());
                setModal(false);
            })
            .catch(error => {
                notify.error(error.response.message);
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
            console.log(errors);
            setLoading(false);
        }
    }

    return (
        <div className={`fixed text-primary z-[90] bg-[#00000044] duration-0 inset-0 h-screen w-screen ${modal ? "" : "-translate-y-full"}`}>
            <div className={`${modal ? lesson ? "translate-y-[4rem]" : "translate-y-[1rem]" : "translate-y-0"} z-[100] bg-white rounded duration-1000 w-[380px] mx-auto `}>
                <div className="p-2 border-b px-4 flex items-center justify-between">
                    <h1>Add Lesson </h1>
                    <button className="text-2xl" onClick={() => setModal(false)}>&times;</button>
                </div>
                <div onSubmit={handleSubmit}>
                    <div className={`px-4 mt-4 ${!lesson ? 'h-[29.17rem]' : 'h-[22rem]'} overflow-y-auto`}>
                        <div className="text-sm mb-3">
                            <label htmlFor="" className="text-sm">Lesson title</label>
                            <input type="text" name="title" value={formData.title} onChange={handleOnChange} className="mt-1 outline-none rounded w-full px-3 py-2 border" />
                            <p className="text-red-500 text-xs mt-1">{errors?.title}</p>
                        </div>

                        <div className="text-sm mb-3">
                            <label htmlFor="" className="text-sm">Chapter</label>
                            <SingleOptionsMenu selection={chapter} options={chapterOptions} setSelection={setChapter} />
                            <p className="text-red-500 text-xs mt-1">{errors?.chapter}</p>
                        </div>
                        {!lesson && <>
                            <div className="text-sm mb-3">
                                <label htmlFor="" className="text-sm">Class</label>
                                {/* <SingleOptionsMenu selection={klass} options={classOptions.map((item) => ({ id: item.id, value: item.naming }))} setSelection={setClass} /> */}
                                <OptionsMenu selection={klass} options={classIDs} setSelection={setClass} />
                                <p className="text-red-500 text-xs mt-1">{errors?.class}</p>
                            </div>

                            <div className="text-sm mb-3">
                                <label htmlFor="" className="text-sm">Age</label>
                                <OptionsMenu selection={age} options={ageOptions} setSelection={setAge} />
                                <p className="text-red-500 text-xs mt-1">{errors?.age}</p>
                            </div>
                        </>
                        }

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
                                    <div className="w-6 h-6 mx-auto rounded-full border-2 border-gray-400 border-r-gray-100 animate-spin"></div>
                                    :
                                    <span>Upload</span>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
