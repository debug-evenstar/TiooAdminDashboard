import { useSelector } from "react-redux"
import Header from "../../components/header"
import { RootState } from "../../redux/store"
// import studentImage from '../../assets/images/student.png';

export default function SchoolProfile() {

    const schools = useSelector((state: RootState) => state.school.schools);
    console.log(schools);

    return (
        <div>
            <Header variant={true} title="School Profile" />
            <div className="mt-5 px-10">
                <div className="flex space-x-4 mt-10 items-center">
                    {/* <img src={studentImage} alt="" /> */}
                    <div className="w-16 h-16 rounded-full bg-main flex items-center justify-center text-4xl text-white">I</div>
                    <div className="flex flex-col justify-between">
                        <h1 className="text-primary text-2xl font-[500]">Destiny Christopher</h1>
                        <p className="text-gray-400 text-sm">pathfinders@gmail.com</p>
                    </div>
                </div>

                <div className="mt-">

                </div>
            </div>
        </div>
    )
}