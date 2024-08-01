import React, {
  useRef,
  useState,
  useCallback,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
  FocusEvent,
  useEffect,
} from "react";
import { RiEyeLine, RiEyeOffLine, RiSearchLine } from "react-icons/ri";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { stringify } from "querystring";
import { tryInt } from "@/utilities/string";

interface SelectLevelOne {
  id: any;
  label: string;
  children: SelectLevelTwo[];
}

interface SelectLevelTwo {
  id: any;
  label: string;
}

type MultiSelectFieldProps = {
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
  onSelectedDataChange?: any;
};

export const MultiLevelSelect: React.FC<MultiSelectFieldProps> = ({
  label,
  variant,
  data,
  onSelectedDataChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState<boolean[]>(Array(data?.length).fill(false));
  const [filteredData, setFilteredData] = useState<SelectLevelOne[]>(data);
  const [selectedLevelOne, setSelectedLevelOne] = useState<any[]>([]);
  const [selectedLevelTwo, setSelectedLevelTwo] = useState<any[]>([]);
  const [selectedPairs, setSelectedPairs] = useState<Record<string, string[]>>(
    {}
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedDataPreview, setSelectedDataPreview] = useState<any[]>([]);

  useEffect(() => {
    filterData();
  }, [searchTerm]);

  const handleLevelOneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const parseValue = tryInt(value);
    setSelectedLevelOne((prevSelectedLevelOne) =>
      checked
        ? [...prevSelectedLevelOne, parseValue]
        : prevSelectedLevelOne?.filter((item) => item !== parseValue)
    );

    const currentData = data.filter((item) => item.id == parseValue)[0];

    const dataChildren = currentData.children.map((child) => child.id);

    setSelectedLevelTwo((levelTwoData) =>
      checked
        ? [...levelTwoData, ...dataChildren]
        : [...levelTwoData.filter((item) => !dataChildren.includes(item))]
    );

    if(checked){
      setSelectedPairs((prevSelectedPairs) => ({
        ...prevSelectedPairs,
        [parseValue]: [...(prevSelectedPairs[parseValue] || []), ...dataChildren],
      }));
    }else{
      let clone = {...selectedPairs};
      delete clone[parseValue];
      setSelectedPairs(clone);
    }
    // console.log(selectedLevelOne);
  };

  const handleLevelTwoChange = (
    event: ChangeEvent<HTMLInputElement>,
    parent: any,
    value: any
  ) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedLevelTwo((prevSelectedLevelTwo) => [
        ...prevSelectedLevelTwo,
        value,
      ]);
      setSelectedPairs((prevSelectedPairs) => ({
        ...prevSelectedPairs,
        [parent]: [...(prevSelectedPairs[parent] || []), value],
      }));
      if (!selectedLevelOne.includes(parent)) {
        setSelectedLevelOne((prevSelectedLevelOne) => [
          ...prevSelectedLevelOne,
          parent,
        ]);
      }
    } else {
      setSelectedLevelTwo((prevSelectedLevelTwo) =>
        prevSelectedLevelTwo?.filter(
          (item) => !(item === value && selectedLevelOne.includes(parent))
        )
      );
      setSelectedPairs((prevSelectedPairs) => {
        const updatedPairs = { ...prevSelectedPairs };
        if (updatedPairs[parent]) {
          updatedPairs[parent] = updatedPairs[parent]?.filter(
            (item) => item !== value
          );
          if (updatedPairs[parent].length === 0) {
            delete updatedPairs[parent];
            setSelectedLevelOne((data) => data?.filter((item) => item !== parent));
          }
        }
        return updatedPairs;
      });
    }
  };
  // onSelectedDataChange(selectedLevelOne, selectedLevelTwo);
  const handleToggleOpen = (index: number) => {
    setOpen((prevOpen) => {
      const updatedOpen = [...prevOpen];
      updatedOpen[index] = !updatedOpen[index];
      return updatedOpen;
    });
  };

  const filterData = () => {
    const filtered = data?.filter((classData: any) =>
      classData.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const selectedDataList = () => {
    const list = Object.keys(selectedPairs).map((pair)=>{
      const primary = data.filter((item) => item.id == pair)[0];
      const primaryLabel = primary.label;
      const childrenLabel = selectedPairs[pair].map((child) => {
        const childLabel = primary.children.filter((item) => item.id == child)[0].label;
        return childLabel;
      }).join(", ");
      return childrenLabel != ""
        ? `${primaryLabel} - ${childrenLabel}`
        : primaryLabel;
    })
    setSelectedDataPreview(list)
  };

  useEffect(() => {
    if (onSelectedDataChange && typeof onSelectedDataChange === "function") {
      onSelectedDataChange(selectedLevelOne, selectedLevelTwo);
    }
    selectedDataList();
  }, [selectedPairs]);


  return (
    <div className="py-4">
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
          className="w-full h-auto min-h-[43px] mt-2 rounded-[8px] border border-black cursor-pointer border-opacity-20 shadow overflow-hidden h-[43px] px-3 py-2 flex items-center justify-start"
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
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="mt-[20px] w-full h-52 overflow-y-auto scrollbar-track-blue-200 scrollbar-thumb-blue-500 multi-scroll">
              {filteredData?.map((data, index) => (
                <div
                  key={data.id}
                  className="w-full bg-white shadow-md border-[0.5px] border-black border-opacity-20 px-5 py-3 rounded-[4px] my-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-[15px] w-[15px]"
                        value={data.id}
                        checked={selectedLevelOne.includes(data.id)}
                        onChange={handleLevelOneChange}
                      />
                      <h3 className="text-[#87909E] opacity-70 text-[14px] font-normal pl-4">
                        {data.label}
                      </h3>
                    </div>
                    <div
                      className="cursor-pointer hover:rounded-[4px] hover:bg-opacity-40 hover:bg-gray-200"
                      onClick={() => handleToggleOpen(index)}
                    >
                      {open[index] ? (
                        <FaAngleUp className="text-[20px] text-black opacity-50" />
                      ) : (
                        <FaAngleDown className="text-[20px] text-black opacity-50" />
                      )}
                    </div>
                  </div>
                  {open[index] && (
                    <div className="w-full flex flex-wrap mt-3">
                      {data?.children?.map((child) => (
                        <div
                          key={child.id}
                          className="flex items-center w-1/2 py-2"
                        >
                          <input
                            type="checkbox"
                            className="h-[15px] w-[15px]"
                            value={child.id}
                            checked={selectedLevelTwo.includes(child.id)}
                            onChange={(e) =>
                              handleLevelTwoChange(e, data.id, child.id)
                            }
                          />
                          <h3 className="text-[#87909E] opacity-70 text-[14px] font-normal pl-4">
                            {child.label}
                          </h3>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const parseDataForMultiSelect = (
  data: any,
  labelFields: string[],
  childrenFields: string[]
) => {
  const allParsing = (data: any, depth: any) => {
    if (depth > 0) {
      const parsed = data.map((item: any) => {
        item = {
          ...item,
          label: item[labelFields[labelFields.length - depth]],
        };
        if (depth > 1) {
          item = {
            ...item,
            children: allParsing(
              item[childrenFields[labelFields.length - depth]],
              depth - 1
            ),
          };
        }
        return item;
      });
      return parsed;
    } else {
      return data;
    }
  };

  return allParsing(data, labelFields.length);
};
