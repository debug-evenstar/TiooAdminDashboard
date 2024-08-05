import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import {
  InputField,
  TagsInputField,
} from "@/components/Inputs";
import { PrimaryButton } from "@/components/Buttons";
import {
  generateInviteStudent,
  inviteStudent,
} from "@/services/authServices";
import { configure } from "@/services/config";
import { alertActions } from "@/components/alertActions";
import CenterModal from "@/components/CenterModal";
import DiscardWarning from "@/components/DiscardWarning";
import { inviteBulkStudents, inviteStudents } from "@/api";
import { RadioSelect } from "@/components/RadioSelectField";

interface InviteStudentsProps {
  close: () => void;
  item: any;
}

const InviteStudents: React.FC<InviteStudentsProps> = ({ close, item }) => {
  const [showLink, setShowLink] = useState(true);
  const [invlink, setinvlink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setloading] = useState(false);
  const [haschanged, sethaschanged] = useState(false);
  const [active, setActive] = useState(false);

  const [stdname, setStdname] = useState("");
  const [selectedmail, setSelecetedMail] = useState<any>([]);
  const [armselect, setarmSelect] = useState<any>();
  const token = useSelector((state: any) => state.gods.auth.token);
  const school = useSelector(
    (state: any) => state.gods.school.schoolManagementInfo
  );
  const school2 = JSON.parse(
    localStorage.getItem("SchoolManagement") || "{}"
  ).schoolInfo;
  const config = configure(token);
  const [allTags, setAllTags] = useState([]);

  const handleTagsChange = async (tags: string[]) => {
    // Handle the changed tags here
    const allEmails = tags;
    setSelecetedMail(allEmails);
  };

  const selectedChange = (id: any[]) => {
    setarmSelect(id);
    id.length > 0 && sethaschanged(true);
  };
  useEffect(() => {
    if (armselect) {
      handleInvitelink();
    }
  }, [armselect]);

  const docheckedit = () => {
    if (armselect) {
      setActive(true);
    } else {
      close();
    }
  };

  const handleInvitelink = async () => {
    const linkObj = {
      arm: armselect,
      schoolId: school.schoolManagementId
        ? school.schoolManagementId
        : school2.schoolManagementId,
    };

    const generate = await generateInviteStudent(linkObj, config);
    setinvlink(generate?.data?.data?.link);
  };

  const textToCopy = invlink;
  const handleCopyButtonClick = () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true);
      })
      .catch((error) => {
        setCopied(false);
      });
  };

  const doInvite = async () => {
    setloading(true);
    const merged = selectedmail.includes(allTags)
      ? selectedmail
      : [...selectedmail, allTags];
    const studentObj = {
      name: stdname,
      email: merged.length > 1 ? merged : merged[0],
      arm: armselect,
      schoolId: school.schoolManagementId
        ? school.schoolManagementId
        : school2.schoolManagementId,
    };

    try {
      const studentInvite =
        merged.length > 1
          ? await inviteBulkStudents(studentObj)
          : await inviteStudents(studentObj).then((res: any) => {
              if (!res.error) {
                alertActions.success("Student invite sent successfully");
                setloading(false);
                close();
              }
            });

      if (studentInvite.status == 200) {
        alertActions.success("Student invite sent successfully");
        setloading(false);
        close();
      } else {
        // console.log(studentInvite.data)
      }
    } catch (error: any) {
      setloading(false);
      alertActions.error(error?.response?.data?.message || "");
    }
  };
  return (
    <>
      <div className="">
        <div className="flex w-full items-center justify-between border-b-[1px] py-4 px-[24px]">
          <h3 className="font-medium text-[20px] text-[#030036] opacity-70">
            Invite Students
          </h3>
          <div className="cursor-pointer" onClick={docheckedit}>
            <IoMdClose className="text-[22px] text-[#545454]" />
          </div>
        </div>
        <div className="p-[24px] border-b-[1px] h-[380px] overflow-y-auto scrollbar-track-blue-200 scrollbar-thumb-blue-500 multi-scrol">
          <InputField
            type="text"
            label="Full Name (Optional)"
            placeholder=""
            name="fullname"
            variant="white"
            value={stdname}
            onChange={(e: any) => {
              setStdname(e.target.value);
              sethaschanged(true);
            }}
          />
          <RadioSelect
            label="Select Class"
            variant="white"
            data={item.ClassArms}
            checkedId={armselect}
            onCheckboxChange={selectedChange}
          />
          {/* <ClassArmSelectField
            label="Class Arm"
            variant="white"
            data={item.ClassArms}
            multiple={false}
            onSelectedDataChange={selectedChange}
          /> */}
          <TagsInputField
            onTagsChange={handleTagsChange}
            label="Email "
            name="email"
            size="large"
            type="email"
            values={setSelecetedMail}
            setAllTags={setAllTags}
          />
        </div>
        <div className="p-[24px]">
          <PrimaryButton
            text={loading ? "Inviting..." : "Invite"}
            variant="dash"
            onClick={doInvite}
          />
          {showLink && (
            <div className="w-full pt-4 ">
              <h3 className="text-[#030036] opacity-70 text-base font-normal underline">
                Students can also join with the class link
              </h3>
              <div className="rounded-[8px] border-[2px] border-[#E3E2FF] px-[20px] py-2 mt-2 flex items-center w-full justify-between">
                <h4 className="text-[#030036] overflow-x-auto opacity-70 text-base font-medium">
                  {textToCopy}
                </h4>
                {copied ? (
                  <div
                    className="text-green-400 cursor-pointer text-[12px] font-medium"
                    onClick={handleCopyButtonClick}
                  >
                    Copied
                  </div>
                ) : (
                  <div
                    className="text-[#4F46E5] cursor-pointer text-[12px] font-medium"
                    onClick={handleCopyButtonClick}
                  >
                    Copy link
                  </div>
                )}
              </div>
            </div>
          )}
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

export default InviteStudents;
