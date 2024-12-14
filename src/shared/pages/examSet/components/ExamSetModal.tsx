import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/api/request";
import { toast } from "react-toastify";
import { notify } from "@/components/notification/notification";
import { PulseLoader } from "react-spinners";

interface LessonProps {
  id: number;
  topic: string;
}

interface SubjectProps {
  id: number;
  name: string;
  lessons: LessonProps[];
}

export default function ExamSetModal({
  modal,
  setModal,
  itemData,
  refetch,
  exam_id,
  title,
}: {
  modal: boolean;
  setModal: any;
  refetch: any;
  itemData?: any;
  exam_id: any;
  title: string;
}) {
  const [subjects, setSubjects] = useState<SubjectProps[]>([]);
  const [activeSubject, setActiveSubject] = useState<SubjectProps | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedLessons, setSelectedLessons] = useState<{
    [subjectId: number]: number;
  }>({});

  const getSubjects = () => {
    axiosInstance
      .get(`/exam-set/subjects`)
      .then((response) => {
        setSubjects(response.data.data);
      })
      .catch((error) => console.error(error));
  };

  const convertToSelectedLessons = (
    data: { subject_id: number; lesson_id: number }[]
  ) => {
    const selectedLessons: { [subjectId: number]: number } = {};
    data.forEach(({ subject_id, lesson_id}) => {
      if (lesson_id) {
        selectedLessons[subject_id] = lesson_id; 
      }
    });
    return selectedLessons;
  };

  useEffect(() => {
    getSubjects();
    if (itemData && subjects) {
      console.log(itemData.data);
      const selection = convertToSelectedLessons(itemData.data);
      console.log(selection);
      setSelectedLessons(selection);
      setName(itemData.name);
    }
  }, []);

  const submit = () => {
    setLoading(true);
    const data = Object.entries(selectedLessons).map(
      ([subjectId, lessonId]) => ({
        subject_id: Number(subjectId),
        lesson_id: lessonId,
      })
    );

    const payload = {
      name: name == "" ? "Exam set" : name,
      data,
      exam_id,
    };

    if (data.length == 0) {
      notify.error("please select at least one lesson");
      setLoading(false);
      return;
    }

    if (itemData) {
      axiosInstance
        .put(`/exam-set/${itemData.id}`, payload)
        .then(() => {
          notify.success("saved");
        })
        .finally(() => {
          setLoading(false);
          setModal(false);
          refetch();
        });
    } else {
      axiosInstance
        .post("/exam-set", payload)
        .then(() => {
          notify.success("saved");
        })
        .finally(() => {
          setLoading(false);
          setModal(false);
          refetch();
        });
    }
  };

  // Filter lessons based on search term
  const filteredLessons =
    activeSubject && searchTerm.trim()
      ? activeSubject.lessons.filter((lesson) =>
          lesson.topic.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : activeSubject?.lessons || [];

  const handleLessonSelect = (subjectId: number, lessonId: number) => {
    setSelectedLessons((prev) => ({
      ...prev,
      [subjectId]: lessonId,
    }));
  };

  const isActive = (id: any) => activeSubject && activeSubject?.id === id;

  return (
    <div
      className={`fixed text-primary z-[1000] bg-[#00000044] duration-0 inset-0 h-screen w-screen ${
        modal ? "" : "-translate-y-full"
      }`}
    >
      <div className="translate-y-[1rem] z-[100] bg-white rounded duration-1000 w-[43rem] mx-auto">
        <div className="p-2 border-b px-4 flex items-center justify-between">
          <h1>{title} </h1>
          <button className="text-2xl" onClick={() => setModal(false)}>
            &times;
          </button>
        </div>
        <div className="flex min-h-[10rem]">
          {/* Subjects List */}
          <div className="w-[40%] shrink-0 border-r">
            <div className="h-12 border-b flex items-center">
              <h2 className="text-sm px-4 font-bold">
                Subjects (
                <span className="font-normal">
                  {subjects ? subjects.length : "loading..."}
                </span>
                )
              </h2>
            </div>
            <ul className="text-sm max-h-80 overflow-y-auto">
              {subjects.map((sub: SubjectProps) => (
                <li key={sub.id}>
                  <button
                    onClick={() => setActiveSubject(sub)}
                    className={`px-4 py-2 outline-none border-b w-full text-start ${
                      isActive(sub.id) && "bg-light/20"
                    }`}
                  >
                    {sub.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full flex flex-col">
            <div className="h-12 flex items-center justify-start px-4 border-b w-full">
              <input
                type="search"
                className="px-3 py-2 rounded text-sm outline-none border bg-gray-50"
                placeholder="Search lessons"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="overflow-y-auto w-full grow px-4 py-2 text-sm">
              <ul>
                {filteredLessons.length ? (
                  filteredLessons.map((lesson) => (
                    <li
                      key={lesson.id}
                      className="flex gap-3 py-2 items-center cursor-pointer"
                    >
                      <label
                        htmlFor={`lesson-${lesson.id}`}
                        className="flex items-center gap-2 w-full"
                        onClick={() =>
                          handleLessonSelect(activeSubject!.id, lesson.id)
                        }
                      >
                        <input
                          type="radio"
                          id={`lesson-${lesson.id}`}
                          name={`subject-${activeSubject!.id}`}
                          checked={
                            selectedLessons[activeSubject!.id] === lesson.id
                          }
                          onChange={() =>
                            handleLessonSelect(activeSubject!.id, lesson.id)
                          }
                          className="cursor-pointer"
                        />
                        <span className="cursor-pointer">{lesson.topic}</span>
                      </label>
                    </li>
                  ))
                ) : (
                  <div className="w-full h-full py-20 flex items-center justify-center">
                    No lessons found
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="h-12 border-t flex items-center justify-end gap-3 px-4">
          <input
            type="text"
            className="px-3 py-2 rounded text-sm outline-none border bg-gray-50"
            placeholder="Exam set"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="text-sm text-white rounded bg-main px-4 py-2"
            onClick={submit}
          >
            {loading ? (
              <PulseLoader color="white" size={7} />
            ) : (
              <span>Submit</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
