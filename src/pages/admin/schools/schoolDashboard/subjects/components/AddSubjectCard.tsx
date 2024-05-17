import React from 'react'
import { MdOutlineAddCircleOutline } from "react-icons/md";


interface AddSubjectCardProps {
  title: string;
  desc: string;
  onClick: () => void;
}
const AddSubjectCard: React.FC<AddSubjectCardProps> = ({
  onClick,
  title,
  desc
}) => {
  return (
    <div className="rounded-[8px] bg-[#fff] shadow-md w-full max-w-[221px] px-6 py-4 flex items-center justify-center flex-col cursor-pointer border border-black border-opacity-10 h-full max-h-[170px]" onClick={onClick}>
      <MdOutlineAddCircleOutline color="#4F46E5" className="text-[38px]" />
      <h3 className="py-2 text-[#4F46E5] font-medium text-[18px] font-inter">
        {title}
      </h3>
      <p className=" text-[#87909E] text-[14px] font-normal leading-[21px] w-[175px] text-center">
        {desc}
      </p>
    </div>
  );
};

export default AddSubjectCard