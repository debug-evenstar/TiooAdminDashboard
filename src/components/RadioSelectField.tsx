import React, {
  useState,
} from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

interface SelectLevelOne {
  id: any;
  label: string;
  children : SelectLevelTwo[];
  naming: string
}

interface SelectLevelTwo {
  id: any;
  label: string;
}

type RadioSelectFieldProps = {
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
  data: SelectLevelOne[];
  onCheckboxChange?: any;
  checkedId?: any;
};

export const RadioSelect: React.FC<RadioSelectFieldProps> = ({
  label,
  variant,
  data,
  onCheckboxChange,
  checkedId
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState<boolean[]>(Array(data?.length).fill(false));

  const dataPreview = data.filter((item) => item.id === checkedId);
  

  return (
    <div className="py-3">
      <label
        className={`text-sm font-medium ${
          variant === "white"
            ? `font-normal text-[#87909E] text-base`
            : `text-sm font-medium text-[#4A5568]`
        }`}
      >
        {label}*
      </label>
      <div>
        <div
          className="w-full mt-2 rounded-[8px] border border-black cursor-pointer border-opacity-20 shadow overflow-hidden h-[43px] px-3 flex items-center justify-start"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div>
              <p className="text-sm">
                {dataPreview.length ? dataPreview[0].label || dataPreview[0].naming  : ""}
              </p>
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
            <div className="py-2 flex flex-col items-start">
              {
                data?.length === 0 && (
                  <div className="text-gray-500">
                    No items to select
                  </div>
                )
              }
              {data?.map((item: any, index: any) => (
                <div className="flex items-center pb-1" key={index}>
                  <input
                    type="radio"
                    className="h-[15px] w-[15px]"
                    checked={checkedId === item.id}
                    onChange={() => {onCheckboxChange(item.id); setIsOpen(false)}}
                  />
                  <h3 className="text-[#87909E] opacity-70 text-[14px] font-normal pl-2">
                    {item.label || item.naming}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
