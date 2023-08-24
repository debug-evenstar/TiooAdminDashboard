import { FC, useState } from "react";
import { MdOutlineAttachFile } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { uploadTemplate } from "../../services/api";
import { toast } from "react-toastify";
import { formatSize } from "../utils/format";
import { PrimaryButton } from "../button/button";

interface Props {
  id: string;
  close: () => void;
}
const UploadTemplateForm: FC<Props> = ({ id, close }) => {
  const [loading, setloading] = useState(false);
  const [files, setFiles] = useState([]);
  const handleFileChange = (e: any) => {
    setFiles(Array.from(e.target.files));
  };
  const removeFile = (item: any) => {
    const arr = [...files];
    const filtered = arr.filter((where: any) => where.name !== item.name);
    setFiles(filtered);
  };
  const CreateLesson = async () => {
    setloading(true);
    const formData = new FormData();
    formData.append(`lesson_id`, id);
    for (let i = 0; i < files.length; i++) {
        formData.append(`template`, files[i]);
      }
    await uploadTemplate(Number(id), formData).then((res: any) => {
      if (!res.error) {
        toast.success("Lesson added successfully");
        close()
        setloading(false);
      }else{
        toast.error(res.data.message)
        setloading(false);
      }
    })
    .catch((err) => {
        toast.error(err?.data?.message)
        setloading(false);
    })
  };
  return (
    <>
      <div className="flex w-full items-center justify-between border-b-[1px] py-4 px-[24px]">
        <h3 className="font-medium text-[20px] text-[#030036] opacity-70">
          Upload Lesson Template
        </h3>
        <div className="cursor-pointer" onClick={close}>
          <IoMdClose className="text-[22px] text-[#545454]" />
        </div>
      </div>
      <div className="px-5 pt-4">
        <div className="max-h-[300px] grid gap-y-2 overflow-y-auto">
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
              Your attached file should be in docx Format
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
            title={loading ? "Loading..." : "Upload Template"}
            onClick={CreateLesson}
            disabled={!files.length}
          />
        </div>
      </div>
    </>
  );
};

export default UploadTemplateForm;
