import React, { useState, ChangeEvent, useEffect } from "react";
import { RiSearchLine } from "react-icons/ri";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
type SelectFieldProps = {
  label?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  type?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: "small" | "default";
  value?: any;
  variant?: "white" | "default";
  data?: any;
  onSelectedDataChange?: any;
};
export interface SelectData {
    id : any;
  label: string;
}

export const SingleLevelSelect: React.FC<SelectFieldProps> = ({
  label,
  variant,
  onChange,
  data,
  onSelectedDataChange,
}) => {
  const [selectData, setSelectData] = useState<SelectData[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedData, setSelectedData] = useState<string[]>([]);
  const [selectedDataPreview, setSelectedDataPreview] = useState<string[]>([]);


  const handleCheckboxChange = (id: string): void => {
    setSelectedData((prevSelectedData) => {
      if (prevSelectedData.includes(id)) {
        return prevSelectedData?.filter((dataId) => dataId !== id);
      } else {
        return [...prevSelectedData, id];
      }
    });
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };
  const selectedDataList = () => {
    const list = selectedData.map((selected) => {
      const primary = data.filter((item : any) => item.id == selected)[0];
      return primary.label;
    });
    setSelectedDataPreview(list);
  };

  const [filteredData, setFilteredData] = useState<SelectData[]>([]);

  useEffect(() => {
    // Dispatch or use selectedTeachers as needed
    // console.log("Selected teachers:", selectedTeachers);
    if(!data.length){
      setSelectedData([]);
    }
    setFilteredData(data?.filter((item : SelectData) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }, [data]);

  useEffect(()=>{
      onSelectedDataChange(selectedData);
      selectedDataList();
  },[selectedData])


  return (
    <div className="py-4 ">
      <label
        className={`text-sm font-medium ${
          variant === `white`
            ? `font-normal text-[#87909E] text-base`
            : `text-sm font-medium text-[#4A5568]`
        }`}
      >
        {label}*
      </label>
      <div>
        <div
          className=" w-full mt-2 min-h-[43px] rounded-[8px] border border-black cursor-pointer border-opacity-20 shadow overflow-hidden px-3 py-2 flex items-center justify-start"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div>
            {selectedDataPreview.map(item => (
              <p className="text-sm">
                {item}
              </p>
            ))}
          </div>
          <div className="flex grow rounded-[8px] overflow-hidden items-center justify-end">
            {isOpen ? (
              <FaAngleUp className="text-[20px] text-black opacity-50" />
            ) : (
              <FaAngleDown className="text-[20px] text-black opacity-50" />
            )}
          </div>
        </div>
        {isOpen && (
          <div className="mt-[5px] w-full border border-black border-opacity-20 shadow-md p-4 rounded-[8px]">
            <div className="flex items-center w-full py-2 border-b border-black border-opacity-20">
              <RiSearchLine className="text-[20px] text-black text-opacity-50" />
              <input
                type="text"
                placeholder="Search..."
                className="focus:outline-none ml-2 text-base bg-white w-full"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="mt-[10px] w-full h-52 overflow-y-auto scrollbar-track-blue-200 scrollbar-thumb-blue-500 multi-scroll">
              {filteredData?.map((data, index) => (
                <div className="w-full py-1 my-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center ">
                      <input
                        type="checkbox"
                        className="h-[15px] w-[15px]"
                        checked={selectedData.includes(data.id)}
                        onChange={() => handleCheckboxChange(data.id)}
                      />
                      <h3 className="text-[#87909E] opacity-70 text-[14px] font-normal pl-4">
                        {data.label}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
