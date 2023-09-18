import React, { FC, useState } from "react";
import TopicItem from "./TopicItem";
import { AiOutlinePlusCircle } from "react-icons/ai";
import CenterModal from "../../../../../components/CenterModal";
import AddLessonUploadForm from "../UploadLesson/AddLesson";
import AddLessonSuccess from "../UploadLesson/AddLessonSuccess";
import AddLessonModal from "../AddLessonModal";
import GeneratingLesson from "../GenerateLessons/Generating";

interface Props {
    lesson: any
    refetch: (val:any, filter:any) => void;
    naming: any
}
const TopicContainer:FC<Props> = ({lesson, refetch, naming}) => {
    // eslint-disable-next-line
  const [active, setActive] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [item, setItem] = useState<number>(0);
  
  const toggleTab = (item: any, tabId: number): void => {
    setActive(true);
    setActiveTab(tabId);
    setItem(item);
  };
  return (
    <>
      <div className="grid grid-cols-3 lg:gap-12 lg:gap-y-8">
        {
            lesson && lesson.map((item:any, i:number) => (
                <TopicItem items={item} index={i} name={naming} refetch={refetch}/>
            ))
        }
        <div className="p-5 rounded-[8px] h-[130px] shadow grid place-content-center hover:scale-105 duration-100 cursor-pointer" onClick={() => toggleTab(lesson[0].GroupId, 1)}>
          <div className="text-center text-[#4F46E5]">
            <AiOutlinePlusCircle className="text-2xl mx-auto" />
            <p className="font-medium text-[17px] mt-2">Add Lesson</p>
          </div>
        </div>
      </div>
      <CenterModal
        isOpen={activeTab === 1}
        onClose={() => setActiveTab(0)}
        variant={"widest"}
      >
        <AddLessonModal 
          close={() => setActiveTab(0)}
          id={item}
          next={() => toggleTab(item, 2)}
          generate={() => toggleTab(item, 3)}
          />
      </CenterModal>
      <CenterModal
        isOpen={activeTab === 2}
        onClose={() => setActiveTab(0)}
        variant={"wide"}
      >
        <AddLessonSuccess close={() => setActiveTab(0)} item={lesson} refetch={refetch}/>
      </CenterModal>
      <CenterModal
        isOpen={activeTab === 3}
        onClose={() => setActiveTab(0)}
        variant={"wide"}
      >
        <GeneratingLesson id={item} passId={item} close={() => setActiveTab(0)}/>
      </CenterModal>
    </>
  );
};

export default TopicContainer;
