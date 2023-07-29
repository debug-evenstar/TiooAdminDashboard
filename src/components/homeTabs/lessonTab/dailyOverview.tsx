import Doughnut, { TDoughnutProps } from "../../Doughnut/doughnut";
import Select from "../../select/select";


export default function DailyOverview() {
    const doughnutData: TDoughnutProps = {
        percent: 54,
        width: 90,
        height: 90,
        innerRadius: '80%'
    }

    return (
        <>
            <h1 className="text-[24px]">Daily Overview</h1>
            <div className="flex mt-4 w-full flex-wrap justify-between">
                <div className="shadow p-4 border rounded-[8px] space-x-2 flex items-center">
                    <div>
                        <Doughnut  {...doughnutData} />
                    </div>
                    <div className="text-gray-500 text-sm flex-col space-y-3 flex">
                        <h1 className="text-[1.2rem]  text-gray-700">17 Lessons Uploaded today</h1>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded-full bg-red-500"></div><span>15 Lessons Uploaded by teachers</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded-full bg-yellow-300"></div><span>2 Lessons Uploaded by freelancers</span>
                        </div>
                    </div>
                    <div className="h-full pl-10">
                        <Select>
                            <option value="">13th July</option>
                        </Select>
                    </div>

                </div>

                <div className="shadow p-4 border rounded-[8px] space-x-2 flex items-center">
                    <div className="text-gray-500 text-sm flex-col space-y-3 flex">
                        <h1 className=" text-[1.2rem] text-gray-700">23 Lessons Completed today</h1>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded-full bg-red-500"></div><span>13 Lessons completed from teachers</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded-full bg-yellow-300"></div><span>10 Lessons completed from freelancers</span>
                        </div>
                    </div>
                    <div className="h-full pl-10">
                        <Select>
                            <option value="">13th July</option>
                        </Select>
                    </div>
                </div>
            </div>

        </>
    );
}