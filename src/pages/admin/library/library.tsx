import { Suspense, useState } from "react";
import Header from "@/components/AppHeader";
import LibraryTextbookTab from "./tabs/textbooks/libraryTextbookTab";
import LibrarySubjectTab from "./tabs/subjects/librarySubjectTab";
import LibraryGameTab from "./tabs/games/libraryGameTab";

export default function Library() {
  return (
    <div>
      <Header title="Library" />
      <div className="mt-4 h-full w-full text-primary pl-10">
        <LibraryTabs />
      </div>
    </div>
  );
}

const tabs = [
  { name: "Textbooks", tabId: 0 },
  { name: "Extra-curricula", tabId: 1 },
  { name: "Games", tabId: 2 },
];

function LibraryTabs() {
  const [active, setActive] = useState(0);
  console.log(active);
  return (
    <div>
      <ul className="border-b w-full flex space-x-4">
        {tabs.map((tab, key) => (
          <li
            key={key}
            onClick={() => setActive(key)}
            className={`py-2 pb-1 duration-300 rounded-t hover:text-gray-500 hover:bg-[#5A51E618] cursor-pointer px-4  border-b-2 ${
              key == active
                ? " text-[#5A51E6] border-[#5A51E6] font-[500]"
                : "text-gray-400 border-white"
            }`}
          >
            {tab.name}
          </li>
        ))}
        <li
          key={3}
          onClick={() => setActive(3)}
          className={`py-2 pb-1 duration-300 rounded-t hover:text-gray-500 hover:bg-[#5A51E618] cursor-pointer px-4  border-b-2 ${
            3 == active
              ? " text-[#5A51E6] border-[#5A51E6] font-[500]"
              : "text-gray-400 border-white"
          }`}
        >
          Subjects
        </li>
      </ul>
      <div className="mt-14 text-gray-600 pr-10">
        <Suspense fallback={<h1>Loading</h1>}>
          {active === 0 && <LibraryTextbookTab />}
          {active === 1 && <div></div>}
          {active === 2 && <LibraryGameTab />}
          {active === 3 && <LibrarySubjectTab />}
        </Suspense>
      </div>
    </div>
  );
}
