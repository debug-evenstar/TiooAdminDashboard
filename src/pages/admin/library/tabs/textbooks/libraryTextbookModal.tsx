import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "@/api/request";
import { notify } from "@/components/notification/notification";
import { setLibraryReload } from "@/redux/slices/library";
import SingleOptionsMenu from "@/components/singleOptionsMenu/singleOptionsMenu";
import WhiteSpinner from "@/components/whiteSpinner/spinner";
import { BASE_URL } from "@/services/url";

import RawFileInput from "@/components/rawFileInput/rawFileInput";
import { RootState } from "@/redux/store";
import ModalLayout from "@/components/modalLayout/modalLayout";



type TLibraryModalError = {
  name?: string;
  class?: string;
  ages?: string;
  description?: string;
  file?: string;
  category?: string;
  cover?: string;
  subject?: string;
};

type TOptionProps = {
  id: number;
  name: number | string;
};

function OptionsMenu({
  selection,
  setSelection,
  options,
  variant,
}: {
  variant?: boolean;
  selection: number[];
  setSelection: any;
  options: TOptionProps[];
}) {
  const [active, setActive] = useState(false);

  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    const value = e.currentTarget.getAttribute("data-value");
    if (value) {
      const id: number = Number.parseInt(value);
      if (!selection.includes(id)) setSelection([...selection, id]);
      else {
        setSelection(selection.filter((number: number) => number != id));
      }
    }
  };

  const min = Math.min(...selection);
  const minName = options?.find((i: any) => i.id == min)?.name;
  const max = Math.max(...selection);
  const maxName = options?.find((i: any) => i.id == max)?.name;
  return (
    <>
      <div
        onClick={() => setActive(!active)}
        className="mt-2 cursor-pointer  outline-none rounded w-full px-3 py-2 border flex justify-between items-center"
      >
        {selection.length > 0 && !variant ? (
          <p className="text-xs">{minName + " - " + maxName}</p>
        ) : (
          <p></p>
        )}
        <div
          className={`text-xs duration-300  w-4 h-4 flex items-center justify-center
                cursor-pointer ${!active && "rotate-180"}`}
        >
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.7071 7.70711C13.3166 8.09763 12.6834 8.09763 12.2929 7.70711L7 2.41421L1.70711 7.70711C1.31658 8.09763 0.683417 8.09763 0.292893 7.70711C-0.0976315 7.31658 -0.0976316 6.68342 0.292893 6.29289L6.29289 0.292894C6.68342 -0.0976303 7.31658 -0.0976304 7.70711 0.292894L13.7071 6.29289C14.0976 6.68342 14.0976 7.31658 13.7071 7.70711Z"
              fill="#030036"
              fillOpacity="0.74"
            />
          </svg>
        </div>
      </div>
      {active && (
        <div className="bg-white p-4 shadow w-full z-[50]">
          <ul className="">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={handleClick}
                data-value={option.id}
                className="flex items-center cursor-pointer space-x-3 py-1"
              >
                <input
                  type="checkbox"
                  checked={selection.includes(option.id)}
                  onChange={() => null}
                  className=" w-4 h-4 rounded-full outline-none"
                />
                <span>{option.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

const agesOptions = [...Array(18 - 5 + 1)].map((_, index) => ({
  id: index + 5,
  name: index + 5,
}));

export default function TextbookModal({
  textbookProps,
  modal,
  setModal,
}: {
  textbookProps?: any;
  modal: boolean;
  setModal: (state: boolean) => void;
}) {
  const [classes, setClasses] = useState<number[]>([]);
  const [subject, setSubject] = useState<any>(0);
  const [errors, setErrors] = useState<TLibraryModalError>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [classOptions, setClassOptions] = useState<any[]>([]);
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);

  const dispatch = useDispatch();

  const subjects = useSelector(
    (state: RootState) => state.subject.subjects
  );


  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    SubjectId: any;
  }>({
    name: "",
    description: "",
    SubjectId: "",
  });

  useEffect(() => {
    if (textbookProps) {
      setFormData({
        name: textbookProps.name,
        description: textbookProps.description,
        SubjectId: textbookProps.subject_id,
      });

      let classes = null;
      if (typeof textbookProps.classes === "string") {
        classes = JSON.parse(textbookProps.classes);
      } else {
        classes = textbookProps.classes;
      }

      setClasses(textbookProps.classes?.map((item:any) => item.id));
      setSubject(textbookProps.subject_id);
    }

    axiosInstance
      .get(`/classes`)
      .then((response) => {
        setClassOptions(response.data.data);
      })
      .catch((error) => console.log(''));
  }, []);

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = e.target;
    if (name == "ages") {
      value = value.replace(/\D/g, "");
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors: TLibraryModalError = {};
    if (!formData.name || formData.name.length == 0)
      newErrors.name = "Please Enter a valid title";

    if (classes.length == 0)
      newErrors.class = "Please select a class from the menu";

    if (coverPhoto === null && !textbookProps) newErrors.cover = "Please select a cover photo";

    if (subject == 0) newErrors.subject = "Please select a subject";

    if (formData.description == "")
      newErrors.description = "Please fill in a description";

    return newErrors;
  };

  const sendRequest = () => {
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("subject_id", subject);
    if (coverPhoto) {
      payload.append("cover", coverPhoto as Blob, coverPhoto?.name);
    }
    // payload.append('ages',JSON.stringify(ages));
    payload.append("classes", JSON.stringify(classes));

    // payload.append('cover', coverPhoto as Blob, coverPhoto?.name);
    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const req = !!textbookProps
      ? axiosInstance.put(
          "/library/textbooks/" + textbookProps.id,
          payload,
          options
        )
      : axiosInstance.post("/library/textbooks", payload,options);
    req
      .then(() => {
        notify.success(`${!!textbookProps? "Updated" : "Added new"} textbook`);
        dispatch(setLibraryReload());
        setModal(false);
      })
      .catch((error) => {
        console.log(error);
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
      setLoading(false);
    }
  };

  return (
    <>
      <div onSubmit={handleSubmit}>
        <div className=" px-4 mt-4 h-[25rem] overflow-y-auto">
          <div className="text-sm mb-3">
            <label htmlFor="" className="text-sm">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleOnChange}
              className="mt-1 outline-none rounded w-full px-3 py-2 border"
            />
            <p className="text-red-500 text-xs mt-1">{errors?.name}</p>
          </div>
          <div className="text-sm mb-3 ">
            <label htmlFor="" className="text-sm">
              Classes
            </label>
            <OptionsMenu
              selection={classes}
              options={classOptions}
              setSelection={setClasses}
            />
            <p className="text-red-500 text-xs mt-1">{errors?.class}</p>
          </div>
          <div className="text-sm mb-3">
            <label htmlFor="" className="text-sm">
              Subjects
            </label>
            <SingleOptionsMenu
              selection={subject}
              options={subjects.map((item: any) => ({
                id: item.id,
                value: item.name,
              }))}
              setSelection={setSubject}
            />
            <p className="text-red-500 text-xs mt-1">{errors?.subject}</p>
          </div>
          <div className="text-sm mb-3">
            <label htmlFor="" className="text-sm">
              Cover photo
            </label>
            <RawFileInput setSelection={setCoverPhoto} />
            <p className="text-red-500 text-xs mt-1">{errors?.cover}</p>
          </div>

          <div className="text-sm mb-3">
            <label htmlFor="" className="text-sm">
              Description
            </label>
            <textarea
              rows={5}
              style={{ resize: "none" }}
              name="description"
              value={formData.description}
              onChange={handleOnChange}
              className="mt-1 outline-none rounded w-full px-3 py-2 border"
            />
            <p className="text-red-500 text-xs mt-1">{errors?.description}</p>
          </div>
        </div>
        <div className="px-4 w-full h-[3rem] mt-[2px] flex border-t items-center">
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="bg-main focus:shadow-lg outline-none w-full text-sm text-center py-1.5 rounded text-white font-[500]"
          >
            {loading ? (
              <WhiteSpinner />
            ) : (
              <span>{!!textbookProps ? "Update" : "Create"}</span>
            )}
          </button>
        </div>
      </div>
      
    </>
  );
}
