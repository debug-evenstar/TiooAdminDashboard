import React, { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RadioSelect } from "../../../../../components/RadioSelectField";
import { PrimaryButton } from "../../../../../components/Buttons";
import { getAllSubjectsClass } from "../../../../../services/authServices";
import { configure } from "../../../../../services/config";
import { ClassArmSelectField } from "../../../../../components/ClassArmselect";
import { useDispatch } from "react-redux";
import { lessonActions } from "../../../../../store/lessonSlice";

interface Props {
    id: number
    next: () => void
}
const FirstUploadForm:FC<Props> = ({id, next}) => {
  // const classInfo = useSelector((state: any) => state.class.classInformation);
  const userInfo = useSelector((state: any) => state.gods.auth.userInformation);
  const dispatch = useDispatch()
  const [selectedClass, setSelectedClass] = useState('')
  const [classArms, setClassArms] = useState<any>([]);
  const [loading, setloading] = useState(false);
  const [parsedClass, setParsedClass] = useState<any>([]);
  const [parsedClassArm, setParsedClassArm] = useState<any>([])
  const [selectedArm, setSelectedArm] = useState<any[]>([])

  const config = configure(userInfo.token);

  const fetchsubjectClass = async () => {
    try {
      const val = await getAllSubjectsClass(id, config);
      setParsedClass(val.data.data.Classes);
      setParsedClassArm(val.data.data.ClassArms)
    } catch (error: any) {}
  };
  useEffect(() => {
    fetchsubjectClass()
  }, [])

  const handleClassSelect = (data: any) => {
    setClassArms('')
    setSelectedClass(data)
    const arms = parsedClassArm.filter((where:any) => where.ClassId === data)
    setSelectedArm(arms)
  };
  const selectedChange = (id: any[]) => {
    setClassArms(id);
  };
  const proceedToUpload = () => {
    const payload = {
      class: selectedClass,
      class_arms: classArms
    }
    dispatch(lessonActions.saveClassLesson(payload))
    next()
  }

  return (
    <>
      <div className="px-5">
        <div className="max-h-[300px] overflow-y-auto">
        <RadioSelect
          label="Select Class"
          variant="white"
          data={parsedClass}
            checkedId={selectedClass}
          onCheckboxChange={handleClassSelect}
        />
        <ClassArmSelectField
            label="Select Class Arm"
            variant="white"
            data={selectedArm}
            // multiple={false}'
            oneSelect={true}
            onSelectedDataChange={selectedChange}
          />
        </div>
        <div className="py-[24px] border-t mt-6">
          <PrimaryButton
            text={loading ? "Loading..." : "Continue"}
            variant="dash"
            onClick={proceedToUpload}
            invalid= {!classArms.length}
          />
        </div>
      </div>
    </>
  );
};

export default FirstUploadForm;
