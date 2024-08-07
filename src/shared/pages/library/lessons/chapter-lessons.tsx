import { useState, useEffect } from "react";
import ChapterContainer from "./components/ChapterLessonComp/ChapterContainer";
import { useLocation, useParams } from "react-router-dom";
import Header from "@/components/AppHeader";
import { axiosInstance } from "@/api/request";
import { Spinner } from "@material-tailwind/react";
import Loader from "@/components/loader/loader";

const ChapterLesson = () => {
  const { textbookId, chapterId } = useParams();
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [textbook, setTextbook] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);

  const location = useLocation();

  const getTextbook = async () => {
    const response: any = await axiosInstance.get(`/library/textbooks`);
    setLoading(false);
    const books = response.data.data;
    const textbook = books.find((b: any) => b.id == textbookId);
    if (textbook) {
      setTextbook(textbook);
    }
    setLoading(false);
  };
  const getAllTextbookLessons = () => {
    axiosInstance
      .get(`/library/textbooks/${textbookId}/lessons`)
      .then((response) => {
        setLoading(false);
        const lessons = response.data.data;
        if (lessons) {
          const chapterLessons = lessons.filter(
            (lesson: any) => lesson.chapter_id == chapterId
          );
          setLessons(chapterLessons);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    getTextbook();
    getAllTextbookLessons();
  }, []);

  return (
    <>
      <Header title="Textbooks" />
      <div className="w-full px-12">
        <div className="w-full flex items-start justify-start flex-col">
          <div
            className={`flex items-start justify-start flex-col mt-[20px] w-full`}
          >
            <p className="text-primary font-bold text-xl bg-[#f6f6f6] px-3 py-1 rounded">
              {textbook && textbook.name}
            </p>
            <p className="text-base text-[#87909E] font-normal leading-[24px] pt-1"></p>
          </div>
        </div>
        <div className="flex mt-5">
          <div className="w-9/12 lg:pr-12">

            <ChapterContainer
              item={lessons}
              textbook={textbook}
              refetch={getAllTextbookLessons}
            />

          </div>
          <div className="w-3/12 px-8 relative">
            <div className="sticky w-full top-[200px] left-0"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterLesson;
