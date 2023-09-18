import { useEffect, useState } from "react";
// import DashLayout from "../../../layouts/DashLayout";
import LessonCard from "./components/LessonCard";
import CenterModal from "../../../components/CenterModal";
import UploadLessonModal from "./components/UploadLessonModal";
import { useSelector } from "react-redux";
import { getSubjectWithLessonCount, getSubjects } from "../../../api";
import ThirdUpload from "./components/UploadLesson/ThirdUpload";
import GeneratingLesson from "./components/GenerateLessons/Generating";

function Lessons() {
  // eslint-disable-next-line
 const [active, setActive] = useState(false);
   const [activeTab, setActiveTab] = useState(0);
   const [allsubject, setallsubject] = useState([]);
   // eslint-disable-next-line
   const [loading, setLoading] = useState(false);
   const [item, setItem] = useState<any>();
   const schoolManagement = useSelector((state: any) => state.school.schoolManagementInfo);

  const getAllSubjects = () => {
    // getSubjects(schoolManagement?.schoolManagementId)
    getSubjectWithLessonCount()
    .then((response) => {
      setLoading(false);
      setallsubject(response.data);
    })
    .catch(() => {
      setLoading(false);
    });
  }

   useEffect(() => {
     setLoading(true);
     getAllSubjects();// eslint-disable-next-line
   }, [schoolManagement]);

    const toggleTab = (item: any, tabId: number): void => {
      setActive(true);
      setActiveTab(tabId);
      setItem(item);
    };
    const closeTab = () => {
      setActive(false);
      setActiveTab(0);
    }

const colors: string[] = [
  "bg-[#AE1E56]",
  "bg-[#776DB4]",
  "bg-[#148CFA]",
  "bg-[#DDA0DD]",
  "bg-[#681AB0]",
  "bg-[#330072]",
  "bg-[#4F46E5]",
];
  return (
    <>
        <div className="w-full mx-auto">
          <div className="w-full flex items-start justify-start flex-col mt-[20px]">
            <h3 className="font-inter font-medium text-[#030036] opacity-70 text-[22px]">
              Subjects
            </h3>

            <div className="mt-[32px] w-full grid grid-cols-3 gap-[24px]">
              {allsubject.map((item: any, index) => {
                const colorIndex = index % colors.length;
                const color = colors[colorIndex];

                return (
                  <LessonCard
                    key={index}
                    item={item}
                    subject={item.class}
                    desc="This subject focuses on the methods of proper articulation, vocal tone, pitch, pace, and resonance"
                    color={color}
                    upload={() => toggleTab(item, 1)}
                  />
                );
              })}
            </div>
          </div>
        </div>

      <CenterModal
        isOpen={activeTab === 1}
        onClose={() => setActiveTab(0)}
        variant={"widest"}
      >
        <UploadLessonModal close={() => setActiveTab(0)} id={item?.id} toggle={() => toggleTab(item, 2)} generate={() => toggleTab(item, 3)} />
      </CenterModal>
      <CenterModal
        isOpen={activeTab === 2}
        onClose={() => setActiveTab(0)}
        variant={"wide"}
      >
        <ThirdUpload id={item?.id}/>
      </CenterModal>
      <CenterModal
        isOpen={activeTab === 3}
        onClose={() => setActiveTab(0)}
        variant={"widest"}
      >
        <GeneratingLesson id={item?.id} close={closeTab}/>
      </CenterModal>
    </>
  );
}

export default Lessons;
