import React, {FC, useEffect, useState} from 'react'
import { FiChevronDown } from 'react-icons/fi';
import { RiArrowUpSLine } from 'react-icons/ri';
import ReactQuill from 'react-quill';
import { InputField } from '../../../../../components/Inputs';
import { LessonButton } from '../../../../../components/Buttons';
import { lessonActions } from '../../../../../store/lessonSlice';
import { useDispatch } from 'react-redux';
import { getSchoolTerm } from '../../../../../api';
import { alertActions } from '../../../../../components/alertActions';
import { useSelector } from 'react-redux';

interface Props {
    id: any
    generate: () => void
}
const AddGenerated:FC<Props> = ({id, generate}) => {
  const dispatch = useDispatch()
    const [title, setTitle] = useState('')
const [curriculum, setCurriculum] = useState('')
const [objectives, setObjectives] = useState('')
  const [addObjectives, setAddObjectives] = useState('')
  const [getTerm, setGetTerm] = useState<any[]>();
  const [term, setTerm] = useState<number>();
  const schoolInfo = useSelector(
    (state: any) => state.gods.school.schoolManagementInfo
  );
    // lesson duration
  const [mins, setMins] = useState<number>(15)
  const reduceMin = () => {
    if(mins > 15){
      setMins(mins - 5)
    }
  }
  const increaseMin = () => {
    if(mins < 60){
      setMins(mins + 5)
    }
  }
  const getTerms = async () => {
    await getSchoolTerm(schoolInfo.schoolManagementId)
      .then((res: any) => {
        if (!res.error) {
          setGetTerm(res.data);
        } else {
          alertActions.error("Cannot fetch school terms");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getTerms()
  },[])
  const isValid = () => {
    if(!title || !objectives ){
    return true
    } else return false
  }
  const generateNew = () => {
    const payload = {
      topic: title,
      term: Number(term),
      id: id,
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
        <div className='mt-4'>
            <label className="block mb-2 font-medium text-[#87909E]">
              School Term
            </label>
            <select
              value={term}
              onChange={(e: any) => setTerm(e.target.value)}
              className="border font-inter w-full px-3 text-gray-700 leading-tight focus:outline-none shadow focus:shadow-outline mb-3 rounded-[8px] border-[#DA70D6] border-opacity-30 py-2"
            >
              <option>Select an option</option>
              {getTerm?.map((item, i) => (
                <option value={item.id} key={i}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div className="lg:mt-2">
            <label className="block mb-2 text-[15px] text-[#87909E]">Lesson Duration</label>
            <div className="rounded-[8px] border mb-3 border-[#DA70D6] border-opacity-30 shadow pr-5">
            <div className="flex justify-between items-center">
              <p className="text-gray-700 px-5">{mins} Minutes</p>
              <div>
                <RiArrowUpSLine className="text-xl text-gray-600 text-center cursor-pointer" onClick={increaseMin}/>
                <FiChevronDown className="text-xl text-gray-600 text-center cursor-pointer" onClick={reduceMin}/>
              </div>
            </div>
            </div>
          </div>
          <div className="lg:mt-4">
            <label className="block mb-2 text-[15px] text-[#87909E]">Choose Resource</label>
            <div className="rounded-[8px] border mb-3 border-[#DA70D6] border-opacity-30 shadow pr-5">
            <select value={curriculum} onChange={(e:any) => setCurriculum(e.target.value)} className="font-inter rounded-[8px] w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline py-2">
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
            <ReactQuill theme="snow" value={objectives} onChange={setObjectives} className="h-28 mb-16" />
        </div>
        <div className="mt-3">
            <label className="block mb-2 text-[15px] text-[#87909E]">Additional Instructions (Optional)</label>
            <ReactQuill theme="snow" value={addObjectives} onChange={setAddObjectives} className="h-28 mb-16"/>
        </div>
        </div>
      </div>
      <div className="px-4 py-4 border-t">
        <LessonButton
          text={"Continue"}
          // variant="default"
          onclick={generateNew}
          invalid={isValid()}
        />
        </div>
    </>
  )
}

export default AddGenerated