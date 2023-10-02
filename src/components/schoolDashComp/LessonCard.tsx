import React, { useState } from "react";
import PickClass from "./PickClass";
import CenterModal from "../modal/CenterModal";


interface LessonCardProps {
  color: string;
  subject: string;
  desc?: string;
  item: any;
}

const LessonCard: React.FC<LessonCardProps> = ({
  color,
  item,
}) => {
  // const dropdownRef = useRef<HTMLDivElement | null>(null);

  // const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [items, setItems] = useState<number>()

  const openGroups = (id: number) => {
    setItems(id)
    setActive(true)
  }

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       dropdownRef.current &&
  //       !dropdownRef.current.contains(event.target as Node)
  //     ) {
  //       setIsOpen(false);
  //     }
  //   };

  //   document.addEventListener("click", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  return (
    <>
      <div className="w-full rounded-[8px] flex flex-col overflow-hidden shadow-md border border-black border-opacity-10">
        <div className={`w-full p-4 ${color} h-32`}>
          <div className="flex items-center justify-between pb-4">
            <h3 className="text-white text-[18px] font-medium leading-[27px]">
              {item.naming}
            </h3>
          </div>
          <p className="text-white leading-[18px] text-[12px]">{item.description}</p>
        </div>
        <div className="bg-white w-full py-2 px-4 flex items-center justify-between">
          <div
            className="flex items-start justify-start flex-col hover:rounded-[4px] hover:bg-opacity-40 hover:bg-gray-200 p-2 w-full cursor-pointer"
            onClick={() => false}
          >
            <h4 className="text-[14px] text-[#87909E] text-normal">
              Lessons uploaded
            </h4>
            <p className="py-1 text-black text-[14px] leading-[21px]">{item?.lessons}</p>
          </div>
        </div>
        <div className="px-4 flex pb-4 gap-4">
          <div className={`w-full border border-[#4F46E5] rounded-[8px] h-[47px] flex items-center justify-center cursor-pointer text-[#4F46E5]  font-semibold font-inter text-base ${item?.lessons > 0 ? "" : "opacity-40"}`} onClick={item?.lessons > 0 ? () => openGroups(item.id) : () => false}>
            View lessons
          </div>
        </div>
      </div>
      <CenterModal
        isOpen={active}
        onClose={() => setActive(false)}
        variant={"small"}
      >
        <PickClass id={items} close={() => setActive(false)} />
      </CenterModal>
    </>
  );
};

export default LessonCard;
