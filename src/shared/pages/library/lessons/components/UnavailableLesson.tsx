import React, { FC } from 'react'
import { IoMdClose } from 'react-icons/io';
import { PrimaryButton } from '@/components/Buttons';
import { BsInfoCircleFill } from 'react-icons/bs';
interface Props {
  close: () => void;
  item: any;
}
const UnavailableLesson: FC<Props> = ({ item, close }) => {

  return (
    <>
      <div className="flex w-full items-center justify-end border-b-[1px] py-4 px-[24px]">
        <div className="cursor-pointer" onClick={close}>
          <IoMdClose className="text-[22px] text-[#545454]" />
        </div>
      </div>
      <div className="h-[200px] grid place-content-center border-b-[1px] py-4 px-[24px]">
        <div className="text-center">
          <BsInfoCircleFill className="text-4xl text-[#4F46E5] mx-auto" />
          <p className="mt-5">
            Your lesson (<span className='text-[#4F46E5] font-semibold'>{item.topic}</span>) has been uploaded successfully and is undergoing review. Please check back in 24 hours
          </p>
        </div>
      </div>
      <div className="p-[24px]">
        <PrimaryButton text={"Continue"} variant="dash" onClick={close} />
      </div>
    </>
  );
}

export default UnavailableLesson