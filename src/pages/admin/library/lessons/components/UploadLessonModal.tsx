import React, { useState } from 'react';
import Tabs from "../../../../../components/Tabs";
import UploadLessonIndex from "./UploadLesson";
import GenerateLessons from "./GenerateLessons";
import { IoMdClose } from "react-icons/io";
import CenterModal from "../../../../../components/CenterModal";
import DiscardWarning from "../../../../../components/DiscardWarning";


interface UploadLessonModalProps {
  close: () => void;
  id: number
  toggle?: any;
  generate?: any;
}

const UploadLessonModal: React.FC<UploadLessonModalProps> = ({ close, id, toggle, generate }) => {
  const tabs = [
    {
      title: <p>Upload Lessons</p>,
      content: <UploadLessonIndex id={id} upload={toggle} />,
    },
    {
      title: <p>Generate Lessons</p>,
      content: <GenerateLessons id={id} upload={toggle} generate={generate} />,
    },
  ]
  const [backDrop, setBackDrop] = useState(false)
  const HandleClose = () => {
    setBackDrop(false)
    close()
  }
  return (
    <>
      <div>
        <div className="border-b p-5 flex justify-between items-center">
          <p className="fw-600 text-2xl">Create Lessons</p>
          <div className="cursor-pointer" onClick={() => setBackDrop(true)}>
            <IoMdClose className="text-[22px] text-[#545454]" />
          </div>
        </div>
        <div className="min-h-[300px] py-3">
          <Tabs tabs={tabs} isFixed />
        </div>
      </div>
      <CenterModal isOpen={backDrop} onClose={() => setBackDrop(false)}>
        <DiscardWarning close={close} handleAction={HandleClose} />
      </CenterModal>
    </>
  )
};

export default UploadLessonModal;
