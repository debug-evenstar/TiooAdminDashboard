import Header from "../../../components/AppHeader"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance} from "@/api/request";

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

export default function FreelancerProfile() {
    const [freelancer, setFreelancer] = useState<any>();

    const { id } = useParams<{ id: any }>()
  
    useEffect(() => {
        axiosInstance.get('/freelancer/'+id)
            .then(response => {
                setFreelancer(response.data.data[0]);
                console.log(response.data.data)
            })
    }, [])

    return (
        <div>
            <Header variant={true} title="Freelancer Profile" />
            <div className="mt-5 px-10 pb-20">
                <div className="flex space-x-4 mt-10 items-center">
                    {/* <img src={studentImage} alt="" /> */}
                    <div className="w-16 h-16 rounded-full bg-main flex items-center justify-center text-4xl text-white">
                        {freelancer?.freelancer.name[0]}
                    </div>
                    <div className="flex flex-col justify-between">
                        <h1 className="text-primary text-2xl font-[500]">{freelancer?.freelancer.name}</h1>
                        <p className="text-gray-400 text-sm">{freelancer?.freelancer.email}</p>
                    </div>
                </div>

                <div className="mt-10">
                    <InfoField name="Phone number" value={freelancer?.freelancer.phone}/>
                    <InfoField name="Address" value={freelancer?.freelancer.address}/>
                    <InfoField name="School owner's name" value={freelancer?.freelancer.scjool_name}/>
                    <div className="grid grid-cols-2 gap-x-10">
                        <InfoField name="Number of subjects" value={''} />
                        <InfoField name="Number of teachers" value={''} />
                        <InfoField name="Number of students" value={''} />
                        <InfoField name="Number of hybrid teachers" value={''} />
                        <InfoField name="Number of classes" value={''} />
                        <InfoField name="Number of extracurricular subjects" value={''} />
                    </div>
                </div>
            </div>
        </div>
    )
}