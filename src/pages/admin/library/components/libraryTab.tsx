import { useEffect, useState } from "react";
import axiosInstance from "../../../../services/api";
import { FaEdit, FaEllipsisV, FaTrash } from "react-icons/fa";
import AddTextbookModal from "../../../../components/libraryTextbookModal/libraryTextbookModal";
import AddLibraryLesson from "../../../../components/libraryLessonModal/libraryLessonModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  TTextbookModals,
  setTextbookModals,
  setLibraryReload,
} from "../../../../redux/slices/library";
import { RootState } from "../../../../redux/store";
import Popup from "reactjs-popup";
import { notify } from "../../../../components/notification/notification";
import SelectClassModal from "../../../../pages/admin/library/components/selectClassModal";
import { BsDownload, BsPen, BsTrash } from "react-icons/bs";
import DeleteMaterialModal from "./deleteMaterialModal";
import EditTextbookModal from "../../../../components/editTextbookModal/editTextbookModal";

type TMaterialCardItem = {
  id: number;
  naming: string;
  description: string;
  age: number;
  library: boolean;
  SchoolManagementId: number;
  lessonCount: number;
  tab: number;
  library_status?: string | null;
  classes?: any;
};

function MaterialCard({
  color,
  openEditModal,
  textbookProps,
}: {
  color: string;
  openEditModal: any;
  textbookProps: TMaterialCardItem;
}) {
  const [modal, setModal] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  // const [ status, setStatus ] = useState<boolean | null>(textbookProps.library_status);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const viewLessonButton = () => {
    // setDeleteModal(true);
    navigate(
      `/library/lessons/${textbookProps?.id}/${textbookProps?.classes[0]?.id}`,
      { state: { material: textbookProps } }
    );
  };

  const toggleStatus = () => {
    // const status = !!textbookProps.library_status;
    axiosInstance
      .post("/librarysubject/status/" + textbookProps.id)
      .then((response) => {
        dispatch(setLibraryReload());
        textbookProps.library_status == "published"
          ? "unpuplished"
          : "published";
        notify.success(
          `${
            textbookProps.library_status == "published"
              ? "Retracted"
              : "Published"
          } Library Material`
        );
      })
      .catch((error) => console.log(error))
      .finally(() => setActive(false));
  };

  return (
    <>
      <AddLibraryLesson {...{ modal, setModal, textbookProps }} />
      {/* <AddTextbookModal modal={editModal} setModal={setEditModal} {...{ textbookProps }} tabId={textbookProps.tab} /> */}
      {/* <SelectClassModal modal={deleteModal} setModal={setDeleteModal} textbookProps={textbookProps} /> */}
      <DeleteMaterialModal
        modal={deleteModal}
        setModal={setDeleteModal}
        textbookProps={textbookProps}
      />
      <div className="w-[19.7rem] mr-5 border shadow-lg min-h-[220px] flex flex-col justify-between rounded-[8px]">
        <div
          className={`${color} h-[110px] p-4 text-left text-white rounded-t-[8px]`}
        >
          <div className="flex justify-between relative">
            <h1 className="font-[500] text-lg">{textbookProps.naming}</h1>
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
                  onClick={() => openEditModal(textbookProps)}
                  className="px-2 py-1.5 outline-none w-[6.5rem] rounded-[4px] hover:bg-light  text-gray-500 space-x-2 text-sm flex items-center"
                >
                  {/* <FaEdit /> */}
                  <BsPen />
                  <span>Edit</span>
                </button>

                <button
                  onClick={toggleStatus}
                  className="px-2 py-1.5 outline-none w-[6.5rem] rounded-[4px] hover:bg-light  text-gray-500 space-x-2 text-sm flex items-center"
                >
                  {textbookProps.library_status !== "published" ? (
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
          <p className="mt-3 text-xs">{textbookProps.description}</p>
        </div>
        <div className="px-4 mb-2 mt">
          <span className="text-xs text-gray-400">Lessons uploaded</span>
          <br />
          <div className="text-xs mb-2 font-semibold">
            {textbookProps.lessonCount}
          </div>

          <div className="w-full grid grid-cols-2 gap-x-4">
            <button
              onClick={viewLessonButton}
              disabled={!textbookProps.lessonCount}
              className={`px-4 py-2 text-sm font-semibold rounded border outline-none ${
                textbookProps.lessonCount > 0
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
      </div>
    </>
  );
}

export default function LibraryTab({ tab }: any) {
  // const [lessons, setLessons] = useState<TLessonCardProps[]>([]);
  const materials = useSelector(
    (state: RootState) => state.praise.library.materials
  );
  const reload = useSelector((state: RootState) => state.praise.library.reload);
  const [editModal, setEditModal] = useState(false);
  const [currentMaterial, setCurrentMaterial] =
    useState<TTextbookModals | null>();

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
        {materials.map((textbookProps: TTextbookModals, index: number) => {
          if (tab.tabId == textbookProps.tab)
            return (
              <MaterialCard
                key={index}
                openEditModal={openEditModal}
                textbookProps={textbookProps}
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
          <span className="text-center font-[500]">Add a textbook</span>
        </button>
      </div>
      <div className="mt-5"></div>
    </div>
  );
}
