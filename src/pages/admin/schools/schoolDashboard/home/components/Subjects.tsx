import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { subjects } from "../../../../../../data/data";
import { useSelector } from "react-redux";
import { getClassArmSubjects } from "../../../../../../api";

interface SubjectsProps {
  close: () => void;
  item: any;
}

const Subjects: React.FC<SubjectModalsProps> = ({ close, item }) => {
  const [loading, setLoading] = useState(false);
  const [armSubjects, setArmSubjects] = useState([]);
  const fetchSubjects = async () => {
    try {
      setArmSubjects(item.Subjects);
    } catch (error) {}
  };
  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <div className="">
      <div className="flex w-full items-center justify-between border-b-[1px] py-4 px-[24px]">
        <h3 className="font-medium text-[20px] text-[#030036] opacity-70">
          Subjects
        </h3>
        <div className="cursor-pointer" onClick={close}>
          <IoMdClose className="text-[22px] text-[#545454]" />
        </div>
      </div>
      <h3 className="pt-3 text-[12px] font-normal text-[#87909E] pl-[24px] pb-[20px]">
        {item.naming}
      </h3>
      <div className="h-[400px] overflow-y-auto scrollbar-track-blue-200 scrollbar-thumb-blue-500 multi-scrol">
        {loading && (
          <h3 className="py-3 text-[14px] font-medium text-[#030036] text-center opacity-70">
            Fetching Subjects...
          </h3>
        )}
        {armSubjects?.length > 0 ? (
          armSubjects.map((item: any, index: number) => (
            <div
              key={index}
              className="w-full py-3 border-b border-gray-200 last:border-none pl-[25px] text-[#030036] opacity-70"
            >
              {item.naming}
            </div>
          ))
        ) : (
          <div>
            {" "}
            <h3 className="pt-3 text-[15px] font-normal text-[#87909E] pl-[24px] pb-[20px]">
              No Subjects yet
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subjects;
