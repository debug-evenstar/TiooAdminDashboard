import { useState, useEffect } from "react";
import TeacherCard from "./components/TeacherCard";


import axiosInstance from "../../../../services/api";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../../services/url";


function SchoolTeachers() {

  const [teachers, setTeachers] = useState<any>();
  const [schoolTeachers, setSchoolTeachers] = useState([]);
  const [loading, setloading] = useState(false);


  const { id } = useParams();



  useEffect(() => {
    setloading(true);
    axiosInstance.get(`${BASE_URL}/teacher/readall`)
      .then(response => setTeachers(response.data.data))
      .catch(error => console.log(error))
      .finally(() => setloading(false));
  }, []);

  useEffect(() => {
    setSchoolTeachers(
      teachers?.filter((teacher: any) => teacher.Teacher?.SchoolManagementId == id)
      )
    console.log("finding teachers",schoolTeachers);
  }, [teachers]);



  return (
    <>
      <div className="w-full mx-auto">
        <div className="flex items-center justify-between w-full mt-[20px]">
          {schoolTeachers?.length > 0 ? 
            <h3
              className={`font-inter font-medium text-[#030036] opacity-70 text-[22px]`}
            >
              Teachers ({schoolTeachers?.length})
            </h3>
          : 
            !loading &&
            schoolTeachers?.length < 1 && (
              <div
                className={` items-start justify-start flex-col mt-[20px] w-full`}
              >
                <h3 className="text-[#030036] opacity-70 text-[22px] font-normal">
                  No Teachers found!
                </h3>
                <p className="text-base text-[#87909E] font-normal leading-[24px] pt-1">
                  You haven’t added any teachers yet, Invite teachers
                </p>
              </div>
            )
          }
          <div className="flex items-center gap-[15px]">

          </div>
        </div>
        
        <div className="w-full mt-[40px] grid grid-cols-4 gap-[24px]">
          {schoolTeachers?.length > 0 &&
            schoolTeachers?.map((item: any, index) => (
              <TeacherCard
                key={index}
                teacher={item}
              />
            ))}
        </div>

      </div>


    </>
  );
}

export default SchoolTeachers;
