import ClassCard from "./components/ClassCard";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../../services/api";
import { useParams } from "react-router-dom";

const getclassWithArms = (id: number) => {
  return axiosInstance.get(`/school/dashboard/home?school_id=${id}`);
};

function SchoolStudentsOld() {
  const [allclass, setallclass] = useState([]);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      const newId = Number.parseInt(id);
      getclassWithArms(newId).then((response) =>
        setallclass(response.data.data)
      );
    }
  }, []);

  const colors: string[] = [
    "border-[#FAB814]",
    "border-[#AE1E56]",
    "border-[#66C23A]",
    "border-[#222862]",
    "border-[#4214FA]",
    "border-[#9C18B1]",
    "border-[#148CFA]",
    "border-[#AE1E56]",
    "border-[#FA14D5]",
  ];

  return (
    <>
      <div className="w-full mx-auto mb-10">
        <div className="w-full flex items-start justify-start flex-col mt-7">
          <div className="flex w-full items-center justify-between">
            <h3 className="font-inter font-medium text-[#030036] opacity-70 text-[18px]">
              Classes
            </h3>
          </div>

          <div className="mt-[32px] w-full grid grid-cols-3 gap-[24px]">
            {allclass?.length > 0 &&
              allclass.map((item: any, index: any) => {
                const colorIndex = index % colors.length;
                const color = colors[colorIndex];
                return <ClassCard item={item} key={index} color={color} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default SchoolStudentsOld;
