import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { InputField } from "../../../../../components/Inputs";
import { PrimaryButton } from "../../../../../components/Buttons";
import { useSelector } from "react-redux";
import {
  updateClassArmName,
  updateClassName,
} from "../../../../../services/authServices";
import { alertActions } from "../../../../../components/alertActions";
import { configure } from "../../../../../services/config";
import CenterModal from "../../../../../components/CenterModal";
import DiscardWarning from "../../../../../components/DiscardWarning";

interface EditClassProps {
  close: () => void;
  classitems: any;
  didchange: () => void;
}

const EditClassArm: React.FC<EditClassProps> = ({
  close,
  classitems,
  didchange,
}) => {
  const [newClassName, setnewClassName] = useState(classitems.naming);
  const [loading, setloading] = useState(false);
  const [active, setActive] = useState(false);
  const [haschanged, sethaschanged] = useState(false);
  const userInfo = useSelector((state: any) => state.gods.auth.userInformation);
  const config = configure(userInfo.token);

  const newNameVal = {
    naming: newClassName,
  };

  const docheckedit = () => {
    if (haschanged) {
      setActive(true);
    } else {
      close();
    }
  };
  const validate = async () => {
    setloading(true);
    if (!newClassName) {
      alertActions.error("Please enter a value to be renamed");
      setloading(false);
      return;
    }

    if (!userInfo.token) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }

    try {
      const data = await updateClassArmName(classitems.id, newNameVal, config);

      if (data.status == 200) {
        setloading(false);
        alertActions.success("Class Arm Updated successfully");
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
            Edit ClassArm
          </h3>
          <div className="cursor-pointer" onClick={docheckedit}>
            <IoMdClose className="text-[22px] text-[#545454]" />
          </div>
        </div>
        <div className="p-[24px] border-b-[1px]">
          <h3 className="font-semibold text-[18px]  text-[#030036] opacity-70 pb-4">
            {classitems.naming}
          </h3>
          <InputField
            type="text"
            label="New ClassArm  Name"
            placeholder=""
            name="tags"
            variant="white"
            value={newClassName}
            onChange={(e: any) => {
              setnewClassName(e.target.value);
              sethaschanged(true);
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

export default EditClassArm;
