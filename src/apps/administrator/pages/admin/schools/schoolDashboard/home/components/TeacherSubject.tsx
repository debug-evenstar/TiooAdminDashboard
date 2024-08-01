import React, { FC, useEffect, useState } from "react";
import { getclassSubjcts } from "@/services/authServices";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { configure } from "@/services/config";
import { alertActions } from "@/components/alertActions";
interface Props {
  item: any;
}
const TeacherSubjectList: FC<Props> = ({ item }) => {
  const userInfo = useSelector((state: any) => state.gods.auth.userInformation);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const navigate = useNavigate();
  const config = configure(userInfo.token);
  const fetchClassSubject = async () => {
    if (!userInfo.token) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }
    if (!localStorage.getItem("token")) {
      setLoading(false);
      alertActions.error("Your session has ended please login");
      navigate("/login");
    }
    await getclassSubjcts(item.id, config)
      .then((res) => {
        if (!res.data.error) {
          setData(res.data.data.Subjects);
        }
      })
      .catch((err) => {});
  };
  useEffect(() => {
    fetchClassSubject();
  }, []);
  return (
    <>
      <div className="max-h-[400px] min-h-[350px] overflow-y-scroll">
        {data &&
          data
            .slice(0, 12)
            .map((item) => <p className="px-6 py-2 border-b">{item.naming}</p>)}
      </div>
    </>
  );
};

export default TeacherSubjectList;
