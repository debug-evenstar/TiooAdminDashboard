import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { PrimaryButton } from "../../../../../components/Buttons";
import { RiDeleteBin5Line } from "react-icons/ri";
import { alertActions } from "../../../../../components/alertActions";
import { useSelector } from "react-redux";
import axios from "axios";
import { configure } from "../../../../../services/config";
import { getAllSubjectsClass } from "../../../../../services/authServices";
import { getSubjectClasses, removeClassFromSubject } from "../../../../../api";

interface ClassesModalProps {
  close: () => void;
  addNewClass: () => void;
  onDeleteClass?: () => void;
  item: any;
  teacher?: boolean;
}

const ClassesModal: React.FC<ClassesModalProps> = ({
  close,
  addNewClass,
  onDeleteClass,
  item,
  teacher,
}) => {
  const [allsubjclass, setallsubjclass] = useState([]);
  const [allClassArms, setAllClassArms] = useState([]);


  const loadSubjectClasses = () => {
    getSubjectClasses(item.id)
      .then((response) => {
        setallsubjclass(response.data.Classes);
        setAllClassArms(response.data.ClassArms);
      })
      .catch((error) => { });
  }

  const ClassArmsFilter = (id: any) => {
    const classArms = allClassArms.filter((arm: any) => arm.ClassId === id);
    return classArms?.map((arm: any) => arm.naming).join(", ");
  };

  const removeClass = (id: any) => {
    const bindObj = {
      classId: id,
      subjectId: item.id,
    };

    removeClassFromSubject(bindObj)
      .then((res) => {
        loadSubjectClasses();
        if (onDeleteClass) {
          onDeleteClass();
        }
        alertActions.success("Class Successfully Removed");
      })
      .catch((error) => {
        alertActions.error("An Error Occurred");
      });
  };

  useEffect(() => {
    loadSubjectClasses();
  }, []);

  const ClassItem = (item: any) => {
    return (
      <div className="w-full px-4 py-3 border border-black border-opacity-20 shadow-md rounded-[8px] flex items-center justify-between mb-[15px]">
        <div className="flex flex-col items-start">
          <h3 className="text-[14px] font-medium text-[#030036] opacity-70">
            {item.item.naming}
          </h3>
          <p className="text-[#87909E] text-[12px] font-normal ">
            {ClassArmsFilter(item.item.id)}
          </p>
        </div>
        {/* {!teacher && (
          <div
            className="cursor-pointer"
            onClick={() => removeClass(item.item.id)}
          >
            <RiDeleteBin5Line
              size={20}
              className=" text-[#030036] opacity-70"
            />
          </div>
        )} */}
      </div>
    );
  };

  return (
    <div className="">
      <div className="flex w-full items-center justify-between border-b-[1px] py-4 px-[24px]">
        <h3 className="font-medium text-[20px] text-[#030036] opacity-70">
          Classes
        </h3>
        <div className="cursor-pointer" onClick={close}>
          <IoMdClose className="text-[22px] text-[#545454]" />
        </div>
      </div>
      <div className="p-[24px] border-b-[1px]">
        {allsubjclass.length > 0 ? (
          allsubjclass?.map((item: any) => <ClassItem key={item.id} item={item} />)
        ) : (
          <h3 className="text-[14px] font-medium text-[#030036] opacity-70">
            You do not have any available class
          </h3>
        )}
        {/* <ClassItem /> */}
      </div>
      {/* {!teacher && (
        <div className="p-[24px]">
          <PrimaryButton
            text="Add Another Class"
            variant="dash"
            onClick={addNewClass}
          />
        </div>
      )} */}
    </div>
  );
};

export default ClassesModal;
