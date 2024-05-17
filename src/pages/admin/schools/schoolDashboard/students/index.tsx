import React, { useEffect, useState } from "react";
// import DashLayout from "../../../../layouts/DashLayout";
import ClassCard from "./components/ClassCard";
import CenterModal from "../../../../../components/CenterModal";
import InviteStudents from "./components/InviteStudents";
import StudentsModal from "./components/StudentsModal";
import { configure } from "../../../../../services/config";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getclassWithArms } from "../../../../../services/authServices";
import { alertActions } from "../../../../../components/alertActions";
import { classActions } from "../../../../../store/classSlice";
import { useDispatch } from "react-redux";
import { authActions } from "../../../../../store/authSlice";
import LoadingCompo from "../../../../../components/loadingCompo";
import DeleteModal from "../../../../../components/deleteModal";
import axiosInstance from "../../../../../services/api";

function SchoolStudents() {
  const [active, setActive] = useState(false);
  const [classActive, setClassActive] = useState(false);
  const [selectedArm, setSelectedArm] = useState<string>("");
  const [activeTab, setActiveTab] = useState(0);
  const [item, setItem] = useState("");
  const [allclass, setallclass] = useState([]);
  const [loading, setloading] = useState(false);
  const userInfo = useSelector((state: any) => state.gods.auth.userInformation);
  const classInfo = useSelector(
    (state: any) => state.gods.class.classInformation
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  const config = configure(userInfo.token);
  useEffect(() => {
    // setallclass(classInfo);
    setloading(true);
    if (!userInfo.token) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }
    if (!localStorage.getItem("token")) {
      setloading(false);
      navigate("/login");
      return;
    }

    const getclassWithArms = (id: number) => {
      return axiosInstance.get(`/school/dashboard/home?school_id=${id}`);
    };
    const fetchClass = async () => {
      const val = await getclassWithArms(Number(id));
      setloading(false);
      console.log(val.data.data);
      setallclass(val?.data?.data);
    };
    // const fetchClass = async () => {
    //   try {
    //     //get class with arms
    //     const val = await getclassWithArms(config);
    //     val == "Network Error" &&
    //       alertActions.error("Please check Internet connection");

    //     setallclass(val?.data?.data);
    //     setloading(false);
    //     dispatch(classActions.saveclassInfo(val?.data?.data));
    //     // dispatch(authActions.savetoken(localStorage.getItem("token")));
    //   } catch (error: any) {
    //     setloading(false);
    //     if (error?.response?.data?.message == "Unauthorized") {
    //       navigate("/login");
    //     }
    //   }
    // };
    fetchClass();
  }, []);

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

  return (
    <>
      {/* <DashLayout title="Students"> */}
      <div className="w-full mx-auto">
        <div className="w-full flex items-start justify-start flex-col mt-[25px]">
          <h3 className="font-inter font-medium text-[#030036] opacity-70 text-[18px]">
            Classes
          </h3>
          {loading && <LoadingCompo />}
          <div className="mt-[32px] w-full grid grid-cols-3 gap-[24px]">
            {allclass?.map((item: any, index: any) => {
              const colorIndex = index % colors.length;
              const color = colors[colorIndex];
              return (
                <ClassCard
                  item={item}
                  create={() => toggleTab(item, 1)}
                  viewStudents={() => toggleTab(item, 2)}
                  selectArm={setSelectedArm}
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
          activeTab === 1 || activeTab === 3
            ? "small"
            : activeTab === 2
            ? "small"
            : "large"
        }
      >
        {activeTab === 1 ? (
          <InviteStudents item={item} close={() => setActive(false)} />
        ) : activeTab === 2 ? (
          <StudentsModal
            item={item}
            arm={selectedArm}
            showDelete={setActiveTab}
            close={() => setActive(false)}
          />
        ) : activeTab === 3 ? (
          <DeleteModal close={() => setActive(false)} />
        ) : (
          <></>
        )}
      </CenterModal>
    </>
  );
}

export default SchoolStudents;
