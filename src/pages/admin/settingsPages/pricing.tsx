import { ChangeEvent, useEffect, useState } from "react";
import NairaInput from "../../../components/nairaInput/nairaInput";
import Button from "../../../components/button/button";
import UserChecklist from "../../../components/userChecklist/userChecklist";
// import Popup from "reactjs-popup";

const PricingInput = ({ name, state, setState, readOnly }: { state: any, setState: any, name: string, readOnly: boolean }) => {


    const handler = (e: ChangeEvent<HTMLInputElement>, type: string) => {
        let temp = e.target.value.replace('/\Dg', '');
        temp = temp.replaceAll(',', '');
        if (temp === '')
            temp = '0';

        let result = Number.parseInt(temp);

        if (isNaN(result))
            result = 0;

        setState({
            ...state,
            [type]: result,
        })
    }


    return (
        <div className="mt-5 grid grid-cols-4 gap-x-5">
            <div className="">
                <p className="mb-2 text-sm text-gray-400 ">{name[0].toUpperCase() + name.slice(1)}</p>
                <NairaInput
                    className="py-2.5" name={name}
                    value={name && state[name].toLocaleString()}
                    readonly={readOnly}
                    handler={(e: any) => handler(e, name)} />

            </div>
            <div className="">
                <p className="mb-2 text-sm text-gray-400 ">3 months</p>
                <NairaInput
                    className="py-2.5" name={name + ':3months'}
                    value={name && state['3months'].toLocaleString()}

                    readonly={readOnly}
                    handler={(e: any) => handler(e, '3months')} />

            </div>
            <div className="">
                <p className="mb-2 text-sm text-gray-400 ">6 months </p>
                <NairaInput
                    className="py-2.5" name={name + ':6months'}
                    value={name && state['6months'].toLocaleString()}
                    readonly={readOnly}
                    handler={(e: any) => handler(e, '6months')} />

            </div>
            <div className="">
                <p className="mb-2 text-sm text-gray-400 ">1 year </p>
                <NairaInput
                    className="py-2.5" name={name + ':1year'}
                    value={name && state['1year'].toLocaleString()}
                    readonly={readOnly}
                    handler={(e: any) => handler(e, '1year')} />
            </div>
        </div>
    );
}

export function SchoolsComponent() {

    const [edit, setEdit] = useState(false);

    const [teachers, setTeachers] = useState({
        teachers: 0,
        '3months': 0,
        '6months': 0,
        '1year': 0,
    });

    const [students, setStudents] = useState({
        students: 0,
        '3months': 0,
        '6months': 0,
        '1year': 0,
    });

    const [total, setTotal] = useState({
        total: 0,
        '3months': 0,
        '6months': 0,
        '1year': 0,
    });

    useEffect(() => {
        setTotal({
            total: students['students'] + teachers['teachers'],
            '3months': students['3months'] + teachers['3months'],
            '6months': students['6months'] + teachers['6months'],
            '1year': students['1year'] + teachers['1year'],
        })
    }, [students, teachers]);

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="font-[500] text-lg text-primary">General Pricing</h1>
                <Button className="outline-none text-sm" handler={(e) => { e.preventDefault(); setEdit(!edit) }}>
                    {edit ? "Save" : "Edit pricing"}
                </Button>
            </div>
            <PricingInput state={teachers} setState={setTeachers} name="teachers" readOnly={!edit} />
            <PricingInput state={students} setState={setStudents} name="students" readOnly={!edit} />
            <PricingInput state={total} setState={setTotal} name="total" readOnly={true} />
            <ExceptionsComponent type="Schools" />
        </>
    );
}



// export function ExceptionsComponent({ type }: { type: string }) {
//     return (
//         <div className="flex justify-between items-center mt-16">
//             <h1 className="font-[500] text-primary">Exceptions</h1>
//             <div className="bg-white rounded px-3 py-2 border text-sm outline-none cursor-pointer">
//                 <Popup
//                     on="click"
//                     position="bottom center"
//                     trigger={
//                         <button className="text-primary cursor-pointer bg-white outline-none flex justify-between space-x-10 items-center" onClick={(e) => { e.preventDefault() }}>
//                             <span>Add {type}</span>
//                             <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path d="M1.5 1L7.5 7L13.5 1" stroke="#030036" stroke-opacity="0.74" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
//                             </svg>
//                         </button>
//                     }
//                 >
//                     <UserChecklist/>
//                 </Popup>
//             </div>
//         </div>
//     );
// }



export function ExceptionsComponent({ type }: { type: string }) {

    const [ active , setActive ] = useState(false);
    return (
        <div className="flex justify-between mt-16">
            <h1 className="font-[500] text-primary">Exceptions</h1>
            <div className="text-sm outline-none cursor-pointer items-end flex flex-col">
                <button className="bg-white w-fit rounded px-3 py-2 border  text-primary cursor-pointer bg-white outline-none flex justify-between space-x-10 items-center" onClick={(e) => { setActive(!active);e.preventDefault() }}>
                    <span>Add {type}</span>
                    <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 1L7.5 7L13.5 1" stroke="#030036" stroke-opacity="0.74" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                {
                    active && 
                    <UserChecklist close={setActive} />
                }
            </div>
        </div>
    );
}


function StudentsTabComponent() {
    const [edit, setEdit] = useState(false);
    const [students, setStudents] = useState({
        students: 0,
        '3months': 0,
        '6months': 0,
        '1year': 0,
    });



    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="font-[500] text-lg text-primary">General Pricing</h1>
                <Button className="outline-none text-sm" handler={(e) => { e.preventDefault(); setEdit(!edit) }}>
                    {edit ? "Save" : "Edit pricing"}
                </Button>

            </div>
            <PricingInput state={students} setState={setStudents} name="students" readOnly={!edit} />
            <ExceptionsComponent type="Students" />
        </>
    );
}


function FreelancersTabComponent() {
    const [edit, setEdit] = useState(false);
    const [freelancers, setFreelancers] = useState({
        freelancers: 0,
        '3months': 0,
        '6months': 0,
        '1year': 0,
    });

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="font-[500] text-lg text-primary">General Pricing</h1>
                <Button className="outline-none text-sm" handler={(e) => { e.preventDefault(); setEdit(!edit) }}>
                    {edit ? "Save" : "Edit pricing"}
                </Button>

            </div>
            <PricingInput state={freelancers} setState={setFreelancers} name="freelancers" readOnly={!edit} />
            <ExceptionsComponent type="Freelancers" />
        </>
    );
}



const tabs = [
    { name: "Schools", component: <SchoolsComponent /> },
    { name: "Freelancers", component: <FreelancersTabComponent /> },
    { name: "Students", component: <StudentsTabComponent /> },
];

export default function PricingTab() {

    const [active, setActive] = useState(0)

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