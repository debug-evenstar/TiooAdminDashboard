import React, { FC, useEffect, useState } from "react";
import { InputField } from "@/components/Inputs";
import { useSelector } from "react-redux";
import { PrimaryButton } from "@/components/Buttons";
import { MdOutlineAttachFile } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { formatSize } from "@/utilities/format";
import { alertActions } from "@/components/alertActions";
import { useDispatch } from "react-redux";
import { lessonActions } from "@/store/lessonSlice";
import { IoMdClose } from "react-icons/io";
import { AddNewLesson, getSchoolTerm } from "@/api";

interface Props {
  id: number;
  next: () => void;
  close: () => void;
}
const AddLessonUploadForm: FC<Props> = ({ id, next, close }) => {
  const userInfo = useSelector((state: any) => state.gods.auth.userInformation);
  const schoolInfo = useSelector(
    (state: any) => state.gods.school.schoolManagementInfo
  );
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [title, setTitle] = useState("");
  const [getTerm, setGetTerm] = useState<any[]>();
  const [term, setTerm] = useState<number>();
  const [files, setFiles] = useState([]);
  const handleFileChange = (e: any) => {
    setFiles(Array.from(e.target.files));
  };
  const removeFile = (item: any) => {
    const arr = [...files];
    const filtered = arr.filter((where: any) => where.name !== item.name);
    setFiles(filtered);
  };
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
  }, [])
  const CreateLesson = async () => {
    setloading(true);
    const payload = {
      topic: title,
      term: term
    };
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value as any);
    });
    for (let i = 0; i < files.length; i++) {
      formData.append(`files`, files[i]);
    }
    await AddNewLesson(formData, id)
      .then((res: any) => {
        if (!res.error) {
          alertActions.success("Lesson added successfully");
          dispatch(lessonActions.saveClassLesson(res.data.data));
          setloading(false);
          next();
        } else {
          alertActions.error(res.message);
          setloading(false);
        }
      })
      .catch((err) => {
        alertActions.error(err?.data?.message);
        setloading(false);
      });
  };
  return (
    <>
      <div className="px-5 pt-4">
        <div className="max-h-[300px] grid gap-y-2 overflow-y-auto">
          <div>
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
          <InputField
            type="text"
            label="Lesson Title"
            labelSub="you can upload more than 1 lesson content"
            placeholder=""
            name="title"
            variant="white"
            lesson
            value={title}
            onChange={(e: any) => {
              setTitle(e.target.value);
            }}
          />
          <div>
            <div className="relative w-36 py-1 border border-[#4F46E5] rounded-[20px] cursor-pointer">
              <div className="flex items-center px-2 gap-x-2 text-[#4F46E5] relative z-0 cursor-pointer">
                <MdOutlineAttachFile className="text-xl" />
                <span>Upload file</span>
              </div>
              <input
                type="file"
                accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                multiple
                onChange={handleFileChange}
                className="absolute z-10 w-full h-full top-0 left-0 opacity-0 cursor-pointer"
              />
            </div>
            <p className="text-[13px] mt-1 text-[#87909E]">
              Your attached file should be in PDF or Word Format
            </p>
            <div className="mt-3">
              {files &&
                files.map((item: any, index) => (
                  <div className="flex items-center gap-x-6 mb-1" key={index}>
                    <div className="flex items-center text-[#4F46E5]">
                      <MdOutlineAttachFile className="text-lg mr-1" />
                      <span className="text-[15px]">{item.name}</span>
                      <span className="text-[15px] text-[#87909E]">
                        ({formatSize(item.size)})
                      </span>
                    </div>
                    <RiDeleteBinLine
                      className="text-[#4F46E5] text-lg"
                      onClick={() => removeFile(item)}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="py-[24px] border-t mt-6">
          <PrimaryButton
            text={loading ? "Loading..." : "Upload Lesson"}
            variant="dash"
            onClick={CreateLesson}
            invalid={!(files.length && title)}
          />
        </div>
      </div>
    </>
  );
};

export default AddLessonUploadForm;
