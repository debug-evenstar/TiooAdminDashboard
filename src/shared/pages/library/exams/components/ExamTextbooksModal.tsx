import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/api/request";
import { notify } from "@/components/notification/notification";
import { PulseLoader } from "react-spinners";
import { setLibraryTextbooks } from "@/redux/slices/library";

interface TextbookProps {
  id: number;
  name: string;
}

export default function ExamTextbooksModal({
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
  const [textbooks, setTextbooks] = useState<TextbookProps[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [selectedTextbooks, setSelectedTextbooks] = useState<{
    [key: number]: boolean;
  }>({});

  const exam_id = exam.id;
  
  useEffect(() => {
    const data: { [key: number]: boolean } = {};
    exam.textbooks.forEach((book: any) => {
      data[book.id] = true;
    });
    setSelectedTextbooks(data);
  }, [exam]);

  const getTextbooks = () => {
    axiosInstance
      .get("/library/textbooks")
      .then((response) => {
        const books = response.data.data;
        setTextbooks(books);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getTextbooks();
  }, []);

  const handleTextbookSelect = (textbookId: number) => {
    setSelectedTextbooks((prev) => ({
      ...prev,
      [textbookId]: !prev[textbookId],
    }));
  };

  const submit = async () => {
    setLoading(true);

    const data = Object.entries(selectedTextbooks)
      .filter(([_, isSelected]) => isSelected)
      .map(([textbookId]) => ({
        textbook_id: Number(textbookId),
        lesson_id: 0, // Adjust as needed
      }));

    if (data.length === 0) {
      notify.error("Please select at least one textbook.");
      setLoading(false);
      return;
    }

    const payload = { textbook_ids: data?.map((s: any) => s.textbook_id)};

    try {
      if (itemData) {
        await axiosInstance.put(`/exams/textbooks/${exam_id}`, payload);
      } else {
        await axiosInstance.post(`/exams/textbooks/${exam_id}`, payload);
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

  const filteredTextbooks = textbooks.filter((textbook) =>
    textbook.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const TextbookItem = ({ textbook }: { textbook: TextbookProps }) => (
    <li
      key={textbook.id}
      className="flex gap-3 py-2 items-center cursor-pointer"
    >
      <label
        htmlFor={`textbook-${textbook.id}`}
        className="flex items-center gap-2 w-full"
      >
        <input
          type="checkbox"
          id={`textbook-${textbook.id}`}
          name={`textbook-${textbook.id}`}
          checked={!!selectedTextbooks[textbook.id]}
          onChange={() => handleTextbookSelect(textbook.id)}
          className="cursor-pointer"
        />
        <span className="cursor-pointer">{textbook.name}</span>
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
              placeholder="Search textbooks"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="overflow-y-auto max-h-[30rem] grayBar grow px-4 py-2 text-sm">
            <ul>
              {filteredTextbooks.length ? (
                filteredTextbooks.map((textbook) => (
                  <TextbookItem key={textbook.id} textbook={textbook} />
                ))
              ) : (
                <div className="w-full h-full py-20 flex items-center justify-center">
                  No textbooks found
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