import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Editorial } from "@Praxeum-ai/LearnBlocks";
import { notify } from "../../../../components/notification/notification";
import {
  editSlide,
  fetchLessons,
  fetchTemplate,
  uploadFile,
} from "../../../../api";

const EditSlides = () => {
  const [lessonData, setLessonData] = useState<any>();
  const [studyData, setStudyData] = useState<any>();
  const name = useSelector((state: any) => state.praise.user.user.name);
  const { id } = useParams();
  const navigate = useNavigate();

  const datas = {
    topic: "Change of things",
    term: "1",
    lessons: [
      {
        id: 1,
        topic: "The Environment",
      },
      {
        id: 2,
        topic: "Air in Motion",
      },
      {
        id: 3,
        topic: "Basics of Living things",
      },
      {
        id: 4,
        topic: "Animals",
      },
      {
        id: 5,
        topic: "Soil",
      },
    ],
  };
  const fetchLessonNote = () => {
    fetchTemplate(id)
      .then((res: any) => {
        if (!res.error) {
          setLessonData(res.data);
          fetchClassLesson(res.data.SubjectId);
        } else {
          notify.error(res.message);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  const refetchLessonNote = () => {
    fetchTemplate(id)
      .then((res: any) => {
        if (!res.error) {
          setLessonData(res.data);
          notify.success("Slide Updated Successfully")
        } else {
          notify.error(res.message);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  const fetchClassLesson = async (id: any) => {
    fetchLessons(id)
      .then((res) => {
        const data = res.data;
        setStudyData(data[0]);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    fetchLessonNote();
  }, []);
  const handleBack = () => {
    navigate(`/lessons/${lessonData.SubjectId}/${lessonData.GroupId}`);
  };

  const userData = {
    auth: localStorage.getItem("token") || "",
    name: "Super Admin",
    base: `${import.meta.env.VITE_API_KEY}`
  }

  const lessonlist = {
    topic: lessonData?.topic,
    term: studyData?.term,
    lessons: [],
  };

  return (
    <div className="">
      {!studyData && <p>Loading...</p>}
      {studyData && (
        <Editorial
          data={lessonData}
          back={handleBack}
          lessonList={lessonlist}
          refetch={refetchLessonNote}
          user={userData}
        />
      )}
    </div>
  );
};

export default EditSlides;
