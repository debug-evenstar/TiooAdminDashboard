import React, { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-toastify";

interface ClassCardProps {
  color: string;
  item: any;
  create: () => void;
  viewStudents: () => void;
  selectArm: React.Dispatch<React.SetStateAction<string>>
  teacher?: boolean
}
const ClassCard: React.FC<ClassCardProps> = ({
  color,
  item,
  create,
  viewStudents,
  selectArm,
  teacher
}) => {
  const [expanded, setExpanded] = useState(false);
  const capitalizeFirstLetter = (str: string) => {
    if (!str) {
      return "";
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const naming = capitalizeFirstLetter(item.naming);
  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const openView = (arm: string) => {
    selectArm(arm);
    viewStudents()
  }

  const displayedItems = expanded
    ? item?.arms
    : item?.arms?.slice(0, 3);

  const handleInvite = () => {
    if (!item?.arms?.length) {
      toast.info('Please add a class arm to invite a student')
    } else create()
  }
  return (
    <div
      className={`rounded-[6px] border-t-[4px]  w-full bg-[#fff]  hover:bg-opacity-40  ${color} shadow-md flex flex-col`}
    >
      <div>
        <div className="flex items-center justify-start p-[16px]">
          <h3 className="font-inter font-medium text-[#030036] opacity-70 text-[18px]">
            {naming}
          </h3>
        </div>
        <div className="flex flex-col items-start justify-start p-[16px]">
          <div
            className={`py-[22px] grid grid-cols-3 w-full gap-2 pt-[30px] cursor-pointer ${expanded ? "" : "h-[90px]"
              }`}
          >
            {displayedItems?.map((item: any, index: number) => {
              const truncateString = (str: string, maxLength: number) => {
                if (str.length <= maxLength) {
                  return str;
                }
                return str.slice(0, maxLength) + "...";
              };

              return (
                <div
                  title={item.naming}
                  key={index}
                  className="px-1 w-full py-1 max-h-[38px] rounded-[25px] border-[1.5px] border-black border-opacity-20 flex items-center justify-center text-[15px] hover:bg-[#E6E6FA] font-normal font-inter text-[#030036] opacity-50"
                  onClick={() => openView(item.naming)}
                >
                  {truncateString(item.naming, 8)}
                </div>
              );
            })}
          </div>
        </div>
        {item?.arms?.length > 3 && (
          <button
            onClick={handleToggleExpand}
            className="text-[#4F46E5] text-[14px] pb-1 px-[20px]"
          >
            {expanded ? "See less" : "See all"}
          </button>
        )}
      </div>
      <div className="border-t py-2 flex-grow">
        {/* <div
          className="flex items-center cursor-pointer px-[16px] py-[12px]"
          onClick={teacher ? () => false : handleInvite}
        >
          <AiOutlinePlusCircle size={20} className="text-[#4F46E5] " />
          <h3
            className={`${teacher && "opacity-40"
              } text-[#4F46E5] text-base font-medium pl-2`}
            >
            Invite Student
          </h3>
        </div> */}


        <button
          disabled={true}
          className="flex items-center cursor-pointer px-[16px] py-[12px]"
        // onClick={teacher ? () => false : handleInvite}
        >
          <AiOutlinePlusCircle size={20} className="text-[#aaa] " />
          <h3
            className={`${teacher && "opacity-40"
              } text-[#aaa] text-base font-medium pl-2`}
          >
            Invite Student
          </h3>
        </button>


      </div>
    </div>
  );
};

export default ClassCard;
