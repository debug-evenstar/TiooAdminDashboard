import React, { useState } from "react";
import { IoMdClose, IoIosWarning } from "react-icons/io";
import { AiOutlineWarning } from "react-icons/ai";
import { useSelector } from "react-redux";
import { PrimaryButton } from "./Buttons";
// import { alertActions } from "./alertActions";
// import { configure } from "../services/config";
// import { title } from "process";

interface DiscardWarningModalProps {
  close: () => void;
  handleAction?: () => void;
  loading?: boolean;
}

const DiscardWarning: React.FC<DiscardWarningModalProps> = ({
  close,
  handleAction,
  loading,
}) => {
  const [sdescription, setsdescription] = useState("");
  const [naming, setnaming] = useState("");
  // const [loading, setloading] = useState(false);
  const classInfo = useSelector((state: any) => state.gods.class.classInformation);
  const SchoolInfo = useSelector(
    (state: any) => state.gods.school.schoolManagementInfo
  );

  return (
    <div className="h-[324]">
      <div className="flex w-full items-center justify-between border-b-[1px] py-4 px-[24px]">
        <h3 className="font-medium text-[20px] text-[#030036] opacity-70">
          {/* {title} */}
        </h3>
        <div className="cursor-pointer" onClick={close}>
          <IoMdClose className="text-[22px] text-[#545454]" />
        </div>
      </div>

      <div className="w-full px-10 m-[auto] mt-10 flex flex-col items-center justify-center mb-20">
        <AiOutlineWarning className="h-[24px] w-[24px] text-[center]" />

        <h3 className=" mt-3 font-medium text-center text-[20px] text-[#030036] opacity-70">
          This action will erase your progress. Do you still want to continue?
        </h3>
      </div>

      <div className="p-[24px]">
        <PrimaryButton text="Continue" variant="dash" onClick={handleAction} />
      </div>
    </div>
  );
};

export default DiscardWarning;
