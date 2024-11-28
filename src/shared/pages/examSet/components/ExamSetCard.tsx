import { useEffect, useState } from "react";
import { axiosInstance } from "@/api/request";
import { FaEdit, FaEllipsisV, FaTrash } from "react-icons/fa";
// import AddLibraryLesson from "@/pages/admin/library/tabs/libraryLessonModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLibraryReload } from "@/redux/slices/library";
import Popup from "reactjs-popup";
import { notify } from "@/components/notification/notification";
import { BsDownload, BsPen, BsTrash } from "react-icons/bs";
import ModalLayout from "@/components/modalLayout/modalLayout";
import ExamSetModal from "./ExamSetModal";
import { PulseLoader } from "react-spinners";

function ExamSetCard({
  color,
  itemData,
  refetch,
}: {
  color: string;
  itemData: any;
  refetch: any;
}) {
  const [modal, setModal] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [examSetModal, setExamSetModal] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  // const [ status, setStatus ] = useState<boolean | null>(itemData.library_status);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const toggleStatus = () => {
    axiosInstance
      .post(`/library/examSets/${itemData.id}/publish`)
      .then((response) => {
        dispatch(setLibraryReload());
        itemData.published ? "unpuplished" : "published";
        notify.success(
          `${itemData.published ? "Retracted" : "Published"} Library Material`
        );
      })
      .catch((error) => console.log(error))
      .finally(() => setActive(false));
  };

  const deleteSet = () => {
    setDeleteLoading(true);
    axiosInstance
      .delete(`/exam-set/${itemData.id}`)
      .then(() => {
        notify.success("saved");
      })
      .finally(() => {
        setDeleteLoading(false);
        refetch();
      });
  };
  return (
    <>
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
          {/* <p className="mt-3 text-xs">{itemData.description}</p> */}
        </div>
        {
          <div className="px-4 mb-2 mt">
            <span className="text-xs text-gray-400">Lessons</span>
            <br />
            <div className="text-xs mb-2 font-semibold">
              {itemData.data?.length}
            </div>

            <div className="w-full grid grid-cols-2 gap-x-4">
              <button
                onClick={() => setExamSetModal(true)}
                className="px-4 py-2 text-sm font-semibold duration-300 hover:bg-hover rounded border border-main bg-main text-white"
              >
                Edit set
              </button>

              <button
                onClick={deleteSet}
                // disabled={!itemData.lessonCount}
                className={`px-4 py-2 text-sm font-semibold rounded border outline-none border-red-500 text-red-500`}
              >
                {deleteLoading ? (
                  <PulseLoader color="white" size={7} />
                ) : (
                  <span>Delete</span>
                )}
              </button>
            </div>
          </div>
        }
      </div>

      {examSetModal && (
        <ExamSetModal
          title="Edit Exam set"
          {...{
            modal: examSetModal,
            itemData,
            refetch,
            setModal: setExamSetModal,
          }}
        />
      )}
    </>
  );
}

export default ExamSetCard;
