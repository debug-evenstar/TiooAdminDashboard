import Header from "../../components/header"
import studentImage from '../../assets/images/student.png';

export default function StudentProfile() {
    return (
        <div>
            <Header variant={true} title="Students Profile" />
            <div className="mt-5 px-10">
                <div className="flex space-x-4 mt-10 items-center">
                    <img src={studentImage} alt="" />
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