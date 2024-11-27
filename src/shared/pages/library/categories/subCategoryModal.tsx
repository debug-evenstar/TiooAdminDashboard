import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Request from "@/api/request";
import { notify } from "@/components/notification/notification";
import WhiteSpinner from "@/components/whiteSpinner/spinner";
import RawFileInput from "@/components/rawFileInput/rawFileInput";
import { subcategories } from "@/api/routes";
import { addSubCategory, updateSubCategory } from "@/api";

type TLibraryModalError = {
  name?: string;
  cover?: string;
};

export default function SubCategoryModal({
  setModal,
  refetch,
  currentCategoryProps,
  parentCategoryProps,
}: {
  currentCategoryProps?: any;
  refetch?: any;
  setModal: any;
  parentCategoryProps?: any;
}) {
  const [name, setName] = useState("");
  const [cover, setCover] = useState<File | null>(null);
  const [errors, setErrors] = useState<TLibraryModalError>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(currentCategoryProps);
    if (currentCategoryProps) {
      setName(currentCategoryProps.name);
    }
  }, [currentCategoryProps]);


  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { value } = e.target;
    setName(value);
  };

  const validate = () => {
    const newErrors: any = {};
    if (!name || name.length == 0)
      newErrors.topic = "Please Enter a valid name";

    return newErrors;
  };

  const sendRequest = async () => {
    let payload = new FormData();
    payload.append("name", name);

    payload.append("cover", cover as File);

    if (!currentCategoryProps) {
      await addSubCategory(parentCategoryProps.id, payload)
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
      await updateSubCategory(currentCategoryProps.id, payload)
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
    setName('');
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
            name="topic"
            value={name}
            onChange={handleOnChange}
            className="mt-1 outline-none rounded w-full px-3 py-2 border"
          />
          <p className="text-red-500 text-xs mt-1">{errors?.name}</p>
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
            <span> {currentCategoryProps ? "Edit" : "Add"}</span>
          )}
        </button>
      </div>
    </div>
  );
}
