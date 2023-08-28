import { useEffect, useState } from "react";
import axiosInstance from "../../services/api";
import AddLibraryMaterial from "../libraryMaterialModal/libraryMaterialModal";
import AddLibraryLesson from "../libraryLessonModal/libraryLessonModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TLibraryMaterials, setLibraryMaterials } from "../../redux/slices/library";
import { RootState } from "../../redux/store";

type TMaterialCardItem = {
  id: number,
  naming: string,
  description: string,
  age: number,
  library: boolean,
  SchoolManagementId: number,
  lessonCount: number,
}

function MaterialCard({color,materialProps}:{color: string, materialProps: TMaterialCardItem}) {
  const [modal, setModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const viewLessonButton = () => {
    navigate(`view/${materialProps.id}`,{state: materialProps});    
  }

  return (
    <>
      <AddLibraryLesson {...{ modal, setModal }} id={materialProps.id} />
      {/* <div className="w-[260px] border h-[175px] flex flex-col justify-between rounded-[8px]"> */}
      <div className="w-[320px] mr-5 border min-h-[175px] flex flex-col justify-between rounded-[8px]">
        <div className={`${color} h-[110px] p-4 text-left text-white rounded-t-[8px]`}>
          <h1 className="font-[500] text-lg">{materialProps.naming}</h1>
          <p className="mt-3 text-xs">{materialProps.description}</p>
        </div>
        <div className="px-4 mb-2 mt">
          <span className="text-xs text-gray-400">Lessons uploaded</span><br />
          <div className="text-xs mb-2 font-semibold">{materialProps.lessonCount}</div>

          <div className="w-full grid grid-cols-2 gap-x-4">
            <button onClick={viewLessonButton} disabled={!(materialProps.lessonCount)} className={`px-4 py-1.5 text-sm font-semibold rounded border outline-none ${materialProps.lessonCount > 0 ? "border-main text-main" : "border-gray-400 text-gray-400"}`}>View Lesson</button>
            <button onClick={() => setModal(true)} className="px-4 py-1.5 text-sm font-semibold duration-300 hover:bg-hover rounded border border-main bg-main text-white">Create Lesson</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function LibrarySchoolsCurricula() {


  // const [lessons, setLessons] = useState<TLessonCardProps[]>([]);
  const materials = useSelector((state: RootState) => state.library.materials);
  const reload = useSelector((state: RootState) => state.library.reload);

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
  console.log("Library Reload");
  useEffect(() => {
    axiosInstance.get('management/subjects/lessons/count')
      .then(response => {
        dispatch(setLibraryMaterials(response.data.data));
      })
      .catch(error => console.error(error));
  }, [reload]);


  const [modal, setModal] = useState<boolean>(false);

  return (
    <div className="w-full overflow-y-auto">
      <AddLibraryMaterial {...{ modal, setModal }} />
      <div className="grid grid-cols-3 gap-4 items-center">
        {
          materials.map((materialProps: TLibraryMaterials, index: number) => (
            <MaterialCard key={index} materialProps={materialProps}  color={colors[index % colors.length]} />
          ))
        }
        <button
          onClick={() => setModal(!modal)}
          className="w-[221px] h-[170px] px-[52px] py-[35px] border shadow rounded-[8px]
              flex items-center justify-center flex-col text-main hover:shadow-lg duration-300">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 8C32.822 8 40 15.178 40 24C40 32.822 32.822 40 24 40C15.178 40 8 32.822 8 24C8 15.178 15.178 8 24 8ZM24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4ZM34 22H26V14H22V22H14V26H22V34H26V26H34V22Z" fill="#4F46E5" />
          </svg>
          <p className="text-center font-[500]">Add a lesson material</p>
        </button>

      </div>
      <div className="mt-5">
      </div>
    </div>
  );
}
