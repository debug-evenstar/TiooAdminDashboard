import React, { FC, useState } from "react";
import TopicContainer from "./TopicContainer";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

interface Props {
  item: any;
  data: any;
  refetch: () => void;
}
const TermContainer: FC<Props> = ({ item, data, refetch }) => {
  const [isClosed, setClosed] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);

  const closeContainer = () => {
    setClosed(true);
    setTimeout(() => {
      setOpen(!open);
      setClosed(false);
    }, 450);
  };
  const formatTerm = (value: any) => {
    switch (value) {
      case 1:
        return "First Term";
      case 2:
        return "Second Term";
      case 3:
        return "Third Term";
      default:
        return value;
    }
  };
  return (
    <>
      <div className="shadow rounded-xl overflow-hidden">
        <div className="bg-[#F6F6F6] p-3 lg:px-6 rounded-t-xl py-4 flex items-center justify-between">
          <p className="font-semibold text-xl text-[#030036BD]">
            {formatTerm(data?.Lessons[0]?.term)}
          </p>
        </div>
        <div className="px-3 py-4 lg:px-6 shadow">
          <p className="text-[#87909E] fs-500">{data?.description}</p>
        </div>
        {open && (
          <div className={`${isClosed ? "dropoff" : "dropin"}`}>
            <div className="p-6 shadow">
              <TopicContainer lesson={item} refetch={refetch} />
            </div>
          </div>
        )}
        <div className="flex justify-end items-center lg:px-6 lg:py-4 p-3 shadow rounded-b-xl">
          {/* <p className="bg-[#4F46E5] rounded-lg px-6 py-2 text-white cursor-pointer">
            Set Test/Exam
          </p> */}
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
    </>
  );
};

export default TermContainer;
