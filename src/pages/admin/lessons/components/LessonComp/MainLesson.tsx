import React, { FC } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface Props {
  close: () => void;
  item: any;
}
const MainLessonModal: FC<Props> = ({ close, item }) => {
  console.log(item);
  
  const navigate = useNavigate()
    const options = [
        {
            name: "Classroom Activity",
            desc: "Guideline for student’s class activity.",
            route: `/lessons/note/${item.id}`
        },
        {
            name: "Lesson note",
            desc: "View lesson notes and plan."
        },
        {
            name: "Assessment",
            desc: "Class work and homework questions."
        },
        {
            name: "Slides",
            desc: "Gamified lesson slides for students."
        }
    ]
  const manageNavigation = (item:any) => {
    console.log(item);
    
    if(item.route){
      navigate(item.route)
    }
  }
  return (
    <>
      <div className="flex w-full items-center justify-between border-b-[1px] py-4 px-[24px]">
        <p className="font-semibold text-lg">
        Noun: Concrete and Abstract
        </p>
        <div className="cursor-pointer" onClick={close}>
          <IoMdClose className="text-[22px] text-[#545454]" />
        </div>
      </div>
      <div className="px-4 py-8 grid grid-cols-3 gap-6">
           {
            options && options.map((item, i) => (
                <div className="shadow p-4 ronded-[8px] h-[160px] grid content-between hover:scale-105 duration-100 cursor-pointer" key={i} onClick={() => manageNavigation(item)}>
                    <div className="flex gap-x-3 items-center">
                        <p className="border border-[#4F46E5] shadow-lg py-2 px-2 rounded-[44px]">{i + 1}</p>
                        <p className="font-semibold text-lg">{item.name}</p>
                    </div>
                    <p className="text-[#87909E] text-sm">{item.desc}</p>
                </div>
            ))
           }
      </div>
    </>
  );
};

export default MainLessonModal;
