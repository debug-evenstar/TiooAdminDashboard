import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { fullNames } from "@/data/data";
import { RiSearchLine } from "react-icons/ri";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import {
  deleteStudent,
  getClassStudent,
} from "@/services/authServices";
import { useSelector } from "react-redux";
import { configure } from "@/services/config";
import { alertActions } from "@/components/alertActions";
import { useDispatch } from "react-redux";
import { classActions } from "@/store/classSlice";
import DeleteModal from "@/components/deleteModal";
import CenterModal from "@/components/CenterModal";
import { loadavg } from "os";

interface StudentsModalProps {
  close: () => void;
  item: any;
  arm: any;
  showDelete?: React.Dispatch<React.SetStateAction<number>>;
}

interface ItemProps {
  name?: string;
  index?: any;
  data?: any;
  deleteStudent: () => void;
}

const StudentsModal: React.FC<StudentsModalProps> = ({
  close,
  item,
  arm,
  showDelete,
}) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [updated, setupdate] = useState(false);
  const [classStudent, setClassStudent] = useState([]);
  const [active, setActive] = useState(false);
  const [items, setitems] = useState({});
  const [loading, setloading] = useState(false);

  const [tokens, settoken] = useState<any>("");
  const [open, setOpen] = useState<boolean[]>([]);
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state.gods.auth.userInformation);
  const classStudents = useSelector(
    (state: any) => state.gods.class.classStudents
  );
  const config = configure(userInfo.token);

  useEffect(() => {
    if (!userInfo.token) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
      settoken(localStorage.getItem("token"));
    }

    //fetch all students in a class
    const fetchallClassstudent = async () => {
      try {
        const getStudent = await getClassStudent(item.id, config);
        setClassStudent(
          getStudent.data.data.filter(
            (where: any) => where.ClassArm.naming === arm
          )
        );
        dispatch(classActions.saveClassStudents(getStudent.data.data));
      } catch (error) {}
    };
    fetchallClassstudent();
  }, [updated]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = classStudent.filter((item: any) =>
    item.Account.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //delete student
  const deleteStudentbyid = async (id: any) => {
    if (!userInfo.token) {
      config.headers.Authorization = "Bearer " + tokens;
    }
    try {
      const delStudent = await deleteStudent(id, config);
      if (delStudent.status == 200) {
        alertActions.success("Student Deleted successfully");
        setupdate(!updated);
      }
    } catch (error) {}
  };

  const handleToggleOpen = (index: number) => {
    setOpen((prevOpen) => {
      const updatedOpen = [...prevOpen];
      updatedOpen[index] = !updatedOpen[index];
      return updatedOpen;
    });
  };
  const Item: React.FC<ItemProps> = ({ name, index, data, deleteStudent }) => {
    const isOpen = open[index];

    return (
      <div className="w-full rounded-[6px] px-[20px] py-4 shadow-md border border-opacity-10 border-black my-4">
        <div
          className=" flex items-center justify-between cursor-pointer"
          onClick={() => handleToggleOpen(index)}
        >
          <h3 className="text-[#030036] opacity-70 text-[14px] font-medium">
            {data.Account.name}
          </h3>
          <div
            className="flex items-center justify-center cursor-pointer"
            // onClick={() => handleToggleOpen(index)}
          >
            {isOpen ? (
              <FaAngleUp className="text-[20px] text-black opacity-50" />
            ) : (
              <FaAngleDown className="text-[20px] text-black opacity-50" />
            )}
          </div>
        </div>
        {isOpen && (
          <div className="w-full pt-3">
            <h3 className="text-[14px] font-medium text-[#87909E]">
              {data.Account.email}
            </h3>
            <h3 className="text-[14px] font-medium text-[#87909E] pt-1">
              {data.Account.phone}
            </h3>
            {/* <div
              className="underline text-[12px] text-[#4F46E5] font-medium cursor-pointer pt-3"
              onClick={() => deleteStudentbyid(data?.Account.id)}
            // onClick={showDelete? () => showDelete(3) : () => false}
            >
              Remove student
            </div> */}
            <div className="line-through text-[12px] text-[#aaa] font-medium cursor-pointer pt-3">
              Remove student
            </div>
          </div>
        )}
      </div>
    );
  };
  return (
    <>
      <div className="">
        <div className="flex w-full items-center justify-between border-b-[1px] py-4 px-[24px]">
          <h3 className="font-medium text-[20px] text-[#030036] opacity-70">
            Students
          </h3>
          <div className="cursor-pointer" onClick={close}>
            <IoMdClose className="text-[22px] text-[#545454]" />
          </div>
        </div>
        <div className="px-[24px]">
          {fullNames.length > 0 ? (
            <>
              <h3 className="pt-3 text-[12px] font-normal text-[#87909E] pb-[20px]">
                {arm}
              </h3>
              <div className="flex items-center w-full py-2 border-b border-black border-opacity-20 my-3">
                <RiSearchLine className="text-[20px] text-black text-opacity-50" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="focus:outline-none ml-2 text-base bg-[#fff] w-full"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="h-[300px] overflow-y-auto scrollbar-track-blue-200 scrollbar-thumb-blue-500 multi-scrol">
                {classStudent.length > 0 &&
                  filteredData?.map((item: any, index) => (
                    <Item
                      name={item.name}
                      key={index}
                      index={index}
                      data={item}
                      deleteStudent={() => {}}
                    />
                  ))}
              </div>
            </>
          ) : (
            <div className="py-5 font-medium text-[22px] text-[#030036] opacity-70">
              There is no student in {item.naming}
            </div>
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
      </div>
    </>
  );
};

export default StudentsModal;
