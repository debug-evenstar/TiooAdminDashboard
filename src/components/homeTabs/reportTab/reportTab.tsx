import Button from "../../button/button";
import Select from "../../select/select";
import EarningsReport from "./earningsReport";
import MonthlyRecurringRevenue from "./monthlyRecurringRev";
import UsersRevenueReport from "./usersRevenueReport";

export default function ReportTabComponent(): JSX.Element {
    return (
        <div className="text-primary">
            <MonthlyRecurringRevenue />
            <div className="mt-12 w-full flex justify-between space-x-10">
                <div className="w-[65%]">
                    <EarningsReport />
                    <div className="mt-10">
                        <Button>Export CSV</Button>
                        <div className="h-[140px] mt-5 bg-light rounded-[8px] p-4 flex justify-between flex-col">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h1 className="font-[500]">School's Mark-up</h1>
                                    <p className="text-sm text-gray-400 mt-1">Total mark-up for schools</p>
                                </div>
                                <Select className="bg-[#fafafa]">
                                    <option value="">July</option>
                                </Select>
                            </div>
                            <div className="justify-between flex items-center">
                                <h1 className="text-3xl font-[600]">₦ 1,500,500</h1>
                                <button className="font-[600]">
                                    &#62;&#62;&#62;&#62;
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[35%]">
                    <UsersRevenueReport />
                </div>
            </div>
            <div className="py-20">
            </div>
        </div>
    );

}
