import LineGraph, { TLineGraphProps } from "../../lineGraph/lineGraph";
import Select from "../../select/select";

export default function MonthlyRecurringRevenue() {

    const data: TLineGraphProps[] = [
        { x: '2-8', y: 0 },
        { x: '2-8', y: 1 },
        { x: '9-15', y: 0.7 },
        { x: '16-20', y: 1.3 },
        { x: '21-25', y: 2.3 },
        { x: '26-29', y: 2.7 },
    ];

    return (
        <>
            <h1 className="text-[24px]">Monthly Recurring Revenue</h1>
            <div className="w-full shadow border rounded-[8px] mt-5 p-6 h-full">
                <div className="w-full flex justify-between items-center">
                    <h1 className="">Total MRR</h1>
                    <div className="flex items-center space-x-2">
                        <Select>
                            <option value="July">July</option>
                        </Select>
                        <Select>
                            <option value="2023">2023</option>
                        </Select>
                    </div>
                </div>
                <div>
                    <LineGraph data={data} />
                </div>
            </div>
        </>
    );
}
