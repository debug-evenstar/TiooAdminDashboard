import { useEffect, useState } from "react";
import { axiosInstance } from "@/api/request";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { TextbookItem } from "../../types";
import SubjectModal from "./SubjectModal";
import LibrarySubjectCard from "./librarySubjectCard";
import { setSubjects } from "@/redux/slices/subject";
import { useParams } from "react-router-dom";

export default function LibrarySubjectTab({ tab }: any) {

  const reload = useSelector((state: RootState) => state.subject.reload);

  const { exam_id } = useParams();


  const subjects = useSelector(
    (state: RootState) => state.subject.subjects
  );

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
      .get("subjects?default=true")
      .then((response) => {
        const subjects = response.data?.data?.filter((sub: any) => sub.exam_id == exam_id);
        dispatch(setSubjects(subjects));
        // dispatch(setSubjects(response.data.data));
      })
      .catch((error) => console.error(error));
  }, [reload]);



  const [modal, setModal] = useState<boolean>(false);

  return (
    <div className="w-full overflow-y-auto">
      <SubjectModal {...{ modal,exam_id, setModal }} />
      <div className="grid grid-cols-3 gap-y-3 sm:md:lg:gap-2 items-center">
        {subjects.map((subject: any, index: number) => (
          <LibrarySubjectCard
            openEditModal={true}
            itemData={subject}
            color={colors[index % colors.length]}
          />
        ))}

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
          <span className="text-center font-[500]">Add Subject</span>
        </button>
      </div>
      <div className="mt-5"></div>
    </div>
  );
}
