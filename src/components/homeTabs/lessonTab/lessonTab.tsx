import Doughnut, { TDoughnutProps } from "../../Doughnut/doughnut";

export default function LessonTabComponent(): JSX.Element {

    const doughnutData: TDoughnutProps = {
        percent: 54,
        width: 90,
        height: 90,
        innerRadius: '80%'
    }
    return (
        <div className="w-full">
            <h1 className="text-[24px]">Daily Overview</h1>
            <div className="flex mt-4 w-full flex-wrap justify-between">
                <div className="w-10 h-10">
                    <Doughnut  {...doughnutData} />
                </div>
            </div>
        </div>
    );
}