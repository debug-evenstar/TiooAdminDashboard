import Header from "@/components/header";
import ModalLayout from "@/components/modalLayout/modalLayout";
import React, { useEffect, useState } from "react";
import CategoryModal from "./categoryModal";
import { fetchCategories, fetchCategory } from "@/api";
import { useNavigate, useParams } from "react-router-dom";
import CategoryCard from "./categoryCard";
import SubCategoryModal from "./subCategoryModal";
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
// color={colors[index % colors.length]}

export default function LibraryCategories() {
  const [addModal, setAddModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState(null);

  const navigate = useNavigate();

  const { id } = useParams();

  const getCategory = () => {
    fetchCategory(id)
      .then((response) => {
        setCategories(response?.data?.sub_categories);
        setParentCategory(response?.data);
        console.log("fetching category",id,response)
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleNextPage = (category: any) => {
    navigate(`/library/categories/textbooks/${category.id}`)
    // navigate(`/library/categories/textbooks/2`);
  }

  return (
    <>
      <div className="">
        <Header title={`Library sub-categories(${categories?.length ?? 0})`} />
        <div className="mt-4 h-full w-full text-primary px-10">
          <div className="flex justify-end"></div>
          <div className="mt-10 grid grid-cols-4 gap-4">
            {categories?.map((category: any, index:number) => (
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
              <FaPlus size={32} color="gray"/>
            </button>
          </div>
        </div>
      </div>
      <ModalLayout
        title="Add book category"
        modal={addModal}
        setModal={setAddModal}
      >
        <SubCategoryModal
          categoryProps={parentCategory}
          refetch={getCategory}
        />
      </ModalLayout>
    </>
  );
}
