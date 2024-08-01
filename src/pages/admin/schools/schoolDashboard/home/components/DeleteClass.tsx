import React, { useState } from "react";
import { useSelector } from "react-redux";
import { deleteClass } from "@/services/authServices";
import { alertActions } from "@/components/alertActions";
import { configure } from "@/services/config";
import DeleteModal from "@/components/deleteModal";
import { IoMdClose } from "react-icons/io";
import { AiOutlineWarning } from "react-icons/ai";
import { PrimaryButton } from "@/components/Buttons";

interface DeleteSubjectModalProps {
  close: () => void;
  item: any;
  didchange: () => void;
}

const DeleteClassModal: React.FC<DeleteSubjectModalProps> = ({
  close,
  item,
  didchange,
}) => {
  const [loading, setloading] = useState(false);
  const userInfo = useSelector((state: any) => state.gods.auth.userInformation);
  const config = configure(userInfo.token);

  const handleDeleting = async () => {
    setloading(true);
    if (!userInfo.token) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }

    try {
      const res = await deleteClass(item.id, config);
      if (res.status == 200) {
        alertActions.success("Class Deleted successfully");
        setloading(false);
        close();
        didchange();
      }
    } catch (error) {
      setloading(false);
    }
  };

  return (
    <>
      <div className="">
        <div className="flex w-full items-center justify-between border-b-[1px] py-4 px-[24px]">
          <h3 className="font-medium text-[20px] text-[#030036] opacity-70">
            Delete Class
          </h3>
          <div className="cursor-pointer" onClick={close}>
            <IoMdClose className="text-[22px] text-[#545454]" />
          </div>
        </div>
        <div className="p-[24px] border-b-[1px] h-[150px] text-center overflow-y-auto scrollbar-track-blue-200 scrollbar-thumb-blue-500 multi-scrol">
          <AiOutlineWarning className="mx-auto text-gray-400 text-4xl" />
          <p className="mt-4 px-3">
            This action will delete this class. Do you want to continue?
          </p>
        </div>
        <div className="p-[24px]">
          <PrimaryButton
            text={loading ? "Deleting..." : "Continue"}
            variant="dash"
            onClick={handleDeleting}
          />
        </div>
      </div>
    </>
  );
};

export default DeleteClassModal;
