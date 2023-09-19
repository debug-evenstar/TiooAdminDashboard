import React, {FC} from "react";
import {
  RiArrowTurnBackFill,
  RiArrowTurnBackLine,
  RiArrowTurnForwardLine,
  RiLogoutCircleRLine,
} from "react-icons/ri";
import { CgPrinter } from "react-icons/cg";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import useDisclosure from "../../../../hooks/useDisclosure";
import { useSelector } from "react-redux";
import NameAvatar from "../../../../components/NameAvatar";

interface Props{
  lesson: any
  back: () => void
  prev: () => void
  next: () => void
}
const EditLessonHeader:FC<Props> = ({lesson, back, next, prev}) => {
  const { toggleModal, modalRef, isOpen } = useDisclosure();
  const backLesson = useSelector((state:any) => state.gods.lesson.generatedNote.past)
  const current = useSelector((state:any) => state.gods.lesson.generatedNote.current)
  const forwardLesson = useSelector((state:any) => state.gods.lesson.generatedNote.forward)

  const schoolname = useSelector(
    (state: any) => state.gods.auth.userInformation.school
  );
  const truncateString = (str: string, maxLength: number) => {
    if (str.length <= maxLength) {
      return str;
    }
    return str.slice(0, maxLength) + "...";
  };
  const handlelogout = () => {
    localStorage.clear();
    window.location.assign("https://hellotioo.com/login");
  };
  const goPrevious = () => {
    if(backLesson !== current){
      prev()
    }
  }
  const goNext = () => {
    if(forwardLesson !== current && forwardLesson !== ''){
      next()
    }
  }
  return (
    <>
      <div className="px-6 py-5 shadow-md flex items-center justify-between">
        <div className="w-[30%] flex justify-center">
          <button className="px-12 py-3  rounded-lg border border-[#4F46E5] text-[#4F46E5] text-[18px] font-semibold" onClick={back}>
            Save & Exit
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-8 2xl:gap-x-24 w-full">
          <p className="font-semibold text-[20px]">
            {lesson?.topic}
          </p>
          <div className="flex gap-x-5">
            <div className="flex gap-x-3">
              <RiArrowTurnForwardLine className={`-rotate-90 text-2xl cursor-pointer ${current === backLesson && 'text-gray-500'}`} onClick={goPrevious} />
              <RiArrowTurnBackLine className={`-rotate-90 text-2xl cursor-pointer ${(current === forwardLesson || forwardLesson === '') && 'text-gray-500'}`} onClick={goNext}/>
            </div>
            <CgPrinter className="text-2xl"/>
          </div>
        </div>
        <div className="w-[30%] flex justify-end">
          <div
            className="flex items-center cursor-pointer"
            onClick={toggleModal}
          >
            <span className="flex items-center cursor-pointer h-[50px] w-[50px]">
              {/* <img
                src="https://images.squarespace-cdn.com/content/v1/530a77dee4b035db71736c02/1570812709805-UW9CYAKYVXKSTO845HHI/Connecticut+headshots+-+lawyer+headshot+-+Seshu+Badrinath.jpg?format=1000w"
                alt="profile"
                loading="lazy"
                className="h-full w-full rounded-full"
              /> */}
              {schoolname && <NameAvatar name={schoolname} />}
            </span>
            <div className="flex flex-col items-start ml-3">
              <h3 className="font-inter font-normal text-base text-[#030036]">
                {schoolname && truncateString(schoolname, 17)}
              </h3>
              <p className="text-[#87909E] text-[12px] font-inter font-normal pt-1">
                Update profile
              </p>
            </div>
          </div>
          {isOpen && (
            <span
              ref={modalRef}
              className="block absolute top-[70px] z-10 right-0 bg-white w-[230px] border border-imperial_blue rounded-[8px] shadow-md divide-y divide-gray-100"
            >
              <div className="w-full divide-y-2 divide-gray-100 cursor-pointer">
                <div
                  className="flex items-center px-3 py-2 text-base text-[#030036] opacity-70 hover:bg-gray-100 text-[18px] font-medium font-inter w-full"
                  onClick={() => {}}
                >
                  <MdOutlineAddCircleOutline size={20} className="mr-4" />
                  Add Head Teacher
                </div>
              </div>
              <div className="w-full divide-y-2 divide-gray-100 cursor-pointer">
                <button
                  className="text-[#030036] opacity-70 py-2 px-3 flex items-center hover:bg-red-100 text-base w-full text-[18px] font-medium font-inter"
                  onClick={handlelogout}
                >
                  <RiLogoutCircleRLine size={20} className="mr-4" />
                  Logout
                </button>
              </div>
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default EditLessonHeader;
