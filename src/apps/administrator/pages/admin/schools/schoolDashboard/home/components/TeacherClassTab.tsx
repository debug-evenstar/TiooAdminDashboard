import React, { FC, useState } from "react";
import TeacherStudentList from "./TeacherStudent";
import TeacherSubjectList from "./TeacherSubject";
import { IoMdClose } from "react-icons/io";

interface Props {
  close: () => void;
  item: any;
}
const TeacherClassTab: FC<Props> = ({ item, close }) => {
  const [open, setOpen] = useState(1);
  const handleOpen = (value: number) => {
    setOpen(open === value ? value : value);
  };
  const activeStyle = {
    borderBottom: "2px solid #4F46E5",
    color: "#4F46E5",
    transition: "0.3s",
  };
  return (
    <>
      <div>
        <div className="flex w-full items-center justify-between border-b-[1px] py-4 px-[24px]">
          <h3 className="font-medium text-[20px] text-[#030036] opacity-70 capitalize">
            {item.naming}
          </h3>
          <div className="cursor-pointer" onClick={close}>
            <IoMdClose className="text-[22px] text-[#545454]" />
          </div>
        </div>
        <div className="pb-4">
          <ul className="flex text-gray-400 p-6 gap-x-6 text-lg">
            <li
              className="cursor-pointer"
              style={open === 1 ? activeStyle : undefined}
              onClick={() => handleOpen(1)}
            >
              <span className="">Students</span>
            </li>
            <li
              className="cursor-pointer"
              style={open === 2 ? activeStyle : undefined}
              onClick={() => handleOpen(2)}
            >
              <span className="">Subjects</span>
            </li>
          </ul>
          <div>
            {open === 1 ? <TeacherStudentList item={item}/> : ""}
            {open === 2 ? <TeacherSubjectList item={item}/> : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherClassTab;
