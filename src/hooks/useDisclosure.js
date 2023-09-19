import { useEffect, useRef, useState } from "react";

function useDisclosure() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

 const openModal = () => {
    setIsOpen(true);
};

  const closeModal = () => {
    setIsOpen(false);
  };


  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return { isOpen, openModal, closeModal, toggleModal, modalRef };
}

export default useDisclosure;
