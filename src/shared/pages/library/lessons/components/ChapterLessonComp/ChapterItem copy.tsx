import React, { FC, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import TopicContainer from "./TopicContainer";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import CenterModal from "@/components/CenterModal";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { HiOutlineUserGroup } from "react-icons/hi";
import EditLessonArms from "../UploadLesson/AddArms";

interface Props {
  index?: number;
  item: any;
  data: any;
  refetch: (val: any, filter: any) => void;
}
const ChapterItem: FC<Props> = ({ index, item, data, refetch }) => {
  const [isClosed, setClosed] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const [isClosedTwo, setClosedTwo] = useState<boolean>(false);
  const [openTwo, setOpenTwo] = useState<boolean>(true);
  const [isClosedThree, setClosedThree] = useState<boolean>(false);
  const [openThree, setOpenThree] = useState<boolean>(true);
  // eslint-disable-next-line
  const [active, setActive] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (item: any, tabId: number): void => {
    setActive(true);
    setActiveTab(tabId);
  };

  const closeContainer = () => {
    setClosed(true);
    setTimeout(() => {
      setOpen(!open);
      setClosed(false);
    }, 450);
  };
  const closeContainerTwo = () => {
    setClosedTwo(true);
    setTimeout(() => {
      setOpenTwo(!openTwo);
      setClosedTwo(false);
    }, 450);
  };
  const closeContainerThree = () => {
    setClosedThree(true);
    setTimeout(() => {
      setOpenThree(!openThree);
      setClosedThree(false);
    }, 450);
  };
  const firstTerm = item[0]?.Lessons?.filter((where: any) => where.term === 1);
  const secondTerm = item[0]?.Lessons?.filter((where: any) => where.term === 2);
  const thirdTerm = item[0]?.Lessons?.filter((where: any) => where.term === 3);

  // console.log(item)
  return (<></>)
  // return (
  //   <>
  //     <div>
  //       {!!firstTerm.length && (
  //         <div className="shadow rounded-xl overflow-hidden">
  //           <div className="bg-[#F6F6F6] p-3 lg:px-6 rounded-t-xl py-4 flex items-center justify-between">
  //             <p className="font-semibold text-xl text-[#030036BD]">
  //               First Term
  //             </p>
  //             <Menu placement="bottom-end">
  //               <MenuHandler>
  //                 <Button className="bg-transparent px-0 mx-0 hover:shadow-none text-md flex items-center font-normal shadow-none text-black capitalize">
  //                   <BsThreeDotsVertical className="text-[#030036BD] text-2xl" />
  //                 </Button>
  //               </MenuHandler>
  //               <MenuList>
  //                 <MenuItem
  //                   className="flex gap-x-2 items-center"
  //                   onClick={() => toggleTab(item.id, 1)}
  //                 >
  //                   <HiOutlineUserGroup className="text-xl" />
  //                   Edit Class Arm
  //                 </MenuItem>
  //               </MenuList>
  //             </Menu>
  //           </div>
  //           <div className="px-3 py-4 lg:px-6 shadow">
  //             <p className="text-[#87909E] fs-500">{data?.description}</p>
  //           </div>
  //           {open && (
  //             <div className={`${isClosed ? "dropoff" : "dropin"}`}>
  //               <div className="p-6 shadow">
  //                 <TopicContainer lesson={firstTerm} refetch={refetch} naming={item[0].naming} />
  //               </div>
  //             </div>
  //           )}
  //           <div className="flex justify-between items-center lg:px-6 lg:py-4 p-3 shadow rounded-b-xl">
  //             <p className="bg-[#4F46E5] rounded-lg px-6 py-2 text-white cursor-pointer">
  //               Set Test/Exam
  //             </p>
  //             <div>
  //               {open ? (
  //                 <FaAngleUp
  //                   className="text-xl cursor-pointer"
  //                   onClick={closeContainer}
  //                 />
  //               ) : (
  //                 <FaAngleDown
  //                   className="text-xl cursor-pointer"
  //                   onClick={() => setOpen(true)}
  //                 />
  //               )}
  //             </div>
  //           </div>
  //         </div>
  //       )}
  //       {!!secondTerm.length && (
  //         <div className="shadow rounded-xl mt-6 lg:mt-12 overflow-hidden">
  //           <div className="bg-[#F6F6F6] p-3 lg:px-6 rounded-t-xl py-4 flex items-center justify-between">
  //             <p className="font-semibold text-xl text-[#030036BD]">
  //               Second Term
  //             </p>
  //             {
  //               !firstTerm.length && (
  //                 <Menu placement="bottom-end">
  //                   <MenuHandler>
  //                     <Button className="bg-transparent px-0 mx-0 hover:shadow-none text-md flex items-center font-normal shadow-none text-black capitalize">
  //                       <BsThreeDotsVertical className="text-[#030036BD] text-2xl" />
  //                     </Button>
  //                   </MenuHandler>
  //                   <MenuList>
  //                     <MenuItem
  //                       className="flex gap-x-2 items-center"
  //                       onClick={() => toggleTab(item.id, 1)}
  //                     >
  //                       <HiOutlineUserGroup className="text-xl" />
  //                       Edit Class Arm
  //                     </MenuItem>
  //                   </MenuList>
  //                 </Menu>
  //               )
  //             }
  //           </div>
  //           <div className="px-3 py-4 lg:px-6 shadow">
  //             <p className="text-[#87909E] fs-500">{data?.description}</p>
  //           </div>
  //           {openTwo && (
  //             <div className={`${isClosedTwo ? "dropoff" : "dropin"}`}>
  //               <div className="p-6 shadow">
  //                 <TopicContainer lesson={secondTerm} refetch={refetch} naming={item[0].naming} />
  //               </div>
  //             </div>
  //           )}
  //           <div className="flex justify-between items-center lg:px-6 lg:py-4 p-3 shadow rounded-b-xl">
  //             <p className="bg-[#4F46E5] rounded-lg px-6 py-2 text-white cursor-pointer">
  //               Set Test/Exam
  //             </p>
  //             <div>
  //               {openTwo ? (
  //                 <FaAngleUp
  //                   className="text-xl cursor-pointer"
  //                   onClick={closeContainerTwo}
  //                 />
  //               ) : (
  //                 <FaAngleDown
  //                   className="text-xl cursor-pointer"
  //                   onClick={() => setOpenTwo(true)}
  //                 />
  //               )}
  //             </div>
  //           </div>
  //         </div>
  //       )}
  //       {!!thirdTerm.length && (
  //         <div className="shadow rounded-xl mt-6 lg:mt-12 overflow-hidden">
  //           <div className="bg-[#F6F6F6] p-3 lg:px-6 rounded-t-xl py-4 flex items-center justify-between">
  //             <p className="font-semibold text-xl text-[#030036BD]">
  //               Third Term
  //             </p>
  //             {
  //               (!firstTerm.length && !secondTerm.length) && (
  //                 <Menu placement="bottom-end">
  //                   <MenuHandler>
  //                     <Button className="bg-transparent px-0 mx-0 hover:shadow-none text-md flex items-center font-normal shadow-none text-black capitalize">
  //                       <BsThreeDotsVertical className="text-[#030036BD] text-2xl" />
  //                     </Button>
  //                   </MenuHandler>
  //                   <MenuList>
  //                     <MenuItem
  //                       className="flex gap-x-2 items-center"
  //                       onClick={() => toggleTab(item.id, 1)}
  //                     >
  //                       <HiOutlineUserGroup className="text-xl" />
  //                       Edit Class Arm
  //                     </MenuItem>
  //                   </MenuList>
  //                 </Menu>
  //               )
  //             }
  //           </div>
  //           <div className="px-3 py-4 lg:px-6 shadow">
  //             <p className="text-[#87909E] fs-500">{data?.description}</p>
  //           </div>
  //           {openThree && (
  //             <div className={`${isClosedThree ? "dropoff" : "dropin"}`}>
  //               <div className="p-6 shadow">
  //                 <TopicContainer lesson={thirdTerm} refetch={refetch} naming={item[0].naming} />
  //               </div>
  //             </div>
  //           )}
  //           <div className="flex justify-between items-center lg:px-6 lg:py-4 p-3 shadow rounded-b-xl">
  //             <p className="bg-[#4F46E5] rounded-lg px-6 py-2 text-white cursor-pointer">
  //               Set Test/Exam
  //             </p>
  //             <div>
  //               {openThree ? (
  //                 <FaAngleUp
  //                   className="text-xl cursor-pointer"
  //                   onClick={closeContainerThree}
  //                 />
  //               ) : (
  //                 <FaAngleDown
  //                   className="text-xl cursor-pointer"
  //                   onClick={() => setOpenThree(true)}
  //                 />
  //               )}
  //             </div>
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //     <CenterModal
  //       isOpen={activeTab === 1}
  //       onClose={() => setActiveTab(0)}
  //       variant={"small"}
  //     >
  //       <EditLessonArms
  //         close={() => setActiveTab(0)}
  //         item={item}
  //         refetch={refetch}
  //       />
  //     </CenterModal>
  //   </>
  // );
};

export default ChapterItem;
