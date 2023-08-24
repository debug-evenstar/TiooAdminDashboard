import { MouseEventHandler } from "react";
import {FC} from 'react'


export default function Button({ handler, children, className }: { handler?: MouseEventHandler, children: string, className?: string }) {
    return (
        <button onClick={handler} className={`text-white w-[114px] h-[41px] font-[500] rounded-[8px] bg-main ${className}`}>{children}</button>
    )
}

interface BtnProps {
    title: string | JSX.Element;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    capitalizeTitle?: boolean;
    secondary?: boolean;
    disabled?: boolean;
    className?: string;
    altClassName?: string;
    isBusy?: boolean;
  }
export const PrimaryButton:FC<BtnProps> = ( {title,
    onClick,
    capitalizeTitle,
    disabled,
    altClassName,
    isBusy}) => {
  return (
    <div className={disabled? "opacity-75 " : ""}>
      <button className={altClassName || `py-3 lg:text-lg w-full  ${disabled? 'cursor-not-allowed btn-disabled' : 'btn-primary'}`} onClick={onClick ? onClick : undefined} disabled={disabled}>
      {isBusy ? (
          "loading"
        ) : capitalizeTitle ? (
          title
        ) : (
          title
        )}
      </button>
    </div>
  );
}
