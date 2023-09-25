import React from "react";

interface LessonButtonProps {
  text?: string;
  onclick?: () => void;
  top?: string;
  right?: string;
  left?: string;
  bottom?: string;
  altClassName?: string;
  invalid?: boolean
}

interface PrimaryButtonProps {
  text?: string;
  onClick?: () => void;
  variant?: "dash" | "default";
  invalid?: boolean
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text,
  onClick,
  variant,
  invalid
}) => {
  return (
    <div
      className={`w-full bg-[#4F46E5] text-white font-semibold text-base cursor-pointer flex items-center justify-center shadow-2xl  ${
        variant === `dash`
          ? `rounded-[8px]  min-h-[49px]`
          : `rounded-tl-[8px] rounded-tr-[8px] rounded-bl-[8px] py-3  min-h-[57px] shadow-[#4F46E5]`
      } ${invalid ? "opacity-50" : ""}`}
      onClick={invalid? () => false : onClick}
    >
      {text}
    </div>
  );
};

export const LessonButton: React.FC<LessonButtonProps> = ({
  text,
  onclick,
  top,
  right,
  left,
  bottom,
  altClassName,
  invalid,
}) => {
  return (
    <button
      // className={`absolute top-[7px] left-[90px]`}
      className={altClassName || invalid? "invalid-shade text-[#87909EBD] bg-[#FBFBFE] w-full rounded-[8px] p-[21px] text-lg" :  "border font-semibold text-[#4F46E5] border-[#4F46E5] rounded-[8px] w-full h-full text-[white] bg-[#4F46E5] p-[14px] "}
      onClick={invalid? () => false : onclick}
    >
      {text}
    </button>
  );
};
