import { useState } from "react";
import NairaInput from "../nairaInput/nairaInput";

export function SchoolsComponent() {

    const [teachers, setTeachers] = useState(5000);
    const [students, setStudents] = useState(3500);

    return (
        <form>
            <h1 className="font-[500] text-lg text-primary">General Pricing</h1>
            <div className="mt-5">
                <p className="mb-2 text-sm text-gray-400 ">For Teachers </p>
                <NairaInput
                    className="py-2.5" name="pricing"
                    value={teachers.toLocaleString()}
                    handler={(e: any) => setTeachers(e.target.value)} />
            </div>
            <div className="mt-5">
                <p className="mb-2 text-sm text-gray-400 ">For Students </p>
                <NairaInput className="py-2.5" readonly={false} name="pricing" value={students.toLocaleString()} handler={(e: any) => setStudents(e.target.value.toLocalString())} />
            </div>
            <div className="mt-5">
                <p className="mb-2 text-sm text-gray-400 ">Total for schools </p>
                <NairaInput
                    className="py-2.5 bg-neutral-100 border-none"
                    readonly={true} name="pricing"
                    value={(teachers + students).toLocaleString()}
                />
            </div>
            <ExceptionsComponent type="School" />
        </form>
    );
}



export function ExceptionsComponent({ type }: { type: string }) {
    return (
        <div className="flex justify-between items-center mt-16">
            <h1 className="font-[500] text-primary">Exceptions</h1>
            <div className="bg-white rounded px-3 py-2 border text-sm outline-none cursor-pointer">
                <select disabled className="text-primary cursor-pointer bg-white outline-none" onClick={(e) => { e.preventDefault() }}>
                    <option>Add {type}</option>
                </select>
            </div>
        </div>
    );
}

export function PricingTabComponent({ type }: { type: string }) {
    return (
        <>
            <h1 className="font-[500] text-lg text-primary">General Pricing</h1>
            <div className="mt-4">
                <p className="mb-2 text-sm text-gray-400 ">For {type} </p>
                <NairaInput className="py-2.5" name="pricing" value="3,000" />
            </div>
            <ExceptionsComponent type={type} />
        </>
    );
}


const tabs = [
    { name: "Schools", component: <SchoolsComponent /> },
    { name: "Freelancers", component: <PricingTabComponent type="Freelancers" /> },
    { name: "Students", component: <PricingTabComponent type="Students" /> },
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
            <div className="mt-10 text-gray-600 pr-10">
                {tabs.map((tab, key) => (active === key ? <div key={key}>{tab.component}</div> : null))}
            </div>

        </div>
    )
}