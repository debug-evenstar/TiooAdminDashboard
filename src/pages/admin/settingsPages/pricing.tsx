import { ChangeEvent, useEffect, useState } from "react";
import Button from "../../../components/button/button";
import UserChecklist, { TUserChecklistProps } from "../../../components/userChecklist/userChecklist";
import PricingInput from "../../../components/pricingInput/pricingInput";
import NairaInput from "../../../components/nairaInput/nairaInput";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { PriceState, setFreelancers, setSchoolsStudents, setSchoolsTeachers, setSchoolsTotal, setStudents } from "../../../redux/slices/pricing";


export function PricingSchoolsComponent() {

    const [edit, setEdit] = useState(false);

    const dispatch = useDispatch();

    const teachers = useSelector((state: RootState) => state.pricing.schools.teachers);
    const students = useSelector((state: RootState) => state.pricing.schools.students);
    const total = useSelector((state: RootState) => state.pricing.schools.total);


    // console.log(teachers,students,total);

    useEffect(() => {
    });

    const handleTeachers = (data: PriceState) => {
        dispatch(setSchoolsTeachers(data));
    }

    const handleStudents = (data: PriceState) => {
        dispatch(setSchoolsStudents(data));
    }

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



function AddExceptionModal({ type, data, modal, setModal }: { type: string, data: TUserChecklistProps[], modal: boolean, setModal: (s: boolean) => void }) {

    const [current, setCurrent] = useState<TUserChecklistProps>(data[0]);
    const [price, setPrice] = useState<number>(0);

    const handler = (e: ChangeEvent<HTMLInputElement>) => {
        let temp = e.target.value.replace('/\Dg', '');
        temp = temp.replaceAll(',', '');
        if (temp === '') temp = '0';
        let result = Number.parseInt(temp);
        if (isNaN(result)) result = 0;
        setPrice(result);
    }

    const handleClick = (id: number) => {
        const value = data.filter((item) => item.id === id);
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
                                    data.map((item, index) => (
                                        <li
                                            onClick={() => handleClick(item.id)}
                                            className={`my-1 text-xs font-[500] rounded-[8px] py-2 border-l-2  px-2 cursor-pointer  hover:bg-light ${current?.id === item.id ? "border-main bg-light text-main" : "hover:border-gray-300 text-primary border-white"}`}
                                            key={index}>{item.value.name}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    }
                    <div className={`h-[15rem] px-4 py-4  ${data.length === 1 ? "w-full" : "w-[66%]"}`}>
                        <h1 className="text-xl font-[500]">{current?.value.name}</h1>
                        {type === "Schools" ?
                            <div className="mt-4">
                                <label htmlFor="" className="text-xs text-gray-400 mb-4">Teachers</label>
                                <NairaInput className="py-1.5 mb-2" name="price" value={price.toLocaleString()} handler={handler} />
                                <label htmlFor="" className="text-xs text-gray-400 mb-4">Students</label>
                                <NairaInput className="py-1.5 mb-2" name="price" value={price.toLocaleString()} handler={handler} />
                                <label htmlFor="" className="text-xs text-gray-400 mb-4">Set Price</label>
                                <NairaInput className="py-1.5 mb-2" readonly={true} name="price" value={price.toLocaleString()} handler={handler} />

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
                            <button className={`${0 ? "bg-main" : "bg-neutral-100"} rounded-[8px] outline-none text-neutral-300 px-3 py-1.5 text-sm`}>Apply on all schools</button>
                            :
                            <button className="text-gray-300 text-xs">Reset prices</button>
                    }
                    <button className={`${0 ? "bg-main" : "bg-neutral-100"} rounded-[8px] outline-none text-neutral-300 px-3 py-1.5 text-sm`}>Apply</button>
                </div>
            </div>
        </div>
    );
}

const samples: TUserChecklistProps[] = [
    { id: 1, value: { name: "Montesorri Gownsill", email: "montesorri@gmail.com" } },
    { id: 2, value: { name: "Brainy Hive", email: "brainyhive@gmail.com" } },
    { id: 3, value: { name: "Imao Obong Schools", email: "imaoboon@gmail.com" } },
    { id: 4, value: { name: "Teeves Academy", email: "teevesacademy@gmail.com" } },
    { id: 5, value: { name: "Manjaro Academy", email: "mangaroo@gmail.com" } },
    { id: 6, value: { name: "Fedora Schools", email: "fedoraschools@gmail.com" } },
];

export function ExceptionsComponent({ type }: { type: string }) {

    const [active, setActive] = useState(false);
    const [selection, setSelection] = useState<number[]>([]);
    const [modal, setModal] = useState(false);
    const [activeList, setActiveList] = useState<TUserChecklistProps[]>([]);

    const onApply = () => {
        // filter out duplicates
        const newSelection = selection.filter((item, index) => selection.indexOf(item) === index);
        // get { id, value } data from id's in selection
        const newList = samples.filter((item) => newSelection.includes(item.id))
        if (newList.length === 0) {
            return;
        }
        setActiveList(newList);
        setModal(true);
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
                        active &&
                        <UserChecklist onApply={onApply} {...{ selection, setSelection }} data={samples} close={setActive} />
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