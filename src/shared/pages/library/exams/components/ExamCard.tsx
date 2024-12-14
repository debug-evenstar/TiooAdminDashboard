import { axiosInstance } from "@/api/request";
import { notify } from "@/components/notification/notification";
import CardOptionsButton from "./CardOptionButton";
import { useState } from "react";
import ExamTextbooksModal from "./ExamTextbooksModal";
import ExamSubjectsModal from "./ExamSubjectsModal";

interface ExamCardProps {
  exam: any;
  background: string;
  nextPage?: any;
  isSub?: boolean;
  setExamProps?: any;
  setModal?: any;
  refetch?: any;
  hasMenu?: boolean;
}

const ExamCard = ({
  exam,
  background,
  nextPage,
  setExamProps,
  setModal,
  refetch,
  hasMenu = true,
}: ExamCardProps) => {
  const deleteExam = async () => {
    await axiosInstance.delete(`/exams/${exam.id}`).then((res: any) => {
      if (!res.error) {
        notify.success(res.message);
        refetch();
      } else {
        notify.error(res.message);
      }
    });
  };


  console.log(exam);
  const [subjectsModal, setSubjectsModal] = useState(false);
  const [textbooksModal, setTextbooksModal] = useState(false);

  return (
    <>
      <ExamSubjectsModal
        title="Attach subjects"
        exam={exam}
        refetch={() => null}
        modal={subjectsModal}
        setModal={setSubjectsModal}
      />
      <ExamTextbooksModal
        exam={exam}
        title="Attach textbooks"
        refetch={() => null}
        modal={textbooksModal}
        setModal={setTextbooksModal}
      />
      <button
        onClick={() => nextPage(exam)}
        style={{ backgroundColor: background + "66" }}
        className={` h-[10rem] text-white relative font-bold rounded-xl flex items-center justify-center`}
      >
        {hasMenu && (
          <div className="absolute top-2 bg-black/10 w-6 h-6 flex items-center justify-center rounded-full right-2">
            <CardOptionsButton
              item={exam}
              actions={{ setSubjectsModal, setTextbooksModal }}
              setItemProps={setExamProps}
              setModal={setModal}
              onDelete={deleteExam}
            />
          </div>
        )}
        <p
          className="px-4 py-1  rounded"
          style={{ backgroundColor: background + "cc" }}
        >
          {exam?.name}
        </p>
      </button>
    </>
  );
};
export default ExamCard;
