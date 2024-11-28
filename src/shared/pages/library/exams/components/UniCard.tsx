import { axiosInstance } from "@/api/request";
import { notify } from "@/components/notification/notification";
import { BsPen, BsTrash } from "react-icons/bs";
import { FaEllipsisH, FaEllipsisV } from "react-icons/fa";

import Popup from "reactjs-popup";
import CardOptionsButton from "./CardOptionButton";

interface UniversityCardProps {
  university: any;
  background: string;
  nextPage?: any;
  isSub?: boolean;
  setUniversityProps?: any;
  setModal?: any;
  refetch?: any;
}



const UniversityCard = ({
  university,
  background,
  nextPage,
  setUniversityProps,
  setModal,
  refetch,
}: UniversityCardProps) => {


  const deleteUniversity = async () => {
    await axiosInstance.delete(`/universities/${university.id}`)
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
      onClick={() => nextPage(university)}
      style={{ backgroundColor: background + "66" }}
      className={` h-[10rem] text-white relative font-bold rounded-xl flex items-center justify-center`}
    >
        <div className="absolute top-2 bg-black/10 w-6 h-6 flex items-center justify-center rounded-full right-2">
          <CardOptionsButton
            item={university}
            setItemProps={setUniversityProps}
            setModal={setModal}
            onDelete={deleteUniversity}
          />
        </div>
      <p
        className="px-4 py-1  rounded"
        style={{ backgroundColor: background + "cc" }}
      >
        {university?.name}
      </p>
    </button>
  );
};
export default UniversityCard;
