import { removeSubCategory } from "@/api";
import { notify } from "@/components/notification/notification";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BsPen, BsTrash } from "react-icons/bs";
import { FaEllipsisH, FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";

interface SubCategoryCardProps {
  category: any;
  background: string;
  nextPage?: any;
  isSub?: boolean;
  setCategoryProps?: any;
  setModal?: any;
  refetch?: any;
}

const CardOptionsButton = ({
  active,
  onDelete,
  setCategoryProps,
  setModal,
  category,
}: any) => {

  const handleOpenEdit = () => {
    setCategoryProps(category);
    setModal(true);
  };

  return (
    <Popup
      open={active}
      onOpen={() => null}
      trigger={
        <button>
          <FaEllipsisH />
        </button>
      }
      position="left top"
      arrow={false}
    >
      <div className="w-fit relative px-2 py-2 outline-none text-gray-400 bg-[#fff] overflow-hidden shadow rounded-[8px]">
        <button
          onClick={handleOpenEdit}
          className="px-2 py-1.5 outline-none w-[6.5rem] rounded-[4px] hover:bg-light  text-gray-500 space-x-2 text-sm flex items-center"
        >
          <BsPen />
          <span>Edit</span>
        </button>

        <button
          onClick={() => {
            onDelete();
          }}
          className="px-2 py-1.5 outline-none w-[6.5rem] rounded-[4px] space-x-2 text-gray-500 hover:text-white hover:bg-[#ff6666] text-sm flex items-center"
        >
          <BsTrash />
          <span>Delete</span>
        </button>
      </div>
    </Popup>
  );
};

const SubCategoryCard = ({
  category,
  background,
  nextPage,
  setCategoryProps,
  setModal,
  refetch,
}: SubCategoryCardProps) => {

  console.log(category);

  const deleteCategory = async () => {
    await removeSubCategory(category.id)
    .then((res: any) => {
      if (!res.error) {
        notify.success(res.message);
        refetch();
      } else {
        notify.error(res.message);
      }
    })
  }
  
  return (
    <button
      onClick={() => nextPage(category)}
      style={{ backgroundColor: background + "66" }}
      className={` h-[10rem] text-white relative font-bold rounded-xl flex items-center justify-center`}
    >
        <div className="absolute top-2 bg-black/10 w-6 h-6 flex items-center justify-center rounded-full right-2">
          <CardOptionsButton
            category={category}
            setCategoryProps={setCategoryProps}
            setModal={setModal}
            onDelete={deleteCategory}
          />
        </div>
      <p
        className="px-4 py-1  rounded"
        style={{ backgroundColor: background + "cc" }}
      >
        {category?.name}
      </p>
    </button>
  );
};
export default SubCategoryCard;
