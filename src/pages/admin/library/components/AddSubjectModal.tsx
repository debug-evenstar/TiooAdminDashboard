import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "@services/api";
import { notify } from "@components/notification/notification";
import { setLibraryReload } from "@redux/slices/library";
import SingleOptionsMenu from "@components/singleOptionsMenu/singleOptionsMenu";
import WhiteSpinner from "@components/whiteSpinner/spinner";
import { BASE_URL } from "@services/url";

import RawFileInput from "@components/rawFileInput/rawFileInput";

export default function AddSubject({
    subject,
    tabId,
    modal,
    setModal,
  }: {
    subject?: any;
    tabId: number;
    modal: boolean;
    setModal: (state: boolean) => void;
  }) {
    const [classes, setClasses] = useState<number[]>([]);
    const [category, setCategory] = useState<number>(0);
    const [ages, setAge] = useState<number[]>([]);
    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [classOptions, setClassOptions] = useState<any[]>([]);
    const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
    const dispatch = useDispatch();
    // probably wanted to try something sha
    const [formData, setFormData] = useState<{
      name: string;
      description: string;
    }>({
      name: "",
      description: "",
    });
  
    useEffect(() => {
      if (subject) {
        setFormData({
          name: subject.name,
          description: subject.description,
        });
  
        let classes = null;
        if (typeof subject.classes === "string") {
          classes = JSON.parse(subject.classes);
        } else {
          classes = subject.classes;
        }
  
        const ids = classes.map((i: any) => i.id);
        setClasses(ids);
      }
  
      axiosInstance
        .get(`${BASE_URL}/tio/classes`)
        .then((response : any) => {
          // console.log(response.data.data);
          setClassOptions(response.data.data);
        })
        .catch((error : any) => console.log(error));
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
  
      if (classes.length == 0)
        newErrors.class = "Please select a class from the menu";
  
      if (formData.description == "")
        newErrors.description = "Please fill in a description";
  
      return newErrors;
    };
  
    const sendRequest = () => {
  
      const payload = new FormData();
      payload.append("naming", formData.name);
      payload.append("description", formData.description);
      payload.append("tab", String(tabId));
      payload.append("subject_category", String(category));
      if (coverPhoto) {
        payload.append("cover", coverPhoto as Blob, coverPhoto?.name);
      } else {
        payload.append("cover", JSON.stringify(null));
      }
      // payload.append('ages',JSON.stringify(ages));
      payload.append("class", JSON.stringify(classes));
      ages.forEach((age: number) => {
        payload.append("ages", age as unknown as string);
      });
  
      // payload.append('cover', coverPhoto as Blob, coverPhoto?.name);
      axiosInstance
        .post("/library/subject", payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          notify.success("Added new lesson material");
          dispatch(setLibraryReload());
          setModal(false);
        })
        .catch((error : any) => {
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
                  selection={classes}
                  options={classOptions.map((item: any) => ({
                    id: item.id,
                    name: item.naming,
                  }))}
                  setSelection={setClasses}
                />
                <p className="text-red-500 text-xs mt-1">{errors?.class}</p>
              </div>
              {tabId === 0 && (
                <div className="text-sm mb-3">
                  <label htmlFor="" className="text-sm">
                    Category
                  </label>
                  <SingleOptionsMenu
                    selection={category}
                    options={categoryOptions.map((item) => ({
                      id: item.id,
                      value: item.name,
                    }))}
                    setSelection={setCategory}
                  />
                  <p className="text-red-500 text-xs mt-1">{errors?.category}</p>
                </div>
              )}
              <div className="text-sm mb-3">
                <label htmlFor="" className="text-sm">
                  Cover photo
                </label>
                <RawFileInput setSelection={setCoverPhoto} />
                <p className="text-red-500 text-xs mt-1">{errors?.cover}</p>
              </div>
  
              <div className="text-sm mb-3">
                <label htmlFor="" className="text-sm">
                  Age
                </label>
                <OptionsMenu
                  selection={ages}
                  options={agesOptions}
                  setSelection={setAge}
                />
                {/* <input type="text" name="ages" value={formData.ages} onChange={handleOnChange} className="mt-1 outline-none rounded w-full px-3 py-2 border" /> */}
                <p className="text-red-500 text-xs mt-1">{errors?.ages}</p>
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
                  <span>{textbookProps ? "Update" : "Create"}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }