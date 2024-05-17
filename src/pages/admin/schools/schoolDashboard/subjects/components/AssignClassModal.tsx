import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { PrimaryButton } from "../../../../../../components/Buttons";
import { useSelector } from "react-redux";
import { alertActions } from "../../../../../../components/alertActions";
import CenterModal from "../../../../../../components/CenterModal";
import DiscardWarning from "../../../../../../components/DiscardWarning";
import {
  MultiLevelSelect,
  parseDataForMultiSelect,
} from "../../../../../../components/multiSelectField";
import { assignClassToSubject } from "../../../../../../api";

interface AssignclasssModalProps {
  close: () => void;
  item: any;
  didchange: () => void;
}

const AssignClassModal: React.FC<AssignclasssModalProps> = ({
  close,
  item,
  didchange,
}) => {
  const [classdata, setClassdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [haschanged, sethaschanged] = useState(false);
  const [active, setActive] = useState(false);

  const [classarr, setclassarr] = useState<any>([]);
  const [classArmarr, setclassArmarr] = useState<any>([]);
  const allclassData = useSelector(
    (state: any) => state.gods.class.classInformation
  );

  const parsedClassInfo = parseDataForMultiSelect(
    allclassData,
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

  const handleSelectedDataChange = (data1: any, data2: any) => {
    setclassarr(data1);
    setclassArmarr(data2);
  };

  //bind class to subject
  const handleBindClass = async () => {
    setloading(true);
    const bindObj = {
      classes: classarr,
      subjectId: item.id,
      classArms: classArmarr,
    };
    assignClassToSubject(bindObj)
      .then((res) => {
        setloading(false);
        alertActions.success("Classes Successfully Assigned");
        didchange();
        docheckedit();
      })
      .catch((error) => {
        setloading(false);
        alertActions.error(error?.message);
      });
  };

  return (
    <>
      <div className="">
        <div className="flex w-full items-center justify-between border-b-[1px] py-4 px-[24px]">
          <h3 className="font-medium text-[20px] text-[#030036] opacity-70">
            Assign Class
          </h3>
          <div className="cursor-pointer" onClick={docheckedit}>
            <IoMdClose className="text-[22px] text-[#545454]" />
          </div>
        </div>
        <div className="p-[24px] border-b-[1px]">
          <MultiLevelSelect
            label="Classes"
            variant="white"
            data={parsedClassInfo}
            onSelectedDataChange={handleSelectedDataChange}
          />
        </div>
        <div className="p-[24px]">
          <PrimaryButton
            text={loading ? "Saving..." : "Save"}
            variant="dash"
            onClick={handleBindClass}
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

export default AssignClassModal;
