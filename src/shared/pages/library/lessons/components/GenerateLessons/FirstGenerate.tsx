import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { configure } from "@/services/config";
import { getAllSubjectsClass, getLessonClass } from "@/services/authServices";
import { LessonButton } from "@/components/Buttons";
import { ClassArmSelectField } from "@/components/ClassArmselect";
import { RadioSelect } from "@/components/RadioSelectField";
import { InputField } from "@/components/Inputs";
import { getSchoolTerm } from "@/api";
import { alertActions } from "@/components/alertActions";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { RiArrowDownLine, RiArrowDropDownLine, RiArrowUpSLine } from "react-icons/ri";
import { FiChevronDown } from "react-icons/fi";
import { lessonActions } from "@/store/lessonSlice";

interface Props {
  id: number;
  upload: any;
  generate: any
}
const FirstGenerate: FC<Props> = ({ id, generate }) => {
  const userInfo = useSelector((state: any) => state.gods.auth.userInformation);
  const schoolInfo = useSelector((state: any) => state.gods.school.schoolManagementInfo);
  const [getTerm, setGetTerm] = useState<any[]>()
  const [objectives, setObjectives] = useState('')
  const [addObjectives, setAddObjectives] = useState('')
  const dispatch = useDispatch();
  //   lesson inputs
  const [title, setTitle] = useState('')
  const [term, setTerm] = useState<number>()
  const [curriculum, setCurriculum] = useState('')
  const [selectedClass, setSelectedClass] = useState("");
  const [classArms, setClassArms] = useState<any>([]);
  const [loading, setloading] = useState(false);
  const [parsedClass, setParsedClass] = useState<any>([]);
  const [parsedClassArm, setParsedClassArm] = useState<any>([]);
  const [selectedArm, setSelectedArm] = useState<any[]>([]);
  // lesson duration
  const [mins, setMins] = useState<number>(15)
  const reduceMin = () => {
    if (mins > 15) {
      setMins(mins - 5)
    }
  }
  const increaseMin = () => {
    if (mins < 60) {
      setMins(mins + 5)
    }
  }

  const config = configure(userInfo.token);
  const fetchSubjectLessonGroups = async () => {
    try {
      const val = await getLessonClass(id, config);
      dispatch(lessonActions.saveClass(val.data.data))
    } catch (error: any) { }
  };
  const fetchsubjectClass = async () => {
    try {
      const val = await getAllSubjectsClass(id, config);
      setParsedClass(val.data.data.Classes);
      setParsedClassArm(val.data.data.ClassArms);
    } catch (error: any) { }
  };
  const getTerms = async () => {
    await getSchoolTerm(schoolInfo.schoolManagementId)
      .then((res: any) => {
        if (!res.error) {
          setGetTerm(res.data)
        } else {
          alertActions.error('Cannot fetch school terms')
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  useEffect(() => {
    fetchsubjectClass();
    getTerms()
    fetchSubjectLessonGroups()
  }, []);

  const handleClassSelect = (data: any) => {
    setSelectedClass(data);
    const arms = parsedClassArm.filter((where: any) => where.ClassId === data);
    setSelectedArm(arms);
  };
  const selectedChange = (id: any[]) => {
    setClassArms(id);
  };
  const isValid = () => {
    if (!classArms || !title || !term || !objectives) {
      return true
    } else return false
  }

  const gotoNext = () => {
    const payload = {
      class: selectedClass,
      class_arms: classArms,
      topic: title,
      subject: id,
      term: Number(term),
      duration: `${mins} Minutes`,
      curriculum: "Nigerian Curriculum",
      resources: 1,
      objective: objectives,
      additional_instruction: addObjectives,
    }
    dispatch(lessonActions.saveGenerate(payload))
    generate()
  }
  return (
    <>
      <div className="px-5">
        <div className="max-h-[350px] pb-4 overflow-y-auto multi-scroll">
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
            oneSelect={true}
            // multiple={false}
            onSelectedDataChange={selectedChange}
          />
          <div className="">
            <label className="block mb-2 text-[15px] text-[#87909E]">School Term</label>
            <div className="rounded-[8px] border mb-3 border-[#DA70D6] border-opacity-30 shadow pr-5">
              <select value={term} onChange={(e: any) => setTerm(e.target.value)} className="font-inter rounded-[8px] w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline py-2">
                <option>Select an option</option>
                {
                  getTerm?.map((item, i) => (
                    <option value={item.id} key={i}>{item.label}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className="lg:mt-4">
            <label className="block mb-2 text-[15px] text-[#87909E]">Lesson Duration</label>
            <div className="rounded-[8px] border mb-3 border-[#DA70D6] border-opacity-30 shadow pr-5">
              <div className="flex justify-between items-center">
                <p className="text-gray-700 px-5">{mins} Minutes</p>
                <div>
                  <RiArrowUpSLine className="text-xl text-gray-600 text-center cursor-pointer" onClick={increaseMin} />
                  <FiChevronDown className="text-xl text-gray-600 text-center cursor-pointer" onClick={reduceMin} />
                </div>
              </div>
            </div>
          </div>
          <div className="lg:mt-4">
            <label className="block mb-2 text-[15px] text-[#87909E]">Choose Resource</label>
            <div className="rounded-[8px] border mb-3 border-[#DA70D6] border-opacity-30 shadow pr-5">
              <select value={curriculum} onChange={(e: any) => setCurriculum(e.target.value)} className="font-inter rounded-[8px] w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline py-2">
                <option>Select an option</option>
                <option value={'School Resource center'}>School Resource center</option>
                <option value={'Tioo Resource center'}>Tioo Resource center</option>
              </select>
            </div>
          </div>
          <InputField
            type="text"
            label="Lesson Title"
            labelSub=""
            placeholder=""
            name="title"
            variant="white"
            lesson
            value={title}
            onChange={(e: any) => {
              setTitle(e.target.value);
            }}
          />

          <div className="mt-3">
            <label className="block mb-2 text-[15px] text-[#87909E]">Lesson Objectives</label>
            <ReactQuill theme="snow" value={objectives} onChange={setObjectives} className="h-24 mb-16" />
          </div>
          <div className="mt-3">
            <label className="block mb-2 text-[15px] text-[#87909E]">Additional Instructions (Optional)</label>
            <ReactQuill theme="snow" value={addObjectives} onChange={setAddObjectives} className="h-24 mb-16" />
          </div>
        </div>
      </div>
      <div className="px-4 py-4 border-t">
        <LessonButton
          text={"Continue"}
          // variant="default"
          onclick={gotoNext}
          invalid={isValid()}
        />
      </div>
    </>
  );
};

export default FirstGenerate;
