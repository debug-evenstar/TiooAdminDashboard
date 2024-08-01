import React, { FC } from "react";
import { SuccessCheck } from "@/components/AlertCheck";
import { PrimaryButton } from "@/components/Buttons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface Props {
  id: any;
}
const ThirdUpload: FC<Props> = ({ id }) => {
  const subjectId = useSelector((state: any) => state.gods.lesson.uploadClass.id);
  const navigate = useNavigate();
  const navToLesson = () => {
    navigate(`/lessons/${id}/${subjectId}`);
  };
  return (
    <>
      <div className="h-[370px] flex items-center justify-center">
        <div className="text-center w-10/12">
          <SuccessCheck />
          <p className="text-lg">Lessons uploaded successfully</p>
          <p className="mt-6 text-[#6C7C8C] text-[14px]">
            You lessons has been uploaded successfully and is undergoing review.
            Please check back in 24 hours
          </p>
          <div className="mt-4">
            <PrimaryButton text="Continue" onClick={navToLesson} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ThirdUpload;
