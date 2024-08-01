import React from "react";
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance} from "@/api/request";
import { notify } from "@/components/notification/notification";
import WhiteSpinner from "@/components/whiteSpinner/spinner";

import ModalLayout from "@/components/modalLayout/modalLayout";

type TLibraryModalError = {
  name?: string;
  description?: string;
};

export default function ChapterModal({
  chapterProps,
  refresh,
  modal,
  setModal,
  textbookId
}: {
  chapterProps?: any;
  modal: boolean;
  refresh: any;
  textbookId?: number;
  setModal: (state: boolean) => void;
}) {
  const [errors, setErrors] = useState<TLibraryModalError>({});
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    index: number;
  }>({
    name: "",
    description: "",
    index: 1,
  });

  useEffect(() => {
    if (chapterProps) {
      setFormData({
        name: chapterProps.name,
        description: chapterProps.description,
        index: 1
      });

      let classes = null;
      if (typeof chapterProps.classes === "string") {
        classes = JSON.parse(chapterProps.classes);
      } else {
        classes = chapterProps.classes;
      }
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
    const newErrors: TLibraryModalError = {};
    if (!formData.name || formData.name.length == 0)
      newErrors.name = "Please Enter a valid title";

    if (formData.description == "")
      newErrors.description = "Please fill in a description";

    return newErrors;
  };

  const sendRequest = () => {
    const options = {

    };

    const req = chapterProps
      ? axiosInstance.put(
        `/library/textbooks/${chapterProps.textbook_id}/chapters/` + chapterProps.id,
          formData,
          options
        )
      : axiosInstance.post(`/library/textbooks/${textbookId}/chapters`, formData, options);
    req
      .then(() => {
        notify.success(`${!!chapterProps? "Updated": "Added new "} chapter`);
        refresh();
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
    <div>
      <ModalLayout
        title={`${!!chapterProps ? "Edit" : "Add"} chapter`}
        {...{ modal, setModal }}
      >
        <div onSubmit={handleSubmit}>
          <div className=" px-4 mt-4  overflow-y-auto">
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
                <span>{!!chapterProps ? "Update" : "Create"}</span>
              )}
            </button>
          </div>
        </div>
      </ModalLayout>
    </div>
  );
}
