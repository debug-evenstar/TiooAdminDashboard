import React, {FC, useEffect, useState} from 'react'
import { IoMdClose } from 'react-icons/io'
import { PrimaryButton } from '../../../../../components/Buttons'
import { useSelector } from 'react-redux'
import { configure } from '../../../../../services/config'
import { getLessonClass, getclassWithArmsbyClassID } from '../../../../../services/authServices'
import { AddNewLessonArms } from '../../../../../api'
import { alertActions } from '../../../../../components/alertActions'

interface Props {
    item: any
    close: () => void
    refetch: (val:any, filter:any) => void
}
const EditLessonArms:FC<Props> = ({item, close, refetch}) => {
  console.log(item);
  
    const [isBusy, setIsBusy] = useState(false)
    const prev = item[0].ClassArms.map((item:any) => (item.id))
    const userInfo = useSelector((state: any) => state.gods.auth.userInformation);
  const config = configure(userInfo.token);
  const [parsedClass, setParsedClass] = useState<any>([]);
  const [selectedClass, setSelectedClass] = useState<any[]>(prev);
  const fetchClassArms = async () => {
    try {
      const val = await getclassWithArmsbyClassID(item[0].ref_cid, config)
      setParsedClass(val.data.data[0].ClassArms);
    } catch (error: any) {}
  };
  useEffect(() => {
    fetchClassArms();
  }, []);
  const handleClassSelect = (data: any) => {
    setSelectedClass([...selectedClass, Number(data.target.value)]);
    let arms = [...selectedClass]
   if(data.target.checked){
    arms = [...selectedClass, Number(data.target.value)]
   }else{
    arms.splice(selectedClass.indexOf(Number(data.target.value)), 1);
   }
   setSelectedClass(arms)
  };
  const EditClassArms = async () => {
    setIsBusy(true);
    const payload = {
      class_arms: selectedClass,
    };
    await AddNewLessonArms(payload, item[0].id).then((res: any) => {
      if (!res.error) {
        alertActions.success("Lesson added successfully");
        setIsBusy(false);
        refetch(item[0].SubjectId, item[0].id)
        close()
      }else{
        alertActions.error(res.message)
        setIsBusy(false);
      }
    })
    .catch((err) => {
        alertActions.error(err?.data?.message)
        setIsBusy(false);
    })
  };
  return (
    <>
        <div className="flex w-full items-center justify-between border-b-[1px] py-4 px-[24px]">
        <h3 className="font-medium text-[20px] text-[#030036] opacity-70">
          Select {item[0].naming} ClassArm
        </h3>
        <div className="cursor-pointer" onClick={close}>
          <IoMdClose className="text-[22px] text-[#545454]" />
        </div>
      </div>
      <div className="max-h-[350px] pt-4 px-[24px] pb-6 overflow-y-scroll">
        {
            parsedClass && parsedClass.map((item:any, i:number) => (
                <div className="flex gap-x-2 mb-3 px-4 py-3 rounded input-shade">
                    <input type="checkbox" name="class" value={item.id} checked={selectedClass.includes(item.id)} className="w-6 h-6 mt-1" onChange={handleClassSelect}/>
                    <div>
                    <label className="block text-[17px]">{item.naming}</label>
                    {/* <label className="block text-[17px]">{item.ClassArms.map((item:any) => <span key={item.id} className="pr-1 text-[12px]">{item.naming}</span>)}</label> */}
                    </div>
                </div>
            ))
        }
      </div>
      <div className="p-[24px] border-t bg-white">
        <PrimaryButton text={"Edit"} variant="dash" onClick={EditClassArms} />
      </div>
    </>
  )
}

export default EditLessonArms