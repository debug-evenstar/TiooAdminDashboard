import Select from "../../select/select";

type TUsersRevenueReportProps = {
    title: string;
    amount: number,
    percentage: number;
    color?: string;
}

function UserSRevenueCard({ title, amount, percentage, color }: TUsersRevenueReportProps) {
    return (
        <div className={`mb-12 p-3 flex w-fit min-w-[120px] rounded-[8px] flex-col ${color} items-center`}>
            <h1 className="text-gray-400">{title}</h1>
            <h2 className="font-[500] text[#030036] text-xl">₦ {amount.toLocaleString()}</h2>

            <h3 className=" mt-2 font-[600] text-sm text-[#249B11] flex space-x-2">
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.5 15V1M8.5 1L1.5 8M8.5 1L15.5 8" stroke="#249B11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>
                    +{percentage}%
                </span>
            </h3>
        </div>
    );
}


export default function UsersRevenueReport() {

    const data: TUsersRevenueReportProps[] = [
        { title: "Schools", amount: 600000, percentage: 2.85 },
        { title: "Hybrid", amount: 100000, percentage: 12.5 },
        { title: "Freelancers", amount: 100000, percentage: 2.5 },
        { title: "Teachers", amount: 200000, percentage: 12.5 },
        { title: "Students", amount: 1000000, percentage: 12.5 }
    ];

    const colors: string[] = [
        'bg-[#E6E6FA]',
        'bg-[#D4F1EE]',
        'bg-[#D7F0E0]',
        'bg-[#FEFAE8]',
        'bg-[#FFE3FF]'
    ];

    return (
        <div className=" shadow rounded border w-full">
            <div className="p-4 border-b flex items-center justify-between font-[400]">
                <h1 className="font-[500]">Users MRR</h1>
                <Select>
                    <option value="">July</option>
                </Select>
            </div>
            <div className="p-4 flex flex-wrap justify-between">
                {
                    data.map((props, index) => (
                        <UserSRevenueCard color={colors[index]} key={index} {...props} />
                    ))
                }
                <div className={`mb-12 py-3 px-1 flex w-fit max-w-[136px] rounded-[8px] flex-col bg-[#4F46E5] text-white items-center`}>
                    <h1 className="">Total</h1>
                    <h2 className="font-[500] text-xl">₦ 2,000,000</h2>

                    <h3 className=" mt-2 font-[600] text-sm flex space-x-2">
                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.5 15V1M8.5 1L1.5 8M8.5 1L15.5 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>
                            +12.5%
                        </span>
                    </h3>
                </div>
            </div>
        </div>
    )
}