import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/api/request";
import { notify } from "@/components/notification/notification";
import { PulseLoader } from "react-spinners";

interface SubjectProps {
  id: number;
  name: string;
}

export default function ExamSubjectsModal({
  modal,
  setModal,
  itemData,
  refetch,
  exam,
  title,
}: {
  modal: boolean;
  setModal: (state: boolean) => void;
  refetch?: () => void;
  itemData?: { id: number };
  exam?: any;
  title: string;
}) {
  const [subjects, setSubjects] = useState<SubjectProps[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<{
    [key: number]: boolean;
  }>({});

  const exam_id = exam?.id;

  useEffect(() => {
    const data: { [key: number]: boolean } = {};
    exam.subjects.forEach((sub: any) => {
      data[sub.id] = true;
    });
    setSelectedSubjects(data);
  }, [exam]);

  const getSubjects = async () => {
    try {
      const response = await axiosInstance.get("/subjects?default=true");
      setSubjects(response.data.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  useEffect(() => {
    getSubjects();
  }, []);

  const handleSubjectSelect = (subjectId: number) => {
    setSelectedSubjects((prev) => ({
      ...prev,
      [subjectId]: !prev[subjectId],
    }));
  };

  const submit = async () => {
    setLoading(true);

    const data = Object.entries(selectedSubjects)
      .filter(([_, isSelected]) => isSelected)
      .map(([subjectId]) => ({
        subject_id: Number(subjectId),
      }));

    if (data.length === 0) {
      notify.error("Please select at least one subject.");
      setLoading(false);
      return;
    }

    const payload = { subject_ids: data?.map((s: any) => s.subject_id) };

    try {
      if (itemData) {
        await axiosInstance.put(`/exams/subjects/${exam_id}`, payload);
      } else {
        await axiosInstance.post(`/exams/subjects/${exam_id}`, payload);
      }
      notify.success("Saved successfully.");
      refetch?.();
      setModal(false);
    } catch (error) {
      notify.error("An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const SubjectItem = ({ subject }: { subject: SubjectProps }) => (
    <li
      key={subject.id}
      className="flex gap-3 py-2 items-center cursor-pointer"
    >
      <label
        htmlFor={`subject-${subject.id}`}
        className="flex items-center gap-2 w-full"
      >
        <input
          type="checkbox"
          id={`subject-${subject.id}`}
          name={`subject-${subject.id}`}
          checked={!!selectedSubjects[subject.id]}
          onChange={() => handleSubjectSelect(subject.id)}
          className="cursor-pointer"
        />
        <span className="cursor-pointer">{subject.name}</span>
      </label>
    </li>
  );

  return (
    <div
      className={`fixed text-primary z-[1000] bg-[#00000044] inset-0 h-screen w-screen ${
        modal ? "" : "-translate-y-full"
      }`}
    >
      <div className="translate-y-[1rem] z-[100] bg-white rounded w-[28rem] mx-auto">
        <div className="p-2 border-b px-4 flex items-center justify-between">
          <h1>{title}</h1>
          <button className="text-2xl" onClick={() => setModal(false)}>
            &times;
          </button>
        </div>
        <div className="flex min-h-[10rem] flex-col">
          <div className="h-12 flex items-center justify-start px-4 border-b">
            <input
              type="search"
              className="px-3 py-2 rounded text-sm outline-none border w-full bg-gray-50"
              placeholder="Search subjects"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="overflow-y-auto grow px-4 py-2 text-sm">
            <ul>
              {filteredSubjects.length ? (
                filteredSubjects.map((subject) => (
                  <SubjectItem key={subject.id} subject={subject} />
                ))
              ) : (
                <div className="w-full h-full py-20 flex items-center justify-center">
                  No subjects found
                </div>
              )}
            </ul>
          </div>
        </div>

        <div className="h-12 border-t flex items-center justify-end gap-3 px-4">
          <button
            className="text-sm text-white rounded bg-main px-4 py-2"
            onClick={submit}
            disabled={loading}
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
6;
