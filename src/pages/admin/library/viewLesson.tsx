import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../../components/header';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useEffect, useState } from 'react';
import axiosInstance from '../../../services/api';
import { TLibraryLesson, TLibraryMaterials, setLibraryLessons, setLibraryMaterials } from '../../../redux/slices/library';

function ClassLessonCard(lesson: TLibraryLesson) {
    return (
        <div className="w-[200px] rounded-[8px] shadow border px-2 py-3 flex flex-col justify-between h-[140px]">
            <div className="flex justify-between">
                <h1 className="text-primary  text-lg font-[500]">{lesson.topic}</h1>
                <button className="h-fit mt-2">
                    <svg width="4" height="18" viewBox="0 0 4 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0 9C0 7.89543 0.89543 7 2 7C3.10457 7 4 7.89543 4 9C4 10.1046 3.10457 11 2 11C0.89543 11 0 10.1046 0 9Z" fill="#87909E"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M0 2C0 0.89543 0.89543 0 2 0C3.10457 0 4 0.89543 4 2C4 3.10457 3.10457 4 2 4C0.89543 4 0 3.10457 0 2Z" fill="#87909E"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M0 16C0 14.8954 0.89543 14 2 14C3.10457 14 4 14.8954 4 16C4 17.1046 3.10457 18 2 18C0.89543 18 0 17.1046 0 16Z" fill="#87909E"/>
                    </svg>
                </button>
            </div>

            <span className='text-gray-400 text-xs'>{lesson.files?.length} slides</span>
        </div>
    );
}


function ClassCard({ onClick, name }: { onClick?: any, name: string }) {
    return (
        <div onClick={onClick} className="w-full rounded-[8px] shadow border px-2 py-3">
            <h1 className="text-primary text-lg font-[500]">{name.replace('Level', 'Primary')}</h1>
            <hr className="my-3" />
            <h2 className='text-gray-400'>All Arms</h2>
        </div>
    );
}
function Classes({setCurrentClass}:{setCurrentClass: any}) {

    const [ classes,setClasses ] = useState<any[]>([]);

    useEffect(() => {
        axiosInstance.get('https://api.hellotioo.com/tio/classes')
            .then(response => {
                setClasses(response.data.data.reverse());
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            <div className="flex flex-col space-y-4">
                {
                    classes?.map((item, index) => (
                        <ClassCard onClick={() => setCurrentClass(item.id)} key={index} name={item.naming} />
                    ))
                }
            </div>
        </>
    );
}

function AllLessonsCard({ id }: { id: number }) {
    const [active, setActive] = useState<boolean>(false);
    const [classLessons, setClassLessons] = useState<TLibraryLesson[]>([]);
    const lessons = useSelector((state: RootState) => state.library.lessons);
    console.log("all lesson id",id)
    useEffect(() => {
        setClassLessons(lessons.filter((item: any) => item.ClassId === id))
        console.log(classLessons);
    }, [id]);

    return (
        <>
            <div className="w-full rounded-[8px] shadow overflow-hidden">
                <div className="px-4 h-[50px] bg-neutral-200 text-xl font-[500] text-primary rounded-t-[8px] flex items-center">
                    <h1>All Lessons</h1>
                </div>
                <div className={`px-4 duration-700 transition-[max-height]  ease-out ${active ? "max-h-[30rem]" : "max-h-0"}`}>
                    <div className="py-10 flex flex-wrap space-x-3">
                        {
                            classLessons?.length > 0 ?
                                classLessons.map((lesson) => (
                                    <ClassLessonCard {...lesson}/>
                                ))
                                :
                                <h2 className='mb-5 text-lg text-gray-400'>You haven't added any lesson</h2>
                        }
                        <button
                            // onClick={() => setModal(!modal)}
                            className="w-[200px] h-[140px] outline-none active:outline-main px-[52px] py-[35px] border shadow rounded-[8px]
                                flex items-center justify-center flex-col text-main hover:shadow-lg duration-300">
                            <svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 8C32.822 8 40 15.178 40 24C40 32.822 32.822 40 24 40C15.178 40 8 32.822 8 24C8 15.178 15.178 8 24 8ZM24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4ZM34 22H26V14H22V22H14V26H22V34H26V26H34V22Z" fill="#4F46E5" />
                            </svg>
                            <p className="text-center mt-1 font-[500]">Add lessons</p>
                        </button>
                    </div>
                </div>
                <div className="h-[50px] bg-white relative z-[100] border-t flex items-center px-4 justify-between">
                    <button className="bg-main px-4 py-1.5 text-sm text-white rounded">
                        Set Test/Exam
                    </button>
                    <button onClick={() => setActive(!active)} className={`${active ? "rotate-180" : ""} duration-300 mt-1 hover:bg-light w-6 h-6 flex items-center justify-center outline-none rounded-full`}>
                        <svg width="16" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 2L10 10L18 2" stroke="#030036" strokeOpacity="0.74" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
}


export default function ViewLesson() {
    const [current, setCurrent] = useState<TLibraryMaterials>();
    const navigate = useNavigate();
    const [currentClass, setCurrentClass] = useState<number>(0);

    const { id } = useParams<{ id: string }>();
    let newID = 0;
    if (id) {
        newID = Number.parseInt(id);
    } else {
        navigate('/library');
    }

    const dispatch = useDispatch();
    const materials = useSelector((state: RootState) => state.library.materials);

    useEffect(() => {
        axiosInstance.get('/management/subjects/lessons/count')
            .then(response => {
                dispatch(setLibraryMaterials(response.data.data));
                setCurrent(materials.find((item: TLibraryMaterials) => item.id === newID));
            })
            .catch(error => console.log(error));

        axiosInstance.get(`/library/lesson/check?subject_id=${newID}`)
            .then(response => {
                dispatch(setLibraryLessons(response.data.data));
            })
            .catch(error => console.log(error));
    }, [])

    return (
        <div>
            <Header title='' variant={true} />
            <div className="px-10">
                <div>
                    <div className="flex mt-10 items-center space-x-3">
                        <h1 className="text-xl font-[500] text-primary">{current?.naming}</h1>
                        <span className="mt-1">
                            <svg width="16" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 2L10 10L18 2" stroke="#030036" strokeOpacity="0.74" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </div>
                    <p className="mt-1 font-[400] text-sm text-gray-400">{current?.description}</p>
                </div>
                <div className="flex mt-7 justify-between pb-20">
                    <div className='w-[70%] h-screen'>
                        <AllLessonsCard id={currentClass} />
                    </div>
                    <div className="w-[30%] flex justify-end">
                        <div className="w-[14rem]">
                            <Classes {...{setCurrentClass}}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
