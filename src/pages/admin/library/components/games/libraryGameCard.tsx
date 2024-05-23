import { useEffect, useState } from "react";
import axiosInstance from "@/services/api";
import { FaEdit, FaEllipsisV, FaTrash } from "react-icons/fa";
import AddLibraryLesson from "@/pages/admin/library/components/libraryLessonModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLibraryReload } from "@/redux/slices/library";
import Popup from "reactjs-popup";
import { notify } from "@/components/notification/notification";
import { BsDownload, BsPen, BsTrash } from "react-icons/bs";
import DeleteTextbookModal from "../deleteItemModal";
import { SubjectItem, TextbookItem } from "../../types";
import AddSubject from "./gameModal";

function LibrarySubjectCard({
  color,
  openEditModal,
  itemData,
}: {
  color: string;
  openEditModal: any;
  itemData: TextbookItem | SubjectItem;
}) {
  const [modal, setModal] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  // const [ status, setStatus ] = useState<boolean | null>(itemData.library_status);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <AddSubject subject={itemData} {...{ modal, setModal, itemData }} />
      <DeleteTextbookModal
        modal={deleteModal}
        setModal={setDeleteModal}
        itemProps={itemData}
        url="/subjects"
        type="Subject"
      />
      <div className="w-[19.7rem] mr-5 border shadow-lg min-h-[220px] flex flex-col justify-between rounded-[8px]">
        <div
          className={`${color} h-[110px] p-4 text-left text-white rounded-t-[8px]`}
        >
          <div className="flex justify-between relative">
            <h1 className="font-[500] text-lg">{itemData.name}</h1>
            <Popup
              open={active}
              onOpen={() => setActive(true)}
              trigger={
                <button>
                  <FaEllipsisV />
                </button>
              }
              position="left top"
            >
              <div className="w-fit relative px-2 py-2 outline-none text-gray-400 bg-[#fff] overflow-hidden shadow rounded-[8px]">
                <button
                  onClick={() => setModal(true)}
                  className="px-2 py-1.5 outline-none w-[6.5rem] rounded-[4px] hover:bg-light  text-gray-500 space-x-2 text-sm flex items-center"
                >
                  {/* <FaEdit /> */}
                  <BsPen />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => {
                    setDeleteModal(true);
                    setActive(false);
                  }}
                  className="px-2 py-1.5 outline-none w-[6.5rem] rounded-[4px] space-x-2 text-gray-500 hover:text-white hover:bg-[#ff6666] text-sm flex items-center"
                >
                  <BsTrash />
                  <span>Delete</span>
                </button>
              </div>
            </Popup>
          </div>
          <p className="mt-3 text-xs">{itemData.description}</p>
        </div>
      </div>
    </>
  );
}

export default LibrarySubjectCard;
