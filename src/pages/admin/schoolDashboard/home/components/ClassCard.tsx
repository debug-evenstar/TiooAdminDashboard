import React, { useState, useRef } from "react";
import { FiEdit } from "react-icons/fi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
import { userInfo } from "os";
import { useSelector } from "react-redux";
interface ClassCardProps {
  color: string;
  item: any;
  edit: () => void;
  del: () => void;
  create: () => void;
  viewClasses: () => void;
  inviteStudent: () => void;
  teacherView: () => void;
}
const ClassCard: React.FC<ClassCardProps> = ({
  color,
  item,
  edit,
  create,
  viewClasses,
  del,
  inviteStudent,
  teacherView
}) => {
  const [expanded, setExpanded] = useState(false);
  const capitalizeFirstLetter = (str: string) => {
    if (!str) {
      return "";
    }
    return str?.charAt(0)?.toUpperCase() + str.slice(1);
  };
  const user = useSelector((state: any) => state.gods.auth.userInformation.account_type);
  const account = useSelector((state: any) => state.gods.auth.userInformation);

  const naming = capitalizeFirstLetter(item.naming);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const displayedItems = expanded ? item?.arms : item?.arms?.slice(0, 3);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
      // console.log(first)
    ) {
      setIsOpen(false);
    }
  };

  document.removeEventListener("click", handleClickOutside);

  return (
    <div
      className={`rounded-[6px] border-t-[4px]  w-full bg-white hover:bg-[#E6E6FA] hover:bg-opacity-40  ${color} shadow-md flex flex-col`}
    >
      <div className="flex items-center justify-between p-[16px]">
        <h3 className="font-inter font-medium text-[#030036] opacity-70 text-[18px]">
          {item.naming}
        </h3>
        {/* <div className="cursor-pointer" onClick={edit}>
          <FiEdit size={20} className="text-[#87909E]" />
          <HiDotsVertical className="text-white text-[20px]" />
        </div> */}
        <div className="relative" ref={dropdownRef}>
          {(user?.toLowerCase() === "school" || user?.toLowerCase() === "freelancer") && (
            <div
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                toggleDropdown();
              }}
            >
              <HiDotsVertical className="text-[#87909E] opacity-70 text-[22px]" />
            </div>
          )}
          {isOpen && (
            <div
              className={`absolute right-[-3px] w-[120px] mt-3 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-[8px] shadow-lg py-1 z-50 ${isOpen ? "block" : "hidden"
                }`}
            >
              <div className="w-full divide-y-1 divide-gray-100 cursor-pointer">
                <div
                  className="flex items-center px-5 py-2  opacity-50 hover:bg-gray-100"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown();
                    edit();
                  }}
                >
                  <RiEdit2Line size={20} className="mr-2 text-[#87909E]" />
                  <span className="text-[#030036] opacity-90 text-[14px]">
                    {" "}
                    Edit
                  </span>
                </div>
              </div>
              <div className="w-full divide-y-1 divide-gray-100 cursor-pointer">
                <div
                  className="flex items-center px-5 py-2  opacity-50 hover:bg-gray-100"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown();
                    del();
                  }}
                >
                  <RiDeleteBin5Line size={20} className="mr-2 text-[#87909E]" />
                  <span className="text-[#030036] opacity-90 text-[14px]">
                    {" "}
                    Remove
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
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
                  key={index}
                  title={item.naming}
                  className="px-1 w-full py-1 max-h-[38px] rounded-[25px] border-[1.5px] border-black border-opacity-20 flex items-center justify-center text-[15px] font-normal font-inter text-[#030036] opacity-50"
                  onClick={viewClasses}
                >

                  {truncateString(item.naming, 8)}
                </div>
              );
            })}
          </div>
        </div>
        {item?.ClassArms?.length > 3 && (
          <button
            onClick={handleToggleExpand}
            className="text-[#4F46E5] text-[14px] pb-1 px-[20px]"
          >
            {expanded ? "See less" : "See all"}
          </button>
        )}
      </div>
      <div className="border-t py-2 flex-grow">
        {(user === "school" || user === "freelancer") && (
          <div
            className="flex items-center cursor-pointer px-[16px] py-[12px]"
            onClick={create}
          >
            <AiOutlinePlusCircle size={20} className="text-[#4F46E5] " />
            <h3 className="text-[#4F46E5] text-base font-medium pl-2">
              Add class arm
            </h3>
          </div>
        )}
        {user === "teacher" && (
          <div
            className="flex items-center cursor-pointer px-[16px] py-[12px]"
            onClick={
              account.teacher_type === "subject" ? undefined : inviteStudent
            }
          >
            <AiOutlinePlusCircle size={20} className="text-[#4F46E5] " />
            <h3
              className={`${account.teacher_type === "subject" && "opacity-40"
                } text-[#4F46E5] text-base font-medium pl-2`}
            >
              Invite Student
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassCard;
