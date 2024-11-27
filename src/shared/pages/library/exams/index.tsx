import Header from "@/components/header";
import ModalLayout from "@/components/modalLayout/modalLayout";
import React, { useEffect, useState } from "react";
// import CategoryModal from "./categoryModal";
import { fetchCategories } from "@/api";
import { useNavigate } from "react-router-dom";
import CategoryCard from "./components/ComponentCard";
import { FaPlus } from "react-icons/fa";

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

export default function LibraryExams() {
  const [addModal, setAddModal] = useState(false);
  const navigate = useNavigate();

  const handleNextPage = (category: any) => {
    navigate(category.route);
  };

  const categories: any[] = [
    { name: "University Admission Exams" , route: '/library/categories/exams/university-admissions'},
    { name: "University Exams", route: '/library/categories/exams/university-exams' },
  ];
  
  return (
    <>
      <div className="">
        <Header title={`Exam Prep`} hasBack />
        <div className="mt-4 h-full w-full text-primary px-10">
          <div className="flex justify-end"></div>
          <div className="mt-10 grid grid-cols-4 gap-4">
            {categories?.map((category: any, index: number) => (
              <CategoryCard
                key={index}
                nextPage={handleNextPage}
                category={category}
                background={colors[index % colors.length]}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
