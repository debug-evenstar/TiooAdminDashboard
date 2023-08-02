import { useState } from "react"
import UserTabComponent from "./userTab/userTab"
import LessonTabComponent from "./lessonTab/lessonTab"
import ReportTabComponent from "./reportTab/reportTab"


type TTab = {
    name: string,
    component: JSX.Element
}

const tabs: TTab[] = [
    { name: "User Dashboard", component: <UserTabComponent /> },
    { name: "Lesson Overview", component: <LessonTabComponent /> },
    { name: "Revenue Report", component: <ReportTabComponent /> },
];

export default function HomeTabs() {
    const [active, setActive] = useState(0)

    return (
        <div>
            <ul className="border-b w-full flex space-x-4">
                {
                    tabs.map((tab, key) => (
                        <li
                            key={key}
                            onClick={() => setActive(key)}
                            className={`py-2 pb-3 duration-300 rounded-t hover:text-gray-500 hover:bg-[#5A51E618] cursor-pointer px-4 text-gray-400  border-b-2 ${(key == active) ? " text-[#5A51E6] border-[#5A51E6]" : "border-white"}`}>
                            {tab.name}
                        </li>
                    ))
                }
            </ul>
            <div className="mt-14 text-gray-600 pr-10">
                {tabs.map((tab, key) => (active === key ? <div key={key}>{tab.component}</div> : null))}
            </div>

        </div>
    )
}
