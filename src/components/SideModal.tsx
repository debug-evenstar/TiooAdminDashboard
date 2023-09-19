import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";

interface SideModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const SideModal: React.FC<SideModalProps> = ({ isOpen, onClose, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const handleOverlayClick = () => {
    onClose();
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      {isModalOpen && (
        <Transition
          show={isOpen}
          enter="transition ease-out duration-1000"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          className="fixed right-0 inset-y-0 z-50"
        >
          <div>
            <div
              className="bg-[#C6C4E4] opacity-60 fixed inset-0"
              onClick={handleOverlayClick}
            />
            <div
              className="fixed inset-y-0 right-0 md:max-w-[443px] w-full bg-white overflow-y-auto"
              onClick={handleModalClick}
            >
              <div className="relative right-0">{children}</div>
            </div>
          </div>
        </Transition>
      )}
    </>
  );
};

export default SideModal;
