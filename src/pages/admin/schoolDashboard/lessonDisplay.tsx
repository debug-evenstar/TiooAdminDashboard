import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSchoolLesson, getSchoolSubjects } from "../../../services/api";
import LessonClasses from "../../../components/schoolDashComp/LessonClasses";
import TermContainer from "../../../components/schoolDashComp/TermContainer";

const LessonDisplay = () => {
  const { id, lessonid, activeid } = useParams();
  const [data, setData] = useState<any>([]);
  const [less, setLess] = useState<any>([]);
  // const [loading, setLoading] = useState(false);
  const [activeClass, setActiveClass] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [allSubject, setAllSubject] = useState<any[]>([]);
  const [changeSubjectId, setChangeSubjectId] = useState('')

  const fetchClassLesson = async () => {
    // if (!userInfo.token) {
    //   config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    // }
    // try {
    //   const val = await getSubjectLesson(lessonid, config);
    //   val == "Network Error" &&
    //     alertActions.error("Please check Internet connection");
    //   setData(val?.data?.data);
    //   setLoading(false);
    // } catch (error: any) {
    //   setLoading(false);
    // }
    getSchoolLesson(lessonid)
    .then((response) => {
      // setLoading(false);
      setData(response?.data?.data);
    })
    .catch((error) => {
        console.log(error);
      // setLoading(false);
    });
  };
  const getAllSubjects = (id:any) => {
    getSchoolSubjects(id)
    .then((response) => {
      // setLoading(false);
      const dataWithLesson = response.data.data.filter(
        (where: any) => where.lessons > 0
      );
      setAllSubject(dataWithLesson);
    })
    .catch((error) => {
        console.log(error);
      // setLoading(false);
    });
  }
  useEffect(() => {
    fetchClassLesson();
    getAllSubjects(id);
    setCurrentId(String(lessonid))
  }, []);
  useEffect(() => {
    filterLesson(Number(activeid));
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
    getSchoolLesson(e.target.value)
    .then((response) => {
      // setLoading(false);
      setData(response?.data?.data);
      setChangeSubjectId(response?.data?.data[0].id)
      filterLesson(response?.data?.data[0].id)
    })
    .catch((error) => {
        console.log(error);
      // setLoading(false);
    });
  };

  return (
    <>
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
                <TermContainer item={less} data={data[0]} refetch={fetchClassLesson} />
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

export default LessonDisplay;
