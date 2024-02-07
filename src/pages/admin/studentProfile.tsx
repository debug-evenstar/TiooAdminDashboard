// import studentImage from '../../assets/images/student.png';
import Header from "../../components/AppHeader"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/api";
import { BASE_URL } from "../../services/url";

const InfoField = ({name,value}: {name: string,value?: string | number}) => {
    return (
        <div className="mb-[1rem]">
            <p className="my-2 text-sm text-gray-500">{name}</p>
            <div className="h-[2.8rem] text-primary bg-[#f5f5f5] rounded-[8px] text-sm w-full flex items-center px-[1rem]">
                {value}
            </div>
        </div>
    );    
}

export default function StudentProfile() {
    const [student, setStudent] = useState<any>();

    const { id } = useParams<{ id: any }>()
  
    useEffect(() => {
        axiosInstance.get(`${BASE_URL}/students/readall`)
            .then(response => {
                setStudent(response.data.data.find(
                    (item: any) => item.id == id
                ))
                
            })
    }, [])

    return (
        <div>
            <Header variant={true} title="Student Profile" />
            <div className="mt-5 px-10">
                <div className="flex space-x-4 mt-10 items-center">
                    {/* <img src={studentImage} alt="" /> */}
                    <div className="w-16 h-16 rounded-full bg-main flex items-center justify-center text-4xl text-white">
                        {student?.name[0]}
                    </div>
                    <div className="flex flex-col justify-between">
                        <h1 className="text-primary text-2xl font-[500]">{student?.name}</h1>
                        <p className="text-gray-400 text-sm">{student?.email}</p>
                    </div>
                </div>

                <div className="mt-10">
                    <InfoField name="Phone number" value={student?.phone}/>
                    <InfoField name="Address" value={student?.Student.residentialAddress}/>
                    <InfoField name="Age" value={student?.Student.age}/>
                    <InfoField name="Class" value={student?.Student.class}/>
                </div>
            </div>
        </div>
    )
}