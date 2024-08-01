import React, { FC, useState } from 'react'
import AddLessonUploadForm from './UploadLesson/AddLesson';
import Tabs from '@/components/Tabs';
import AddGenerated from './GenerateLessons/AddGenerated';
import { IoMdClose } from 'react-icons/io';

interface Props {
  id: number;
  next: () => void;
  close: () => void;
  generate: () => void
}
const AddLessonModal: FC<Props> = ({ id, next, close, generate }) => {
  console.log(id);

  const tabs = [
    {
      title: <p>Upload Lessons</p>,
      content: <AddLessonUploadForm id={id} next={next} close={close} />,
    },
    // {
    //   title: <p>Generate Lessons</p>,
    //   content: <AddGenerated id={id}  generate={generate}/>,
    // },
  ]
  return (
    <>
      <div className=''>
        <div className="flex w-full items-center justify-between border-b-[1px] py-4 px-[24px]">
          <h2 className="font-medium text-[23px] text-[#030036] opacity-70">
            Add Lesson
          </h2>
          <div className="cursor-pointer" onClick={close}>
            <IoMdClose className="text-[22px] text-[#545454]" />
          </div>
        </div>
        <div className="min-h-[300px] py-3">
          <Tabs tabs={tabs} isFixed />
        </div>
      </div>
    </>
  )
}

export default AddLessonModal