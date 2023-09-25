import React, { FC, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { PrimaryButton } from "../../../../../components/Buttons";
import { FaInfoCircle } from "react-icons/fa";
import { alertActions } from "../../../../../components/alertActions";
// import { DeleteLesson, EditLessonStatus } from "../../../../api";
import axiosInstance from "../../../../../services/api";

interface Props {
  close: () => void;
  item: any;
  refetch: (val: any, filter: any) => void;
  status: string;
}

const ChangeStatus: FC<Props> = ({ close, item, refetch, status }) => {
  const [isBusy, setIsBusy] = useState(false);
  const updateStatus = async () => {

    axiosInstance.put(`/management/librarylesson/${item.id}/status?status=${status}`)
      .then(response => {
        alertActions.success(`${status} lesson successfuly`);
        refetch(item.SubjectId, item.GroupId);
        close();
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsBusy(false)
      })

  };
  // const updateStatus = async () => {
  //   await EditLessonStatus(item.id, status)
  //     .then((res: any) => {
  //       if (!res.error) {
  //         alertActions.success(res.message);
  //         setIsBusy(false);
  //         refetch(item.SubjectId, item.GroupId);
  //         close();
  //       } else {
  //         alertActions.error(res.message);
  //         setIsBusy(false);
  //       }
  //     })
  //     .catch((err: any) => {
  //       setIsBusy(false);
  //       console.log(err);
  //     });
  // };

  return (
    <>
      <div className="flex w-full items-center justify-end border-b-[1px] py-4 px-[24px]">
        <div className="cursor-pointer" onClick={close}>
          <IoMdClose className="text-[22px] text-[#545454]" />
        </div>
      </div>
      <div className="h-[200px] grid place-content-center border-b-[1px] py-4 px-[24px]">
        <div className="text-center">
          <FaInfoCircle className="text-3xl mx-auto" />
          <p className="mt-5">
            You're about to update the satus of this lesson to{" "}
            <span>{status}</span>
          </p>
        </div>
      </div>
      <div className="p-[24px]">
        <PrimaryButton
          text={isBusy ? "Updating..." : "Update"}
          variant="dash"
          onClick={updateStatus}
        />
      </div>
    </>
  );
};

export default ChangeStatus;
