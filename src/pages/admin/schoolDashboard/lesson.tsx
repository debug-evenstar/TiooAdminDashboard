import {useState, useEffect} from 'react'
import LessonCard from '../../../components/schoolDashComp/LessonCard';
import { getSchoolSubjects } from '../../../services/api';
import {  useParams } from 'react-router-dom';

const SchoolLessons = () => {
    const {id} = useParams()
    const [loading, setLoading] = useState(false)
    const [subjects, setSubjects] = useState<any[]>()
    const getAllSubjects = (id:any) => {
        getSchoolSubjects(id)
        .then((response) => {
          setLoading(false);
          setSubjects(response?.data?.data);
        })
        .catch((error) => {
            console.log(error);
          setLoading(false);
        });
    }
    
       useEffect(() => {
         setLoading(true);
         getAllSubjects(id);// eslint-disable-next-line
       }, [id]);
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
    <div>
        <div className="w-full mx-auto">
          <div className="w-full flex items-start justify-start flex-col mt-[20px]">
            <h3 className="font-inter font-medium text-[#030036] opacity-70 text-[22px]">
              Subjects
            </h3>
            {loading && <p>Loading</p>}
            <div className="mt-[32px] w-full grid grid-cols-3 gap-[24px]">
              { subjects && !!subjects.length && subjects.map((item: any, index) => {
                const colorIndex = index % colors.length;
                const color = colors[colorIndex];

                return (
                  <LessonCard
                    key={index}
                    item={item}
                    subject={item.class}
                    color={color}
                  />
                );
              })}
            </div>
          </div>
        </div>
    </div>
  )
}

export default SchoolLessons