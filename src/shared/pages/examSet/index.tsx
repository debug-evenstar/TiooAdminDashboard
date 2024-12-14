import Header from "@/components/header";
import ModalLayout from "@/components/modalLayout/modalLayout";
import React, { useEffect, useState } from "react";
import { fetchCategory } from "@/api";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { axiosInstance } from "@/api/request";
import ExamCard from "../library/exams/components/ExamCard";
import ExamModal from "../library/exams/components/ExamModal";

const colors: string[] = [
  "#AE1E56",
  "#86A94B",
  "#776DB4",
  "#148CFA",
  "#DDA0DD",
  "#681AB0",
  "#330072",
  "#4F46E5",
];
// color={colors[index % colors.length]}

export default function GroupingPage() {
  const [addModal, setAddModal] = useState(false);
  const [exams, setExams] = useState([]);
  const [currentExam, setCurrentExam] = useState(null);
  const navigate = useNavigate();


  const getExams = () => {
    axiosInstance.get('/exams')
      .then((response) => {
        setExams(response?.data?.data);
        setCurrentExam(response?.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getExams();
  }, []);

  const handleNextPage = (exam: any) => {
    navigate(`/exam-grouping/${exam.id}/exam_set`);
  };

  return (
    <>
      <div className="">
        <Header  title={`CBT`} />
        <div className="mt-4 h-full w-full text-primary pb-10 px-10">
          <div className="flex justify-end"></div>
          <div className="mt-10 grid grid-cols-4 gap-4">
            {exams?.map((exam: any, index: number) => (
              <ExamCard
                key={index}
                hasMenu={false}
                refetch={getExams}
                setModal={setAddModal}
                nextPage={handleNextPage}
                setExamProps={setCurrentExam}
                exam={exam}
                background={colors[index % colors.length]}
              />
            ))}
          </div>
        </div>
      </div>

    </>
  );
}
