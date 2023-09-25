import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import {
  InputField,
  TextAreaField,
  MultiSelectField,
} from "../../../../../components/Inputs";
import { useSelector } from "react-redux";
import { PrimaryButton } from "../../../../../components/Buttons";
import { classData } from "../../../../../data/data";
import { updateSubjects } from "../../../../../services/authServices";
import { alertActions } from "../../../../../components/alertActions";
import { configure } from "../../../../../services/config";
import { parseDataForMultiSelect } from "../../../../../components/multiSelectField";
import CenterModal from "../../../../../components/CenterModal";
import DiscardWarning from "../../../../../components/DiscardWarning";

interface EditSubjectModalProps {
  close: () => void;
  item: any;
  didchange: () => void;
}

const EditSubjectModal: React.FC<EditSubjectModalProps> = ({
  close,
  item,
  didchange,
}) => {
  const [sdescription, setsdescription] = useState(item.description);
  const [naming, setnaming] = useState(item.naming);
  const [loading, setloading] = useState(false);
  const [classarr, setclassarr] = useState<any>([]);
  const [classArmarr, setclassArmarr] = useState([]);
  const [haschanged, sethaschanged] = useState(false);
  const [active, setActive] = useState(false);

  const classInfo = useSelector((state: any) => state.gods.class.classInformation);
  const SchoolInfo = useSelector(
    (state: any) => state.gods.school.schoolManagementInfo
  );
  const userInfo = useSelector((state: any) => state.gods.auth.userInformation);
  const handleSelectedDataChange = (data1: any, data2: any) => {
    setclassarr(data1);
    setclassArmarr(data2);
  };
  console.log(item);
  console.log(item.description);
  const parsedClassInfo = parseDataForMultiSelect(
    classInfo,
    ["naming", "naming"],
    ["ClassArms"]
  );
  const config = configure(userInfo.token);

  const docheckedit = () => {
    if (haschanged) {
      setActive(true);
    } else {
      close();
    }
  };
  const handleEdit = async () => {
    setloading(true);
    // check if taken is lost in reduc then use token from local storage
    if (!userInfo.token) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }

    //subject to be modified Object
    const subjectObjEdit = {
      subjectId: item.id,
      naming: naming,
      description: sdescription,
      SchoolManagementId: SchoolInfo.schoolManagementId,
    };
    try {
      const update = await updateSubjects(subjectObjEdit, config);

      if (update.status == 200) {
        alertActions.success("Subject updated successfully");
        setloading(false);
        close();
        didchange();
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
            Edit Subject
          </h3>
          <div className="cursor-pointer" onClick={docheckedit}>
            <IoMdClose className="text-[22px] text-[#545454]" />
          </div>
        </div>
        <div className="p-[24px] border-b-[1px]">
          <InputField
            type="text"
            label="Subject Title"
            placeholder=""
            name="tags"
            variant="white"
            value={naming}
            onChange={(e: any) => {
              setnaming(e.target.value);
              sethaschanged(true);
            }}
          />
          {/* <MultiSelectField
          label="Subject Class"
          variant="white"
          data={parsedClassInfo}
          onSelectedDataChange={handleSelectedDataChange}
        /> */}
          <TextAreaField
            variant="white"
            label="Subject Description (optional)"
            value={sdescription}
            onChange={(e: any) => {
              setsdescription(e.target.value);
              sethaschanged(true);
            }}
          />
        </div>
        <div className="p-[24px]">
          <PrimaryButton
            text={loading ? "Saving..." : "Save"}
            variant="dash"
            onClick={handleEdit}
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

export default EditSubjectModal;
