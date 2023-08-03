import DailyOverview from "./dailyOverview";
import LessonStatus, { TLessonStatusCardProps } from "./lessonStatus";
import MonthlyUploadedLessons from "./monthlyUploadedLessons";




export default function LessonTabComponent(): JSX.Element {
    const completedLessonsData: TLessonStatusCardProps[] = [
        { title: 'Total Lessons Completed', value: 5000 },
        { title: 'Lessons Completed from schools', value: 4000 },
        { title: 'Lessons Completed from teachers', value: 4000 },
        { title: 'Lessons Completed from freelancers', value: 1000 },
        { title: 'Lessons Completed from hybrids', value: 800 },
    ];

    const uncompletedLessonsData: TLessonStatusCardProps[] = [
        { title: 'Total Lessons uncompleted', value: 5000 },
        { title: 'Lessons uncompleted from schools', value: 4000 },
        { title: 'Lessons uncompleted from teachers', value: 4000 },
        { title: 'Lessons uncompleted from freelancers', value: 1000 },
        { title: 'Lessons uncompleted from hybrids', value: 800 },
    ];

    return (
        <div className="w-full">
            <DailyOverview />
            <MonthlyUploadedLessons />
            <LessonStatus status="Completed" data={completedLessonsData} />
            <LessonStatus status="Uncompleted" data={uncompletedLessonsData} />
            <div className="py-40"></div>
        </div>
    );
}