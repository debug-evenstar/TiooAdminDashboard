import React, { FC, useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { PrimaryButton } from "../../../../../components/Buttons";
import { configure } from "../../../../../services/config";
import { useSelector } from "react-redux";
import { getAllSubjectsClass, getLessonClass } from "../../../../../services/authServices";
// import { RadioSelect } from "../../../../components/RadioSelectField";
import { useNavigate } from "react-router-dom";
import CenterModal from "../../../../../components/CenterModal";
import DiscardWarning from "../../../../../components/DiscardWarning";
// import { axiosInstance} from "@/api/request";
interface Props {
  id: number;
  close: () => void;
}
const PickClass: FC<Props> = ({ id, close }) => {
  const userInfo = useSelector((state: any) => state.gods.auth.userInformation);
  const config = configure(userInfo.token);
  const [parsedClass, setParsedClass] = useState<any>([]);
  const [selectedClass, setSelectedClass] = useState("");
  const navigate = useNavigate()
  const fetchsubjectClass = async () => {
    try {
      // const val = await getAllSubjectsClass(id, config);
      const val = await getLessonClass(id, config)
      // const val = await axiosInstance.get('')
      setParsedClass(val.data.data);
    } catch (error: any) { }
  };
  useEffect(() => {
    fetchsubjectClass();
  }, []);
  const handleClassSelect = (data: any) => {
    setSelectedClass(data.target.value);
  };
  const gotoLesson = () => {
    navigate(`/lessons/${id}/${selectedClass}`)
  }
  const [backDrop, setBackDrop] = useState(false)
  const HandleClose = () => {
    setBackDrop(false)
    close()
  }
  return (
    <>
      <div>
        <div className="flex w-full items-center justify-between border-b-[1px] py-4 px-[24px]">
          <h3 className="font-medium text-[20px] text-[#030036] opacity-70">
            Select Class
          </h3>
          <div className="cursor-pointer" onClick={() => setBackDrop(true)}>
            <IoMdClose className="text-[22px] text-[#545454]" />
          </div>
        </div>
        <div className="max-h-[350px] pt-4 px-[24px] pb-6 overflow-y-scroll">
          {
            parsedClass && parsedClass.map((item: any, i: number) => (
              <div className="flex gap-x-2 mb-3 px-4 py-3 rounded input-shade">
                <input type="radio" name="class" value={item.id} className="w-6 h-6 mt-1" onChange={handleClassSelect} />
                <div>
                  <label className="block text-[17px]">{item.Class?.naming ?? item.naming}</label>
                  <label className="block text-[17px]">{item.ClassArms.map((item: any) => <span key={item.id} className="pr-1 text-[12px]">{item.naming}</span>)}</label>
                </div>
              </div>
            ))
          }
        </div>
        <div className="p-[24px] border-t bg-[#fff]">
          <PrimaryButton text={"View"} variant="dash" onClick={gotoLesson} invalid={!selectedClass} />
        </div>
      </div>
      <CenterModal isOpen={backDrop} onClose={() => setBackDrop(false)}>
        <DiscardWarning close={close} handleAction={HandleClose} />
      </CenterModal>
    </>
  );
};

export default PickClass;
