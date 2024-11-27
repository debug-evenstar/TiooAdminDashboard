import Header from "@/components/header";
import ModalLayout from "@/components/modalLayout/modalLayout";
import React, { useEffect, useState } from "react";
import CategoryModal from "./categoryModal";
import { fetchCategories } from "@/api";
import { useNavigate } from "react-router-dom";
import CategoryCard from "./categoryCard";
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

export default function LibraryCategories() {
  const [addModal, setAddModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const getCategories = () => {
    fetchCategories()
      .then((response) => {
        console.log(response);
        setCategories(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCategories();
  }, []);
  

  const pagesMap = [
    { name: "Exam Prep", route: "/library/categories/exams"},
    { name: "", route: "/library/categories/exams"},
  ];


  const handleNextPage = (category: any) => {
    const page = pagesMap.find((i: any) => i.name.toLowerCase() == category.name.toLowerCase() )
    if(page){
      navigate(page.route)
    }else{
      navigate(`/library/category/${category?.id}`);
    }
  };

  return (
    <>
      <div className="">
        <Header title={`Library categories(${categories?.length ?? 0})`} />
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
            <button
              className="text-gray-700 h-[10rem] bg-gray-100 border-gray-300 border-2 rounded-xl flex items-center justify-center active:scale-95 duration-300 px-10 py-2 font-bold text-lg"
              onClick={() => setAddModal(true)}
            >
              <FaPlus size={32} color="gray" />
            </button>
          </div>
        </div>
      </div>
      <ModalLayout
        title="Add book category"
        modal={addModal}
        setModal={setAddModal}
      >
        <CategoryModal refetch={getCategories} />
      </ModalLayout>
    </>
  );
}
