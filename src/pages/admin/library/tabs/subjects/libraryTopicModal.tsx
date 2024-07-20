import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/services/api";
import { notify } from "@/components/notification/notification";
import { setLibraryReload } from "@/redux/slices/library";
import SingleOptionsMenu from "@/components/singleOptionsMenu/singleOptionsMenu";
import WhiteSpinner from "@/components/whiteSpinner/spinner";
import { BASE_URL } from "@/services/url";

import RawFileInput from "@/components/rawFileInput/rawFileInput";
import { RootState } from "@/redux/store";
import ModalLayout from "@/components/modalLayout/modalLayout";
import { createSubjectTopic, deleteSubjectTopic, fetchSubjectTopics } from "@/api";
import { FiTrash, FiTrash2 } from "react-icons/fi";



type TLibraryModalError = {
  name?: string;
};


export default function TopicModal({
  topicProps,
  modal,
  setModal,
}: {
  topicProps?: any;
  modal: boolean;
  setModal: (state: boolean) => void;
}) {
  const [subject, setSubject] = useState<any>(0);
  const [errors, setErrors] = useState<TLibraryModalError>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [topicName, setTopicName] = useState<string>("");
  const [subjectTopics, setSubjectTopics] = useState<string[]>([]);

  const dispatch = useDispatch();

  const validate = () => {
    const newErrors: TLibraryModalError = {};
    if (!topicName)
      newErrors.name = "Please enter a valid topic";
    return newErrors;
  };

  const loadTopics = () => {
    fetchSubjectTopics(subject)
      .then((res: any) => {
        if (!res.error) {
          setSubjectTopics(res.data);
        } else {
          notify.error(res.message);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  const removeTopic = (topicId : number) => {
    deleteSubjectTopic(topicId)
      .then((res: any) => {
        console.log(res);
        if (!res.error) {
          notify.success(`Topic removed successfully`);
          loadTopics();
        } else {
          notify.error(res.message);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  const sendRequest = () => {
    createSubjectTopic(subject, {
        topic : topicName
    })
    .then((res: any) => {
        notify.success(`Added topic successfully`);
        loadTopics();
        setTopicName("");
    })
    .catch((err: any) => {
      console.log(err);
    }).finally(() => setLoading(false));
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

  useEffect(()=>{
    setSubject(topicProps.id);
    loadTopics();
  },[topicProps])

  return (
      <div onSubmit={handleSubmit}>
        <div className="px-4 mt-4 h-[25rem] overflow-y-auto">
          <div className="text-sm mb-3">
            <label htmlFor="name" className="text-sm">
              Add New Topic
            </label>
            <input
              type="text"
              name="name"
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
              className="mt-1 outline-none rounded w-full px-3 py-2 border"
            />
            <p className="text-red-500 text-xs mt-1">{errors?.name}</p>
          </div>
          <div>
            {
              subjectTopics.map((topic : any, index : number) => (
                <div key={index} className=" w-full relative bg-[#f5f5f5] px-2 py-1 mb-1 rounded-md border-2 flex items-center">
                   <span className="text-[13px]">{topic.name}</span>
                   <button className="h-full px-2 absolute right-0 hover:bg-white rounded-md" onClick={() => removeTopic(topic.id)}>
                      <FiTrash2  stroke="#e30b1a"/>
                   </button>

                </div>
              ))
            }
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
              <span>Add</span>
            )}
          </button>
        </div>
      </div>
  );
}
