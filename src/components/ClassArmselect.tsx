import React, { useState, useEffect, ChangeEvent } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { RiEyeLine, RiEyeOffLine, RiSearchLine } from "react-icons/ri";

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
  multiple? : boolean,
  onSelectedDataChange?: any;
  oneSelect?: boolean
};


interface classArm {
  id: any;
  naming: string;
  ClassId: any;
}

export const ClassArmSelectField: React.FC<SelectFieldProps> = ({
  label,
  variant,
  onChange,
  data,
  multiple = true,
  onSelectedDataChange,
  oneSelect
}) => {
  const classArmData: classArm[] = data;
  const [isOpen, setIsOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedPreview, setSelectedPreview] = useState<string[]>([]);

  const handleCheckboxChange = (id: any): void => {
    let items:any = [];
    if(multiple){
      setSelectedItems((prevSelectedItems) => {
        if (prevSelectedItems.includes(id)) {
          items = prevSelectedItems?.filter((itemId) => itemId !== id);
          return items;
        } else {
          items = [...prevSelectedItems, id];
          return items;
        }
      });
      setSelectedPreview(() => {
        const preview = data.filter((item:any) => items.includes(item.id)).map((itm:any) => itm.naming);
        return preview;
      });
    }else{
      setSelectedItems([id]);
      setSelectedPreview(() => data.filter((arm:any) => arm.id == id)[0].naming)
    }

  };
  

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  const filteredClassarm = classArmData?.filter((classarm) =>
    classarm.naming.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
  if(oneSelect){
  setSelectedItems([])
  setSelectedPreview([])
  }
  }, [data])
  useEffect(() => {
    onSelectedDataChange(selectedItems);
    // Dispatch or use selectedItems as needed
  }, [selectedItems]);

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
          className=" w-full mt-2 rounded-[8px] border border-black cursor-pointer border-opacity-20 shadow overflow-hidden min-h-[43px] px-3 flex items-center justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          {(multiple && selectedItems) && <div className="flex gap-x-2">
            {selectedPreview.map((name)=>(
              <p key={name}>{name}</p>
            ))}
          </div>}

          {!multiple && (<p>{selectedPreview}</p>)}
          {isOpen ? (
            <FaAngleUp className="text-[20px] text-black opacity-50" />
          ) : (
            <FaAngleDown className="text-[20px] text-black opacity-50" />
          )}
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
              {filteredClassarm?.map((classarm, index) => (
                <div className="w-full py-1 my-2" key={index}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center ">
                      <input
                        type="checkbox"
                        className="h-[15px] w-[15px]"
                        checked={selectedItems.includes(classarm.id)}
                        onChange={() => handleCheckboxChange(classarm.id)}
                      />
                      <h3 className="text-[#87909E] opacity-70 text-[14px] font-normal pl-4">
                        {classarm.naming}
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
