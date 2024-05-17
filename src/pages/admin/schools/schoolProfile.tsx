import Header from "../../../components/AppHeader"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../services/api";

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

export default function SchoolProfile() {
    const [school, setSchool] = useState<any>();

    const { id } = useParams<{ id: any }>()
  
    useEffect(() => {
        axiosInstance.get('/management/schools/extra')
            .then(response => {
                setSchool(response.data.data.find(
                    (item: any) => item.school.id == id
                ))
            })
    }, [])

    return (
        <div>
            <Header variant={true} title="School Profile" />
            <div className="mt-5 px-10">
                <div className="flex space-x-4 mt-10 items-center">
                    {/* <img src={studentImage} alt="" /> */}
                    <div className="w-16 h-16 rounded-full bg-main flex items-center justify-center text-4xl text-white">
                        {school?.school.school_name[0]}
                    </div>
                    <div className="flex flex-col justify-between">
                        <h1 className="text-primary text-2xl font-[500]">{school?.school.school_name}</h1>
                    </div>
                </div>

                <div className="mt-10">
                    <InfoField name="Email" value={school?.school.email}/>
                    <InfoField name="Phone" value={school?.school.phone}/>
                    <InfoField name="Address" value={school?.school.address}/>
                    <div className="grid grid-cols-2 gap-x-10">
                        <InfoField name="Number of subjects" value={school?.subjects} />
                        <InfoField name="Number of teachers" value={school?.teachers} />
                        <InfoField name="Number of students" value={school?.students} />
                        <InfoField name="Number of hybrid teachers" value={school?.hybrid_teachers} />
                        <InfoField name="Number of classes" value={school?.classes} />
                        <InfoField name="Number of extracurricular subjects" value={''} />
                    </div>
                    <h1 className="my-7 text-primary text-[1.5rem]">Additional Information</h1>
                    <div className="grid grid-cols-2 gap-x-10">
                        <InfoField name="School owner's name" value={school?.school.name} />
                        <InfoField name="Gender" value={school?.school.gender} />
                        <InfoField name="Country" value={''} />
                        <InfoField name="Website" value={school?.school.website} />
                        <InfoField name="Current address" value={''} />
                        <InfoField name="Date of establishment" value={school?.school.est_date} />
                        <InfoField name="School type" value={school?.school.school_type} />
                        <InfoField name="Ownership type" value={school?.school.ownership_type} />
                    </div>
                    <div className="mt-4 text-sm" >
                        <div className="mb-[1.4rem]">
                            <p className="my-2 text-sm text-gray-500">Bank information</p>
                            <div className="p-3 text-primary bg-[#f5f5f5] rounded-[8px] space-y-0.5 text-sm w-full flex flex-col px-[1rem]">
                                <span>Bank Name</span>
                                <span className="underline">1234567890</span>
                                <span>Bank Account Name</span>
                            </div>
                        </div>
                        <div className="mb-3">
                            <p className="mb-1 text-sm text-gray-500">Upload a valid means of identification</p>
                            <a href="#" className="mt-2 text-[#4F46E5] underline">View Document</a>
                        </div>

                        <div className="mb-10">
                            <p className="mb-1 text-sm text-gray-500">Proof of ownership</p>
                            <a href="#" className="text-[#4F46E5] underline">View Document</a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}