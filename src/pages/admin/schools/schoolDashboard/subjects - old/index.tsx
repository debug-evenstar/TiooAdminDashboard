import { useState, useEffect } from "react";
import SubjectCard from "./components/SubjectCard";

import { useParams } from "react-router-dom";
import axiosInstance, { getSchoolSubjects } from "../../../../../services/api";

function SchoolSubjects() {
  const [schoolSubjects, setSchoolSubjects] = useState<any>();
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const getAllSubjects = (id: any) => {
    getSchoolSubjects(id)
      .then((response) => {
        setLoading(false);
        setSchoolSubjects(response?.data.data);
        // setSubjects(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    getAllSubjects(Number(id));
  }, []);

  const colors: string[] = [
    "bg-[#AE1E56]",
    "bg-[#776DB4]",
    "bg-[#148CFA]",
    "bg-[#DDA0DD]",
    "bg-[#681AB0]",
    "bg-[#330072]",
    "bg-[#4F46E5]",
  ];

  return (
    <>
      <div className="w-full mx-auto">
        <div className="w-full flex items-start justify-start flex-col mt-[20px]">
          {}
          {/* {loading && schoolSubjects?.length == 0 && <LoadingCompo />} */}
          {schoolSubjects?.length > 0 ? (
            <h3 className="font-inter font-medium text-[#030036] opacity-70 text-[22px]">
              My Subjects (
              {schoolSubjects?.length > 0
                ? schoolSubjects?.length
                : schoolSubjects?.length
                ? schoolSubjects?.length
                : 0}
              )
            </h3>
          ) : (
            !loading &&
            schoolSubjects?.length < 1 && (
              <h3 className="font-inter font-medium text-[#030036] opacity-70 text-[22px]">
                You haven't added any subjects
              </h3>
            )
          )}
          <div className="mt-[32px] w-full grid grid-cols-3 gap-[24px]">
            {schoolSubjects?.map((item: any, index: number) => {
              const colorIndex = index % colors.length;
              const color = colors[colorIndex];

              return (
                <SubjectCard
                  item={item}
                  subject={item.naming}
                  desc={item.description}
                  color={color}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default SchoolSubjects;
