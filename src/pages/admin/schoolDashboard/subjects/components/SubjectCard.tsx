import React, { useEffect, useRef, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
import axios from "axios";
import { useSelector } from "react-redux";
import { alertActions } from "../../../../../components/alertActions";
import { useDispatch } from "react-redux";
import { schoolActions } from "../../../../../store/schoolSlice";
import { configure } from "../../../../../services/config";
import {
  getAllSubjectsClass,
  getAllSubjectsTeachers,
} from "../../../../../services/authServices";
import { getSubjectClasses } from "../../../../../api";
import axiosInstance from "../../../../../services/api";

interface SubjectCardProps {
  del?: any;
  edit?: any;
  openClasses?: () => void;
  openTeachers?: () => void;
  color: string;
  subject: string;
  desc?: string;
  item: any;
  newchange?: any;
  teacher?: boolean
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  edit,
  color,
  subject,
  desc,
  openClasses,
  openTeachers,
  item,
  del,
  newchange,
  teacher,
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const userInfo = useSelector((state: any) => state.gods.auth.userInformation);
  const schoolSubjects = useSelector(
    (state: any) => state.gods.school.schoolSubject
  );
  const dispatch = useDispatch();
  const [allsubjclass, setallsubjclass] = useState([]);
  const [allsubjTeachers, setallsubjTeachers] = useState([]);
  const config = configure(userInfo.token);

  //get subject classes
  const fetchsubjectClass = async () => {
    try {
      // const val = await getAllSubjectsClass(item.id, config);
      const val = await getSubjectClasses(item.id);
      // console.log(val);
      setallsubjclass(val?.data?.Classes);
      // console.log(val.data.data);

      // dispatch(schoolActions.saveSubjectClass(val.data.data.Classes));
    } catch (error: any) { }
  };

  //get subject Teachers
  const fetchsubjectTeachers = async () => {
    try {
      // const val = await getAllSubjectsTeachers(item.id, config);
      const val = await axiosInstance.get('https://api.hellotioo.com/subjects/teachers/read/' + item.id)
      setallsubjTeachers(val.data.data.teachers);
      // dispatch(schoolActions.saveSubjectTeacher(val.data.data.teachers));
    } catch (error: any) { }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    fetchsubjectClass();
    fetchsubjectTeachers();

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [newchange, item]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="w-full rounded-[8px] flex flex-col overflow-hidden shadow-md border border-black border-opacity-10">
      <div className={`w-full p-4 ${color}`}>
        <div className="flex items-center justify-between pb-4">
          <h3 className="text-white text-[18px] font-medium leading-[27px]">
            {subject}
          </h3>
          <div className="relative" ref={dropdownRef}>
            {!teacher && (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown();
                }}
                className="cursor-pointer"
              >
                <HiDotsVertical className="text-white text-[20px]" />
              </div>
            )}
            {isOpen && (
              <div
                className={`absolute right-[-8px] w-[120px] mt-3 origin-top-right bg-[#fff] border border-gray-200 divide-y divide-gray-100 rounded-[8px] shadow-lg py-1 z-50 ${isOpen ? "block" : "hidden"
                  }`}
              >
                <div className="w-full divide-y-1 divide-gray-100 cursor-pointer">
                  <div
                    className="flex items-center px-5 py-2  opacity-50 hover:bg-gray-100"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDropdown();
                      edit();
                    }}
                  >
                    <RiEdit2Line size={20} className="mr-2 text-[#87909E]" />
                    <span className="text-[#030036] opacity-90 text-[14px]">
                      {" "}
                      Edit
                    </span>
                  </div>
                </div>
                <div className="w-full divide-y-1 divide-gray-100 cursor-pointer">
                  <div
                    className="flex items-center px-5 py-2  opacity-50 hover:bg-gray-100"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDropdown();
                      del();
                    }}
                  >
                    <RiDeleteBin5Line
                      size={20}
                      className="mr-2 text-[#87909E]"
                    />
                    <span className="text-[#030036] opacity-90 text-[14px]">
                      {" "}
                      Delete
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <p className="text-white leading-[18px] text-[12px]">{desc}</p>
      </div>
      <div className="bg-[#fff] w-full p-4 flex items-center justify-between">
        <div
          className="flex items-start justify-start flex-col hover:rounded-[4px] hover:bg-opacity-40 hover:bg-gray-200 p-2 w-full cursor-pointer"
          onClick={openClasses}
        >
          <h4 className="text-[14px] text-[#87909E] text-normal">Classes</h4>
          <p className="py-1 text-black text-[14px] leading-[21px]">
            {allsubjclass?.length}
          </p>
        </div>
        <div
          className="flex items-start justify-start flex-col hover:rounded-[4px] hover:bg-opacity-40 hover:bg-gray-200 p-2 w-full cursor-pointer"
          onClick={openTeachers}
        >
          <h4 className="text-[14px] text-[#87909E] text-normal">Teachers</h4>
          <p className="py-1 text-black text-[14px] leading-[21px]">
            {allsubjTeachers?.length}
          </p>
        </div>
        <div className="flex items-start justify-start flex-col hover:rounded-[4px] hover:bg-opacity-40 hover:bg-gray-200 p-2 w-full">
          <h4 className="text-[14px] text-[#87909E] text-normal">Lessons</h4>
          <p className="py-1 text-black text-[14px] leading-[21px]">0</p>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
