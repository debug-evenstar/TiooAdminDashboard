import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { PrimaryButton } from "../../../../../components/Buttons";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import axios from "axios";

import { configure } from "../../../../../services/config";
import { getAllSubjectsTeachers, unassignTeacher } from "../../../../../services/authServices";
import { alertActions } from "../../../../../components/alertActions";

interface TeachersModalProps {
  close: () => void;
  assignTeachers?: () => void;
  item?: any;
  teacher?: boolean
}

const TeachersModal: React.FC<TeachersModalProps> = ({
  close,
  assignTeachers,
  item,
  teacher
}) => {
  const [allsubjTeachers, setallsubjTeachers] = useState([]);
  const [data, setData] = useState<any>()
  const userInfo = useSelector((state: any) => state.gods.auth.userInformation);
  const config = configure(userInfo.token);
  const fetchSubjectTeachers = async () => {
    if (!userInfo.token) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }
    console.log(item);

    await getAllSubjectsTeachers(item.id, config)
      .then((res: any) => {
        if (res.data.data) {
          setData(res?.data?.data)
          setallsubjTeachers(res.data.data.teachers);
        }
      })
      .catch(() => { })
  };
  useEffect(() => {
    fetchSubjectTeachers();
  }, []);

  const deleteTeacher = async (id: string) => {
    if (!userInfo.token) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }
    const payload = {
      subject: data.subject.id,
      teacher: id
    }
    try {
      const val = await unassignTeacher(payload, config);
      alertActions.success(val.data.message);
      fetchSubjectTeachers()
    } catch (error: any) { }
  }

  const TeacherItem = ({ item }: { item: any }) => {
    return (
      <div className="w-full px-4 py-3 border border-black border-opacity-20 shadow-md rounded-[8px] flex items-center justify-between mb-[18px]">
        <div className="flex flex-col items-start">
          <h3 className="text-[14px] font-medium text-[#030036] opacity-70">
            {item.name}
          </h3>
        </div>
        {
          !teacher && <div className="cursor-pointer">
            <RiDeleteBin5Line size={20} className=" text-[#030036] opacity-70" onClick={() => deleteTeacher(item.id)} />
          </div>
        }
      </div>
    );
  };

  return (
    <div className="">
      <div className="flex w-full items-center justify-between border-b-[1px] py-4 px-[24px]">
        <h3 className="font-medium text-[20px] text-[#030036] opacity-70">
          Teachers
        </h3>
        <div className="cursor-pointer" onClick={close}>
          <IoMdClose className="text-[22px] text-[#545454]" />
        </div>
      </div>
      <div className=" p-[24px] border-b-[1px] h-[330px] overflow-y-auto scrollbar-track-blue-200 scrollbar-thumb-blue-500 multi-scrol">
        {allsubjTeachers?.length > 0 ? (
          allsubjTeachers?.map((item: any) => (
            <TeacherItem item={item} />
          ))
        ) : (
          <h3 className="text-[14px] font-medium text-[#030036] opacity-70">
            No teachers
          </h3>
        )}
      </div>
      {!teacher && <div className="p-[24px]">
        <PrimaryButton
          text="Add Another Teacher"
          variant="dash"
          onClick={assignTeachers}
        />
      </div>}
    </div>
  );
};

export default TeachersModal;
