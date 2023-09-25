import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface StudentsProps {
  close: () => void;
  item: any;
}

const Students: React.FC<StudentsProps> = ({ close, item }) => {
  const [std, setstd] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setstd(item.Students);
  }, []);

  return (
    <div className="">
      <div className="flex w-full items-center justify-between border-b-[1px] py-4 px-[24px]">
        <h3 className="font-medium text-[20px] text-[#030036] opacity-70">
          Students
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
            Fetching Students...
          </h3>
        )}

        {std.length > 0 ? (std?.map((item: any) => (
          <div className="w-full py-3 border-b border-gray-200 last:border-none pl-[25px] text-[#030036] opacity-70">
            {item.Account.name}
          </div>
        ))) : (
          <div>
            <h3 className="pt-3 text-[15px] font-normal text-[#87909E] pl-[24px] pb-[20px]">
              No Student yet
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;
