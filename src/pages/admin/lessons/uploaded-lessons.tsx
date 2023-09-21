import { useState, useEffect } from "react";
import ChapterContainer from "./components/LessonComp/ChapterContainer";
import LessonClasses from "./components/LessonComp/LessonClasses";
import { useSelector } from "react-redux";
import { configure } from "../../../services/config";

import { useParams } from "react-router-dom";
import { getSubjectWithLessonCount } from "../../../api";
import Header from "../../../components/header";
import axiosInstance from "../../../services/api";

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
  const userInfo = useSelector((state: any) => state.gods.auth.userInformation);
  const config = configure(userInfo.token);



  // console.log("Material classes",classes);

  // const fetchClassLesson = async () => {
  //   if (!userInfo.token) {
  //     config.headers.Authorization = "Bearer " + localStorage.getItem("token");
  //   }
  //   try {
  //     const val = await getSubjectLesson(id, config);
  //     // const val = await axiosInstance.get('/library/lesson/check/subject_id=')
  //     val == "Network Error" &&
  //       alertActions.error("Please check Internet connection");
  //     setData(val?.data?.data);
  //     setLoading(false);
  //   } catch (error: any) {
  //     setLoading(false);
  //   }
  // };

  const fetchClassLesson = () => {
    axiosInstance.get('/library/lesson/check?subject_id=' + id)
      .then(response => {
        setData(response?.data?.data);
        console.log(activeClass)
        setActiveClass(String(response?.data?.data[0].id));
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }

  const refetchClassLesson = (id: string, filterId: any) => {
    setFilterId(filterId);
    axiosInstance.get('/library/lesson/check?subject_id=' + id)
      .then(response => {
        setData(response?.data?.data);
        setActiveClass(response.data?.data[0].id);
        setLoading(false);
        filterLesson(Number(filterId));
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }

  // const refetchClassLesson = async (id:string, filterId:any) => {
  //   setFilterId(filterId)
  //   if (!userInfo.token) {
  //     config.headers.Authorization = "Bearer " + localStorage.getItem("token");
  //   }
  //   try {
  //     const val = await getSubjectLesson(id, config);
  //     val == "Network Error" &&
  //       alertActions.error("Please check Internet connection");
  //     setData(val?.data?.data);
  //     filterLesson(Number(filterId));
  //     setLoading(false);
  //   } catch (error: any) {
  //     setLoading(false);
  //   }
  // }
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
    // filterLesson(Number(filterId));
    setLess(data.filter((where: any) => where.id == filterId))
    // console.log(data);
    const currentLesson = data.find((where: any) => where.ClassId == filterId)
    if (currentLesson) {
      setActiveClass(String(currentLesson.id));
      setLess([currentLesson])
    }
    // console.log("filtering lesson",filterId,data,less);
  }, [data]);

  useEffect(() => {
    // console.log(changeSubjectId)
    filterLesson(Number(changeSubjectId));
  }, [changeSubjectId])

  const filterLesson = async (arm: any) => {
    setActiveClass(String(arm));
    const lesson = [...data];
    const filtered = lesson.filter((where: any) => where.id == arm);
    setLess(filtered);
    // console.log(filtered,arm);
  };


  const SwitchSubject = (e: any) => {
    e.preventDefault();
    setCurrentId(e.target.value);
    // console.log("switch target value",e.target.value);
    axiosInstance.get('/library/lesson/check?subject_id=' + e.target.value)
      .then(response => {
        // console.log("setting data to ",response?.data?.data);
        setData(response?.data?.data);
        setChangeSubjectId(response?.data?.data[0]?.id);
        setCurrentId(e.target.value)
        filterLesson(response?.data?.data[0].id);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }


  // const SwitchSubject = async (e: any) => {
  //   e.preventDefault();
  //   setCurrentId(e.target.value);
  //   // console.log(e.target.value);
  //   if (!userInfo.token) {
  //     config.headers.Authorization = "Bearer " + localStorage.getItem("token");
  //   }
  //   try {
  //     const val = await getSubjectLesson(e.target.value, config);
  //     val == "Network Error" &&
  //       alertActions.error("Please check Internet connection");
  //     setData(val?.data?.data);
  //     setChangeSubjectId(val?.data?.data[0].id)
  //     filterLesson(val?.data?.data[0].id)
  //     setLoading(false);
  //   } catch (error: any) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };

  // console.log("all subjects",allSubject[0]);
  return (
    <>
      <Header variant title="" />
      <div className="w-full px-12">
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
            {data && (
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
    </>
  );
};

export default UploadedLesson;
