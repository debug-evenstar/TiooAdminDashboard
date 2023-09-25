import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { fullNames } from "../../../../../data/data";
import { useSelector } from "react-redux";

interface TeachersProps {
  close: () => void;
  item: any;
}

const Teachers: React.FC<TeachersProps> = ({ close, item }) => {
  const [armTeachers, setArmTeachers] = useState([]);
  useEffect(()=>{
    try {
      setArmTeachers(item.Teachers);
    } catch (error) {
    }
  },[]);

  return (
    <div className="">
      <div className="flex w-full items-center justify-between border-b-[1px] py-4 px-[24px]">
        <h3 className="font-medium text-[20px] text-[#030036] opacity-70">
          Teachers
        </h3>
        <div className="cursor-pointer" onClick={close}>
          <IoMdClose className="text-[22px] text-[#545454]" />
        </div>
      </div>
      <h3 className="pt-3 text-[15px] font-normal text-[#87909E] pl-[24px] pb-[20px]">
        {item.naming}
      </h3>
      <div className="h-[400px] overflow-y-auto scrollbar-track-blue-200 scrollbar-thumb-blue-500 multi-scrol">
        {armTeachers?.length > 0 ? (
          armTeachers?.map((items: any, index: number) => (
            <div
              key={index}
              className="w-full py-3 border-b border-gray-200 last:border-none pl-[25px] text-[#030036] opacity-70"
            >
              {items.Account.name}
            </div>
          ))
        ) : (
          <div>
            {" "}
            <h3 className="pt-3 text-[15px] font-normal text-[#87909E] pl-[24px] pb-[20px]">
              No Teacher yet
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teachers;
