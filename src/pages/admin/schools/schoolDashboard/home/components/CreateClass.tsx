import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { IoMdClose } from "react-icons/io";
import { TagsInputField } from "../../../../../../components/Inputs";
import { PrimaryButton } from "../../../../../../components/Buttons";
import { createClassArm } from "../../../../../../services/authServices";
import { alertActions } from "../../../../../../components/alertActions";
import { useSelector } from "react-redux";
import { configure } from "../../../../../../services/config";
import CenterModal from "../../../../../../components/CenterModal";
import DiscardWarning from "../../../../../../components/DiscardWarning";

interface CreateClassProps {
  close: () => void;
  item: any;
  didchange: () => void;
}

const CreateClass: React.FC<CreateClassProps> = ({
  close,
  item,
  didchange,
}) => {
  const [classarmtag, setclassarmtag] = useState<string[]>([]);
  const [loading, setloading] = useState(false);
  const [haschanged, sethaschanged] = useState(false);
  const [active, setActive] = useState(false);

  const userInfo = useSelector((state: any) => state.gods.auth.userInformation);
  const [allTags, setAllTags] = useState("");
  const handleTagsChange = (tags: string[]) => {
    const allT = tags;
    setclassarmtag(allT);
    sethaschanged(true);
    // Handle the changed tags here
  };
  // const config = {
  //   headers: { Authorization: "Bearer " + userInfo.token },
  // };

  const docheckedit = () => {
    if (!!classarmtag) {
      setActive(true);
    } else {
      close();
    }
  };

  const config = configure(userInfo.token);
  const merged = classarmtag.includes(allTags)
    ? classarmtag
    : [...classarmtag, allTags];

  const classArmObj = {
    classId: item.id,
    arms: merged,
  };

  const doCreateClassArm = async () => {
    setloading(true);
    if (merged.length < 1) {
      alertActions.error("Please set class arm name and hit enter button");
      setloading(false);
      return;
    }
    if (!userInfo.token) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }

    try {
      const data = await createClassArm(classArmObj, config);

      if (data.status === 200) {
        alertActions.success("Class Arms Created successfully");
        setloading(false);
        close();
        didchange();
        docheckedit();
      }
    } catch (error: any) {
      setloading(false);
      console.log(error);
    }
  };

  return (
    <>
      <div className="">
        <div className="flex w-full items-center justify-between border-b-[1px] py-4 px-[24px]">
          <h3 className="font-medium text-[20px] text-[#030036] opacity-70">
            Create Class Arms
          </h3>
          <div className="cursor-pointer" onClick={docheckedit}>
            <IoMdClose className="text-[22px] text-[#545454]" />
          </div>
        </div>
        <div className="p-[24px] border-b-[1px]">
          <h3 className="font-semibold text-[18px]  text-[#030036] opacity-70 pb-4">
            {item.naming}
          </h3>
          <TagsInputField
            onTagsChange={handleTagsChange}
            label="Class Arm(You can add multiples arms) "
            name="tags"
            values={setclassarmtag}
            setAllTags={setAllTags}
          />
        </div>
        <div className="p-[24px]">
          <PrimaryButton
            text={loading ? "Creating Class arm" : "Save"}
            variant="dash"
            onClick={doCreateClassArm}
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

export default CreateClass;
