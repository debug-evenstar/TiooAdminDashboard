import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FiEdit, FiUsers, FiBookOpen } from "react-icons/fi";
import { GiTeacher } from "react-icons/gi";
import { RiDeleteBin5Line, RiEdit2Line, RiBookLine } from "react-icons/ri";
import { HiDotsVertical } from "react-icons/hi";
import { alertActions } from "../../../../../../components/alertActions";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  getclassSubjcts,
  getclassTeacher,
  getclassWithArmsbyClassID,
} from "../../../../../../services/authServices";
import { useDispatch } from "react-redux";
import { classActions } from "../../../../../../store/classSlice";
import { configure } from "../../../../../../services/config";
import CenterModal from "../../../../../../components/CenterModal";
import DeleteClassArmModal from "./DeleteClassArm";
import EditClassArm from "./EditClassArm";
import { getClassArmsByClass } from "../../../../../../api";

interface AllClassProps {
  close: () => void;
  students: (arm: any) => void;
  teachers: (arm: any) => void;
  subjects: (arm: any) => void;
  item: any;
  didchangeedit: any;
}

interface Data {
  id: number;
  name: string;
}
const AllClass: React.FC<AllClassProps> = ({
  close,
  students,
  teachers,
  subjects,
  item,
  didchangeedit,
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  const [classArms, setClassArms] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [active, setActive] = useState(false);
  const [allclassItems, setallClassItems] = useState("");
  const [nchange, setchange] = useState(1);
  const userInfo = useSelector((state: any) => state.gods.auth.userInformation);
  const classInfo = useSelector(
    (state: any) => state.gods.class.classInformation
  );

  const config = configure(userInfo.token);

  const fetchClassArms = async () => {
    try {
      const arms = await getClassArmsByClass(item.id);
      setClassArms(arms.data);
    } catch (error: any) {
      !error.response
        ? alertActions.error(`${error.message}`)
        : alertActions.error(`${error.response.data.message}`);
    }
  };

  useEffect(() => {
    setClassArms(classInfo.filter((el: any) => el.id == item.id)[0]?.ClassArms);
    if (!userInfo.token) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }
    fetchClassArms();
    didchangeedit();
  }, [nchange]);

  const toggleTab = (item: any, tabId: number): void => {
    setActive(!active);
    setActiveTab(tabId);
    setallClassItems(item);
  };

  interface classArm {
    classitems: any;
    index: any;
  }

  const Item: React.FC<classArm> = ({ classitems, index }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
    return (
      <div className="w-full rounded-[6px] overflow-hidden border-t-[4px] bg-[#fff] hover:bg-[#E6E6FA] hover:bg-opacity-40 border-yellow-500 shadow-md">
        <div className="flex items-center justify-between px-[16px] pt-[16px] pb-[23px]">
          <h3 className="font-inter font-medium text-[#030036] opacity-70 text-[18px]">
            {classitems.naming}
          </h3>

          <div className="relative" ref={dropdownRef}>
            <div
              // className="cursor-pointer"
              className="cursor-pointer hidden"
              onClick={(e) => {
                e.preventDefault();
                toggleDropdown();
              }}
            >
              <HiDotsVertical className="text-[#87909E] opacity-70 text-[22px]" />
            </div>
            {isOpen && (
              <div
                className={`absolute right-[-3px] w-[120px] mt-3 origin-top-right bg-[#fff] border border-gray-200 divide-y divide-gray-100 rounded-[8px] shadow-lg py-1 z-50 ${
                  isOpen ? "block" : "hidden"
                }`}
              >
                <div className="w-full divide-y-1 divide-gray-100 cursor-pointer">
                  <div
                    className="flex items-center px-5 py-2  opacity-50 hover:bg-gray-100"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDropdown();
                      // edit();
                      toggleTab(classitems, 10);
                    }}
                  >
                    <RiEdit2Line size={20} className="mr-2 text-[#87909E]" />
                    <span className="text-[#030036] opacity-90 text-[14px]">
                      {" "}
                      Edit
                    </span>
                  </div>
                </div>
                <div className="w-full divide-y-1 divide-gray-100 cursor-pointer">
                  <div
                    className="flex items-center px-5 py-2  opacity-50 hover:bg-gray-100"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDropdown();
                      // del();
                      toggleTab(classitems, 11);
                    }}
                  >
                    <RiDeleteBin5Line
                      size={20}
                      className="mr-2 text-[#87909E]"
                    />
                    <span className="text-[#030036] opacity-90 text-[14px]">
                      {" "}
                      Remove
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full py-4 border-t border-gray-200 px-[15px] flex items-center justify-between border-b mt-10">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => students(classitems)}
          >
            <FiUsers className="text-[#87909E] text-base" />
            <span className="text-[#87909E] text-[12px] font-medium pl-1">
              Students
            </span>
          </div>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => teachers(classitems)}
          >
            <GiTeacher className="text-[#87909E] text-base" />
            <span className="text-[#87909E] text-[12px] font-medium pl-1">
              Teachers
            </span>
          </div>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => subjects(classitems)}
          >
            <RiBookLine className="text-[#87909E] text-base" />
            <span className="text-[#87909E] text-[12px] font-medium pl-1">
              Subjects
            </span>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="">
      <div className="flex w-full items-center justify-between border-b-[1px] py-4 px-[24px]">
        <h3 className="font-medium text-[20px] text-[#030036] opacity-70">
          {item.naming}
        </h3>
        <div className="cursor-pointer" onClick={close}>
          <IoMdClose className="text-[22px] text-[#545454]" />
        </div>
      </div>
      <div className="h-[380px] overflow-y-auto scrollbar-track-blue-200 scrollbar-thumb-blue-500 multi-scrol">
        {classArms?.length > 0 ? (
          <div className="py-6 px-[15px] w-full grid grid-cols-2 gap-[24px] ">
            {classArms.map((item: any, index) => (
              <Item
                // edit={() => toggleTab(item, 10)}
                // del={() => toggleTab(item, 11)}
                // naming={item.naming}
                index={index}
                key={index}
                classitems={item}
              />
            ))}
          </div>
        ) : (
          <h3 className="text-[#030036] opacity-70 text-[22px] font-medium font-inter py-4 pl-[24px]">
            You haven’t added a class Arm
          </h3>
        )}
      </div>
      <div className="w-full px-[15px] py-5 flex items-end justify-end border-t border-gray-200">
        <div
          className="rounded-[6px] shadow-md max-w-[150px] w-full p-2 flex items-center justify-center text-[#4F46E5] border border-[#4F46E5] cursor-pointer"
          onClick={close}
        >
          Close
        </div>
      </div>
      <CenterModal
        isOpen={active}
        onClose={() => setActive(false)}
        // variant={
        //   activeTab === 1 ? "small" : activeTab === 2 ? "small" : "large"
        // }
      >
        {activeTab === 11 ? (
          <DeleteClassArmModal
            didchange={() => setchange(nchange - 1)}
            classitems={allclassItems}
            close={() => setActive(false)}
          />
        ) : activeTab === 10 ? (
          <EditClassArm
            didchange={() => setchange(nchange + 1)}
            classitems={allclassItems}
            close={() => setActive(false)}
          />
        ) : (
          <></>
        )}
      </CenterModal>
    </div>
  );
};

export default AllClass;
