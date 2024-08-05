import React, { useState } from "react";
import { IoMdClose, IoIosWarning } from "react-icons/io";
import { AiOutlineWarning } from "react-icons/ai";

import { useSelector } from "react-redux";
import { PrimaryButton } from "@/components/Buttons";
import { deleteSubject } from "@/services/authServices";
import { alertActions } from "@/components/alertActions";
import { configure } from "@/services/config";

interface DeleteSubjectModalProps {
  close: () => void;
  item: any;
}

const DeleteSubjectModal: React.FC<DeleteSubjectModalProps> = ({
  close,
  item,
}) => {
  const [loading, setloading] = useState(false);
  const userInfo = useSelector((state: any) => state.gods.auth.userInformation);
  const config = configure(userInfo.token);

  const handleSelectedDataChange = (
    selectedClasses: string[],
    selectedSubNames: string[]
  ) => {
    // You can perform any additional logic or dispatch an action with the selected data here
  };

  //do delete
  const handleDelete = async () => {
    setloading(true);
    // check if token is lost in reduc then use token from local storage
    if (!userInfo.token) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }

    try {
      const delSubject = await deleteSubject(item.id, config);

      if (delSubject.status == 200) {
        alertActions.success("Subject Deleted successfully");
        setloading(false);
        close();
      }
    } catch (error) {
      setloading(false);
    }
  };

  return (
    <div className="h-[324]">
      <div className="flex w-full items-center justify-between border-b-[1px] py-4 px-[24px]">
        <h3 className="font-medium text-[20px] text-[#030036] opacity-70">
          Delete Subject
        </h3>
        <div className="cursor-pointer" onClick={close}>
          <IoMdClose className="text-[22px] text-[#545454]" />
        </div>
      </div>
      <div className="w-full px-10 m-[auto] mt-10 flex flex-col items-center justify-center mb-20">
        <AiOutlineWarning className="h-[24px] w-[24px] text-[center]" />
        <h3 className=" mt-3 font-medium text-center text-[20px] text-[#030036] opacity-70">
          Are you sure you want to delete this subject?
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

export default DeleteSubjectModal;
