import Doughnut, { TDoughnutProps } from "../../Doughnut/doughnut";
import ExportMenuBtn from "../../exportMenuBtn/exportMenuBtn";
import { TMenuProps } from "../../menu/menu";
import ScrollButton from "../../scrollButtons/scrollButtons";
import Select from "../../select/select";


export default function DailyOverview() {
    const doughnutData: TDoughnutProps = {
        percent: 54,
        width: 90,
        height: 90,
        innerRadius: '80%'
    }

    const exportMenuEntries: TMenuProps[] = [
        {id: 1,name: 'Lessons Uploaded'},
        {id: 1,name: 'Lessons Completed'},
        {id: 1,name: 'Lessons Uncompleted'},
    ];


    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-[24px]">Daily Overview</h1>
                <div className="flex items-center space-x-6">
                    <ExportMenuBtn entries={exportMenuEntries}>Export CSV</ExportMenuBtn>
                    <ScrollButton/>
                </div>
            </div>
            <div className="flex mt-4 w-full space-x-5 justify-between">
                <div className="shadow w-full p-4 px-3 border rounded-[8px] flex justify-between space-x-2 flex items-center">
                    <div className="flex items-center space-x-3">
                        <div>
                            <Doughnut  {...doughnutData} />
                        </div>
                        <div className="text-gray-500 text-sm flex-col space-y-3 flex">
                            <h1 className="text-[1rem]  text-gray-700">17 Lessons Uploaded today</h1>
                            <div className="flex text-sm items-center space-x-2">
                                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                                <span className="text-xs">15 Lessons Uploaded by teachers</span>
                            </div>
                            <div className="flex text-sm items-center space-x-2">
                                <div className="w-4 h-4 rounded-full bg-yellow-300"></div>
                                <span className="text-xs">2 Lessons Uploaded by freelancers</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-full">
                        <Select className="text-xs">
                            <option value="">13th July</option>
                        </Select>
                    </div>

                </div>

                <div className="shadow p-4 w-full flex justify-between px-3 border rounded-[8px] space-x-2 flex items-center">
                    <div className="text-gray-500 text-sm flex-col space-y-3 flex">
                        <h1 className=" text-[1rem] text-gray-700">23 Lessons Completed today</h1>
                        <div className="flex text-sm items-center space-x-2">
                            <div className="w-4 h-4 rounded-full bg-red-500"></div>
                            <span className="text-xs">13 Lessons completed from teachers</span>
                        </div>
                        <div className="flex text-sm items-center space-x-2">
                            <div className="w-4 h-4 rounded-full bg-yellow-300"></div>
                            <span className="text-xs">10 Lessons completed from freelancers</span>
                        </div>
                    </div>
                    <div className="h-full">
                        <Select className="text-xs">
                            <option value="">13th July</option>
                        </Select>
                    </div>
                </div>
            </div>

        </>
    );
}