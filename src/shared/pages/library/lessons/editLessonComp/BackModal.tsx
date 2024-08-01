import React, {FC} from "react";
import { FaInfoCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { PrimaryButton } from "@/components/Buttons";

interface Props{
    close: () => void
    isBusy: boolean
    update: () => void
}
const BackModal:FC<Props> = ({close, isBusy, update}) => {
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
            By clicking continue, the current lesson note will be coverted into lesson slides for students
          </p>
        </div>
      </div>
      <div className="p-[24px]">
        <PrimaryButton
          text={isBusy ? "Updating..." : "Continue"}
          variant="dash"
          onClick={update}
        />
      </div>
    </>
  );
};

export default BackModal;
