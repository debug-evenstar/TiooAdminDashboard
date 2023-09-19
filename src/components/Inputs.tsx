import React, {
  useRef,
  useState,
  useCallback,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
  FocusEvent,
  useEffect,
} from "react";
import {
  RiEyeLine,
  RiEyeOffLine,
  RiSearchLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { IoMdClose } from "react-icons/io";
import { AiOutlineSend } from "react-icons/ai";

// IMPORT SEPERATE INPUT TYPES AND FIELD TYPES
import { MultiLevelSelect } from "./multiSelectField";
import { SingleLevelSelect } from "./selectField";

type InputFieldProps = {
  label: string;
  placeholder: string;
  name: string;
  required?: boolean;
  type?: string;
  defaultValue?: string;
  // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: any;
  onKeyDown?: any;
  size?: "small" | "default";
  value?: any;
  variant?: "white" | "default";
  errors?: string;
  ref?: any;
  lesson?: boolean;
  labelSub?: string;
};

export const InputField = ({
  label,
  type = "text",
  name,
  placeholder,
  onChange,
  value,
  variant,
  errors,
  ref,
  lesson,
  labelSub
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const freelancer =
    '<span>Institution Name<span className = "text-[red]">(Optional)</span></span>';
  return (
    <div className={` ${variant === `white` ? `` : `mb-4 mt-2`}`}>
      <label
        className={`${lesson? 'text-[16px]' : 'text-sm font-medium'} ${
          variant === `white`
            ? `font-normal text-[#87909E] text-base`
            : `text-sm font-medium text-[#4A5568]`
        }`}
      >
        {label === "Institution Name (Optional)" ? (
          <span>
            Institution Name<span className="text-[red]"> (Optional)</span>
          </span>
        ) : (
          <span>
            {label}
            {labelSub && <span className="text-sm text-[#87909E] pl-2">({labelSub})</span>}
            {!lesson && <span className="text-[red]">*</span>}
          </span>
        )}
      </label>
      <div className="relative mt-2 flex items-center">
        <input
          type={showPassword ? "text" : type}
          id={label}
          value={value}
          name={name}
          ref={ref}
          onChange={onChange}
          placeholder={placeholder}
          className={`appearance-none  border font-inter  rounded w-full px-3   text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3 ${
            variant === `white`
              ? `bg-white rounded-[8px] border-black border-opacity-20 shadow py-2 h-[40px] text-base`
              : `bg-[#F6F5FF] rounded-tl-[4px] rounded-tr-[4px] rounded-bl-[4px] border-[#DA70D6] border-opacity-30 py-4 text-[12px]`
          }`}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute top-0 right-0 mt-4 mr-3"
            onClick={handleTogglePassword}
          >
            {showPassword ? (
              <RiEyeLine className="text-lg" />
            ) : (
              <RiEyeOffLine className="text-lg" />
            )}
          </button>
        )}
      </div>
      <span className="text-red-600 font-medium">{errors}</span>
    </div>
  );
};

type PhoneInputFieldProps = {
  label: string;
  placeholder: string;
  required?: boolean;
  type?: string;
  defaultValue?: string;
  onChange?: any;
  // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: "small" | "default";
  value?: any;
};

export const PhoneInputField = ({
  label,
  type = "text",
  placeholder,
  onChange,
  value,
}: PhoneInputFieldProps) => {
  return (
    <div className="w-full mb-4">
      <div>
        <label className="text-sm font-medium">
          {label} <span className=" text-[red]"> *</span>
        </label>
        <div className="mt-[10px]">
          <PhoneInput
            dropdownStyle={{ zIndex: 100 }}
            inputStyle={{
              fontStyle: "normal",
              fontWeight: "normal",
              fontSize: "12px",
              lineHeight: "24px",
              color: "#707070",
              height: "50px",
              border: "1px solid rgba(218, 112, 214, 0.3)",
              boxSizing: "border-box",
              borderRadius: "4px 4px 4px 4px",
              paddingLeft: "80px",
              width: "100%",
              background: "#F6F5FF",
            }}
            placeholder={placeholder}
            buttonStyle={{
              fontStyle: "normal",
              fontWeight: "normal",
              fontSize: "12px",
              lineHeight: "24px",
              height: "50px",
              background: "#F6F5FF",
              padding: "0px 16px 0px 16px",
              border: "1px solid rgba(218, 112, 214, 0.3)",
              boxSizing: "border-box",
              borderRadius: "4px 0px 0px 4px",
            }}
            country={"ng"}
            value={value}
            // onChange={() => {}}
            onChange={onChange}
            disableDropdown
            // enableSearch
          />
        </div>
      </div>
    </div>
  );
};

interface OtpBoxProps {
  numDigits: number;
  onComplete: (otp: string) => void;
}

export const OtpBox: React.FC<OtpBoxProps> = ({ numDigits, onComplete }) => {
  const [otp, setOtp] = useState<string[]>(Array(numDigits).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Update the refs when numDigits changes
  useCallback(() => {
    inputRefs.current = inputRefs.current.slice(0, numDigits);
  }, [numDigits])();

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (isNaN(Number(value))) {
      return;
    }

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value !== "" && index < numDigits - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (updatedOtp.every((digit) => digit !== "")) {
      onComplete(updatedOtp.join(""));
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index === 0) {
        return;
      }
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("text/plain");
    const otpArray = pasteData.trim().slice(0, numDigits).split("");

    const updatedOtp = [...otp];
    otpArray.forEach((digit, index) => {
      updatedOtp[index] = digit;
    });

    setOtp(updatedOtp);
    onComplete(updatedOtp.join(""));
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const renderOtpInputs = () => {
    const inputs = [];
    for (let i = 0; i < numDigits; i++) {
      inputs.push(
        <input
          key={i}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={otp[i]}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          onFocus={handleFocus}
          ref={(ref) => (inputRefs.current[i] = ref as HTMLInputElement)}
          className="w-[72px] h-[66px] rounded-[4px] bg-[#EDEDED] focus:bg-white mx-[12px] flex items-center justify-center px-7 text-[22px] font-extrabold focus:outline-none focus:border focus:border-[#4F46E5] font-inter"
        />
      );
    }
    return inputs;
  };

  return (
    <div className="flex w-full items-center justify-center mt-[60px]">
      {renderOtpInputs()}
    </div>
  );
};

type CheckBoxProps = {
  name: string;
  required?: boolean;
  type?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: "small" | "default";
  value?: any;
  isChecked?: any;
  ref?: any;
};

export const CheckBox = ({
  name,
  onChange,
  value,
  isChecked,
  ref,
}: CheckBoxProps) => {
  return (
    <div className="w-full mb-4">
      <input
        type="checkbox"
        className="h-[15px] border border-[#4C34C2] rounded-[4px] w-[15px] form-checkbox "
        name={name}
        onChange={onChange}
        // checked={isChecked}
      />
    </div>
  );
};

type TagsInputFieldProps = {
  label?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  type?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: "small" | "large";
  value?: any;
  onTagsChange?: (tags: string[]) => void;
  values: React.Dispatch<React.SetStateAction<any>>;
  setAllTags?: any;
};

export const TagsInputField: React.FC<TagsInputFieldProps> = ({
  onTagsChange,
  label,
  size,
  type,
  values,
  setAllTags
}) => {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleTagInput = (event: ChangeEvent<HTMLInputElement>) => {
    const getText = event.target.value;
    setTagInput(getText)
    setIsTyping(true);
      setAllTags(getText);
  };

  const addEmail = () => {
    if (tagInput) {
      const emails = [...tags, tagInput];
      setTags(emails);
      values(emails);
      setTagInput("");
      console.log(tags);
   

      setIsTyping(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && tagInput.trim() !== "") {
      event.preventDefault();

      const trimmedTag = tagInput.trim();

      if (tags.includes(trimmedTag)) {
        // Tag already exists, handle validation error
        return;
      }

      const newTags = [...tags, trimmedTag];
      setTags(newTags);
      setTagInput("");
      setIsTyping(false);

      if (onTagsChange) {
        onTagsChange(newTags);
      }
    }
  };

  const removeTag = (tag: string) => {
    const updatedTags = tags?.filter((t) => t !== tag);
    setTags(updatedTags);

    if (onTagsChange) {
      onTagsChange(updatedTags);
    }
  };

  return (
    <div>
      <label className={`font-normal text-[#87909E] text-base`}>{label}*</label>
      {isTyping && (
        <p className="py-2 text-sm font-normal text-[#EE712B]">
          Press <span className="font-semibold">ENTER KEY</span> after typing
          the {type === "email" ? "Email" : "class arm"}
        </p>
      )}
      <div className="relative mt-2 flex items-center border-black border-opacity-20 shadow  border bg-white rounded-[8px] px-3 h-[40px]">
        <input
          type="text"
          value={tagInput}
          onChange={handleTagInput}
          onKeyDown={handleKeyDown}
          className="bg-white  py-2 text-base appearance-none  w-full    text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-inter"
        />
        {isTyping && (
          <div style={{ cursor: "pointer" }}>
            <AiOutlineSend
              className="text-black text-[23px]"
              onClick={addEmail}
            />
          </div>
        )}
      </div>
      <ul className="mt-3 w-full grid grid-cols-2 gap-3">
        {tags?.map((tag, index) => {
          const truncateString = (str: string, maxLength: number) => {
            if (str.length <= maxLength) {
              return str;
            }
            return str.slice(0, maxLength) + "...";
          };

          return (
            <li
              key={index}
              className="py-2 px-3 border border-[#4F46E5] flex items-center justify-between rounded-[24px] bg-[#4F46E5] bg-opacity-5 max-h-[40px] text-[11px] font-semibold text-[#4F46E5]"
              title={tag}
            >
              {truncateString(tag, 15)}
              <div
                className="cursor-pointer"
                onClick={() => removeTag(tag)}
                style={{ cursor: "pointer" }}
              >
                <IoMdClose className="text-[16px] text-[#4F46E5]" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

type TextAreaFieldProps = {
  label?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  type?: string;
  defaultValue?: string;
  // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: any;
  size?: "small" | "default";
  value?: any;
  variant?: "white" | "default";
};

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  variant,
  onChange,
  value,
}) => {
  return (
    <div className="py-4 ">
      <label
        className={`text-sm font-medium ${
          variant === `white`
            ? `font-normal text-[#87909E] text-base`
            : `text-sm font-medium text-[#4A5568]`
        }`}
      >
        {label}*
      </label>
      <div className=" w-full mt-2 rounded-[8px] border border-black border-opacity-20 shadow overflow-hidden h-[112px]">
        <textarea
          value={value}
          onChange={onChange}
          className="w-full focus:outline-none h-full text-[15px] font-inter p-2"
        ></textarea>
      </div>
    </div>
  );
};

export const MultiSelectField = MultiLevelSelect;

export const SelectField = SingleLevelSelect;

type OptionFieldProps = {
  label?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  type?: string;
  defaultValue?: string;
  onCheckboxChange?: any;
  size?: "small" | "default";
  value?: any;
  variant?: "white" | "default";
  data?: any;
  onSelectedDataChange?: any;
  checkedId?: any;
};
export const OptionField: React.FC<OptionFieldProps> = ({
  label,
  variant,
  data,
  checkedId,
  onCheckboxChange,
}) => {
  return (
    <div className="pt-4 ">
      <label
        className={`text-sm font-medium ${
          variant === `white`
            ? `font-normal text-[#87909E] text-base`
            : `text-sm font-medium text-[#4A5568]`
        }`}
      >
        {label}
      </label>
      <div className="py-2 flex items-center">
        {data?.map((item: any, index: any) => (
          <div key={index} className="flex items-center pl-8 first:pl-0">
            <input
              type="checkbox"
              className="h-[15px] w-[15px]"
              checked={checkedId.name === item.name}
              onChange={() => onCheckboxChange(item)}
            />
            <h3 className="text-[#87909E] opacity-70 text-[14px] font-normal pl-2">
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

type DateFieldProps = {
  label?: string;
  placeholder?: string;
  variant?: "white" | "default";
};
export const DateField: React.FC<DateFieldProps> = ({ label, variant }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"start" | "end">("start");

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  React.useEffect(() => {
    setCurrentYear(selectedDate.getFullYear());
    setCurrentMonth(selectedDate.getMonth());
  }, [selectedDate]);

  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleDateClick = (day: Date) => {
    if (mode === "start") {
      setStartDate(day);
      setEndDate(null);
      setMode("end");
    } else {
      if (day >= startDate!) {
        setEndDate(day);
      } else {
        setEndDate(startDate);
        setStartDate(day);
      }
      setMode("start");
    }
  };

  const renderCalendar = () => {
    const calendarDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        i
      );
      const isCurrentMonth = selectedDate.getMonth() === currentMonth;
      const isSelected =
        startDate !== null &&
        endDate !== null &&
        date >= startDate &&
        date <= endDate;
      const isStartOrEnd =
        startDate !== null &&
        endDate !== null &&
        (date.getTime() === startDate?.getTime() ||
          date.getTime() === endDate?.getTime());

      calendarDays.push(
        <div
          key={i}
          onClick={() => isCurrentMonth && handleDateClick(date)}
          className={`calendar-day ${!isCurrentMonth ? "other-month" : ""} ${
            isSelected ? "selected" : ""
          } ${isStartOrEnd ? "start-end" : ""}`}
        >
          {i}
        </div>
      );
    }

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.unshift(
        <div key={`empty-${i}`} className="empty-day"></div>
      );
    }

    return calendarDays;
  };

  const prevMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1)
    );
  };
  return (
    <div className="pt-4">
      <label
        className={`text-sm font-medium ${
          variant === `white`
            ? `font-normal text-[#87909E] text-base`
            : `text-sm font-medium text-[#4A5568]`
        }`}
      >
        {label}
      </label>
      <div
        className=" w-full mt-2 rounded-[8px] border border-black cursor-pointer border-opacity-20 shadow overflow-hidden h-[40px] px-3 flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-[14px]">June 12-16</h3>
        {isOpen ? (
          <FaAngleUp className="text-[20px] text-black opacity-50" />
        ) : (
          <FaAngleDown className="text-[20px] text-black opacity-50" />
        )}
      </div>
      {isOpen && (
        <div className="mt-[5px] w-full border border-black border-opacity-20 shadow-md p-4 rounded-[8px]">
          <div className="w-full flex items-center justify-between">
            <h3 className="text-[14px] font-normal">
              {" "}
              {monthNames[currentMonth]}, {currentYear}{" "}
            </h3>
            <div className="flex items-center">
              <div className="pr-1 cursor-pointer" onClick={prevMonth}>
                <RiArrowLeftSLine className="text-[20px] text-[#202020]" />
              </div>
              <div className="cursor-pointer" onClick={nextMonth}>
                <RiArrowRightSLine className="text-[20px] text-[#202020]" />
              </div>
            </div>
          </div>

          <div className="calendar-dropdown mt-4">
            <div className="calendar-days">
              {daysOfWeek.map((day, index) => (
                <div key={index} className="font-normal text-[14px]">
                  {day}
                </div>
              ))}
              {renderCalendar()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
