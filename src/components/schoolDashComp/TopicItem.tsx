import { FC, useState } from "react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import {
  BsDownload,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { RiShareBoxLine, RiShareForwardLine } from "react-icons/ri";
import { downloadLessonFile } from "../../services/api";
import CenterModal from "../modal/CenterModal";
import PublishLesson from "./PublishLesson";
import UploadTemplateForm from "./UploadTemplate";

interface Props {
  index: number;
  items: any;
  name: string;
  refetch: () => void;
}
const TopicItem: FC<Props> = ({ items, refetch }) => {
  const [active, setActive] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [item, setItem] = useState("");

  const openModal = (item: any, tabId: number): void => {
    setActive(true);
    setActiveTab(tabId);
    setItem(item);
  };
  const closeModal = () => {
    setActive(false);
    setActiveTab(0);
  };

  const downloadLesson = async (items:any) => {

    await downloadLessonFile(items.id)
    .then((res:any) => {
      const url = URL.createObjectURL(res.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${items.topic}`;
      a.click();
      URL.revokeObjectURL(url);
    })
  }
  return (
    <>
      <div
        className="p-5 rounded-[8px] h-[130px] shadow grid content-between hover:scale-105 duration-100 cursor-pointer"
        onClick={items.admin_status === 'Locked'? () => openModal(items, 6) : () => openModal("hello", 4)}
      >
        <div className="flex justify-between">
          <p className="font-semibold text-[17px] text-[#030036BD]" title={items.topic}>
            {
              items.topic.length > 25
                ? items.topic.slice(0,25)+'...'
                : items.topic
            }
          </p>
          <div onClick={(e: any) => e.stopPropagation()}>
            <Menu placement="bottom">
              <MenuHandler>
                <Button className="bg-transparent px-0 mx-0 hover:shadow-none text-md flex items-center font-normal shadow-none text-black capitalize">
                  <BsThreeDotsVertical className="text-xl" />
                </Button>
              </MenuHandler>
              <MenuList>
                <MenuItem
                  className="flex gap-x-2 items-center"
                  onClick={() => downloadLesson(items)}
                >
                  <BsDownload className="text-lg" />
                  Download Lesson
                </MenuItem>
                <MenuItem
                  className="flex gap-x-2 items-center"
                  onClick={() => openModal(items.id, 2)}
                >
                  <BsDownload className="text-lg rotate-180" />
                  Upload Template
                </MenuItem>
                {items.admin_status !== "Locked" ? (
                  <MenuItem
                    className="flex gap-x-2 items-center"
                  >
                    <RiShareForwardLine className="text-lg" />
                    Lesson Published
                  </MenuItem>
                ) : (
                  <MenuItem
                    className="flex gap-x-2 items-center"
                    onClick={() => openModal(items, 1)}
                  >
                    <RiShareBoxLine className="text-lg" />
                    Publish to school
                  </MenuItem>
                )}
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
            close={closeModal}
            item={item}
            refetch={refetch}
          /> 
        ): activeTab === 2 ? (
          <UploadTemplateForm id={item} close={closeModal}/>
        ) : 
        <></>}
      </CenterModal>
    </>
  );
};

export default TopicItem;
