import { FC, useState } from "react";
// import { PrimaryButton } from "@/components/Buttons";
import { IoMdClose } from "react-icons/io";
import { BsDownload } from "react-icons/bs";
import { PrimaryButton } from "../button/button";
import { toast } from "react-toastify";
import { publishLesson } from "@/apps/administrator/services/lesson.service";
// import { updateTimeline } from "@/api";
// import { alertActions } from "@/components/alertActions";

interface Props {
  close: () => void;
  item: any;
  refetch: () => void
}
const PublishLesson: FC<Props> = ({ close, item, refetch }) => {
  const [isBusy, setIsBusy] = useState(false)
  const publishLessons = async() => {
    setIsBusy(true)
    await publishLesson(item.id, "Active")
    .then((res:any) => {
      if(!res.error){
        toast.success(res.data.message)
      setIsBusy(false)
      refetch()
      close()
      }else{
        setIsBusy(false)
      }
    })
    .catch((err) => {
      setIsBusy(false)
      console.log(err);
    })
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
            You’re about to publish this lesson <span>{item.topic}</span> to the school
          </p>
        </div>
      </div>
      <div className="p-[24px]">
        <PrimaryButton title={isBusy? "Publishing..." : "Publish"}  onClick={publishLessons} />
      </div>
    </>
  );
};

export default PublishLesson;
