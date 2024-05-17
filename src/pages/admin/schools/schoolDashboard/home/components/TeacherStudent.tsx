import React, { FC, useState, useEffect } from "react";
import { fullNames } from "../../../../../../data/data";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { configure } from "../../../../../../services/config";
import { alertActions } from "../../../../../../components/alertActions";
import { getClassStudent } from "../../../../../../services/authServices";
interface Props {
  item: any;
}
const TeacherStudentList: FC<Props> = ({ item }) => {
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
    await getClassStudent(item.id, config)
      .then((res) => {
        if (!res.data.error) {
          setData(res.data.data);
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
          !!data.length &&
          data.map((item) => <p className="px-6 py-2 border-b">{item.name}</p>)}
      </div>
    </>
  );
};

export default TeacherStudentList;
