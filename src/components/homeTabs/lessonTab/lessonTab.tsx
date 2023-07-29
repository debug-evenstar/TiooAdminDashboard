import CompletedLessons from "./completedLessons";
import DailyOverview from "./dailyOverview";
import MonthlyUploadedLessons from "./monthlyUploadedLessons";



export default function LessonTabComponent(): JSX.Element {

    return (
        <div className="w-full">
            <DailyOverview />
            <MonthlyUploadedLessons />
            <CompletedLessons/>
            <div className="py-40"></div>
        </div>
    );
}