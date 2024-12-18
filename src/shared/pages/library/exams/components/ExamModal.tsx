import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Request, { axiosInstance } from "@/api/request";
import { notify } from "@/components/notification/notification";
import WhiteSpinner from "@/components/whiteSpinner/spinner";
import RawFileInput from "@/components/rawFileInput/rawFileInput";
import { subcategories } from "@/api/routes";
// import { addExam, updateExam } from "@/api";

type TLibraryModalError = {
  name?: string;
  cover?: string;
  link?: string;
  message?: string;
};

export default function ExamModal({
  setModal,
  refetch,
  examProps,
  exam_type = "admission",
  university_id,
}: {
  examProps?: any;
  refetch?: any;
  setModal: any;
  exam_type?: string;
  university_id?: any;
}) {
  const [name, setName] = useState("");
  const [cover, setCover] = useState<File | null>(null);
  const [errors, setErrors] = useState<TLibraryModalError>({});
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    message: "",
    link: "",
  });

  useEffect(() => {
    console.log(examProps);
    if (!examProps) return;
    if (examProps && examProps.metadata) {
      setForm(examProps.metadata);
    } else {
      setForm({
        name: examProps.name,
        message: "",
        link: "",
      });
    }
  }, [examProps]);

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    const newErrors: any = {};
    if (!form.name || form.name.length == 0)
      newErrors.name = "Please Enter a valid name";

    return newErrors;
  };

  const sendRequest = async () => {
    let payload = new FormData();
    payload.append("name", form.name);
    payload.append("exam_type", exam_type);
    payload.append("cover", cover as File);
    payload.append("metadata", JSON.stringify(form));
    if (exam_type == "university") {
      payload.append("university_id", university_id);
    }

    if (!examProps) {
      await axiosInstance
        .post("/exams", payload)
        .then((res: any) => {
          if (!res.error) {
            notify.success(res.message);
            refetch && refetch();
          } else {
            notify.error(res.message);
          }
        })
        .finally(() => {
          setModal(false);
        });
    } else {
      await axiosInstance
        .put(`/exams/${examProps.id}`, payload)
        .then(() => {
          refetch && refetch();
          setModal(false);
          notify.success("Added successfuly");
        })
        .catch((error) => {
          notify.error(error?.response?.message);
        })
        .finally(() => setLoading(false));
    }

    setLoading(false);
    setName("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const newErrors = validate();
    console.log(newErrors);
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
            Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleOnChange}
            className="mt-1 outline-none rounded w-full px-3 py-2 border"
          />
          <p className="text-red-500 text-xs mt-1">{errors?.name}</p>
        </div>
        <div className="text-sm mb-3">
          <label htmlFor="" className="text-sm">
            Link
          </label>
          <input
            type="text"
            name="link"
            value={form.link}
            onChange={handleOnChange}
            className="mt-1 outline-none rounded w-full px-3 py-2 border"
          />
          <p className="text-red-500 text-xs mt-1">{errors?.link}</p>
        </div>
        <div className="text-sm mb-3">
          <label htmlFor="" className="text-sm">
            Message
          </label>
          <textarea
            rows={5}
            style={{ resize: "none" }}
            name="message"
            value={form.message}
            onChange={handleOnChange}
            className="mt-1 outline-none rounded w-full px-3 py-2 border"
          />
          <p className="text-red-500 text-xs mt-1">{errors?.message}</p>
        </div>

        <div className="text-sm mb-3">
          <label htmlFor="" className="text-sm">
            Cover Image
          </label>
          <RawFileInput setSelection={setCover} />
          <p className="text-red-500 text-xs mt-1">{errors?.cover}</p>
        </div>
      </div>
      <div className="px-4 w-full h-[3.8rem] mt-[2px] flex border-t items-center">
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="bg-main shadow-xl focus:shadow-lg outline-none w-full text-sm text-center py-2 rounded text-white font-[500]"
        >
          {loading ? (
            <WhiteSpinner />
          ) : (
            <span> {examProps ? "Edit" : "Add"}</span>
          )}
        </button>
      </div>
    </div>
  );
}
