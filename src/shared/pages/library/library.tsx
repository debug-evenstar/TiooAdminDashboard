import { Suspense, useState } from "react";
import Header from "@/components/AppHeader";
import LibraryTextbookTab from "./tabs/textbooks/libraryTextbookTab";
import LibrarySubjectTab from "./tabs/subjects/librarySubjectTab";
import LibraryGameTab from "./tabs/games/libraryGameTab";


interface LibraryPageProps {
  libraryTabs? : {[key : string] : string}[];
}

export default function Library({ libraryTabs } : LibraryPageProps) {
  return (
    <div>
      <Header title="Library" />
      <div className="mt-4 h-full w-full text-primary pl-10">
        <LibraryTabs libraryTabs={libraryTabs} />
      </div>
    </div>
  );
}

const defaultTabs = [
  { name: "Textbooks", tabId: 0 },
  { name: "Extra-curricula", tabId: 1 },
  { name: "Games", tabId: 2 },
  { name: "Subjects ", tabId: 3 },
];

function LibraryTabs({ libraryTabs } : any) {
  const [active, setActive] = useState(0);
  const tabs : any[] = libraryTabs ?? defaultTabs;
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
