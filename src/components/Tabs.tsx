import React, { FC, useState } from "react";
import { classNames } from "../utilities/format";

interface Props {
  tabs: {
    title: JSX.Element;
    content: JSX.Element;
  }[];
  broadcastCurrentIndex?: (index: number) => void;
  isFixed?: boolean;
}

const Tabs: FC<Props> = ({ tabs, broadcastCurrentIndex, isFixed }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div>
      <div className="">
        <div className="">
          <nav
            className={ isFixed
                ? "-mb-px tab-bar flex lg:space-x-4 space-x-2 overflow-x-auto border-b"
                : "-mb-px tab-bar flex lg:space-x-8 space-x-2 overflow-x-auto"
            }
            aria-label="Tabs"
          >
            {tabs.map((tab, index) => (
              <div
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  broadcastCurrentIndex && broadcastCurrentIndex(index);
                }}
                className={classNames(
                  index === currentIndex
                    ? "border-[#4F46E5]  text-[#4F46E5]"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "whitespace-nowrap cursor-pointer border-b-[3px] py-1 px-3 lg:px-7 font-medium lg:text-lg"
                )}
              >
                {tab.title}
              </div>
            ))}
          </nav>
          <div className="pt-2">{tabs[currentIndex].content}</div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;