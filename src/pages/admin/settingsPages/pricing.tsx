import { ChangeEvent, useEffect, useState } from "react";
import Button from "../../../components/button/button";
import PricingInput from "../../../components/pricingInput/pricingInput";
import NairaInput from "../../../components/nairaInput/nairaInput";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { PriceState, setFreelancers, setSchoolsStudents, setSchoolsTeachers, setSchoolsTotal, setStudents } from "../../../redux/slices/pricing";
import axiosInstance from "../../../services/api";
import SchoolsChecklist from "../../../components/schoolsChecklist/schoolsChecklist";
import StudentsChecklist from "../../../components/studentsChecklist/studentsChecklist";
import FreelancersChecklist from "../../../components/freelancersChecklist/freelancersChecklist";
import { TSchoolsProps } from "../../../redux/slices/schools";

import { TFreelancersProps } from "../../../redux/slices/freelancer";
import { TStudentsProps } from "../../../redux/slices/student";



export function PricingSchoolsComponent() {

    const [edit, setEdit] = useState(false);

    const dispatch = useDispatch();

    const teachers = useSelector((state: RootState) => state.pricing.schools.teachers);
    const students = useSelector((state: RootState) => state.pricing.schools.students);
    const total = useSelector((state: RootState) => state.pricing.schools.total);

    const handleTeachers = (data: PriceState) => {
        dispatch(setSchoolsTeachers(data));
    }

    const handleStudents = (data: PriceState) => {
        dispatch(setSchoolsStudents(data));
    }

    // fetch prices

    useEffect(() => {
        const total: PriceState = {
            value: students['value'] + teachers['value'],
            quarter: students['quarter'] + teachers['quarter'],
            half: students['half'] + teachers['half'],
            year: students['year'] + teachers['year']
        }
        dispatch(setSchoolsTotal(total));

    }, [students, teachers]);


    const handleSubmit = () => {
        if (edit) {
            const payload = {
                teachers_price: teachers.value,
                student_price: students.value,
                accounts: null,
                tab: "schools",
                students_breakdown: { quater: students.quarter, half: students.half, yearly: students.year },
                teachers_breakdown: { quater: teachers.quarter, half: teachers.half, yearly: teachers.year }
            }

            axiosInstance.post

            console.log(payload);

        }
        setEdit(!edit)
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="font-[500] text-lg text-primary">General Pricing</h1>
                <Button className="outline-none text-sm" handler={handleSubmit}>
                    {edit ? "Save" : "Edit pricing"}
                </Button>
            </div>
            <PricingInput state={teachers} setState={handleTeachers} name="teachers" readOnly={!edit} />
            <PricingInput state={students} setState={handleStudents} name="students" readOnly={!edit} />
            <PricingInput state={total} setState={() => null} name="total" readOnly={true} />
            <ExceptionsComponent type="Schools" />
        </>
    );
}



function AddExceptionModal({ type, data, modal, setModal }: { type: string, data: any, modal: boolean, setModal: (s: boolean) => void }) {

    const [current, setCurrent] = useState<{ id: number, name: string }>();
    const [price, setPrice] = useState<number>(0);
    const [active,setActive ] = useState<boolean>(false);
    const [teacher, setTeacher] = useState<number>(0);
    const [student, setStudent] = useState<number>(0);
    const [ total, setTotal ] = useState<number>(0);

    useEffect(() => {
        // set the first guy
        if (data.length > 0)
            setCurrent(data[0]);
    }, [data])

    useEffect(() => {
        setTotal(teacher+student);
        if(teacher && student){
            setActive(true);
        }else{
            setActive(false);
        }

    }, [teacher,student])

    const handler = (e: ChangeEvent<HTMLInputElement>, type?: string) => {
        let temp: string = e.target.value.replace('/\Dg', '');
        temp = temp.replaceAll(',', '');
        if (temp === '') temp = '0';
        let result: number = Number.parseInt(temp);
        if (isNaN(result)) result = 0;

        if (type === "student") {
            setStudent(result);
        } else if (type === "teacher") {
            setTeacher(result);
        } else {
            setPrice(result);
        }
    }

    const handleClick = (id: number) => {
        // console.log(data,id);
        const value = data.filter((item: { id: number, name: string }) => item.id === id);
        console.log(value[0]);
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
                        {type === "Schools" ?
                            <div className="mt-4">
                                <label htmlFor="" className="text-xs text-gray-400 mb-4">Teachers</label>
                                <NairaInput className="py-1.5 mb-2" name="price" value={teacher.toLocaleString()} handler={(e: any) => handler(e, 'teacher')} />
                                <label htmlFor="" className="text-xs text-gray-400 mb-4">Students</label>
                                <NairaInput className="py-1.5 mb-2" name="price" value={student.toLocaleString()} handler={(e: any) => handler(e, 'student')} />
                                <label htmlFor="" className="text-xs text-gray-400 mb-4">Set Price</label>
                                <NairaInput className="py-1.5 mb-2" readonly={true} name="price" value={total.toLocaleString()} handler={handler} />

                            </div>
                            :
                            <div className="mt-4">
                                <label htmlFor="" className="text-xs text-gray-400 mb-4">Set Price</label>
                                <NairaInput className="py-1.5" name="price" value={price.toLocaleString()} handler={handler} />
                            </div>

                        }
                    </div>
                </div>
                <div className="h-[44px] border-t px-3 flex items-center justify-between">
                    {
                        data.length > 1 ?
                            <button disabled={active} className={`${active ? "bg-main text-white" : "bg-neutral-100 text-gray-300"} cursor-pointer rounded-[8px] outline-none px-3 py-1.5 text-sm`}>Apply on all schools</button>
                            :
                            <button disabled={active} className={`${active ? "bg-main text-white" : "bg-neutral-100 text-gray-300"} cursor-pointer rounded-[8px] outline-none px-3 py-1.5 text-sm`}>Reset prices</button>
                    }
                    <button disabled={active} className={`${active ? "bg-main text-white" : "bg-neutral-100 text-gray-300"} cursor-pointer rounded-[8px] outline-none px-3 py-1.5 text-sm`}>Apply</button>
                </div>
            </div>
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
        console.log("applying ")
        // filter out duplicates
        const newSelection = selection.filter((item, index) => selection.indexOf(item) === index);

        // return name and id based on type
        const conditions = (): { id: number, name: string }[] | undefined => {
            let newList: any = null;
            switch (type) {
                case 'Schools':
                    newList = schools.filter((item: TSchoolsProps) => newSelection.includes(item.school.id))
                    return newList.map((item: TSchoolsProps) => ({
                        id: item.school.id,
                        name: item.school.name,
                    }));

                case 'Freelancers':
                    newList = freelancers.filter((item: TFreelancersProps) => newSelection.includes(item.freelancer.id))
                    return newList.map((item: TFreelancersProps) => ({
                        id: item.freelancer.id,
                        name: item.freelancer.name,
                    }));
                case 'Students':
                    newList = students.filter((item: TStudentsProps) => newSelection.includes(item.id));
                    return newList.map((item: TStudentsProps) => ({
                        id: item.id,
                        name: item.name
                    }));
                default:
                    return undefined;
            }
        }


        // get { id, value } data from id's in selection

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
        </>
    );
}


function StudentsTabComponent() {
    const [edit, setEdit] = useState(false);

    const students = useSelector((state: RootState) => state.pricing.students);
    const dispatch = useDispatch();

    const handleStudents = (data: PriceState) => {
        dispatch(setStudents(data));
    }
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="font-[500] text-lg text-primary">General Pricing</h1>
                <Button className="outline-none font-[400]" handler={(e) => { e.preventDefault(); setEdit(!edit) }}>
                    {edit ? "Save" : "Edit pricing"}
                </Button>

            </div>
            <PricingInput state={students} setState={handleStudents} name="students" readOnly={!edit} />
            <ExceptionsComponent type="Students" />
        </>
    );
}


function FreelancersTabComponent() {
    const [edit, setEdit] = useState(false);

    const freelancers = useSelector((state: RootState) => state.pricing.freelancers);
    const dispatch = useDispatch();

    const handleFreelancers = (data: PriceState) => {
        dispatch(setFreelancers(data));
    }


    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="font-[500] text-lg text-primary">General Pricing</h1>
                <Button className="outline-none text-sm" handler={(e) => { e.preventDefault(); setEdit(!edit) }}>
                    {edit ? "Save" : "Edit pricing"}
                </Button>

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

    const [active, setActive] = useState<number>(0)
    const dispatch = useDispatch();



    const parseResponseData = (data: any) => {
        const schools = {
            teachers: {
                value: data.schools.teachers_price,
                quarter: data.schools.teachers_breakdown.quater,
                half: data.schools.teachers_breakdown.half,
                year: data.schools.teachers_breakdown.yearly,
            },
            students: {
                value: data.schools.student_price,
                quarter: data.schools.students_breakdown.quater,
                half: data.schools.students_breakdown.half,
                year: data.schools.students_breakdown.yearly,
            }
        }

        const freelancers = {
            value: data.freelancers.student_price,
            quarter: data.freelancers.students_breakdown.quater,
            half: data.freelancers.students_breakdown.half,
            year: data.freelancers.students_breakdown.yearly,
        }

        const students = {
            value: data.students.student_price,
            quarter: data.students.students_breakdown.quater,
            half: data.students.students_breakdown.half,
            year: data.students.students_breakdown.yearly,
        }

        return { schools, freelancers, students };
    }

    useEffect(() => {
        axiosInstance.get('/settings/pricing')
            .then(response => {
                const parsed = parseResponseData(response.data.data);
                dispatch(setSchoolsStudents(parsed.schools.students));
                dispatch(setSchoolsTeachers(parsed.schools.teachers));
                dispatch(setFreelancers(parsed.freelancers));
                dispatch(setStudents(parsed.students));
            })
            .catch(error => console.log(error));
    }, []);


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