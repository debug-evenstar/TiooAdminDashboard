import Header from "@/components/header";
import ModalLayout from "@/components/modalLayout/modalLayout";
import React, { useEffect, useState } from "react";
import { fetchCategory } from "@/api";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import ExamCard from "./components/ExamCard";
import ExamModal from "./components/ExamModal";
import { axiosInstance } from "@/api/request";

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

export default function UniversityExamsPage() {
  const [addModal, setAddModal] = useState(false);
  const [exams, setExams] = useState([]);
  const [currentExam, setCurrentExam] = useState(null);
  const [ university, setUniversity] = useState<any>(null);
  const navigate = useNavigate();


  const params = useParams();
  const uni_id = params.id;

  const getUni = () => {
    axiosInstance.get('/universities/'+uni_id)
    .then((response) => {
      setUniversity(response?.data?.data);
      getExams();
    })
    .catch((error) => console.log(error));
  }

  const getExams = () => {
    axiosInstance.get(`/exams?type=university&university_id=${uni_id}`)
      .then((response) => {
        setExams(response?.data?.data);
        setCurrentExam(response?.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUni();
    // getExams();
  }, []);

  const handleNextPage = (exam: any) => {
    navigate(`/library/textbooks/${exam.id}`);
    // navigate(`/library/categories/textbooks/2`);
  };

  return (
    <>
      <div className="">
        <Header hasBack title={`University  Exams`} />
        <div className="mt-4 h-full w-full text-primary px-10">
          <div className="flex justify-end"></div>
          <div className="mt-10 grid grid-cols-4 gap-4">
            {university && exams?.map((exam: any, index: number) => (
              <ExamCard
                key={index}
                refetch={getExams}
                setModal={setAddModal}
                nextPage={handleNextPage}
                setExamProps={setCurrentExam}
                exam={exam}
                background={colors[index % colors.length]}
              />
            ))}
            <button
              className="text-gray-700 h-[10rem] bg-gray-100 border-gray-300 border-2 rounded-xl flex items-center justify-center active:scale-95 duration-300 px-10 py-2 font-bold text-lg"
              onClick={() => {
                setCurrentExam(null);
                setAddModal(true);
              }}
            >
              <FaPlus size={32} color="gray" />
            </button>
          </div>
        </div>
      </div>

      <ModalLayout title="Add Exam" modal={addModal} setModal={setAddModal}>
        {addModal && university && (
          <ExamModal
            setModal={setAddModal}
            examProps={currentExam}
            refetch={getExams}
            exam_type="university"
            university_id={university?.id}
          />
        )}
      </ModalLayout>
    </>
  );
}
