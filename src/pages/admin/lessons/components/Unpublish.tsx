import React, { FC, useState } from "react";
import { PrimaryButton } from "../../../../components/Buttons";
import { IoMdClose } from "react-icons/io";
import { BsDownload } from "react-icons/bs";
import { updateTimeline } from "../../../../api";
import { alertActions } from "../../../../components/alertActions";
import axiosInstance from "../../../../services/api";
import { notify } from "../../../../components/notification/notification";

interface Props {
  close: () => void;
  name: string;
  item: any;
  refetch: (val: any, filter: any) => void;
}
const UnPublishLesson: FC<Props> = ({ close, item, name, refetch }) => {
  const [isBusy, setIsBusy] = useState(false)
  // const UnpublishLesson = async() => {
  //   const payload = {
  //     published: 0
  //   }
  //   await updateTimeline(payload, item.id)
  //   .then((res:any) => {
  //     if(!res.error){
  //     alertActions.success(res.message)
  //     setIsBusy(false)
  //     refetch(item.SubjectId, item.GroupId)
  //     close()
  //     }else{
  //       alertActions.error(res.message)
  //       setIsBusy(false)
  //     }
  //   })
  //   .catch((err) => {
  //     setIsBusy(false)
  //     console.log(err);
  //   })
  // }



  const UnpublishLesson = () => {
    setIsBusy(true)
    axiosInstance.post('/publish/librarylesson/' + item.id)
      .then(response => {
        if (response.data.data.published == 0){
          refetch(item.SubjectId, item.id);
          notify.success("Retracted library lesson");
        }
        close()
      })
      .catch(error => console.log(error))
      .finally(() => setIsBusy(false));
  }
  return (
    <>
      <div className="flex w-full items-center justify-end border-b-[1px] py-4 px-[24px]">
        <div className="cursor-pointer" onClick={close}>
          <IoMdClose className="text-[22px] text-[#545454]" />
        </div>
      </div>
      <div className="h-[200px] grid place-content-center border-b-[1px] py-4 px-[24px]">
        <div className="text-center">
          <BsDownload className="text-xl mx-auto" />
          <p className="mt-5">
            You're about to retract this lesson <span>{item.topic}</span> from <span>Library</span>
          </p>
        </div>
      </div>
      <div className="p-[24px]">
        <PrimaryButton text={isBusy ? "Retracting..." : "Retract"} variant="dash" onClick={UnpublishLesson} />
      </div>
    </>
  );
};

export default UnPublishLesson;
