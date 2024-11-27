import { BsPen, BsTrash } from "react-icons/bs";
import { FaEllipsisH, FaEllipsisV } from "react-icons/fa";

import Popup from "reactjs-popup";

const CardOptionsButton = ({
  active,
  onDelete,
  setItemProps,
  setModal,
  item,
}: any) => {

  const handleOpenEdit = () => {
    setItemProps(item);
    setModal(true);
  };

  return (
    <Popup
      open={active}
      onOpen={() => null}
      trigger={
        <button>
          <FaEllipsisH />
        </button>
      }
      position="left top"
      arrow={false}
    >
      <div className="w-fit relative px-2 py-2 outline-none text-gray-400 bg-[#fff] overflow-hidden shadow rounded-[8px]">
        <button
          onClick={handleOpenEdit}
          className="px-2 py-1.5 outline-none w-[6.5rem] rounded-[4px] hover:bg-light  text-gray-500 space-x-2 text-sm flex items-center"
        >
          <BsPen />
          <span>Edit</span>
        </button>

        <button
          onClick={() => {
            onDelete();
          }}
          className="px-2 py-1.5 outline-none w-[6.5rem] rounded-[4px] space-x-2 text-gray-500 hover:text-white hover:bg-[#ff6666] text-sm flex items-center"
        >
          <BsTrash />
          <span>Delete</span>
        </button>
      </div>
    </Popup>
  );
};


export default CardOptionsButton;