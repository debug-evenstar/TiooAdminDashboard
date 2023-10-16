import React, { useEffect, useState } from "react";
// import DashLayout from "../../../layouts/DashLayout";
import InfoCard from "./components/InfoCard";
import ClassCard from "./components/ClassCard";
import CenterModal from "../../../../components/CenterModal";
import EditClass from "./components/EditClass";
import CreateClass from "./components/CreateClass";
import AllClass from "./components/AllClass";
import Students from "./components/Students";
import Teachers from "./components/Teachers";
import Subjects from "./components/Subjects";
import { alertActions } from "../../../../components/alertActions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { classActions } from "../../../../store/classSlice";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import {
  getManagementInfo,
  getSchoolTeachers,
  getTeacherClass,
  getclassWithArms,
} from "../../../../services/authServices";
import { schoolActions } from "../../../../store/schoolSlice";
import { configure } from "../../../../services/config";
import CreateNewClass from "./components/CreateNewClass";
import DeleteClassModal from "./components/DeleteClass";
import { authActions } from "../../../../store/authSlice";
import TeacherClassTab from "./components/TeacherClassTab";
import TeacherInviteStudent from "./components/TeacherInvite";
import LoadingCompo from "../../../../components/loadingCompo";
import axiosInstance from "../../../../services/api";
import { BASE_URL } from "../../../../services/url";

function Home() {
  const [active, setActive] = useState(false);
  const [classActive, setClassActive] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [item, setItem] = useState("");
  const [classArm, setClassArm] = useState({});
  const [allclass, setallclass] = useState([]);
  const [loading, setloading] = useState(false);
  const [nchange, setchange] = useState(1);

  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state.gods.auth.userInformation);
  const classInfo = useSelector((state: any) => state.gods.class.classInformation);
  const config = configure(userInfo.token);

  const { id } = useParams();

  const fetchClass = async () => {
    try {
      //get schoolmanagementInfo
      // const managementData = await getManagementInfo(config);

      // //dispatch school management info to avoid calling api multiple times
      // dispatch(
      //   schoolActions.saveSchoolManagementInfo(managementData?.data?.data)
      // );

      //get class with arms
      // const val = await getclassWithArms(config);
      // setallclass(val?.data?.data);

      const getclassWithArms = (id: number) => {
        return axiosInstance.get(`/school/dashboard/home?school_id=${id}`)
      }

      const val = await getclassWithArms(Number(id));
      setallclass(val?.data?.data);

      //getschool teachers
      // const schoolTeachers = await getSchoolTeachers(
      //   // managementData.data.data.schoolManagementId,
      //   Number(id),
      //   config
      // );

      const schoolTeachers = await axiosInstance.get(`${BASE_URL}school/teachers/${Number(id)}`);

      //save classes, schoolinfo and teachers info into local storage
      const SchoolManagement = {
        classes: val?.data?.data,
        // schoolInfo: managementData?.data?.data,
        teacherInfo: schoolTeachers?.data?.data,
      };
      localStorage.setItem(
        "SchoolManagement",
        JSON.stringify(SchoolManagement)
      );
      dispatch(classActions.saveclassInfo(val?.data?.data));
      setloading(false);
    } catch (error: any) {
      console.log(error);
      setloading(false);
    }
  };

  const fetchTeacherClass = async () => {
    if (!userInfo.token) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }
    try {
      const val = await getTeacherClass(userInfo.id, config);
      val == "Network Error" &&
        alertActions.error("Please check Internet connection");

      setallclass(val?.data?.data);
      const SchoolManagement = {
        classes: val?.data?.data,
      };
      localStorage.setItem(
        "SchoolManagement",
        JSON.stringify(SchoolManagement)
      );
      dispatch(classActions.saveclassInfo(val?.data?.data));
      setloading(false);
    } catch (error: any) {
      console.log(error);
      setloading(false);
    }
  };

  useEffect(() => {
    // setallclass(classInfo);
    setloading(true);
    if (userInfo.account_type === "teacher") {
      fetchTeacherClass();
    } else {
      fetchClass();
    }
  }, [nchange]);

  const rel = () => {
    window.location.reload();
  };

  const toggleTab = (item: any, tabId: number): void => {
    setActive(true);
    setActiveTab(tabId);
    setItem(item);
  };

  const colors: string[] = [
    "border-rose-500",
    "border-blue-500",
    "border-yellow-500",
    "border-pink-500",
    "border-orange-500",
  ];

  const toggleClassTab = (item: any, tabId: number, arm?: any): void => {
    setActive(false);
    setClassActive(true);
    setActiveTab(tabId);
    setItem(item);
    setClassArm(arm);
  };

  return (
    <>
      {/* <DashLayout title="Home"> */}
      <div className="w-full mx-auto">
        <InfoCard />
        <div className="w-full flex items-start justify-start flex-col mt-[72px]">
          <div className="flex w-full items-center justify-between">
            <h3 className="font-inter font-medium text-[#030036] opacity-70 text-[18px]">
              My Classes (
              {allclass?.length > 0
                ? allclass?.length
                : classInfo?.length > 0
                  ? classInfo?.length
                  : 0}
              )
            </h3>
            {userInfo.account_type === "school" && (
              <div
                className="rounded-[8px] bg-[#fff]   flex items-center justify-center flex-col cursor-pointer  "
                onClick={() => {
                  toggleTab(item, 7);
                }}
              >
                <MdOutlineAddCircleOutline
                  color="#4F46E5"
                  className="text-[30px]"
                />
                <h3 className=" text-[#4F46E5] font-medium text-[18px] font-inter">
                  Add Class
                </h3>
              </div>
            )}
          </div>
          {loading && allclass?.length == 0 && <LoadingCompo />}

          <div className="mt-[32px] w-full grid grid-cols-3 gap-[24px]">
            {allclass?.length > 0 &&
              allclass.map((item: any, index: any) => {
                const colorIndex = index % colors.length;
                const color = colors[colorIndex];
                return (
                  <ClassCard
                    item={item}
                    edit={() => toggleTab(item, 1)}
                    del={() => toggleTab(item, 9)}
                    create={() => toggleTab(item, 2)}
                    viewClasses={() => toggleTab(item, 3)}
                    teacherView={() => toggleClassTab(item, 10)}
                    inviteStudent={() => toggleClassTab(item, 11)}
                    key={index}
                    color={color}
                  />
                );
              })}
          </div>
        </div>
      </div>
      {/* </DashLayout> */}
      <CenterModal
        isOpen={active}
        onClose={() => setActive(false)}
        variant={
          activeTab === 1
            ? "small"
            : activeTab === 2
              ? "small"
              : activeTab === 7
                ? "small"
                : activeTab === 9
                  ? "small"
                  : "large"
        }
      >
        {activeTab === 1 ? (
          <EditClass
            didchange={() => setchange(nchange + 1)}
            item={item}
            close={() => setActive(false)}
          />
        ) : activeTab === 2 ? (
          <CreateClass
            didchange={() => setchange(nchange + 1)}
            item={item}
            close={() => setActive(false)}
          />
        ) : activeTab === 7 ? (
          <CreateNewClass
            didchange={() => setchange(nchange + 1)}
            item={item}
            close={() => setActive(false)}
          />
        ) : activeTab === 9 ? (
          <DeleteClassModal
            didchange={() => setchange(nchange - 1)}
            item={item}
            close={() => setActive(false)}
          />
        ) : (
          <AllClass
            didchangeedit={() => setchange(nchange + 1)}
            item={item}
            close={() => setActive(false)}
            students={(arm) => toggleClassTab(item, 4, arm)}
            teachers={(arm) => toggleClassTab(item, 5, arm)}
            subjects={(arm) => toggleClassTab(item, 6, arm)}
          />
        )}
      </CenterModal>

      <CenterModal isOpen={classActive} onClose={() => setClassActive(false)}>
        {activeTab === 4 ? (
          <Students item={classArm} close={() => setClassActive(false)} />
        ) : activeTab === 5 ? (
          <Teachers item={classArm} close={() => setClassActive(false)} />
        ) : activeTab === 6 ? (
          <Subjects item={classArm} close={() => setClassActive(false)} />
        ) : activeTab === 10 ? (
          <TeacherClassTab item={item} close={() => setClassActive(false)} />
        ) : activeTab === 11 ? (
          <TeacherInviteStudent item={item} close={() => setClassActive(false)} />
        ) : (
          <></>
        )}
      </CenterModal>
    </>
  );
}

export default Home;
