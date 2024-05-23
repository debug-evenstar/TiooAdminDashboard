import React, { useState, useEffect } from "react";
// import DashLayout from "../../../../layouts/DashLayout";
import CenterModal from "../../../../../components/CenterModal";
import SubjectCard from "./components/SubjectCard";
import SubjectModal from "./components/AddSubjectModal";
import AddSubjectCard from "./components/AddSubjectCard";
import ClassesModal from "./components/ClassesModal";
import TeachersModal from "./components/TeachersModal";
import { alertActions } from "../../../../../components/alertActions";
import AssignTeachersModal from "./components/AssignTeachers";
import EditSubjectModal from "./components/EditSubjectModal";
import { useDispatch, useSelector } from "react-redux";
import DeleteSubjectModal from "./components/DeleteSubjectModal";

import AssignClassModal from "./components/AssignClassModal";
import { getClasses, getSubjects } from "../../../../../api";
import LoadingCompo from "../../../../../components/loadingCompo";
import { getclassWithArms } from "../../../../../services/authServices";
import { classActions } from "../../../../../store/classSlice";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { getSchoolSubjects } from "../../../../../services/api";

function Subjects() {
  const [active, setActive] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [item, setItem] = useState("");
  const [allsubject, setallsubject] = useState([]);
  const [subjectModal, setSubjectModal] = useState(false);
  const [teacherModal, setTeacherModal] = useState(false);
  const [classModal, setClassModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nchange, setchange] = useState(1);
  const dispatch = useDispatch();
  const schoolManagement = useSelector(
    (state: any) => state.gods.school.schoolManagementInfo
  );
  const schoolSubjects = useSelector(
    (state: any) => state.gods.school.schoolSubject
  );
  const classes = useSelector(
    (state: any) => state.gods.class.classInformation
  );

  const { id } = useParams();

  // const getAllSubjects = () => {
  //   getSubjects(Number(id))
  //   .then((response) => {
  //     setLoading(false);
  //     setallsubject(response.data);
  //   })
  //   .catch((error) => {
  //     setLoading(false);
  //   });
  // }

  const getAllSubjects = () => {
    getSchoolSubjects(String(id))
      .then((response) => {
        setLoading(false);
        setallsubject(response?.data.data);
        // setSubjects(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    setLoading(true);
    getAllSubjects();
  }, [nchange, schoolManagement]);

  const toggleTab = (item: any, tabId: number): void => {
    setActive(true);
    setActiveTab(tabId);
    setItem(item);
  };
  const addLesson = () => {
    if (!!classes.length) {
      setSubjectModal(!subjectModal);
    } else {
      toast.info("Please add classes");
    }
  };

  const toggleTeacher = () => {
    setActive(false);
    setTeacherModal(true);
  };

  const colors: string[] = [
    "bg-[#AE1E56]",
    "bg-[#776DB4]",
    "bg-[#148CFA]",
    "bg-[#DDA0DD]",
    "bg-[#681AB0]",
    "bg-[#330072]",
    "bg-[#4F46E5]",
  ];

  return (
    <>
      {/* <DashLayout title="Subjects"> */}
      <div className="w-full mx-auto">
        <div className="w-full flex items-start justify-start flex-col mt-[20px]">
          {}
          {/* {loading && allsubject?.length == 0 && <LoadingCompo />} */}
          {allsubject?.length > 0 ? (
            <h3 className="font-inter font-medium text-[#030036] opacity-70 text-[22px]">
              My Subjects (
              {allsubject?.length > 0
                ? allsubject?.length
                : schoolSubjects?.length
                ? schoolSubjects?.length
                : 0}
              )
            </h3>
          ) : (
            !loading &&
            allsubject?.length < 1 && (
              <h3 className="font-inter font-medium text-[#030036] opacity-70 text-[22px]">
                You haven’t added any subjects
              </h3>
            )
          )}
          <div className="mt-[32px] w-full grid grid-cols-3 gap-[24px]">
            {allsubject?.map((item: any, index) => {
              const colorIndex = index % colors.length;
              const color = colors[colorIndex];

              return (
                <AddSubjectCard
                  key={index}
                  item={item}
                  subject={item.naming}
                  desc={item.description}
                  color={color}
                  del={() => toggleTab(item, 4)}
                  edit={() => toggleTab(item, 1)}
                  openClasses={() => toggleTab(item, 2)}
                  openTeachers={() => toggleTab(item, 3)}
                  newchange={nchange}
                />
              );
            })}
            {/* <SubjectModalCard
                title="Add subjects"
                desc="e.g English, maths, history, etc "
                onClick={addLesson}
                  /> */}
          </div>
        </div>
      </div>
      {/* </DashLayout> */}
      <CenterModal isOpen={subjectModal} onClose={() => setSubjectModal(false)}>
        <SubjectModal
          didchange={() => setchange(nchange + 1)}
          close={() => setSubjectModal(false)}
        />
      </CenterModal>
      <CenterModal isOpen={active} onClose={() => setActive(false)}>
        {activeTab === 1 ? (
          <EditSubjectModal
            didchange={() => setchange(nchange + 1)}
            item={item}
            close={() => setActive(false)}
          />
        ) : activeTab === 2 ? (
          <ClassesModal
            item={item}
            close={() => setActive(false)}
            addNewClass={() => {
              setClassModal(true);
              setActive(false);
            }}
            onDeleteClass={() => {
              getAllSubjects();
            }}
          />
        ) : activeTab === 3 ? (
          <TeachersModal
            item={item}
            close={() => setActive(false)}
            assignTeachers={() => toggleTeacher()}
          />
        ) : activeTab === 4 ? (
          <DeleteSubjectModal
            item={item}
            close={() => {
              setActive(false);
              getAllSubjects();
            }}
          />
        ) : (
          <></>
        )}
      </CenterModal>

      <CenterModal isOpen={teacherModal} onClose={() => setTeacherModal(false)}>
        <AssignTeachersModal
          didchange={() => setchange(nchange + 1)}
          item={item}
          close={() => setTeacherModal(false)}
        />
      </CenterModal>
      <CenterModal isOpen={classModal} onClose={() => setClassModal(false)}>
        <AssignClassModal
          didchange={() => {
            setchange(nchange + 1);
            getAllSubjects();
          }}
          item={item}
          close={() => setClassModal(false)}
        />
      </CenterModal>
    </>
  );
}

export default Subjects;
