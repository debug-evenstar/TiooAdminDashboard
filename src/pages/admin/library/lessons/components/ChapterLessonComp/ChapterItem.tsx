import React, { FC, useState } from "react";
import TopicContainer from "./TopicContainer";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import CenterModal from "@/components/CenterModal";

import EditLessonArms from "../UploadLesson/AddArms";

interface Props {
  index?: number;
  item: any;
  textbook: any;
  refetch: (val: any, filter: any) => void;
}
const ChapterItem: FC<Props> = ({ index, item, textbook, refetch }) => {
  const [isClosed, setClosed] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const [isClosedThree, setClosedThree] = useState<boolean>(false);
  const [openThree, setOpenThree] = useState<boolean>(true);
  // eslint-disable-next-line
  const [activeTab, setActiveTab] = useState(0);

 

  const closeContainer = () => {
    setClosed(true);
    setTimeout(() => {
      setOpen(!open);
      setClosed(false);
    }, 450);
  };



  return (
    <>
      <div>
        {/* {!!firstTerm.length && ( */}
        <div className="shadow rounded-xl overflow-hidden">
          <div className="bg-[#F6F6F6] p-3 lg:px-6 rounded-t-xl py-4 flex items-center justify-between">
            <p className="font-semibold text-xl text-[#030036BD]">
              Chapter Lessons
            </p>

          </div>
          {/* <div className="px-3 py-4 lg:px-6 shadow">
              <p className="text-[#87909E] fs-500">{textbook?.description}</p>
            </div> */}
          {open && (
            <div className={`${isClosed ? "dropoff" : "dropin"}`}>
              <div className="p-6 shadow">
                <TopicContainer lesson={item} refetch={refetch} textbook={textbook} />
              </div>
            </div>
          )}
          <div className="flex justify-between items-center lg:px-6 lg:py-4 p-3 shadow rounded-b-xl">
            <p className="bg-[#4F46E5] rounded-lg px-6 py-2 text-white cursor-pointer">
              Set Test/Exam
            </p>
            <div>
              {open ? (
                <FaAngleUp
                  className="text-xl cursor-pointer"
                  onClick={closeContainer}
                />
              ) : (
                <FaAngleDown
                  className="text-xl cursor-pointer"
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        </div>

      </div>
      <CenterModal
        isOpen={activeTab === 1}
        onClose={() => setActiveTab(0)}
        variant={"small"}
      >
        <EditLessonArms
          close={() => setActiveTab(0)}
          item={item}
          refetch={refetch}
        />
      </CenterModal>
    </>
  );
};

export default ChapterItem;
