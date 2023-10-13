import React, { useState } from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import useDisclosure from "../hooks/useDisclosure";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NameAvatar from "./NameAvatar";

interface HeaderProps {
  title?: string;
  variant?: any
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { toggleModal, modalRef, isOpen } = useDisclosure();
  const navigate = useNavigate();

  const schoolname = useSelector((state: any) => state.auth?.userInformation?.school);
  
  const truncateString = (str: string, maxLength: number) => {
    if (str.length <= maxLength) {
      return str;
    }
    return str.slice(0, maxLength) + "...";
  };

  const handlelogout = () => {
    localStorage.clear();
    window.location.assign("https://hellotioo.com/login");
  };

  return (
    <div className="sticky top-0 z-30 shadow border-b bg-white border-[#030036] border-opacity-10 px-6 w-full flex items-center h-[80px]">
      <div className="flex items-center justify-between w-full relative">
        <div className="w-full max-w-[480px] ">
          <h3 className="text-[#030036] opacity-70 text-[20px] font-medium">
            {title}
          </h3>
        </div>
        <div>
          <div
            className="flex items-center cursor-pointer"
            onClick={toggleModal}
          >
            <span className="flex items-center cursor-pointer h-[50px] w-[50px]">
              {/* <img
                src="https://images.squarespace-cdn.com/content/v1/530a77dee4b035db71736c02/1570812709805-UW9CYAKYVXKSTO845HHI/Connecticut+headshots+-+lawyer+headshot+-+Seshu+Badrinath.jpg?format=1000w"
                alt="profile"
                loading="lazy"
                className="h-full w-full rounded-full"
              /> */}
              {schoolname && <NameAvatar name={schoolname}/>}
            </span>
            <div className="flex flex-col items-start ml-3">
              <h3 className="font-inter font-normal text-base text-[#030036]">
                {schoolname && truncateString(schoolname, 17)}
              </h3>
              <p className="text-[#87909E] text-[12px] font-inter font-normal pt-1">
                Update profile
              </p>
            </div>
          </div>
          {isOpen && (
            <span
              ref={modalRef}
              className="block absolute top-[70px] z-10 right-0 bg-white w-[230px] border border-imperial_blue rounded-[8px] shadow-md divide-y divide-gray-100"
            >
              <div className="w-full divide-y-2 divide-gray-100 cursor-pointer">
                <div
                  className="flex items-center px-3 py-2 text-base text-[#030036] opacity-70 hover:bg-gray-100 text-[18px] font-medium font-inter w-full"
                  onClick={() => {
                   
                  }}
                >
                  <MdOutlineAddCircleOutline size={20} className="mr-4" />
                  Add Head Teacher
                </div>
              </div>
              <div className="w-full divide-y-2 divide-gray-100 cursor-pointer">
                <button
                  className="text-[#030036] opacity-70 py-2 px-3 flex items-center hover:bg-red-100 text-base w-full text-[18px] font-medium font-inter"
                  onClick={handlelogout}
                >
                  <RiLogoutCircleRLine size={20} className="mr-4" />
                  Logout
                </button>
              </div>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
