import { useEffect, useState } from "react";
import axiosInstance from "../../../../services/api";
import { FaEdit, FaEllipsisV, FaTrash } from "react-icons/fa";
import AddTextbookModal from "../../../../components/libraryTextbookModal/libraryTextbookModal";
import AddLibraryLesson from "../../../../components/libraryLessonModal/libraryLessonModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setTextbookModals,
  setLibraryReload,
} from "../../../../redux/slices/library";
import { RootState } from "../../../../redux/store";
import Popup from "reactjs-popup";
import { notify } from "../../../../components/notification/notification";
import SelectClassModal from "../../../../pages/admin/library/components/selectClassModal";
import { BsDownload, BsPen, BsTrash } from "react-icons/bs";
import DeleteTextbookModal from "./deleteTextbookModal";
import EditTextbookModal from "../../../../components/editTextbookModal/editTextbookModal";
import LibraryItemCard from "./libraryItemCard";
import { TextbookItem } from "../types";


export default function LibraryTab({ tab }: any) {
  // const [lessons, setLessons] = useState<TLessonCardProps[]>([]);
  const materials = useSelector(
    (state: RootState) => state.praise.library.materials
  );
  const reload = useSelector((state: RootState) => state.praise.library.reload);
  const [editModal, setEditModal] = useState(false);
  const [currentMaterial, setCurrentMaterial] =
    useState<TextbookItem | null>();

  const dispatch = useDispatch();

  const colors: string[] = [
    "bg-[#AE1E56]",
    "bg-[#86A94B]",
    "bg-[#776DB4]",
    "bg-[#148CFA]",
    "bg-[#DDA0DD]",
    "bg-[#681AB0]",
    "bg-[#330072]",
    "bg-[#4F46E5]",
  ];

  useEffect(() => {
    axiosInstance
      .get("management/subjects/lessons/count")
      .then((response) => {
        dispatch(setTextbookModals(response.data.data));
      })
      .catch((error) => console.error(error));
  }, [reload]);

  const openEditModal = (material: any) => {
    setEditModal(true);
    setCurrentMaterial(material);
  };

  const closeEditModal = () => {
    setEditModal(false);
    setCurrentMaterial(null);
  };
  const [modal, setModal] = useState<boolean>(false);

  return (
    <div className="w-full overflow-y-auto">
      <AddTextbookModal tabId={tab.tabId} {...{ modal, setModal }} />
      <EditTextbookModal
        closeModal={closeEditModal}
        textbookProps={currentMaterial}
        modal={editModal}
      />
      <div className="grid grid-cols-3 gap-y-3 sm:md:lg:gap-2 items-center">
        {materials.map((textbookProps: TextbookItem, index: number) => {
          if (tab.tabId == textbookProps.tab)
            return (
              <LibraryItemCard
                key={index}
                openEditModal={openEditModal}
                itemData={textbookProps}
                color={colors[index % colors.length]}
              />
            );
        })}
        <button
          onClick={() => setModal(!modal)}
          className="w-[221px] mt-4 h-[170px] px-[52px] py-[35px] border shadow rounded-[8px]
              flex items-center justify-center flex-col text-main hover:shadow-lg duration-300"
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 8C32.822 8 40 15.178 40 24C40 32.822 32.822 40 24 40C15.178 40 8 32.822 8 24C8 15.178 15.178 8 24 8ZM24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4ZM34 22H26V14H22V22H14V26H22V34H26V26H34V22Z"
              fill="#4F46E5"
            />
          </svg>
          <span className="text-center font-[500]">Add {tab.name.toLowerCase()}</span>
        </button>
      </div>
      <div className="mt-5"></div>
    </div>
  );
}
