import { Children, ReactNode } from "react";

export default function ModalLayout({
  modal,
  setModal,
  children,
  title
}: {
  modal: boolean;
  setModal: any;
  children: ReactNode;
  title: string;
}) {

  return (
    <div
      className={`fixed text-primary z-[1000] bg-[#00000044] duration-0 inset-0 h-screen w-screen ${
        modal ? "" : "-translate-y-full"
      }`}
    >
      <div
        className={`translate-y-[1rem] z-[100] bg-white rounded duration-1000 w-[410px] mx-auto `}
      >
        <div className="p-2 border-b px-4 flex items-center justify-between">
          <h1>{ title } </h1>
          <button className="text-2xl" onClick={() => setModal(false)}>
            &times;
          </button>
        </div>
        {children}
      </div>te
    </div>
  );
}
