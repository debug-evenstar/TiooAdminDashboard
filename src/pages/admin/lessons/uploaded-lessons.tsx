import React, { useState, useEffect } from "react";
import DashLayout from "../../../layouts/DashLayout";
import ChapterContainer from "./components/LessonComp/ChapterContainer";
import LessonClasses from "./components/LessonComp/LessonClasses";
import { useSelector } from "react-redux";
import { configure } from "../../../services/config";
import { getSubjectLesson } from "../../../services/authServices";
import { alertActions } from "../../../components/alertActions";
import { useParams } from "react-router-dom";
import { getSubjectWithLessonCount } from "../../../api";

const UploadedLesson = () => {
  const { id, classid } = useParams();
  const [data, setData] = useState<any>([]);
  const [less, setLess] = useState<any>([]);
  const [filterId, setFilterId] = useState(classid)
  const [loading, setLoading] = useState(false);
  const [activeClass, setActiveClass] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [allSubject, setAllSubject] = useState<any[]>([]);
  const [changeSubjectId, setChangeSubjectId] = useState('')
  const userInfo = useSelector((state: any) => state.auth.userInformation);
  const config = configure(userInfo.token);
  const fetchClassLesson = async () => {
    if (!userInfo.token) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }
    try {
      const val = await getSubjectLesson(id, config);
      val == "Network Error" &&
        alertActions.error("Please check Internet connection");
      setData(val?.data?.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };
  const refetchClassLesson = async (id:string, filterId:any) => {
    setFilterId(filterId)
    if (!userInfo.token) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }
    try {
      const val = await getSubjectLesson(id, config);
      val == "Network Error" &&
        alertActions.error("Please check Internet connection");
      setData(val?.data?.data);
      filterLesson(Number(filterId));
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  }
  const getAllSubjects = () => {
    getSubjectWithLessonCount()
      .then((response) => {
        setLoading(false);
        const dataWithLesson = response.data.filter(
          (where: any) => where.lessonCount > 0
        );
        setAllSubject(dataWithLesson);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchClassLesson();
    getAllSubjects();
    setCurrentId(String(id))
  }, []);
  useEffect(() => {
    filterLesson(Number(filterId));
  }, [data]);
  useEffect(() => {
    filterLesson(Number(changeSubjectId));
  }, [changeSubjectId])

  const filterLesson = async (arm: any) => {
    setActiveClass(arm);
    const lesson = [...data];
    const filtered = lesson.filter((where: any) => where.id === arm);
    setLess(filtered);
  };

  const SwitchSubject = async (e: any) => {
    e.preventDefault();
    setCurrentId(e.target.value);
    // console.log(e.target.value);
    if (!userInfo.token) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }
    try {
      const val = await getSubjectLesson(e.target.value, config);
      val == "Network Error" &&
        alertActions.error("Please check Internet connection");
      setData(val?.data?.data);
      setChangeSubjectId(val?.data?.data[0].id)
      filterLesson(val?.data?.data[0].id)
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <DashLayout title="Lessons">
        <div className="w-full">
          <div className="w-full flex items-start justify-start flex-col">
            <div
              className={`flex items-start justify-start flex-col mt-[20px] w-full`}
            >
              <div>
                <select
                  className="border-0 text-xl outline-none "
                  value={currentId}
                  onChange={SwitchSubject}
                >
                  <option></option>
                  {allSubject.map((item, i) => (
                    <option value={item.id} key={i}>{item.naming}</option>
                  ))}
                </select>
              </div>
              <p className="text-base text-[#87909E] font-normal leading-[24px] pt-1">
                Learners will develop their speaking and listening skills to
                communicate
              </p>
            </div>
          </div>
          <div className="flex mt-12">
            <div className="w-9/12 lg:pr-12">
              {data && !!less?.length && (
                <ChapterContainer item={less} data={data} refetch={refetchClassLesson} />
              )}
            </div>
            <div className="w-3/12 px-8 relative">
              <div className="sticky w-full top-[200px] left-0">
                {data && (
                  <LessonClasses
                    item={data}
                    filter={filterLesson}
                    activeClass={activeClass}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </DashLayout>
    </>
  );
};

export default UploadedLesson;
