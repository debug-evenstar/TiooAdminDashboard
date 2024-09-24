import Header from "@/components/header";
import ModalLayout from "@/components/modalLayout/modalLayout";
import React, { useEffect, useState } from "react";
import CategoryModal from "./categoryModal";
import { fetchCategories } from "@/api";

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

interface CategoryCardProps {
  name: string;
  background: string;
}

const CategoryCard = ({ name, background }: CategoryCardProps) => {
  return (
    <div
      style={{backgroundColor: background+'66'}}
      className={` h-[10rem] text-white font-bold text-xl rounded-xl flex items-center justify-center`}
    >
      <p className="px-4 py-1  rounded" style={{backgroundColor: background +'cc'}}>{name}</p>
    </div>
  );
};

export default function LibraryCategories() {

  const [ addModal, setAddModal ] = useState(false);
  const [ categories, setCategories ] = useState([]);

  useEffect(() => {
    fetchCategories()
      .then((response) => {
        console.log(response);
        setCategories(response.data);
      })
      .catch(error => console.log(error));
  },[]);

  return (
    <>
      <div className="">
        <Header title="Library categories" />
        <div className="mt-4 h-full w-full text-primary px-10">
          <div className="flex justify-end">
            <button
              className="text-white bg-main active:scale-95 duration-300 px-10 py-2 rounded font-bold text-lg"
              onClick={() => setAddModal(true)}
            >
              Add
            </button>
          </div>
          <div className="mt-10 grid grid-cols-4 gap-4">
            {categories?.map((category: any, index) => (
              <CategoryCard name={category.name} background={colors[index % colors.length]} />
            ))}
          </div>
        </div>
      </div>
      <ModalLayout title="Add book category" modal={addModal} setModal={setAddModal}>
        <CategoryModal/>
      </ModalLayout>
    </>
  );
}
