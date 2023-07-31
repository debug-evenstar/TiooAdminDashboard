import EarningsReport from "./earningsReport";
import MonthlyRecurringRevenue from "./monthlyRecurringRev";
import UsersRevenueReport from "./usersRevenueReport";

export default function ReportTabComponent(): JSX.Element {
    return (
        <>
            <MonthlyRecurringRevenue />
            <div className="mt-12 w-full flex justify-between space-x-10">
                <div className="w-[65%]">
                    <EarningsReport />
                </div>
                <div className="w-[35%]">
                    <UsersRevenueReport />
                </div>
            </div>
            <div className="py-20">

            </div>
        </>
    );

}
