import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import { axiosInstance } from "@/api/request";
import UploadFile from "@/components/updateFile/uploadFile";
import { notify } from "@/components/notification/notification";
import { useDispatch } from "react-redux";
import { setLibraryReload } from "@/redux/slices/library";
import SingleOptionsMenu from "@/components/singleOptionsMenu/singleOptionsMenu";
import WhiteSpinner from "@/components/whiteSpinner/spinner";
import MultiFileUpload from "@/components/multiFileUpload/multiFileUpload";
import ModalLayout from "@/components/modalLayout/modalLayout";
import OptionsMenu from "@/components/optionsMenu";
import { useParams } from "react-router-dom";
import RawFileInput from "@/components/rawFileInput/rawFileInput";


type TLibraryModalError = {
  title?: string;
  class?: string;
  age?: string;
  objective?: string;
  file?: string;
  chapter?: string;
  cover?: string;
};

function EmptyTextbookLesson({
  modal,
  setModal,
  lesson,
  refetch,
  textbookProps,
}: {
  textbookProps?: any;
  subjectId?: number;
  lesson?: any;
  refetch?: any;
  modal: boolean;
  setModal: any;
}) {

  const [klass, setClass] = useState<number>(0);
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const { chapterId } = useParams();

  // probably wanted to try something sha
  const [formData, setFormData] = useState({
    duration: "",
    objective: "",
    curriculum: "",
    additional_instruction: "",
    library: true,
    topic: "",
    class: null,
    preview: null,
    description: "",
  });


  console.log(lesson)
  useEffect(() => {
    if(lesson){
      setFormData({
        duration: lesson.duration,
        objective: lesson.objective,
        curriculum: lesson.curriculum,
        additional_instruction: lesson.additional_instruction,
        library: true,
        topic: lesson.topic,
        class: lesson.class,
        preview: null,
        description: lesson.description,
      });
    }
  },[])

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors: any = {};
    if (!formData.topic || formData.topic.length == 0)
      newErrors.topic = "Please Enter a valid topic";

    if (!lesson) {
      if (klass == null) newErrors.class = "Please select a class";
    }

    const checkText = (name: string, message: string) => {
      // @ts-ignore
      if (formData[name] == "" || formData[name] == null) {
        newErrors[name] = message;
      }
    };

    checkText("objective", "Please fill in an objective");
    checkText("description", "Please fill in a description");
    checkText("duration", "Please fill in a duration");
    checkText("curriculum", "Please fill in a curriculum");
    checkText("preview", "Please select a preview image");

    return newErrors;
  };

  const sendRequest = () => {
    let payload = new FormData();
    payload.append("topic", formData.topic);
    payload.append("class", lesson?.ClassId || String(klass));
    payload.append("objective", formData.objective);
    payload.append("curriculum", formData.curriculum);
    payload.append("description", formData.description);
    payload.append("duration", formData.duration);

    if (formData.preview) {
      payload.append("preview", formData.preview);
    }
    payload.append("library", "true");
    payload.append("additional_information", formData.additional_instruction);

    payload.append("chapter_id", String(chapterId));

    axiosInstance
      .post(`/library/textbooks/${textbookProps.id}/lessons`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        if (textbookProps && refetch) {
          refetch();
        }
        setModal(false);
        notify.success("Added lesson successfuly");
      })
      .catch((error) => {
        notify.error(error?.response?.message);
      })
      .finally(() => setLoading(false));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      setErrors({});
      sendRequest();
    } else {
      setErrors(newErrors);
      console.log(errors);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={`px-4 mt-4 max-h-[70vh] overflow-y-auto`}>
        <div className="text-sm mb-3">
          <label htmlFor="" className="text-sm">
            Lesson topic
          </label>
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleOnChange}
            className="mt-1 outline-none rounded w-full px-3 py-2 border"
          />
          <p className="text-red-500 text-xs mt-1">{errors?.topic}</p>
        </div>

        {
          <div className="text-sm mb-3 w-full">
            <label htmlFor="" className="text-sm">
              Class
            </label>
            <SingleOptionsMenu
              selection={klass}
              options={textbookProps?.classes.map((item: any) => ({
                id: item.id,
                value: item.name,
              }))}
              setSelection={setClass}
            />

            <p className="text-red-500 text-xs mt-1">{errors?.class}</p>
          </div>
        }
        <div className="text-sm mb-3">
          <label htmlFor="" className="text-sm">
            Lesson duration
          </label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleOnChange}
            className="mt-1 outline-none rounded w-full px-3 py-2 border"
          />
          <p className="text-red-500 text-xs mt-1">{errors?.duration}</p>
        </div>

        <div className="text-sm mb-3">
          <label htmlFor="" className="text-sm">
            Lesson curriculum
          </label>
          <input
            type="text"
            name="curriculum"
            value={formData.curriculum}
            onChange={handleOnChange}
            className="mt-1 outline-none rounded w-full px-3 py-2 border"
          />
          <p className="text-red-500 text-xs mt-1">{errors?.curriculum}</p>
        </div>

        <div className="text-sm mb-3">
          <label htmlFor="" className="text-sm">
            Lesson Objective
          </label>
          <textarea
            rows={3}
            style={{ resize: "none" }}
            name="objective"
            value={formData.objective}
            onChange={handleOnChange}
            className="mt-1 outline-none rounded w-full px-3 py-2 border"
          />
          <p className="text-red-500 text-xs mt-1">{errors?.objective}</p>
        </div>

        <div className="text-sm mb-3">
          <label htmlFor="" className="text-sm">
            Lesson description
          </label>
          <textarea
            rows={3}
            style={{ resize: "none" }}
            name="description"
            value={formData.description}
            onChange={handleOnChange}
            className="mt-1 outline-none rounded w-full px-3 py-2 border"
          />
          <p className="text-red-500 text-xs mt-1">{errors?.description}</p>
        </div>
        <div className="text-sm mb-3">
          <label htmlFor="" className="text-sm">
            Preview
          </label>
          <RawFileInput
            setSelection={(value: any) =>
              setFormData({ ...formData, preview: value })
            }
          />
          <p className="text-red-500 text-xs mt-1">{errors?.preview}</p>
        </div>
        <div className="text-sm mb-3">
          <label htmlFor="" className="text-sm">
            Additional Instructions
          </label>
          <textarea
            rows={3}
            style={{ resize: "none" }}
            name="additional_instruction"
            value={formData.additional_instruction}
            onChange={handleOnChange}
            className="mt-1 outline-none rounded w-full px-3 py-2 border"
          />
          <p className="text-red-500 text-xs mt-1"></p>
        </div>
      </div>
      <div className="px-4 w-full h-[3.8rem] mt-[2px] flex border-t items-center">
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="bg-main shadow shadow-xl focus:shadow-lg outline-none w-full text-sm text-center py-2 rounded text-white font-[500]"
        >
          {loading ? <WhiteSpinner /> : <span>Create Lesson</span>}
        </button>
      </div>
    </div>
  );
}

function TemplateTextbookLesson({
  modal,
  setModal,
  lesson,
  refetch,
  textbookProps,
}: {
  textbookProps?: any;
  subjectId?: number;
  lesson?: any;
  refetch?: any;
  modal: boolean;
  setModal: any;
}) {
  const classIDs = textbookProps?.classes?.map((item: any) => ({
    id: item.id,
    name: item.naming,
  }));

  const [klass, setClass] = useState<number[]>(classIDs?.map((i: any) => i.id));
  const [errors, setErrors] = useState<TLibraryModalError>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [chapterOptions, setChapterOptions] = useState([]);
  const [chapter, setChapter] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [PNGFiles, setPNGFiles] = useState<File[]>([]);
  const dispatch = useDispatch();

  // probably wanted to try something sha
  const [formData, setFormData] = useState<{
    title: string;
    objective: string;
  }>({
    title: "",
    objective: "",
  });

  useEffect(() => {}, []);

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = e.target;
    if (name == "age") {
      value = value.replace(/\D/g, "");
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors: TLibraryModalError = {};
    if (!formData.title || formData.title.length == 0)
      newErrors.title = "Please Enter a valid title";

    if (!lesson) {
      if (klass.length == 0) newErrors.class = "Please select a class";
    }
    if (formData.objective == "")
      newErrors.objective = "Please fill in an objective";

    if (chapter == 0) newErrors.chapter = "Please select a chapter";

    if (!selectedFile) newErrors.file = "please select a file";

    return newErrors;
  };
  const sendRequest = () => {
    let payload = new FormData();
    payload.append("title", formData.title);
    payload.append("class", lesson?.ClassId || String(klass[0]));
    payload.append("objective", formData.objective);
    payload.append("age", lesson?.age || String(textbookProps.ages[0]));
    payload.append("template", selectedFile as Blob, selectedFile?.name);
    payload.append("subject", String(textbookProps?.id));
    payload.append("chapter", String(chapter));

    PNGFiles.forEach((PNGFile: File) => {
      payload.append("preview", PNGFile as Blob, PNGFile?.name);
    });

    axiosInstance
      .post("/librarylesson/template", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        dispatch(setLibraryReload());
        if (textbookProps && refetch) {
          refetch(textbookProps.id, lesson?.GroupId);
        }
        setModal(false);
        notify.success("Added lesson successfuly");
      })
      .catch((error) => {
        notify.error(error?.response?.message);
      })
      .finally(() => setLoading(false));
  };

  const removePNGFile = (fileIndex: number) => {
    const newSelectedFiles = [...PNGFiles];
    newSelectedFiles.splice(fileIndex, 1);
    setPNGFiles(newSelectedFiles);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      setErrors({});
      sendRequest();
    } else {
      setErrors(newErrors);
      console.log(errors);
      setLoading(false);
    }
  };

  return (
    <div onSubmit={handleSubmit}>
      <div className={`px-4 mt-4 max-h-[75vh] overflow-y-auto`}>
        <div className="text-sm mb-3">
          <label htmlFor="" className="text-sm">
            Lesson title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleOnChange}
            className="mt-1 outline-none rounded w-full px-3 py-2 border"
          />
          <p className="text-red-500 text-xs mt-1">{errors?.title}</p>
        </div>

        <div className="text-sm mb-3">
          <label htmlFor="" className="text-sm">
            Chapter
          </label>
          <SingleOptionsMenu
            selection={chapter}
            options={chapterOptions}
            setSelection={setChapter}
          />
          <p className="text-red-500 text-xs mt-1">{errors?.chapter}</p>
        </div>

        {!lesson && (
          <div className="text-sm mb-3 w-full">
            <label htmlFor="" className="text-sm">
              Class
            </label>
            {/* <SingleOptionsMenu selection={klass} options={classOptions.map((item) => ({ id: item.id, value: item.naming }))} setSelection={setClass} /> */}
            <OptionsMenu
              readonly
              selection={[1, 2, 3, 4]}
              options={classIDs}
              setSelection={setClass}
            />
            <p className="text-red-500 text-xs mt-1">{errors?.class}</p>
          </div>
        )}
        {/* <div className="text-sm mb-3">
    <label htmlFor="" className="text-sm">Age</label>
    <OptionsMenu selection={age} options={ageOptions} setSelection={setAge} />
    <p className="text-red-500 text-xs mt-1">{errors?.age}</p>
</div> */}
        <div className="text-sm mb-3">
          <label htmlFor="" className="text-sm">
            Lesson Objective
          </label>
          <textarea
            rows={3}
            style={{ resize: "none" }}
            name="objective"
            value={formData.objective}
            onChange={handleOnChange}
            className="mt-1 outline-none rounded w-full px-3 py-2 border"
          />
          <p className="text-red-500 text-xs mt-1">{errors?.objective}</p>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center space-x-6">
            <UploadFile
              text="Upload File"
              {...{ selectedFile, setSelectedFile }}
            />
            <MultiFileUpload
              text="Upload PNG"
              accept=".png,.jpeg,.jpg"
              files={PNGFiles}
              setSelectedFiles={setPNGFiles}
            />
          </div>

          <p className="text-red-500 text-xs mt-1">{errors?.file}</p>
          <span className="text-xs mt-[2px] text-gray-500">
            Your attached file should be in PNG or Word Format
          </span>
          {selectedFile && (
            <div className="text-main font-[600] w-[90%] justify-between text-[14px] flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <span className="">
                  <svg
                    width="10"
                    height="16"
                    viewBox="0 0 10 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 16C3.60606 16 2.42424 15.5733 1.45455 14.72C0.484848 13.8667 0 12.8267 0 11.6V3.2C0 2.32 0.356061 1.56667 1.06818 0.94C1.7803 0.313333 2.63636 0 3.63636 0C4.63636 0 5.49242 0.313333 6.20455 0.94C6.91667 1.56667 7.27273 2.32 7.27273 3.2V10.8C7.27273 11.36 7.05303 11.8333 6.61364 12.22C6.17424 12.6067 5.63636 12.8 5 12.8C4.36364 12.8 3.82576 12.6067 3.38636 12.22C2.94697 11.8333 2.72727 11.36 2.72727 10.8V3.2H4.09091V10.8C4.09091 11.0267 4.17818 11.2168 4.35273 11.3704C4.52727 11.524 4.74303 11.6005 5 11.6C5.25758 11.6 5.47364 11.5232 5.64818 11.3696C5.82273 11.216 5.9097 11.0261 5.90909 10.8V3.2C5.90909 2.64 5.68939 2.16667 5.25 1.78C4.81061 1.39333 4.27273 1.2 3.63636 1.2C3 1.2 2.46212 1.39333 2.02273 1.78C1.58333 2.16667 1.36364 2.64 1.36364 3.2V11.6C1.36364 12.48 1.7197 13.2333 2.43182 13.86C3.14394 14.4867 4 14.8 5 14.8C6 14.8 6.85606 14.4867 7.56818 13.86C8.2803 13.2333 8.63636 12.48 8.63636 11.6V3.2H10V11.6C10 12.8267 9.51515 13.8667 8.54545 14.72C7.57576 15.5733 6.39394 16 5 16Z"
                      fill="#4F46E5"
                    />
                  </svg>
                </span>
                <span>
                  {selectedFile?.name?.length > 40
                    ? selectedFile.name.slice(0, 40) + "..."
                    : selectedFile.name}{" "}
                </span>
                <span className="text-gray-600 font-[400]">
                  (
                  {selectedFile.size >= 1024 * 1024
                    ? (selectedFile.size / (1024 * 1024)).toPrecision(3) + "MB"
                    : (selectedFile.size / 1024).toPrecision(3) + "KB"}
                  )
                </span>
              </div>
              <button
                onClick={() => setSelectedFile(null)}
                className="w-6 h-6 rounded-full border border-gray-300 hover:bg-gray-300 active:bg-gray-200 flex items-center justify-center"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.66536 3.33333H9.33203C9.33203 2.97971 9.19155 2.64057 8.94151 2.39052C8.69146 2.14048 8.35232 2 7.9987 2C7.64508 2 7.30594 2.14048 7.05589 2.39052C6.80584 2.64057 6.66536 2.97971 6.66536 3.33333ZM5.66536 3.33333C5.66536 3.02692 5.72572 2.7235 5.84298 2.44041C5.96024 2.15731 6.13211 1.90009 6.34878 1.68342C6.56545 1.46675 6.82268 1.29488 7.10577 1.17761C7.38886 1.06035 7.69228 1 7.9987 1C8.30512 1 8.60853 1.06035 8.89163 1.17761C9.17472 1.29488 9.43194 1.46675 9.64861 1.68342C9.86528 1.90009 10.0372 2.15731 10.1544 2.44041C10.2717 2.7235 10.332 3.02692 10.332 3.33333H14.1654C14.298 3.33333 14.4251 3.38601 14.5189 3.47978C14.6127 3.57355 14.6654 3.70073 14.6654 3.83333C14.6654 3.96594 14.6127 4.09312 14.5189 4.18689C14.4251 4.28066 14.298 4.33333 14.1654 4.33333H13.2854L12.5054 12.4073C12.4455 13.026 12.1574 13.6002 11.6972 14.0179C11.2369 14.4356 10.6376 14.6669 10.016 14.6667H5.98136C5.35994 14.6667 4.76076 14.4354 4.30066 14.0177C3.84056 13.6 3.55252 13.0259 3.4927 12.4073L2.71203 4.33333H1.83203C1.69942 4.33333 1.57225 4.28066 1.47848 4.18689C1.38471 4.09312 1.33203 3.96594 1.33203 3.83333C1.33203 3.70073 1.38471 3.57355 1.47848 3.47978C1.57225 3.38601 1.69942 3.33333 1.83203 3.33333H5.66536ZM6.9987 6.5C6.9987 6.36739 6.94602 6.24022 6.85225 6.14645C6.75848 6.05268 6.63131 6 6.4987 6C6.36609 6 6.23891 6.05268 6.14514 6.14645C6.05138 6.24022 5.9987 6.36739 5.9987 6.5V11.5C5.9987 11.6326 6.05138 11.7598 6.14514 11.8536C6.23891 11.9473 6.36609 12 6.4987 12C6.63131 12 6.75848 11.9473 6.85225 11.8536C6.94602 11.7598 6.9987 11.6326 6.9987 11.5V6.5ZM9.4987 6C9.63131 6 9.75848 6.05268 9.85225 6.14645C9.94602 6.24022 9.9987 6.36739 9.9987 6.5V11.5C9.9987 11.6326 9.94602 11.7598 9.85225 11.8536C9.75848 11.9473 9.63131 12 9.4987 12C9.36609 12 9.23891 11.9473 9.14514 11.8536C9.05138 11.7598 8.9987 11.6326 8.9987 11.5V6.5C8.9987 6.36739 9.05138 6.24022 9.14514 6.14645C9.23891 6.05268 9.36609 6 9.4987 6ZM4.48803 12.3113C4.52399 12.6824 4.69686 13.0268 4.97294 13.2774C5.24903 13.528 5.60853 13.6667 5.98136 13.6667H10.016C10.3889 13.6667 10.7484 13.528 11.0245 13.2774C11.3005 13.0268 11.4734 12.6824 11.5094 12.3113L12.2814 4.33333H3.71603L4.48803 12.3113Z"
                    fill="#4F46E5"
                  />
                </svg>
              </button>
            </div>
          )}
          {PNGFiles?.map((pngFile: File, index: number) => (
            <div
              key={index}
              className="text-main font-[600] w-[90%] justify-between text-[14px] flex items-center space-x-2"
            >
              <div className="flex items-center space-x-1">
                <span className="">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.15 15.75H5.19853C4.74417 15.75 4.51699 15.75 4.41179 15.6602C4.32051 15.5822 4.27207 15.4652 4.28149 15.3456C4.29234 15.2077 4.45298 15.047 4.77426 14.7257L11.1515 8.34853C11.4485 8.05152 11.597 7.90301 11.7682 7.84737C11.9189 7.79842 12.0811 7.79842 12.2318 7.84737C12.403 7.90301 12.5515 8.05152 12.8485 8.34853L15.75 11.25V12.15M12.15 15.75C13.4101 15.75 14.0402 15.75 14.5215 15.5048C14.9448 15.289 15.289 14.9448 15.5048 14.5215C15.75 14.0402 15.75 13.4101 15.75 12.15M12.15 15.75H5.85C4.58988 15.75 3.95982 15.75 3.47852 15.5048C3.05516 15.289 2.71095 14.9448 2.49524 14.5215C2.25 14.0402 2.25 13.4101 2.25 12.15V5.85C2.25 4.58988 2.25 3.95982 2.49524 3.47852C2.71095 3.05516 3.05516 2.71095 3.47852 2.49524C3.95982 2.25 4.58988 2.25 5.85 2.25H12.15C13.4101 2.25 14.0402 2.25 14.5215 2.49524C14.9448 2.71095 15.289 3.05516 15.5048 3.47852C15.75 3.95982 15.75 4.58988 15.75 5.85V12.15M7.875 6.375C7.875 7.20343 7.20343 7.875 6.375 7.875C5.54657 7.875 4.875 7.20343 4.875 6.375C4.875 5.54657 5.54657 4.875 6.375 4.875C7.20343 4.875 7.875 5.54657 7.875 6.375Z"
                      stroke="#4F46E5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>
                  {pngFile?.name?.length > 40
                    ? pngFile.name.slice(0, 40) + "..."
                    : pngFile.name}{" "}
                </span>
                <span className="text-gray-600 font-[400]">
                  (
                  {pngFile.size >= 1024 * 1024
                    ? (pngFile.size / (1024 * 1024)).toPrecision(3) + "MB"
                    : (pngFile.size / 1024).toPrecision(3) + "KB"}
                  )
                </span>
              </div>
              <button
                onClick={() => removePNGFile(index)}
                className="w-6 h-6 rounded-full border border-gray-300 hover:bg-gray-300 active:bg-gray-200 flex items-center justify-center"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.66536 3.33333H9.33203C9.33203 2.97971 9.19155 2.64057 8.94151 2.39052C8.69146 2.14048 8.35232 2 7.9987 2C7.64508 2 7.30594 2.14048 7.05589 2.39052C6.80584 2.64057 6.66536 2.97971 6.66536 3.33333ZM5.66536 3.33333C5.66536 3.02692 5.72572 2.7235 5.84298 2.44041C5.96024 2.15731 6.13211 1.90009 6.34878 1.68342C6.56545 1.46675 6.82268 1.29488 7.10577 1.17761C7.38886 1.06035 7.69228 1 7.9987 1C8.30512 1 8.60853 1.06035 8.89163 1.17761C9.17472 1.29488 9.43194 1.46675 9.64861 1.68342C9.86528 1.90009 10.0372 2.15731 10.1544 2.44041C10.2717 2.7235 10.332 3.02692 10.332 3.33333H14.1654C14.298 3.33333 14.4251 3.38601 14.5189 3.47978C14.6127 3.57355 14.6654 3.70073 14.6654 3.83333C14.6654 3.96594 14.6127 4.09312 14.5189 4.18689C14.4251 4.28066 14.298 4.33333 14.1654 4.33333H13.2854L12.5054 12.4073C12.4455 13.026 12.1574 13.6002 11.6972 14.0179C11.2369 14.4356 10.6376 14.6669 10.016 14.6667H5.98136C5.35994 14.6667 4.76076 14.4354 4.30066 14.0177C3.84056 13.6 3.55252 13.0259 3.4927 12.4073L2.71203 4.33333H1.83203C1.69942 4.33333 1.57225 4.28066 1.47848 4.18689C1.38471 4.09312 1.33203 3.96594 1.33203 3.83333C1.33203 3.70073 1.38471 3.57355 1.47848 3.47978C1.57225 3.38601 1.69942 3.33333 1.83203 3.33333H5.66536ZM6.9987 6.5C6.9987 6.36739 6.94602 6.24022 6.85225 6.14645C6.75848 6.05268 6.63131 6 6.4987 6C6.36609 6 6.23891 6.05268 6.14514 6.14645C6.05138 6.24022 5.9987 6.36739 5.9987 6.5V11.5C5.9987 11.6326 6.05138 11.7598 6.14514 11.8536C6.23891 11.9473 6.36609 12 6.4987 12C6.63131 12 6.75848 11.9473 6.85225 11.8536C6.94602 11.7598 6.9987 11.6326 6.9987 11.5V6.5ZM9.4987 6C9.63131 6 9.75848 6.05268 9.85225 6.14645C9.94602 6.24022 9.9987 6.36739 9.9987 6.5V11.5C9.9987 11.6326 9.94602 11.7598 9.85225 11.8536C9.75848 11.9473 9.63131 12 9.4987 12C9.36609 12 9.23891 11.9473 9.14514 11.8536C9.05138 11.7598 8.9987 11.6326 8.9987 11.5V6.5C8.9987 6.36739 9.05138 6.24022 9.14514 6.14645C9.23891 6.05268 9.36609 6 9.4987 6ZM4.48803 12.3113C4.52399 12.6824 4.69686 13.0268 4.97294 13.2774C5.24903 13.528 5.60853 13.6667 5.98136 13.6667H10.016C10.3889 13.6667 10.7484 13.528 11.0245 13.2774C11.3005 13.0268 11.4734 12.6824 11.5094 12.3113L12.2814 4.33333H3.71603L4.48803 12.3113Z"
                    fill="#4F46E5"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="px-4 w-full h-[3.8rem] mt-[2px] flex border-t items-center">
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="bg-main shadow shadow-xl focus:shadow-lg outline-none w-full text-sm text-center py-2 rounded text-white font-[500]"
        >
          {loading ? <WhiteSpinner /> : <span>Upload</span>}
        </button>
      </div>
    </div>
  );
}

export default function AddTextbookLesson({
  modal,
  setModal,
  lesson,
  refetch,
  textbookProps,
}: {
  textbookProps?: any;
  subjectId?: number;
  lesson?: any;
  refetch?: any;
  modal: boolean;
  setModal: any;
}) {
  const [active, setActive] = useState(1);
  return (
    <ModalLayout title="Add Lesson" {...{ modal, setModal }}>
      <ul className="text-sm  flex items-center mt-1 px-1 space-x-3 border-b">
        <li
          className={`py-2 border-main cursor-pointer px-3 rounded-t-lg ${
            active == 1 && "border-b-2"
          }`}
          onClick={() => setActive(1)}
        >
          Empty Lesson
        </li>
        <li
          className={`py-2 border-main cursor-pointer px-3 rounded-t-lg ${
            active == 2 && "border-b-2"
          }`}
          onClick={() => setActive(2)}
        >
          Lesson Template
        </li>
      </ul>
      {active == 1 && (
        <EmptyTextbookLesson
          {...{ modal, setModal, lesson, refetch, textbookProps }}
        />
      )}
      {active == 2 && (
        <TemplateTextbookLesson
          {...{ modal, setModal, lesson, refetch, textbookProps }}
        />
      )}
    </ModalLayout>
  );
}
