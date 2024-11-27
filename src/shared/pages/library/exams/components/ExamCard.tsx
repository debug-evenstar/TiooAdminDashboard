import { axiosInstance } from "@/api/request";
import { notify } from "@/components/notification/notification";
import CardOptionsButton from "./CardOptionButton";

interface ExamCardProps {
  exam: any;
  background: string;
  nextPage?: any;
  isSub?: boolean;
  setExamProps?: any;
  setModal?: any;
  refetch?: any;
}


const ExamCard = ({
  exam,
  background,
  nextPage,
  setExamProps,
  setModal,
  refetch,
}: ExamCardProps) => {

  console.log(exam);

  const deleteExam = async () => {
    await axiosInstance.delete(`/exams/${exam.id}`)
    .then((res: any) => {
      if (!res.error) {
        notify.success(res.message);
        refetch();
      } else {
        notify.error(res.message);
      }
    })
  }
  
  return (
    <button
      onClick={() => nextPage(exam)}
      style={{ backgroundColor: background + "66" }}
      className={` h-[10rem] text-white relative font-bold rounded-xl flex items-center justify-center`}
    >
        <div className="absolute top-2 bg-black/10 w-6 h-6 flex items-center justify-center rounded-full right-2">
          <CardOptionsButton
            item={exam}
            setItemProps={setExamProps}
            setModal={setModal}
            onDelete={deleteExam}
          />
        </div>
      <p
        className="px-4 py-1  rounded"
        style={{ backgroundColor: background + "cc" }}
      >
        {exam?.name}
      </p>
    </button>
  );
};
export default ExamCard;
