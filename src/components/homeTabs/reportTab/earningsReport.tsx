import Select from "../../select/select";
import walletImage from '../../../assets/icons/wallet.svg';
import educatorsImage from '../../../assets/icons/educators.svg';
import referalsImage from '../../../assets/icons/referals.svg';

type EarningsCardProps = {
    title: string;
    amount: number;
    percentage: number;
    color?: string;
    image?: string;
}

function EarningsCard({ color, image,title, percentage, amount }: EarningsCardProps) {
    return (
        <div className="text-primary">
            <div className="flex items-center space-x-2">
                <div className={`bg-light flex items-center justify-center rounded w-7 h-7`}>
                    <img src={image} alt="" />
                </div>
                <h2 className="font-[400]">{title}</h2>
            </div>
            <div className="mt-2">
                <h2 className="text-xl font-[400]">₦ {amount.toLocaleString()}</h2>
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
        { percentage: 65,image: walletImage, title: "Total", amount: 2000000 },
        { percentage: 65,image: educatorsImage, title: "Educators", amount: 1500000 },
        { percentage: 45,image: referalsImage, title: "Referals", amount: 500000 }
    ];

    return (
        <div className="p-4 rounded-[8px] border shadow w-full">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg text-primary">Earnings Report</h1>
                    <span className="text-gray-400 text-sm"> Monthly earnings overview</span>
                </div>
                <Select>
                    <option value="">July</option>
                </Select>
            </div>
            <div className="grid grid-cols-3 gap-x-4 mt-16">
                {
                    earningsData.map((data, index) => (
                        <EarningsCard key={index} color={colors[index]} {...data} />
                    ))
                }
            </div>
            <div className="mt-7">
                <h1 className="font-[500]">Net Earnings EB</h1>
                <h2 className="my-3 text-3xl font-[600]">₦ 1,500,000</h2>
            </div>
        </div>
    )
}
