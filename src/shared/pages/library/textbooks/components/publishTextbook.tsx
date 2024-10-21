import React, { FC, useState } from "react";
import { PrimaryButton } from "@/components/Buttons";
import { IoMdClose } from "react-icons/io";
import { BsDownload } from "react-icons/bs";
import { axiosInstance} from "@/api/request";
import { notify } from "@/components/notification/notification";

interface Props {
  close: () => void;
  name: string;
  item: any;
  refetch: Function;
}
const PublishTextbook: FC<Props> = ({ close, item, name, refetch }) => {
  const [isBusy, setIsBusy] = useState(false)

  const publishTextbook = () => {
    setIsBusy(true)
    axiosInstance.post(`/library/textbooks/${item.id}/${item.published == 1 ? 'unpublish' : 'publish'}`)
      .then(response => {
          refetch();
          notify.success("Successsful");
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
            You're about to publish this textbook <span className="font-semibold">{item.name}</span> to <span>Library</span>
          </p>
        </div>
      </div>
      <div className="p-[24px]">
        <PrimaryButton text={isBusy ? "Publishing..." : "Publish"} variant="dash" onClick={publishTextbook} />
      </div>
    </>
  );
};

export default PublishTextbook;
