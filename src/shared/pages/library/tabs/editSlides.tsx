import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Editorial } from "@Praxeum-ai/LearnBlocks";
import { notify } from "@/components/notification/notification";
import { editSlide, fetchLessons, fetchTemplate, uploadFile } from "@/shared/services/lesson.service";

const EditSlides = () => {
  const [lessonData, setLessonData] = useState<any>();
  const [saving, setSaving] = useState(false)
  const { id } = useParams();
  const navigate = useNavigate();
  
  const fetchLessonNote = (id: any) => {
    fetchTemplate(id)
      .then((res: any) => {
        if (!res.error) {
          setLessonData(res.data);
        } else {
          notify.error(res.message);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchLessonNote(id);
  }, []);
  
  const changeFile = async (file: any, payload: any, id: any) => {
    setSaving(true)
    const checkImg = payload.filter(
      (where: any) => where.component === "Image"
    );
    const datas = payload.filter(
      (where: any) => where.component !== "Image" && where.component !== "Video"
    );
    const fd = new FormData();
    fd.append("image", file);
    await uploadFile(fd, id).then((res: any) => {
      if (!res.error) {
        const url = res.data[0];
        const comps = {
          alternatives: [],
          component: !!checkImg.length ? "Image" : "Video",
          url: url,
        };
        const payloads = {
          slide_data: [...datas, comps],
        };
        editSlide(payloads, id).then((res: any) => {
          if (!res.error) {
            fetchLessonNote(lessonData.id);
            notify.success(res.message);
            setSaving(false)
          }
        });
      } else console.log(res);
    });
  };


  const handleBack = () => {
    navigate(-1);
    // navigate(`/library/chapter/lessons/${lessonData.Textbook.id}/${lessonData.Chapter.id}`)   
    // navigate(`/lessons/${lessonData.SubjectId}/${lessonData.GroupId}`);
  };

  const lessonlist = {
    topic: "Change of things",
    term: "1",
    lessons: []
  };


  return (
    <div className="fixed w-screen h-screen top-0 left-0 bg-white">
      {!lessonData && <p>Loading...</p>}
      {lessonData && <Editorial
        data={lessonData}
        back={handleBack}
        lessonList={lessonlist}
        user={{name : "John", auth:"", base : ""}}
        refetch={() => {}}
      /> }
    </div>
  );
};

export default EditSlides;