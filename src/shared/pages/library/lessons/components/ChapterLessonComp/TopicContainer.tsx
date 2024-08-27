import React, { FC, useState } from "react";
import TopicItem from "./TopicItem";
import { AiOutlinePlusCircle } from "react-icons/ai";
import CenterModal from "@/components/CenterModal";
import AddLessonSuccess from "../UploadLesson/AddLessonSuccess";
import GeneratingLesson from "../GenerateLessons/Generating";
import TextbookLesson from "../../../tabs/textbookLessonModal";
import Loader from "@/components/loader/loader";

interface Props {
  lesson: any;
  refetch: (val: any, filter: any) => void;
  textbook: any;
}
const TopicContainer: FC<Props> = ({ lesson, refetch, textbook }) => {
  // eslint-disable-next-line
  const [active, setActive] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [item, setItem] = useState<number>(0);

  const [modal, setModal] = useState<boolean>(false);

  // const [ addLessonModal, setAddLessonModal ] = useState(false);
  // const [ editLessonModal, setEditLessonModal ] = useState(false);

  const toggleTab = (item: any, tabId: number): void => {
    setActive(true);
    setActiveTab(tabId);
    setItem(item);
  };

  const style = !!lesson.length
    ? "grid grid-cols-3 lg:gap-12 lg:gap-y-8"
    : "flex flex-col";
  return (
    <>
      {modal && (
        <TextbookLesson
          textbookProps={textbook}
          refetch={refetch}
          // lesson={lesson[0]}
          {...{ modal, setModal }}
        />
      )}
      {!!textbook ? (
        <div className={` min-h-[10rem] ${style}`}>
          {!!lesson.length ? (
            lesson.map((item: any, i: number) => (
              <TopicItem
                key={i}
                lesson={item}
                index={i}
                textbook={textbook}
                refetch={refetch}
              />
            ))
          ) : (
            <div className="text-primary text-lg mb-5">
              You haven't uploaded any lesson
            </div>
          )}
          <div

            className={`${
              !lesson.length && "w-[180px]"
            } p-5 rounded-[8px] h-[130px] shadow grid place-content-center hover:scale-105 duration-100 cursor-pointer`}
            onClick={() => setModal(true)}
          >
            <div className="text-center text-[#4F46E5]">
              <AiOutlinePlusCircle className="text-2xl mx-auto" />
              <p className="font-medium text-[17px] mt-2">Add Lesson</p>
            </div>
          </div>


        </div>
      ) : (
        <Loader />
      )}
      <CenterModal
        isOpen={activeTab === 2}
        onClose={() => setActiveTab(0)}
        variant={"wide"}
      >
        <AddLessonSuccess
          close={() => setActiveTab(0)}
          item={lesson}
          refetch={refetch}
        />
      </CenterModal>
      <CenterModal
        isOpen={activeTab === 3}
        onClose={() => setActiveTab(0)}
        variant={"wide"}
      >
        <GeneratingLesson
          id={item}
          passId={item}
          close={() => setActiveTab(0)}
        />
      </CenterModal>
    </>
  );
};

export default TopicContainer;
