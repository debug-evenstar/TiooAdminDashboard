import { FC, useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { getLessonGroup } from "../../services/api";
import { PrimaryButton } from "../button/button";
import { useAppSelector } from "../../redux/store";

interface Props {
  id: any;
  close: () => void;
}
const PickClass: FC<Props> = ({ id, close }) => {
  const activeId = useAppSelector((state: any) => state.praise.school.activeSchool.id);
  const [parsedClass, setParsedClass] = useState<any>([]);
  const [selectedClass, setSelectedClass] = useState("");
  const navigate = useNavigate()
  const fetchsubjectClass = async () => {
    await getLessonGroup(id)
    .then((response) => {
      setParsedClass(response?.data?.data);
    })
    .catch((error) => {
        console.log(error);
    });
  };
  useEffect(() => {
    fetchsubjectClass();
  }, []);
  const handleClassSelect = (data: any) => {
    setSelectedClass(data.target.value);
  };
  const gotoLesson = () => {
    navigate(`/schools/${activeId}/lesson/${id}/${selectedClass}`)
  }
  return (
    <>
      <div className="flex w-full items-center justify-between border-b-[1px] py-4 px-[24px]">
        <h3 className="font-medium text-[20px] text-[#030036] opacity-70">
          Select Class
        </h3>
        <div className="cursor-pointer" onClick={close}>
          <IoMdClose className="text-[22px] text-[#545454]" />
        </div>
      </div>
      <div className="max-h-[350px] pt-4 px-[24px] pb-6 overflow-y-scroll">
        {
            parsedClass && parsedClass.map((item:any, i:number) => (
                <div className="flex gap-x-2 mb-3 px-4 py-3 rounded input-shade" key={i}>
                    <input type="radio" name="class" value={item.id} className="w-6 h-6 mt-1" onChange={handleClassSelect}/>
                    <div>
                    <label className="block text-[17px]">{item.naming}</label>
                    <label className="block text-[17px]">{item.ClassArms.map((item:any) => <span key={item.id} className="pr-1 text-[12px]">{item.naming}</span>)}</label>
                    </div>
                </div>
            ))
        }
      </div>
      <div className="p-[24px] border-t bg-white">
        <PrimaryButton title={'View'} onClick={gotoLesson} />
      </div>
    </>
  );
};

export default PickClass;
