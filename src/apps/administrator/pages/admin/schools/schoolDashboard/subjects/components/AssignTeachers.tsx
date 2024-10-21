import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { PrimaryButton } from "@/components/Buttons";
import { ClassArmSelectField } from "@/components/ClassArmselect";
import { useSelector } from "react-redux";
import { configure } from "@/services/config";
import { bindSubject___Teacher } from "@/services/authServices";
import { alertActions } from "@/components/alertActions";
import CenterModal from "@/components/CenterModal";
import DiscardWarning from "@/components/DiscardWarning";

interface AssignTeachersModalProps {
  close: () => void;
  item: any;
  didchange: () => void;
}

const AssignTeachersModal: React.FC<AssignTeachersModalProps> = ({
  close,
  item,
  didchange,
}) => {
  const [teacherdata, setteacherdata] = useState([]);
  const [selected, setselected] = useState([]);
  const [loading, setloading] = useState(false);
  const [haschanged, sethaschanged] = useState(false);
  const [active, setActive] = useState(false);

  const [token, settoken] = useState<any>("");

  const allclassData = useSelector(
    (state: any) => state.gods.school.classInformation
  );

  const teacherInfo = useSelector(
    (state: any) => state.gods.school.teachersInfo
  );
  useEffect(() => {
    settoken(localStorage.getItem("token"));
    setteacherdata(teacherInfo);
  }, []);

  const handleSelectedDataChange = (
    selectedClasses: string[],
    selectedSubNames: string[]
  ) => {
    // You can perform any additional logic or dispatch an action with the selected data here
  };
  const docheckedit = () => {
    if (haschanged) {
      setActive(true);
    } else {
      close();
    }
  };
  const handleSubData = (data: any) => {
    setselected(data);
    if (data?.length > 0) {
      sethaschanged(true);
    }
  };
  const handlebind = async () => {
    setloading(true);

    const config = configure(token);

    const bindObj = {
      teacher: selected,
      subject: item.id,
    };
    try {
      const bind = await bindSubject___Teacher(bindObj, config);
      if (bind.status == 200) {
        alertActions.success("Teacher assigned to subject successfully");
        close();
        didchange();
        setloading(false);
      }
    } catch (error) {
      setloading(false);
    }
  };

  return (
    <>
      <div className="">
        <div className="flex w-full items-center justify-between border-b-[1px] py-4 px-[24px]">
          <h3 className="font-medium text-[20px] text-[#030036] opacity-70">
            Assign Teacher
          </h3>
          <div className="cursor-pointer" onClick={docheckedit}>
            <IoMdClose className="text-[22px] text-[#545454]" />
          </div>
        </div>
        <div className="p-[24px] border-b-[1px]">
          {/* <InputField
          type="text"
          label="Subject Teacher"
          placeholder=""
          name="tags"
          variant="white"
        /> */}
          {/* <SelectField
          label="Subject Teacher"
          variant="white"
          data={teachersData}
        /> */}
          <ClassArmSelectField
            label="Subject Teacher"
            variant="white"
            data={teacherdata?.map((el: any) => ({
              id: el.Account.id,
              naming: el.Account.name,
            }))}
            onSelectedDataChange={handleSubData}
          />
          {/* <TextAreaField variant="white" label="Subject Description (optional)" /> */}
        </div>
        <div className="p-[24px]">
          <PrimaryButton
            text={loading ? "loading..." : "Save"}
            variant="dash"
            onClick={handlebind}
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

export default AssignTeachersModal;
