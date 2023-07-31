import Select from "../../select/select";

type EarningsCardProps = {
    title: string;
    amount: number;
    percentage: number;
    color?: string;
}
function EarningsCard({ color, title, percentage, amount }: EarningsCardProps) {
    return (
        <div>
            <div className="flex items-center space-x-2 text-gray-800">
                <div className={`bg-light rounded w-6 h-6`}></div>
                <h2 className="font-[500]">{title}</h2>
            </div>
            <div className="mt-2">
                <h2 className="text-xl font-[600]">₦ {amount.toLocaleString()}</h2>
                <div className="w-full h-3 rounded-full bg-light">
                    <div className={`${color} rounded-full h-full`} style={{ width: `${percentage}%` }}></div>
                </div>
            </div>
        </div>
    );
}


export default function EarningsReport() {
    const colors: string[] = [
        'bg-[#6557AC]',
        'bg-[#4AAEBC]',
        'bg-[#E38698]'
    ];

    const earningsData: EarningsCardProps[] = [
        { percentage: 65, title: "Earnings", amount: 2000000 },
        { percentage: 65, title: "Profits", amount: 1500000 },
        { percentage: 45, title: "Expenses", amount: 500000 }
    ];

    return (
        <div className="p-4 h-[240px] rounded-[8px] border shadow w-full">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg text-gray-700">Earnings Report</h1>
                    <span className="text-gray-400 text-sm"> Monthly earnings overview</span>
                </div>
                <Select>
                    <option value="">July</option>
                </Select>
            </div>
            <div className="grid grid-cols-3 gap-x-4 mt-16">
                {
                    earningsData.map((data, index) => (
                        <EarningsCard color={colors[index]} {...data} />
                    ))
                }
            </div>
        </div>
    )
}
