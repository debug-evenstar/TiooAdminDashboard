import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import {
  InputField,
  TextAreaField,
  MultiSelectField,
} from "@/components/Inputs";
import { PrimaryButton } from "@/components/Buttons";
import { useSelector } from "react-redux";
import { createSubject } from "@/services/authServices";
import { alertActions } from "@/components/alertActions";
import { configure } from "@/services/config";
import { parseDataForMultiSelect } from "@/components/multiSelectField";
import CenterModal from "@/components/CenterModal";
import DiscardWarning from "@/components/DiscardWarning";

interface SubjectModalProps {
  close: () => void;
  didchange: () => void;
}

const SubjectModal: React.FC<SubjectModalProps> = ({
  close,
  didchange,
}) => {
  const classInfo = useSelector(
    (state: any) => state.gods.class.classInformation
  );
  const schoolManagementInfo = useSelector(
    (state: any) => state.gods.school.schoolManagementInfo
  );
  const userInfo = useSelector((state: any) => state.gods.auth.userInformation);
  const [newclassName, setnewclassName] = useState("");
  const [newclassdesc, setnewclassdesc] = useState("");
  const [loading, setloading] = useState(false);
  const [classarr, setclassarr] = useState<any>([]);
  const [classArmarr, setclassArmarr] = useState<any>([]);
  const [haschanged, sethaschanged] = useState(false);
  const [active, setActive] = useState(false);

  //FOR THE DROPDOWN
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedClassArms, setSelectedClassArms] = useState<string[]>([]);

  const handleSelectedDataChange = (data1: any, data2: any) => {
    setclassarr(data1);
    setclassArmarr(data2);
  };

  const parsedClassInfo = parseDataForMultiSelect(
    classInfo,
    ["naming", "naming"],
    ["ClassArms"]
  );

  const docheckedit = () => {
    if (haschanged) {
      setActive(true);
    } else {
      close();
    }
  };
  const config = configure(userInfo.token);
  const datav = {
    naming: newclassName,
    class: classarr.map((el: any) => Number(el)),
    classArm: classArmarr.map((el: any) => Number(el)),
    description: newclassdesc,
    SchoolManagementId: schoolManagementInfo.schoolManagementId,
  };

  const validate = async () => {
    setloading(true);
    if (!newclassName || !newclassdesc) {
      setloading(false);
      alertActions.error(
        "Please ensure subject name and description are filled"
      );
      return;
    }

    try {
      const data = await createSubject(datav, config);
      if (data.status == 200) {
        alertActions.success("Subject Created successfully");
        setloading(false);
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
            Add Subjects
          </h3>
          <div className="cursor-pointer" onClick={docheckedit}>
            <IoMdClose className="text-[22px] text-[#545454]" />
          </div>
        </div>
        <div className="p-[24px] border-b-[1px] h-[400px] overflow-y-auto scrollbar-track-blue-200 scrollbar-thumb-blue-500 multi-scrol">
          <InputField
            type="text"
            label="Subject Title"
            placeholder=""
            name="tags"
            variant="white"
            value={newclassName}
            onChange={(e: any) => {
              setnewclassName(e.target.value);
              sethaschanged(true);
            }}
          />
          <MultiSelectField
            label="Classes"
            variant="white"
            data={parsedClassInfo}
            onSelectedDataChange={handleSelectedDataChange}
          />
          <TextAreaField
            variant="white"
            label="Subject Description"
            value={newclassdesc}
            onChange={(e: any) => {
              setnewclassdesc(e.target.value);
            }}
          />
        </div>
        <div className="p-[24px]">
          <PrimaryButton
            text={loading ? "Loading..." : "Save"}
            variant="dash"
            onClick={validate}
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

export default SubjectModal;
