import Header from "@/components/header";
import ModalLayout from "@/components/modalLayout/modalLayout";
import React, { useEffect, useState } from "react";
import { fetchCategory } from "@/api";
import { useNavigate, useParams } from "react-router-dom";
import SubCategoryModal from "./subCategoryModal";
import { FaPlus } from "react-icons/fa";
import SubCategoryCard from "./subCategoryCard";

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
  const [parentCategory, setParentCategory] = useState<any>(null);
  const [currentSubCategory, setCurrentSubCategory] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();

  const getSubCategories = () => {
    fetchCategory(id)
      .then((response) => {
        setCategories(response?.data?.sub_categories);
        setParentCategory(response?.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getSubCategories();
  }, []);

  const handleNextPage = (category: any) => {
    navigate(`/library/categories/textbooks/${category.id}`);
    // navigate(`/library/categories/textbooks/2`);
  };

  return (
    <>
      <div className="">
        <Header title={parentCategory && `${parentCategory?.name ?? ''}(${categories?.length ?? 0})`} />
        <div className="mt-4 h-full w-full text-primary px-10">
          <div className="flex justify-end"></div>
          <div className="mt-10 grid grid-cols-4 gap-4">
            {categories?.map((category: any, index: number) => (
              <SubCategoryCard
                key={index}
                refetch={getSubCategories}
                setModal={setAddModal}
                nextPage={handleNextPage}
                setCategoryProps={setCurrentSubCategory}
                category={category}
                background={colors[index % colors.length]}
              />
            ))}
            <button
              className="text-gray-700 h-[10rem] bg-gray-100 border-gray-300 border-2 rounded-xl flex items-center justify-center active:scale-95 duration-300 px-10 py-2 font-bold text-lg"
              onClick={() => {
                setCurrentSubCategory(null);
                setAddModal(true);
              }}
            >
              <FaPlus size={32} color="gray" />
            </button>
          </div>
        </div>
      </div>

      <ModalLayout title="Add Item" modal={addModal} setModal={setAddModal}>
        {addModal && (
          <SubCategoryModal
            setModal={setAddModal}
            currentCategoryProps={currentSubCategory}
            parentCategoryProps={parentCategory}
            refetch={getSubCategories}
          />
        )}
      </ModalLayout>
    </>
  );
}
