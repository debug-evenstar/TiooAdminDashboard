import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../../../../services/api";
import { BASE_URL } from "../../../../../services/url";


interface SubjectCardProps {

  color: string;
  subject: string;
  desc?: string;
  item: any;
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  color,
  subject,
  desc,
  item,
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);


  const [allsubjclass, setallsubjclass] = useState<any>();
  const [allsubjTeachers, setallsubjTeachers] = useState<any>();
  const [lessons, setLessons] = useState<any>();

  // const { id } = useParams();

  useEffect(() => {
    axiosInstance.get(`${BASE_URL}/subjects/classes/read/${item.id}`)
      .then(response => setallsubjclass(response.data.data))
      .catch(error => console.log(error));
    axiosInstance.get(`${BASE_URL}/subjects/teachers/read/${item.id}`)
      .then(response => setallsubjTeachers(response.data.data))
      .catch(error => console.log(error));

    axiosInstance.get(`${BASE_URL}/subjects/lessons/${item.id}`)
      .then(response => {
        console.log(response.data.data);
        setLessons(response.data.data)
      })
      .catch(error => console.log(error));

  }, []);


  return (
    <div className="w-full rounded-[8px] flex flex-col overflow-hidden shadow-md border border-black border-opacity-10">
      <div className={`w-full p-4 ${color}`}>
        <div className="flex items-center justify-between pb-4">
          <h3 className="text-white text-[18px] font-medium leading-[27px]">
            {subject}
          </h3>
          <div className="relative" ref={dropdownRef}>


          </div>
        </div>
        <p className="text-white leading-[18px] text-[12px]">{desc}</p>
      </div>
      <div className="bg-[#fff] w-full p-4 flex items-center justify-between">
        <div
          className="flex items-start justify-start flex-col hover:rounded-[4px] hover:bg-opacity-40 hover:bg-gray-200 p-2 w-full cursor-pointer"
        >
          <h4 className="text-[14px] text-[#87909E] text-normal">Classes</h4>
          <p className="py-1 text-black text-[14px] leading-[21px]">
            {allsubjclass?.Classes.length}
          </p>
        </div>
        <div
          className="flex items-start justify-start flex-col hover:rounded-[4px] hover:bg-opacity-40 hover:bg-gray-200 p-2 w-full cursor-pointer"
        >
          <h4 className="text-[14px] text-[#87909E] text-normal">Teachers</h4>
          <p className="py-1 text-black text-[14px] leading-[21px]">
            {allsubjTeachers?.teachers.length}
          </p>
        </div>
        <div className="flex items-start justify-start flex-col hover:rounded-[4px] hover:bg-opacity-40 hover:bg-gray-200 p-2 w-full">
          <h4 className="text-[14px] text-[#87909E] text-normal">Lessons</h4>
          <p className="py-1 text-black text-[14px] leading-[21px]">
            {lessons?.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
