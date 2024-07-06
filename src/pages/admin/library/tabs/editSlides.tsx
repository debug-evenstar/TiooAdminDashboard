import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Editorial } from "@Praxeum-ai/LearnBlocks";
import { notify } from "../../../../components/notification/notification";
import { editSlide, fetchLessons, fetchTemplate, uploadFile } from "../../../../api";

const EditSlides = () => {
  const [lessonData, setLessonData] = useState<any>();
  const [studyData, setStudyData] = useState<any>();
  const [saving, setSaving] = useState(false)
  const { id } = useParams();
  const navigate = useNavigate();
  
  const fetchLessonNote = (id: any) => {
    fetchTemplate(id)
      .then((res: any) => {
        if (!res.error) {
          setLessonData(res.data);
          fetchClassLesson(res.data.Textbooks[0]?.subject_id)
        } else {
          notify.error(res.message);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  const fetchClassLesson = async (id:any) => {
    fetchLessons(id)
    .then((res) => {
      const data = res.data
      setStudyData(data[0]);
    })
    .catch((error) => {
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
    navigate(`/lessons/${lessonData.SubjectId}/${lessonData.GroupId}`);
  };
  const changeCard = async (
    file: any,
    payload: any,
    id: any,
    length: number,
    changedIndex: any
  ) => {
    setSaving(true);
    const datas = payload.filter(
      (where: any) => where.component !== "FlashCards"
    );
    const cardsImg = payload.filter(
      (where: any) => where.component === "FlashCards"
    );
    const fd = new FormData();
    for (let i = 0; i < file.length; i++) {
      fd.append(`image`, file[i]);
    }
    await uploadFile(fd, id)
      .then((res: any) => {
        if (!res.error) {
          const url = res.data;
          const newArray = Array(cardsImg[0].cards.length).fill("");
          changedIndex.forEach((i: number, index: number) => {
            if (i >= 0 && i < newArray.length) {
              newArray[i] = url[index];
            }
          });
          const updatedArray = cardsImg[0].cards.map((obj: any, i: number) => {
            if (changedIndex.includes(i)) {
              return { ...obj, url: newArray[i] };
            } else {
              return obj;
            }
          });
          const comps = {
            cards: updatedArray,
            component: "FlashCards",
          };
          console.log(comps);
          
          const payloads = {
            slide_data: [...datas, comps],
          };
          editSlide(payloads, id)
            .then((res: any) => {
              if (!res.error) {
                fetchLessonNote(lessonData.id);
                notify.success(res.message);
                setSaving(false)
              }
            });
        } else console.log(res);
      });
  };
  
  const lessonlist = {
    topic: "Change of things",
    term: "1",
    lessons: studyData?.Lesson
  };

  return (
    <div>
      {!studyData && <p>Loading...</p>}
      {studyData && <Editorial
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