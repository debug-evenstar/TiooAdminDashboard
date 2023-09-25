import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { PrimaryButton } from "../../../../../components/Buttons";
import { AiOutlineWarning } from "react-icons/ai";
import { DeleteLesson } from "../../../../../api";
import { alertActions } from "../../../../../components/alertActions";


interface DeleteLessonModalProps {
  close: () => void;
  item: any;
  refetch: (val: any, filter: any) => void;
}

const DeleteLessonModal: React.FC<DeleteLessonModalProps> = ({ close, item, refetch }) => {

  const [isBusy, setIsBusy] = useState(false)
  const deleteLesson = async () => {
    await DeleteLesson(item.id)
      .then((res: any) => {
        if (!res.error) {
          alertActions.success(res.message)
          setIsBusy(false)
          refetch(item.SubjectId, item.GroupId)
          close()
        } else {
          alertActions.error(res.message)
          setIsBusy(false)
        }
      })
      .catch((err: any) => {
        setIsBusy(false)
        console.log(err);
      })
  }
  return (
    <div className="">
      <div className="flex w-full items-center justify-between border-b-[1px] py-4 px-[24px]">
        <h3 className="font-medium text-[20px] text-[#030036] opacity-70">
          Delete Lesson
        </h3>
        <div className="cursor-pointer" onClick={close}>
          <IoMdClose className="text-[22px] text-[#545454]" />
        </div>
      </div>
      <div className="p-[24px] border-b-[1px] h-[150px] text-center overflow-y-auto scrollbar-track-blue-200 scrollbar-thumb-blue-500 multi-scrol">
        <AiOutlineWarning className="mx-auto text-gray-400 text-4xl" />
        <p className="mt-4 px-3">This action will delete this lesson. Do you want to continue?</p>
      </div>
      <div className="p-[24px]">
        <PrimaryButton text={"Continue"} variant="dash" onClick={deleteLesson} />
      </div>
    </div>
  );
};

export default DeleteLessonModal;
