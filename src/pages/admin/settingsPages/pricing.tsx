import Popup from "reactjs-popup";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PricingInput from "../../../components/pricingInput/pricingInput";
import NairaInput from "../../../components/nairaInput/nairaInput";
import { RootState } from "../../../redux/store";
import { PriceState, reloadPricing, setFreelancers, setSchoolsStudents, setSchoolsTeachers, setSchoolsTotal, setStudents } from "../../../redux/slices/pricing";
import axiosInstance from "../../../services/api";
import SchoolsChecklist from "../../../components/schoolsChecklist/schoolsChecklist";
import StudentsChecklist from "../../../components/studentsChecklist/studentsChecklist";
import FreelancersChecklist from "../../../components/freelancersChecklist/freelancersChecklist";
import { TSchoolsProps } from "../../../redux/slices/schools";

import { TFreelancersProps } from "../../../redux/slices/freelancer";
import { TStudentsProps } from "../../../redux/slices/student";
import { setFreelancersException, setSchoolsException, setStudentsException } from "../../../redux/slices/pricingException";
import { notify } from "../../../components/notification/notification";




export function PricingSchoolsComponent() {

    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    const dispatch = useDispatch();

    const teachers = useSelector((state: RootState) => state.pricing.schools.teachers);
    const students = useSelector((state: RootState) => state.pricing.schools.students);
    const schools = useSelector((state: RootState) => state.pricing.schools)
    const total = useSelector((state: RootState) => state.pricing.schools.total);

    const handleTeachers = (data: PriceState) => {
        dispatch(setSchoolsTeachers(data));
    }

    const handleStudents = (data: PriceState) => {
        dispatch(setSchoolsStudents(data));
    }

    // fetch prices

    useEffect(() => {
        console.log(schools.id)
        const total: PriceState = {
            id: schools.id,
            value: students['value'] + teachers['value'],
            quarter: students['quarter'] + teachers['quarter'],
            half: students['half'] + teachers['half'],
            year: students['year'] + teachers['year']
        }
        dispatch(setSchoolsTotal(total));

    }, []);


    const handleSubmit = () => {
        if (edit) {
            setLoading(true);
            const payload = {
                id: schools.id,
                teachers_price: teachers.value,
                student_price: students.value,
                accounts: null,
                tab: "schools",
                students_breakdown: { quater: students.quarter, half: students.half, yearly: students.year },
                teachers_breakdown: { quater: teachers.quarter, half: teachers.half, yearly: teachers.year }
            }
            axiosInstance.put('/settings/pricing', payload)
                .then(response => {
                    dispatch(reloadPricing());
                    notify.success("updated schools pricing")
                    console.log(response.data.data)
                })
                .catch(() => notify.error("failed to save pricing"))
                .finally(() => setLoading(false));


        }
        setEdit(!edit)
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="font-[500] text-lg text-primary">General Pricing</h1>
                <button className="duration-1000 transition-all outline-none font-[400] text-white rounded-[8px] bg-main px-5 py-2.5 font-[500] text-sm" onClick={(e) => { handleSubmit(); e.preventDefault(); setEdit(!edit) }}>
                    {edit ?
                        "Save"
                        : loading ?
                            <div className="mx-auto w-5 h-5 border-2 rounded-full border-gray-400 border-r-white animate-spin"></div>
                            : "Edit pricing"
                    }
                </button>
            </div>
            <PricingInput state={teachers} setState={handleTeachers} name="teachers" readOnly={!edit} />
            <PricingInput state={students} setState={handleStudents} name="students" readOnly={!edit} />
            <PricingInput state={total} setState={() => null} name="total" readOnly={true} />
            <ExceptionsComponent type="Schools" />
        </>
    );
}


type priceState = {
    id: number;
    name: string;
    price: { teacher: number, student: number }
}

type TExceptionPayload = {
    teachers_price: number;
    student_price: number;
    accounts: number;
    tab: string;

}

function AddExceptionModal({ type, data, modal, setModal }: { type: string, data: any, modal: boolean, setModal: (s: boolean) => void }) {


    const [current, setCurrent] = useState<priceState>(data[0]);
    const [price, setPrice] = useState<number>(0);
    const [active, setActive] = useState<boolean>(false);
    const [teacher, setTeacher] = useState<number>(0);
    const [student, setStudent] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [prices, setPrices] = useState<priceState[]>(data);


    useEffect(() => {
        if (data.length > 0) {
            setPrices(data);
            setCurrent(data[0]);
        }
    }, [data])
    
    useEffect(() => {
        // takes effect when switching tabs 
        if (prices.length && data.length) {
            setTotal(getCurrentPrice().student + getCurrentPrice().teacher);
        }
    }, [prices, current])

    useEffect(() => {
        if (price || teacher && student) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [teacher, student, price, total]);

    const sendRequst = async (payload: TExceptionPayload) => {
        try {
            const response = await axiosInstance.post('/settings/pricing', payload)
            console.log(response.data.data);
            notify.success("added exception pricing")
            setLoading(false);
            setModal(false);
        } catch (error) {
            setLoading(false);
            notify.success("failed to create exception pricing")
            console.log(error)
        }

    }

    const handleApply = async () => {
        setLoading(true);
        prices.forEach(async (item) => {
            const payload: TExceptionPayload = {
                teachers_price: item.price.teacher,
                student_price: item.price.student,
                accounts: item.id,
                tab: type.toLocaleLowerCase()
            }
            sendRequst(payload);
        });

    }

    const handleApplyAll = () => {
        setLoading(true);
        prices.forEach(async () => {
            const payload: TExceptionPayload = {
                teachers_price: getCurrentPrice().teacher,
                student_price: getCurrentPrice().student,
                accounts: current.id,
                tab: type.toLocaleLowerCase()
            }
            sendRequst(payload);
        });

    }
    const handler = (e: ChangeEvent<HTMLInputElement>, type?: string) => {
        let temp: string = e.target.value.replace('/\Dg', '');
        temp = temp.replaceAll(',', '');
        if (temp === '') temp = '0';
        let result: number = Number.parseInt(temp);
        if (isNaN(result)) result = 0;

        if (type === "student") {
            setPrices(
                prices.map(
                    item => (item.id === current.id) ? { ...item, price: { ...item.price, student: result } } : item
                )
            );
            setStudent(result);
        } else if (type === "teacher") {
            setPrices(
                prices.map(
                    item => (item.id === current.id) ? { ...item, price: { ...item.price, teacher: result } } : item
                )
            );
            setTeacher(result);
        } else {
            setPrices(
                prices.map(
                    item => (item.id === current.id) ? { ...item, price: { student: result, teacher: 0 } } : item
                )
            );
            setPrice(result);
            // console.log(prices);
        }
    }


    const getCurrentPrice = () => {
        return prices.filter((item, _) => item.id === current?.id)[0].price;
    }

    const handleClick = (id: number) => {
        const value = data.filter((item: { id: number, name: string }) => item.id === id);
        setCurrent(value[0])
    }

    return (
        <div className={`fixed inset-0 z-[99] h-screen w-screen bg-[#00000044] duration-300 ${modal ? "" : "-translate-y-full"}`}>

            <div className={`${modal ? "translate-y-[8rem]" : "translate-y-0"}  duration-1000 flex flex flex-col justify-between mx-auto w-[40%] h-auto bg-white rounded`}>
                <div className="flex items-center justify-between py-2 px-4 border-b">
                    <h1>Set Price</h1>
                    <button className="text-2xl" onClick={() => setModal(false)}>&times;</button>
                </div>
                <div className={`flex justify-between ${type === "Schools" ? "h-[19rem]" : "h-[15rem]"}`}>
                    {
                        data.length > 1 &&
                        <div className="w-[34%] border-r px-2 py-3 overflow-y-auto">
                            <ul className="">
                                {
                                    data.map((item: { id: number, name: string }, index: number) => (
                                        <li
                                            onClick={() => handleClick(item?.id)}
                                            className={`my-1 text-xs font-[500] rounded-[8px] py-2 border-l-2  px-2 cursor-pointer  hover:bg-light ${current?.id == item.id ? "border-main bg-light text-main" : "hover:border-gray-300 text-primary border-white"}`}
                                            key={index}>{item.name}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    }
                    <div className={`h-[15rem] px-4 py-4  ${data.length === 1 ? "w-full" : "w-[66%]"}`}>
                        <h1 className="text-xl font-[500]">{current?.name}</h1>
                        {
                            prices && current && (
                                type === "Schools" ?
                                    <div className="mt-4">
                                        <label htmlFor="" className="text-xs text-gray-400 mb-4">Teachers</label>
                                        <NairaInput className="py-1.5 mb-2" name="price" value={getCurrentPrice().teacher.toLocaleString()} handler={(e: any) => handler(e, 'teacher')} />
                                        <label htmlFor="" className="text-xs text-gray-400 mb-4">Students</label>
                                        <NairaInput className="py-1.5 mb-2" name="price" value={getCurrentPrice().student.toLocaleString()} handler={(e: any) => handler(e, 'student')} />
                                        <label htmlFor="" className="text-xs text-gray-400 mb-4">Total</label>
                                        <NairaInput className="py-1.5 mb-2" readonly={true} name="price" value={total.toLocaleString()} handler={handler} />

                                    </div>
                                    :
                                    <div className="mt-4">
                                        <label htmlFor="" className="text-xs text-gray-400 mb-4">Set Price</label>
                                        <NairaInput className="py-1.5" name="price" value={getCurrentPrice().student.toLocaleString()} handler={handler} />
                                    </div>
                            )

                        }
                    </div>
                </div>
                <div className="h-[44px] border-t px-3 flex items-center justify-between">
                    <button disabled={!active} onClick={handleApplyAll} className={`${active ? "bg-main text-white" : "bg-neutral-100 text-gray-300"} cursor-pointer hover:bg-hover rounded-[8px] outline-none px-3 py-1.5 text-sm`}>
                        {data.length > 1 ? "Apply on all schools" : "Reset prices"}
                    </button>
                    <button disabled={!active && !loading} onClick={handleApply} className={`${active ? "bg-main text-white" : "bg-neutral-100 text-gray-300"} cursor-pointer hover:bg-hover rounded-[8px] outline-none px-3 py-1.5 text-sm`}>
                        {
                            loading ?
                                <div className="mx-auto w-5 h-5 border-2 rounded-full border-gray-400 border-r-white animate-spin"></div>
                                :
                                <span>Apply</span>
                        }

                    </button>
                </div>
            </div>
        </div>
    );
}


function ExceptionAccordion({ data, type }: { data: any, type: string }) {
    const nameCondition = (): string => {
        // just in case

        // switch (type) {
        //     case 'Schools':
        //         return data.school_name;
        //     case 'Freelancers':
        //         return data.school_name;
        //     case 'Students':
        //         return data.school_name;
        //     default:
        //         return '';
        // }
        // useless type
        return data.school_name || type;
    }

    const dispatch = useDispatch();

    const removeException = () => {
        axiosInstance.delete(`/settings/pricing/${data.id}`)
            .then(response => {
                dispatch(reloadPricing());
                notify.success("removed exception")
                console.log(response.data.data);
            })
            .catch(error => {
                notify.error("error deleting exception")
                console.log(error)
            });
    }


    const [active, setActive] = useState<boolean>(false);
    const [optionActive, setOptionActive] = useState<boolean>(false);
    const ref = useRef<any>();
    const toggle = () => ref.current.toggle();

    return (
        <div className="mb-4">
            <div className="w-full p-3 px-4 rounded-[8px] bg-neutral-100 flex items-center justify-between">
                <h1 className="text-gray-400">{nameCondition()}</h1>
                <div className="flex items-center space-x-6">
                    <button className="outline-none" onClick={() => { toggle() }}>
                        <svg width="4" height="18" viewBox="0 0 4 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0 9C0 7.89543 0.89543 7 2 7C3.10457 7 4 7.89543 4 9C4 10.1046 3.10457 11 2 11C0.89543 11 0 10.1046 0 9Z" fill="black" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M0 2C0 0.89543 0.89543 0 2 0C3.10457 0 4 0.89543 4 2C4 3.10457 3.10457 4 2 4C0.89543 4 0 3.10457 0 2Z" fill="black" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M0 16C0 14.8954 0.89543 14 2 14C3.10457 14 4 14.8954 4 16C4 17.1046 3.10457 18 2 18C0.89543 18 0 17.1046 0 16Z" fill="black" />
                        </svg>
                    </button>
                    <Popup
                        ref={ref}
                        open={optionActive}
                        trigger={
                            <button className="outline-none" onClick={() => { setOptionActive(true); alert("clicked") }}>

                            </button>
                        }>
                        <ul className="py-3 bg-white shadow rounded-[8px]">
                            <li onClick={() => setOptionActive(false)} className="py-2 px-4 hover:bg-light cursor-pointer hover:text-main text-primary text-sm">Edit price</li>
                            <li onClick={() => { toggle(); removeException() }} className="py-2 px-4 hover:bg-light cursor-pointer hover:text-main text-primary text-sm">Remove</li>
                        </ul>
                    </Popup>
                    <button onClick={() => setActive(!active)} className={`${active ? "rotate-180 " : ""} duration-300 text-sm outline-none`}>
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L7 7L13 1" stroke="#030036" strokeOpacity="0.74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
            {
                active && data &&
                <div className="p-4 flex items-center justify-between">
                    <div className="text-gray-400">
                        <h1>For Teachers</h1>
                        <h2 className="text-xl mt-2 text-primary">₦ {data.teachers_price.toLocaleString()}</h2>
                    </div>
                    <div className="text-gray-400">
                        <h1>For Students</h1>
                        <h2 className="text-xl mt-2 text-primary">₦ {data.student_price.toLocaleString()}</h2>
                    </div>
                    <div className="text-gray-400">
                        <h1>For Teachers</h1>
                        <h2 className="text-xl mt-2 text-primary">₦ {(data.student_price + data.teachers_price).toLocaleString()}</h2>
                    </div>
                </div>
            }
        </div>
    );
}

function ExceptionsList({ type }: { type: string }) {

    const studentsException = useSelector((state: RootState) => state.pricingException.students);
    const schoolsException = useSelector((state: RootState) => state.pricingException.schools);
    const freelancersException = useSelector((state: RootState) => state.pricingException.freelancers);

    const condition = () => {
        switch (type) {
            case 'Schools':
                return schoolsException;
            case 'Freelancers':
                return freelancersException;
            case 'Students':
                return studentsException;
            default:
                return [];
        }
    }
    return (
        <div className="mt-10 flex flex-col">
            {
                condition().map((item: any) => (
                    <div key={item.id}>
                        <ExceptionAccordion data={item} type={type} />
                    </div>
                ))
            }
        </div>
    );
}



export function ExceptionsComponent({ type }: { type: string }) {

    const schools = useSelector((state: RootState) => state.school.schools);
    const freelancers = useSelector((state: RootState) => state.freelancer.freelancers);
    const students = useSelector((state: RootState) => state.student.students);

    const [active, setActive] = useState(false);
    const [selection, setSelection] = useState<number[]>([]);
    const [modal, setModal] = useState(false);
    const [activeList, setActiveList] = useState<{ id: number, name: string }[] | undefined>([]);


    const onApply = () => {
        // filter out duplicates
        const newSelection = selection.filter((item, index) => selection.indexOf(item) === index);

        // return name and id based on type
        const conditions = (): { id: number, name: string, price: { teacher: number, student: number } }[] | undefined => {
            let newList: any = null;
            switch (type) {
                case 'Schools':
                    newList = schools.filter((item: TSchoolsProps) => newSelection.includes(item.school.id))
                    return newList.map((item: TSchoolsProps) => ({
                        id: item.school.id,
                        name: item.school.name,
                        price: { teacher: 0, student: 0 }
                    }));

                case 'Freelancers':
                    newList = freelancers.filter((item: TFreelancersProps) => newSelection.includes(item.freelancer.id))
                    return newList.map((item: TFreelancersProps) => ({
                        id: item.freelancer.id,
                        name: item.freelancer.name,
                        price: { teacher: 0, student: 0 }
                    }));
                case 'Students':
                    newList = students.filter((item: TStudentsProps) => newSelection.includes(item.id));
                    return newList.map((item: TStudentsProps) => ({
                        id: item.id,
                        name: item.name,
                        price: { teacher: 0, student: 0 }
                    }));
                default:
                    return undefined;
            }
        }


        // get { id, name } data from id's in selection

        const newList: { id: number, name: string }[] | undefined = conditions();

        if (!newList || newList?.length === 0) {
            return;
        }

        setActiveList(newList);
        setModal(true);
        setActive(false);
    }


    return (
        <>
            {<AddExceptionModal data={activeList} {...{ type, modal, setModal }} />}
            <div className="flex justify-between mt-16">
                <h1 className="font-[500] text-primary">Exceptions</h1>
                <div className="text-sm outline-none cursor-pointer items-end flex flex-col">
                    <button
                        className="bg-white w-fit rounded px-3 py-2 border  text-primary cursor-pointer bg-white outline-none flex justify-between space-x-10 items-center"
                        onClick={(e) => { setActive(!active); e.preventDefault() }}>
                        <span>Add {type}</span>
                        <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 1L7.5 7L13.5 1" stroke="#030036" strokeOpacity="0.74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    {
                        active && (
                            type === "Schools" && (
                                <SchoolsChecklist onApply={onApply} {...{ selection, setSelection }} close={() => setActive(false)} />
                            ) ||
                            type === "Freelancers" && (
                                <FreelancersChecklist onApply={onApply} {...{ selection, setSelection }} close={() => setActive(false)} />
                            ) ||
                            type === "Students" && (
                                <StudentsChecklist onApply={onApply} {...{ selection, setSelection }} close={() => setActive(false)} />
                            )
                        )
                    }
                </div>
            </div>
            {/*  Exceptions come here */}
            <ExceptionsList type={type} />
        </>
    );
}


function StudentsTabComponent() {
    const [edit, setEdit] = useState(false);

    const students = useSelector((state: RootState) => state.pricing.students);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const handleStudents = (data: PriceState) => {
        dispatch(setStudents(data));
    }
    const handleSubmit = () => {
        if (edit) {
            setLoading(true);
            const payload = {
                id: students.id,
                teachers_price: 0,
                student_price: students.value,
                accounts: null,
                tab: "schools",
                students_breakdown: { quater: students.quarter, half: students.half, yearly: students.year },
                teachers_breakdown: { quater: 0, half: 0, yearly: 0 }
            }
            axiosInstance.post('/settings/pricing', payload)
                .then(response => {
                    notify.success("updated students pricing")
                    console.log(response.data.data)
                })
                .catch(error => {
                    notify.error("failed to update students pricing")
                    console.log(error)
                })
                .finally(() => setLoading(false));

        }

    }
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="font-[500] text-lg text-primary">General Pricing</h1>
                <button className="duration-1000 transition-all outline-none font-[400] text-white rounded-[8px] bg-main px-5 py-2.5 font-[500] text-sm" onClick={(e) => { handleSubmit(); e.preventDefault(); setEdit(!edit) }}>
                    {edit ?
                        "Save"
                        : loading ?
                            <div className="mx-auto w-5 h-5 border-2 rounded-full border-gray-400 border-r-white animate-spin"></div>
                            : "Edit pricing"
                    }
                </button>

            </div>
            <PricingInput state={students} setState={handleStudents} name="students" readOnly={!edit} />
            <ExceptionsComponent type="Students" />
        </>
    );
}


function FreelancersTabComponent() {
    const [edit, setEdit] = useState(false);

    const freelancers = useSelector((state: RootState) => state.pricing.freelancers);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const handleFreelancers = (data: PriceState) => {
        dispatch(setFreelancers(data));
    }
    const handleSubmit = () => {
        if (edit) {
            setLoading(true);
            console.log(freelancers);
            const payload = {
                id: freelancers.id,
                teachers_price: 0,
                student_price: freelancers.value,
                accounts: null,
                tab: "schools",
                students_breakdown: { quater: freelancers.quarter, half: freelancers.half, yearly: freelancers.year },
                teachers_breakdown: { quater: 0, half: 0, yearly: 0 }
            }
            axiosInstance.put('/settings/pricing', payload)
                .then(response => {
                    notify.success("updated freelancer pricing")
                    console.log(response.data.data)
                })
                .catch(error => {
                    notify.error("failed to update frelancer pricing")
                    console.log(error.reponse.data);
                })
                .finally(() => setLoading(false));
        }

    }

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="font-[500] text-lg text-primary">General Pricing</h1>
                <button className="duration-1000 transition-all outline-none font-[400] text-white rounded-[8px] bg-main px-5 py-2.5 font-[500] text-sm" onClick={(e) => { handleSubmit(); e.preventDefault(); setEdit(!edit) }}>
                    {edit ?
                        "Save"
                        : loading ?
                            <div className="mx-auto w-5 h-5 border-2 rounded-full border-gray-400 border-r-white animate-spin"></div>
                            : "Edit pricing"
                    }
                </button>

            </div>
            <PricingInput state={freelancers} setState={handleFreelancers} name="freelancers" readOnly={!edit} />
            <ExceptionsComponent type="Freelancers" />
        </>
    );
}



const tabs: { name: string, component: JSX.Element }[] = [
    { name: "Schools", component: <PricingSchoolsComponent /> },
    { name: "Freelancers", component: <FreelancersTabComponent /> },
    { name: "Students", component: <StudentsTabComponent /> },
];

export default function PricingTab() {

    const pricingReload = useSelector((state: RootState) => state.pricing.reload);

    const [active, setActive] = useState<number>(0)

    const dispatch = useDispatch();

    const parseResponseData = (data: any) => {
        console.log("received id", data);
        const schools = {
            id: data.schools.id,
            teachers: {
                id: 0,
                value: data.schools.teachers_price,
                quarter: data.schools.teachers_breakdown.quater,
                half: data.schools.teachers_breakdown.half,
                year: data.schools.teachers_breakdown.yearly,
            },
            students: {
                id: 0,
                value: data.schools.student_price,
                quarter: data.schools.students_breakdown.quater,
                half: data.schools.students_breakdown.half,
                year: data.schools.students_breakdown.yearly,
            }
        }

        const freelancers = {
            id: data.freelancers.id,
            value: data.freelancers.student_price,
            quarter: data.freelancers.students_breakdown.quater,
            half: data.freelancers.students_breakdown.half,
            year: data.freelancers.students_breakdown.yearly,
        }

        const students = {
            id: data.freelancers.id,
            value: data.students.student_price,
            quarter: data.students.students_breakdown.quater,
            half: data.students.students_breakdown.half,
            year: data.students.students_breakdown.yearly,
        }

        const schoolsException = data.exceptionedSchools;
        const freelancersException = data.exceptionedFreelancers;
        const studentsException = data.exceptionedIndependentsStudents;

        return { schools, freelancers, students, studentsException, schoolsException, freelancersException };
    }

    useEffect(() => {
        axiosInstance.get('/settings/pricing')
            .then(response => {
                console.log(response.data.data);
                const parsed = parseResponseData(response.data.data);
                // dispatching general pricing
                dispatch(setSchoolsStudents(parsed.schools.students));
                dispatch(setSchoolsTeachers(parsed.schools.teachers));
                dispatch(setFreelancers(parsed.freelancers));
                dispatch(setStudents(parsed.students));
                // window.parsed = parsed;

                // dispatching exceptions
                dispatch(setStudentsException(parsed.studentsException));
                dispatch(setSchoolsException(parsed.schoolsException));
                dispatch(setFreelancersException(parsed.freelancersException));
                console.log("pricing tab", parsed);
            })
            .catch(error => console.log(error));
    }, [pricingReload]);


    return (
        <div className="text-primary">
            <ul className="border-b w-full flex space-x-4">
                {
                    tabs.map((tab, key) => (
                        <li
                            key={key}
                            onClick={() => setActive(key)}
                            className={`py-2 pb-3 duration-300 text-sm rounded-t hover:text-gray-500 hover:bg-[#5A51E618] cursor-pointer px-4  border-b-2 ${(key == active) ? " text-[#5A51E6] border-[#5A51E6] font-[500]" : "text-gray-400 border-white"}`}>
                            {tab.name}
                        </li>
                    ))
                }
            </ul>
            <div className="mt-10 text-gray-600 ">
                {tabs.map((tab, key) => (active === key ? <div key={key}>{tab.component}</div> : null))}
            </div>
        </div>
    )
}