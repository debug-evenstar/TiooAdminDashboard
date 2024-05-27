import React, { FC } from "react";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import { useDispatch, useSelector } from "react-redux";
// import { RootState } from '@/redux/store';
import { useEffect, useRef, useState } from "react";

import Header from "../../../../components/AppHeader";
import axiosInstance from "@/services/api";
import ChapterModal from "./components/chapterModal";
import DeleteItemModal from "../tabs/deleteItemModal";

interface ChapterCardProps {
  chapter: any;
  refresh: any;
}

const ChapterCard: FC<ChapterCardProps> = ({ chapter, refresh }: any) => {
  const [active, setActive] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
const [ deleteModal, setDeleteModal ] = useState<boolean>(false);
  const ref = useRef<any>();

  const toggle = () => ref.current.toggle();

  return (
    <>
      <div className="w-[200px] hover:shadow-lg mb-4 rounded-[8px] shadow border px-2 py-3 flex flex-col space-y-3 h-[140px]">
        <div className="flex justify-between">
          <h1 className="text-primary  font-[500]">{chapter.name}</h1>
          <div className="flex items-center">
            <Popup
              ref={ref}
              open={active}
              position="left center"
              trigger={
                // hahaha
                <button
                  className="outline-none"
                  onClick={() => {
                    setActive(true);
                  }}
                ></button>
              }
            >
              <ul className="py-3 px-3 bg-[#fff] shadow rounded-[8px]">
                <li
                  onClick={() => {
                    toggle();
                    setModal(true);
                  }}
                  className="py-2 rounded px-4 hover:bg-light cursor-pointer hover:text-main text-primary text-sm"
                >
                  Edit Chapter
                </li>
                <li
                  onClick={() => {
                    setDeleteModal(true)
                  }}
                  className="py-2 rounded px-4 hover:bg-red-400 text-red-500 cursor-pointer hover:text-white text-sm"
                >
                  Delete
                </li>
              </ul>
            </Popup>
            <button
              onClick={toggle}
              className="h-fit py-2 px-1 hover:bg-gray-100 outline-none  rounded"
            >
              <svg
                width="4"
                height="18"
                viewBox="0 0 4 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 9C0 7.89543 0.89543 7 2 7C3.10457 7 4 7.89543 4 9C4 10.1046 3.10457 11 2 11C0.89543 11 0 10.1046 0 9Z"
                  fill="#87909E"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 2C0 0.89543 0.89543 0 2 0C3.10457 0 4 0.89543 4 2C4 3.10457 3.10457 4 2 4C0.89543 4 0 3.10457 0 2Z"
                  fill="#87909E"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 16C0 14.8954 0.89543 14 2 14C3.10457 14 4 14.8954 4 16C4 17.1046 3.10457 18 2 18C0.89543 18 0 17.1046 0 16Z"
                  fill="#87909E"
                />
              </svg>
            </button>
          </div>
        </div>
        <p className="text-gray-400 text-sm">{chapter.description}</p>
        {/* <span className='text-gray-400 text-xs'>{lesson.files?.length} slides</span> */}
      </div>
      <ChapterModal refresh={refresh} chapterProps={chapter} {...{ modal, setModal }} />
      <DeleteItemModal
        itemProps={chapter}
        modal={deleteModal}
        setModal={setDeleteModal}
        once={true}
        refresh={refresh}
        type="chapter"
        url={`/library/textbooks/${chapter.textbook_id}/chapters`}
      />
    </>
  );
};

function AllChaptersCard({ textbook}: { textbook: any }) {
  const [active, setActive] = useState<boolean>(true);
  const [modal, setModal] = useState<boolean>(false);
  const [chapters, setChapters] = useState([]);

    const getAllChapters = () => {
        axiosInstance
        .get(`/library/textbooks/${textbook.id}/chapters`)
        .then((response) => {
          setChapters(response.data.data);
        })
        .catch((error) => console.log(error));
  
    }

  useEffect(() => {
    getAllChapters();
  }, []);

  return (
    <>
      <div className="w-full rounded-[8px] shadow overflow-hidden">
        <div className="px-4 h-[50px] bg-gray-200 text-xl font-[500] text-primary rounded-t-[8px] flex items-center">
          <h1>All Chapters({chapters.length})</h1>
        </div>
        <div
          className={`px-4 duration-700 transition-[max-height]  ease-out ${
            active ? "max-h-[30rem]" : "max-h-0"
          }`}
        >
          <div className="py-10">
            {chapters?.length > 0 ? null : (
              <h2 className="mb-5 text-lg text-gray-400">
                You haven't added any chapter
              </h2>
            )}
            <div className={`flex flex-wrap space-x-3`}>
              {chapters.map((chapter: any) => (
                <ChapterCard
                    refresh={getAllChapters}
                  key={chapter.id}
                  chapter={chapter} 
                />
              ))}
              <button
                onClick={() => setModal(!modal)}
                className="w-[200px] h-[140px] mb-4 outline-none active:outline-main px-[52px] py-[35px] border shadow rounded-[8px]
                                    flex items-center justify-center flex-col text-main hover:shadow-lg duration-300"
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 8C32.822 8 40 15.178 40 24C40 32.822 32.822 40 24 40C15.178 40 8 32.822 8 24C8 15.178 15.178 8 24 8ZM24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4ZM34 22H26V14H22V22H14V26H22V34H26V26H34V22Z"
                    fill="#4F46E5"
                  />
                </svg>
                <p className="text-center mt-1 text-nowrap font-[500]">
                  Add chapter
                </p>
              </button>
            </div>
          </div>
        </div>
        <div className="h-[50px] bg-[#fff] relative border-t flex items-center px-4 justify-between">
          <button className=""></button>
          <button
            onClick={() => setActive(!active)}
            className={`${
              active ? "rotate-180" : ""
            } duration-300 mt-1 hover:bg-light w-6 h-6 flex items-center justify-center outline-none rounded-full`}
          >
            <svg
              width="16"
              viewBox="0 0 20 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2L10 10L18 2"
                stroke="#030036"
                strokeOpacity="0.74"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      { modal &&  <ChapterModal textbookId={textbook.id} refresh={getAllChapters} {...{ modal, setModal }} /> }
    </>
  );
}

export default function Textbooks() {
  const location = useLocation();
  const { textbook } = location.state;

  useEffect(() => {}, []);

  return (
    <div>
      <Header title="" variant={true} />
      <div className="px-10">
        <div className="flex mt-7 justify-between pb-20">
          <div className="w-[70%] h-screen">
            <AllChaptersCard textbook={textbook} />
          </div>
        </div>
      </div>
    </div>
  );
}
