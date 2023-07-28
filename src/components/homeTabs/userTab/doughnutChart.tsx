import Doughnut, { TDoughnutProps } from "../../Doughnut/doughnut"
export default function DoughnutChart({ percent }: { percent: number }) {

    const doughnutData: TDoughnutProps = {
        percent: percent,
        width: 130,
        height: 130,
        className: 'font-bold text-xl'
    }

    return (
        <div className="w-[190px] text-center h-[240px] p-3 rounded-[8px]">
            <h1>Overall Progress</h1>
            <h2 className="text-xs text-gray-400">Keep improving the quality of your reach</h2>
            <div className="w-fit mx-auto mt-4">
                <Doughnut {...doughnutData} />
            </div>
        </div>
    )
}
