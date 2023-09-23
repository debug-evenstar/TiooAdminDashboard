import React, { FC, useState } from "react";
import { PrimaryButton } from "../../../../components/Buttons";
import { IoMdClose } from "react-icons/io";
import { BsDownload } from "react-icons/bs";
import axiosInstance from "../../../../services/api";
import { notify } from "../../../../components/notification/notification";

interface Props {
  close: () => void;
  name: string;
  item: any;
  refetch: (val: any, filter: any) => void;
}
const PublishLesson: FC<Props> = ({ close, item, name, refetch }) => {
  const [isBusy, setIsBusy] = useState(false)
  // const publishLesson = async() => {
  //   const payload = {
  //     published: 1
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



  const publishLesson = () => {
    setIsBusy(true)
    axiosInstance.post('/librarylesson/status/' + item.id)
      .then(response => {
        if (response.data.data.published == 1) {
          refetch(item.SubjectId, item.id);
          notify.success("Published library lesson");
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
          <BsDownload className="rotate-180 text-xl mx-auto" />
          <p className="mt-5">
            You're about to publish this lesson <span>{item.topic}</span> to <span>Library</span>
          </p>
        </div>
      </div>
      <div className="p-[24px]">
        <PrimaryButton text={isBusy ? "Publishing..." : "Publish"} variant="dash" onClick={publishLesson} />
      </div>
    </>
  );
};

export default PublishLesson;
