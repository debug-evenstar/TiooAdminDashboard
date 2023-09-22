import React, { FC, useState } from "react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import {
  BsCalendarPlusFill,
  // BsCalendarPlusFill,
  BsDownload,
  BsThreeDotsVertical,
} from "react-icons/bs";
import CenterModal from "../../../../../components/CenterModal";
import ChooseTimelineModal from "../ChooseTimelineModal";
import DeleteLessonModal from "../DeleteLessonModal";
import PublishLesson from "../PublishLesson";
import MainLessonModal from "./MainLesson";
import UnPublishLesson from "../Unpublish";
import UnavailableLesson from "../UnavailableLesson";
import { RiDeleteBin5Line } from "react-icons/ri";
// import { MdLockOpen, MdLockOutline } from "react-icons/md";
import ChangeStatus from "../ChangeStatus";
import { MdLockOpen, MdLockOutline } from "react-icons/md";

interface Props {
  index: number;
  items: any;
  name: string;
  refetch: (val: any, filter: any) => void;
}
const TopicItem: FC<Props> = ({ items, index, name, refetch }) => {
  const [active, setActive] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [item, setItem] = useState("");
  const [lessonStatus, setLessonStatus] = useState('')

  const openModal = (item: any, tabId: number): void => {
    setActive(true);
    setActiveTab(tabId);
    setItem(item);
  };
  const openStatusModal = (item: any, tabId: number, status: string): void => {
    setActive(true);
    setActiveTab(tabId);
    setItem(item);
    setLessonStatus(status)
  };
  const closeModal = () => {
    setActive(false);
    setActiveTab(0);
  };

  // console.log(items);
  return (
    <>
      <div
        className="p-5 rounded-[8px] h-[130px] shadow grid content-between hover:scale-105 duration-100 cursor-pointer"
        onClick={items.admin_status === 'Locked' ? () => openModal(items, 4) : () => openModal(items, 4)}
      >
        <div className="flex justify-between">
          <p className="font-semibold text-[17px] text-[#030036BD]">
            {items.topic}
          </p>
          <div onClick={(e: any) => e.stopPropagation()}>
            <Menu placement="bottom-end">
              <MenuHandler>
                <Button className="bg-transparent px-0 mx-0 hover:shadow-none text-md flex items-center font-normal shadow-none text-black capitalize">
                  <BsThreeDotsVertical className="text-xl" />
                </Button>
              </MenuHandler>
              <MenuList>
                {/* {true && (items.published > 0 ? ( */}
                {items.library_status == "published" ?
                  <MenuItem
                    className="flex gap-x-2 items-center"
                    onClick={() => openModal(items, 5)}
                  >
                    <BsDownload className="text-lg" />
                    Retract Lesson
                  </MenuItem>
                  :
                  <MenuItem
                    className="flex gap-x-2 items-center"
                    onClick={() => openModal(items, 1)}
                  >
                    <BsDownload className="rotate-180 text-lg" />
                    Publish Lesson
                  </MenuItem>
                }
                {
                  items.status !== "Locked" &&
                  <MenuItem
                  className="flex gap-x-2 items-center"
                  onClick={() => openModal(items, 2)}
                >
                  <BsCalendarPlusFill />
                  Set Timeline
                </MenuItem>
                }
                {
                  items.status === "Locked" ? (
                    <MenuItem
                      className="flex gap-x-2 items-center"
                      onClick={() => openStatusModal(items, 7, "Unlocked")}
                    >
                      <MdLockOpen className="text-lg" />
                      Unlock Lesson
                    </MenuItem>
                  ) : (
                    <MenuItem
                      className="flex gap-x-2 items-center"
                      onClick={() => openStatusModal(items, 7, "Locked")}
                    >
                      <MdLockOutline className="text-lg" />
                      Lock Lesson
                    </MenuItem>
                  )
                }
                <MenuItem
                  className="flex gap-x-2 items-center bg-red-400 text-white"
                  onClick={() => openModal(items, 3)}
                >
                  <RiDeleteBin5Line />
                  Delete Lesson
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
        <p className="text-sm text-[#87909E]">{items.noOfSlides} slides</p>
      </div>
      <CenterModal
        isOpen={active}
        onClose={() => setActive(false)}
        variant={"small"}
      >
        {activeTab === 1 ? (
          <PublishLesson
            close={() => setActive(false)}
            item={item}
            name={name}
            refetch={refetch}
          />
        ) : activeTab === 2 ? (
          <ChooseTimelineModal close={() => setActive(false)} item={item} refetch={refetch} />
        ) : activeTab === 3 ? (
          <DeleteLessonModal close={() => setActive(false)} item={item} refetch={refetch} />
        ) : activeTab === 5 ? (
          <UnPublishLesson close={() => setActive(false)}
            refetch={refetch}
            item={item}
            name={name} />
        ) : activeTab === 6 ? (
          <UnavailableLesson close={() => setActive(false)}
            item={item} />
        ) : activeTab === 7 ? (<ChangeStatus close={() => setActive(false)} item={item} refetch={refetch} status={lessonStatus} />) :
          <></>}
      </CenterModal>
      <CenterModal
        isOpen={activeTab === 4}
        onClose={closeModal}
        variant={"wider"}
      >
        <MainLessonModal close={closeModal} item={item} />
      </CenterModal>
    </>
  );
};

export default TopicItem;
