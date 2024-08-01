import React, { useState } from "react";
import { IoMdClose, IoIosWarning } from "react-icons/io";
import { AiOutlineWarning } from "react-icons/ai";
// import { useSelector } from "react-redux";
import { PrimaryButton } from "./Buttons";
// import { alertActions } from "./alertActions";
// import { configure } from "../services/config";
// import { title } from "process";

interface DeleteSubjectModalProps {
  close: () => void;
  item?: any;
  title?: string;
  aliasname?: string;
  handleDelete?: any;
  loading?: boolean;
  isOpen?: boolean;
}

const DeleteModal: React.FC<DeleteSubjectModalProps> = ({
  close,
  item,
  title,
  aliasname,
  handleDelete,
  loading,
  isOpen,
}) => {
  const [sdescription, setsdescription] = useState("");
  const [naming, setnaming] = useState("");
  const [showModal, setShowModal] = useState(isOpen);

  if (!isOpen) {
    return null;
  }
  // const [loading, setloading] = useState(false);
  // const classInfo = useSelector((state: any) => state.class.classInformation);
  // const SchoolInfo = useSelector(
  //   (state: any) => state.school.schoolManagementInfo
  // );

  return (
    <div className="h-[324px]">
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
          Are you sure you want to delete this {aliasname}
        </h3>
      </div>

      <div className="p-[24px]">
        <PrimaryButton
          text={loading ? "Deleting..." : "Delete"}
          variant="dash"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default DeleteModal;
