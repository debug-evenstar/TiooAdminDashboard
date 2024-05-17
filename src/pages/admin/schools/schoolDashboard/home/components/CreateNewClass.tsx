import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { InputField } from "../../../../../../components/Inputs";
import { PrimaryButton } from "../../../../../../components/Buttons";
import { useSelector } from "react-redux";
import {
  createNewClass,
  updateClassName,
} from "../../../../../../services/authServices";
import { alertActions } from "../../../../../../components/alertActions";
import { configure } from "../../../../../../services/config";
import CenterModal from "../../../../../../components/CenterModal";
import DiscardWarning from "../../../../../../components/DiscardWarning";
import { RadioSelect } from "../../../../../../components/RadioSelectField";

interface EditClassProps {
  close: () => void;
  item?: any;
  didchange: () => void;
}

const CreateNewClass: React.FC<EditClassProps> = ({
  close,
  item,
  didchange,
}) => {
  const [newClassName, setnewClassName] = useState("");
  const [loading, setloading] = useState(false);
  const [haschanged, sethaschanged] = useState(false);
  const [active, setActive] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [showGrade, setShowGrade] = useState(false);

  const userInfo = useSelector((state: any) => state.gods.auth.userInformation);
  const SchoolInfo = useSelector(
    (state: any) => state.gods.school.schoolManagementInfo
  );
  const levels = useSelector((state: any) => state.gods.class.classLevels);
  // check if class name is order with tio naming convention
  const wordList = ["primary", "ss", "jss", "grade", "level"];

  const inputWords = newClassName.split(" "); // Split input into words
  const isWordPresent = inputWords.some((word) =>
    wordList.includes(word.toLowerCase())
  );
  const numberFound = /\d+/.test(newClassName);
  const numberRegex = /\d+/g;

  // Check each extracted number
  const checkNumber = () => {
    // Extract all numbers from the input string
    const numbers = newClassName.match(numberRegex);
    if (numbers) {
      for (const numberStr of numbers) {
        const number = parseInt(numberStr, 10); // Convert the number string to an integer

        if (!isNaN(number) && number >= 1 && number <= 12) {
          return true; // Number is within the desired range
        } else return false;
      }
    } else return true;
  };
  const checkInputInArray = () => {
    if (isWordPresent && numberFound && checkNumber()) {
      return false;
      // alert(`${newClassName} is in the word list!`);
    } else return true;
  };
  // function to pick an equivalent level to the classname entered
  const selectLevel = (id: any) => {
    setSelectedLevel(id);
  };

  const docheckedit = () => {
    if (newClassName) {
      setActive(true);
    } else {
      close();
    }
  };

  const config = configure(userInfo.token);
  const newNameVal = {
    naming: newClassName,
    school_id: SchoolInfo.schoolManagementId,
  };
  const customNameVal = {
    naming: newClassName,
    type: "custome",
    equivalent: selectedLevel,
    school_id: SchoolInfo.schoolManagementId,
  };

  const validate = async () => {
    setloading(true);
    if (!newClassName) {
      alertActions.error("Please enter a class name");
      setloading(false);
      return;
    }
    if (checkInputInArray()) {
      if (!selectedLevel) {
        alertActions.error("Please select an equivalent grading system");
        setShowGrade(true);
        setloading(false);
        return;
      } else {
        try {
          const data = await createNewClass(customNameVal, config);
          if (data.status == 200) {
            setloading(false);
            alertActions.success("New Class created");
            close();
            didchange();
          }
        } catch (error: any) {
          setloading(false);
        }
        return;
      }
    }

    if (!userInfo.token) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }

    try {
      const data = await createNewClass(newNameVal, config);

      if (data.status == 200) {
        setloading(false);
        alertActions.success("New Class created");
        close();
        didchange();
      }
    } catch (error: any) {
      setloading(false);
    }
  };
  return (
    <>
      <div className="">
        <div className="flex w-full items-center justify-between border-b-[1px] py-4 px-[24px]">
          <h3 className="font-medium text-[20px] text-[#030036] opacity-70">
            Add Class
          </h3>
          <div className="cursor-pointer" onClick={docheckedit}>
            <IoMdClose className="text-[22px] text-[#545454]" />
          </div>
        </div>
        <div className="p-[24px] border-b-[1px]">
          <h3 className="font-semibold text-[18px]  text-[#030036] opacity-70 pb-4"></h3>
          <InputField
            type="text"
            label="Class Name"
            placeholder=""
            name="tags"
            variant="white"
            value={newClassName}
            onChange={(e: any) => {
              setnewClassName(e.target.value);
              sethaschanged(true);
            }}
          />
          {showGrade && (
            <div>
              <RadioSelect
                label="Grading convention (Choose a grade that best fits Honey suckle)"
                variant="white"
                data={levels}
                checkedId={selectedLevel}
                onCheckboxChange={selectLevel}
              />
            </div>
          )}
        </div>
        <div className="p-[24px]">
          <PrimaryButton
            text={loading ? "Loading..." : "Save"}
            variant="dash"
            onClick={validate}
            // onClick={checkInputInArray}
            // invalid={true}
          />
        </div>
      </div>
      <CenterModal
        isOpen={active}
        onClose={() => setActive(false)}
        variant={"small"}
      >
        <DiscardWarning handleAction={close} close={() => setActive(false)} />
      </CenterModal>
    </>
  );
};

export default CreateNewClass;
