import Header from "@/components/header";
import ModalLayout from "@/components/modalLayout/modalLayout";
import React, { useEffect, useState } from "react";
import { fetchCategory } from "@/api";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import ExamCard from "./components/ExamCard";
import UniModal from "./components/UniModal";
import { axiosInstance } from "@/api/request";
import UniversityCard from "./components/UniCard";

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

export default function UniversityExams() {
  const [addModal, setAddModal] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [currentUni, setCurrentUni] = useState(null);
  const navigate = useNavigate();


  const getUniversities = () => {
    axiosInstance.get('/universities')
      .then((response) => {
        setUniversities(response?.data?.data);
        // setCurrentUni(response?.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUniversities();
  }, []);

  const handleNextPage = (university: any) => {
    // alert(`/library/categories/university/${university.id}/exams/`)
    navigate(`/library/categories/university/${university.id}/exams/`);
  };

  return (
    <>
      <div className="">
        <Header hasBack title={`University Admission Exams`} />
        <div className="mt-4 h-full w-full text-primary px-10">
          <div className="flex justify-end"></div>
          <div className="mt-10 grid grid-cols-4 gap-4">
            {universities?.map((uni: any, index: number) => (
              <UniversityCard
                key={index}
                refetch={getUniversities}
                setModal={setAddModal}
                nextPage={handleNextPage}
                setUniversityProps={setCurrentUni}
                university={uni}
                background={colors[index % colors.length]}
              />
            ))}
            <button
              className="text-gray-700 h-[10rem] bg-gray-100 border-gray-300 border-2 rounded-xl flex items-center justify-center active:scale-95 duration-300 px-10 py-2 font-bold text-lg"
              onClick={() => {
                setCurrentUni(null);
                setAddModal(true);
              }}
            >
              <FaPlus size={32} color="gray" />
            </button>
          </div>
        </div>
      </div>

      <ModalLayout title="Add University" modal={addModal} setModal={setAddModal}>
        {addModal && (
          <UniModal
            setModal={setAddModal}
            universityProps={currentUni}
            refetch={getUniversities}
          />
        )}
      </ModalLayout>
    </>
  );
}
