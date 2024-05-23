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
import DeleteTextbookModal from "./deleteItemModal";
import { SubjectItem, TextbookItem } from "../types";

function LibraryItemCard({
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
  const [textbookModal, setTextbookModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  // const [ status, setStatus ] = useState<boolean | null>(itemData.library_status);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const viewLessonButton = () => {
    // setDeleteModal(true);
    // navigate(
    //     `/library/lessons/${itemData?.id}/${itemData?.classes[0]?.id}`,
    //     { state: { material: itemData } }
    // );
  };

  const toggleStatus = () => {
    // const status = !!itemData.library_status;
    // axiosInstance
    //     .post("/librarysubject/status/" + itemData.id)
    //     .then((response) => {
    //         dispatch(setLibraryReload());
    //         itemData.library_status == "published"
    //             ? "unpuplished"
    //             : "published";
    //         notify.success(
    //             `${
    //                 itemData.library_status == "published"
    //                     ? "Retracted"
    //                     : "Published"
    //             } Library Material`
    //         );
    //     })
    //     .catch((error) => console.log(error))
    //     .finally(() => setActive(false));
  };

  return (
    <>
      <AddLibraryLesson
        textbookProps={itemData}
        {...{ modal, setModal, itemData }}
      />
      {/* <AddTextbookModal modal={textbookModal} setModal={setTextbookModal} {...{ itemData }}/> */}
      {/* <SelectClassModal modal={deleteModal} setModal={setDeleteModal} itemData={itemData} /> */}
      <DeleteTextbookModal
        modal={deleteModal}
        setModal={setDeleteModal}
        url="/library/textbooks"
        itemProps={itemData}
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
                  onClick={() => setTextbookModal(true)}
                  className="px-2 py-1.5 outline-none w-[6.5rem] rounded-[4px] hover:bg-light  text-gray-500 space-x-2 text-sm flex items-center"
                >
                  {/* <FaEdit /> */}
                  <BsPen />
                  <span>Edit</span>
                </button>

                {"published" in itemData && (
                  <button
                    onClick={toggleStatus}
                    className="px-2 py-1.5 outline-none w-[6.5rem] rounded-[4px] hover:bg-light  text-gray-500 space-x-2 text-sm flex items-center"
                  >
                    {itemData.published ? (
                      <>
                        <BsDownload className="rotate-180 text-lg" />
                        <span>Publish</span>
                      </>
                    ) : (
                      <>
                        <BsDownload className="text-lg" />
                        <span>Retract</span>
                      </>
                    )}
                  </button>
                )}
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
        {"lessonCount" in itemData && (
          <div className="px-4 mb-2 mt">
            <span className="text-xs text-gray-400">Lessons uploaded</span>
            <br />
            <div className="text-xs mb-2 font-semibold">
              {itemData.lessonCount}
            </div>

            <div className="w-full grid grid-cols-2 gap-x-4">
              <button
                onClick={viewLessonButton}
                disabled={!itemData.lessonCount}
                className={`px-4 py-2 text-sm font-semibold rounded border outline-none ${
                  itemData.lessonCount > 0
                    ? "border-main text-main"
                    : "border-gray-400 text-gray-400"
                }`}
              >
                View Lesson
              </button>
              <button
                onClick={() => setModal(true)}
                className="px-4 py-2 text-sm font-semibold duration-300 hover:bg-hover rounded border border-main bg-main text-white"
              >
                Create Lesson
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default LibraryItemCard;
