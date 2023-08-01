import { VictoryPie } from "victory";
import Select from "../../select/select";
import Button from "../../button/button";

export type TPiechartDataProps = {
    x: string,
    y: number
}

export default function TotalActiveUsers({ data }: { data: TPiechartDataProps[] }) {



    const accents: string[] = [
        '#0a090b',
        '#005d7a',
        '#b8dee9',
        '#e6e6e6',
        '#681ab0'
    ];



    return (
        <div className="w-full mt-20">
            <div className="flex mb-3 justify-end">
                <Button>Export CSV</Button>
            </div>
            <div className="w-full shadow border grid grid-cols-3 rounded-[8px] p-8 h-full">
                <div>
                    <h1>Total Active Users</h1>
                    <h1 className="text-xl font-bold">3,738</h1>
                </div>
                <div className="flex flex-col items-center justify-center ">
                    <div className="w-56 h-56">
                        <div className="block relative top-[5rem]">
                            <h1 className="text-center  mx-auto font-bold">Growth</h1>
                            <p className="text-xs text-green-800 py-[0.07rem] w-fit mx-auto px-2  rounded bg-green-100 font-bold">2.25%</p>
                        </div>
                        <div className="relative -top-12">
                            <VictoryPie
                                data={data}
                                colorScale={accents}
                                labels={() => null}
                                innerRadius={100}
                                padAngle={1.5}
                            />
                        </div>
                    </div>
                    <div className="flex text-xs text-gray-500 mr-4 justify-center">
                        {
                            data.map(({ x, y }, index) => (
                                <div key={index} className="flex items-center space-x-1 justify-end w-[8rem]">
                                    <div className="rounded-full w-2 h-2" style={{ backgroundColor: accents[index] }}></div>
                                    <span>{x}: {y}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="space-x-3">
                        <Select>
                            <option value="something">Jan</option>
                        </Select>
                        <Select>
                            <option value="2018">2018</option>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    );
}
