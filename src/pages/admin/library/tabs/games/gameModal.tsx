import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "@/api/request";
import { notify } from "@/components/notification/notification";
import { setLibraryReload } from "@/redux/slices/library";
import SingleOptionsMenu from "@/components/singleOptionsMenu/singleOptionsMenu";
import WhiteSpinner from "@/components/whiteSpinner/spinner";
import { BASE_URL } from "@/services/url";

import RawFileInput from "@/components/rawFileInput/rawFileInput";
import { reloadSubjects } from "@/redux/slices/subject";

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
        className="mt-2 cursor-pointer  outline-none rounded w-[21.9rem] px-3 py-2 border flex justify-between items-center"
      >
        {selection.length > 0 && !variant ? (
          <p className="text-xs"></p>
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
        <div className="bg-white p-4 shadow w-[21.9rem] z-[50]">
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

export default function SubjectModal({
  subject,
  modal,
  setModal,
}: {
  subject?: any;
  modal: boolean;
  setModal: (state: boolean) => void;
}) {
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [classOptions, setClassOptions] = useState<any[]>([1, 2, 3, 4, 5, 6]);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    classes: number[];
    default: number;
  }>({
    name: "",
    description: "",
    default: 1,
    classes: [],
  });

  useEffect(() => {
    if (subject) {
      setFormData({
        name: subject.name,
        description: subject.description,
        classes: [],
        default: 1,
      });
    }
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
    const newErrors: any = {};
    if (!formData.name || formData.name.length == 0)
      newErrors.name = "Please enter a valid name";

    if (formData.classes.length == 0)
      newErrors.class = "Please select a class from the menu";

    if (formData.description == "")
      newErrors.description = "Please fill in a description";

    return newErrors;
  };

  const sendRequest = () => {
    const req = subject
      ? axiosInstance.put("/subjects/"+subject.id, formData)
      : axiosInstance.post("/subjects", formData);
    req
      .then(() => {
        notify.success(!!subject? "Updated subject":"Added new subject");
        dispatch(reloadSubjects());
        setModal(false);
      })
      .catch((error: any) => {
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
    <div
      className={`fixed text-primary z-[1000] bg-[#00000044] duration-0 inset-0 h-screen w-screen ${
        modal ? "" : "-translate-y-full"
      }`}
    >
      <div
        className={`${
          modal ? "translate-y-[3rem]" : "translate-y-0"
        } z-[100] bg-white rounded duration-1000 h-[517px] w-[380px] mx-auto `}
      >
        <div className="p-2 border-b px-4 flex items-center justify-between">
          <h1>{subject ? "Update" : "Add"} Subject</h1>
          <button className="text-2xl" onClick={() => setModal(false)}>
            &times;
          </button>
        </div>
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
            <div className="text-sm mb-3">
              <label htmlFor="" className="text-sm">
                Class
              </label>
              <OptionsMenu
                selection={formData.classes}
                options={classOptions.map((item: any) => ({
                  id: item,
                  name: item.toString(),
                }))}
                setSelection={(value: any) => {
                  setFormData({ ...formData, classes: value });
                }}
              />
              <p className="text-red-500 text-xs mt-1">{errors?.class}</p>
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
                <span>{subject ? "Update" : "Create"}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
