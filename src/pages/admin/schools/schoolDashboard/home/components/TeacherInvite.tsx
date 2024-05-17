import React, { FC, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import {
  InputField,
  TagsInputField,
} from "../../../../../../components/Inputs";
import { PrimaryButton } from "../../../../../../components/Buttons";
import {
  generateInviteStudent,
  teacherInviteStudents,
} from "../../../../../../services/authServices";
import { useSelector } from "react-redux";
import { configure } from "../../../../../../services/config";
import { alertActions } from "../../../../../../components/alertActions";
import { useNavigate } from "react-router-dom";
import { ClassArmSelectField } from "../../../../../../components/ClassArmselect";

interface Props {
  close: () => void;
  item: any;
}
const TeacherInviteStudent: FC<Props> = ({ item, close }) => {
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [showLink, setShowLink] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string[]>([]);
  const [link, setLink] = useState("");
  const userInfo = useSelector((state: any) => state.gods.auth.userInformation);
  const [loading, setLoading] = useState(false);
  const [armselect, setarmSelect] = useState<any>();
  const config = configure(userInfo.token);
  const navigate = useNavigate();
  const handleEmailInput = (e: any) => {
    let emails = [...emailInput];
    if (e.target.value) {
      emails = [...emailInput, e.target.value];
      e.target.value = "";
    }
    setEmailInput(emails);
  };
  const selectedChange = (id: any[]) => {
    setarmSelect(id);
  };
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      arm: "",
      email: "",
    },
  });

  // submit form
  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      email: emailInput,
      arm: armselect[0],
    };
    if (!userInfo.token) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }
    if (!localStorage.getItem("token")) {
      setLoading(false);
      alertActions.error("Your session has ended please login");
      navigate("/login");
    }
    await teacherInviteStudents(payload, config)
      .then((res) => {
        if (!res.data.error) {
          alertActions.success(res.data.message);
        } else {
          alertActions.error(res.data.message);
        }
      })
      .catch((err) => {});
  };
  // generate invite link
  const generateInvite = async () => {
    const payload = {
      arm: armselect[0],
      schoolId: userInfo.schoolManagement,
    };
    if (!userInfo.token) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }
    if (!localStorage.getItem("token")) {
      setLoading(false);
      alertActions.error("Your session has ended please login");
      navigate("/login");
    }
    await generateInviteStudent(payload, config)
      .then((res) => {
        if (!res.data.error) {
          setLink(res?.data?.data?.link);
          alertActions.success(res.data.message);
        } else {
          alertActions.error(res.data.message);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (armselect?.length > 0 && emailInput.length > 0) {
      generateInvite();
    }
  }, [armselect, emailInput]);
  //   invite link
  const textToCopy = link;
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
  return (
    <>
      <div className="max-h-[600px] overflow-y-scroll">
        <div className="flex w-full items-center justify-between border-b-[1px] py-4 px-[24px]">
          <h3 className="font-medium text-[20px] text-[#030036] opacity-70 capitalize">
            Invite Students
          </h3>
          <div className="cursor-pointer" onClick={close}>
            <IoMdClose className="text-[22px] text-[#545454]" />
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-[24px] border-b-[1px]">
              <div>
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: {
                      value: false,
                      message: "",
                    },
                  }}
                  render={({ field }) => (
                    <InputField
                      type="text"
                      label="Full Name (Optional)"
                      placeholder=""
                      variant="white"
                      errors={errors.name?.message}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="mt-4">
                <ClassArmSelectField
                  label="Class Arm"
                  variant="white"
                  data={item.ClassArms}
                  multiple={false}
                  onSelectedDataChange={selectedChange}
                />
              </div>
              <div className="mt-4">
                <TagsInputField
                  onTagsChange={handleEmailInput}
                  label="Email "
                  name="email"
                  size="large"
                  type="email"
                  values={setEmailInput}
                />
              </div>
            </div>
            <div className="p-[24px]">
              <PrimaryButton
                text={isBusy ? "Inviting..." : "Invite"}
                variant="dash"
                onClick={handleSubmit(onSubmit)}
              />
              {showLink && (
                <div className="w-full pt-4 ">
                  <h3
                    className="text-[#030036] opacity-70 text-base font-normal underline"
                    onClick={generateInvite}
                  >
                    Students can also join with the class link
                  </h3>
                  <div className="rounded-[8px] border-[2px] border-[#E3E2FF] px-[20px] py-2 mt-2 flex items-center w-full justify-between">
                    <h4 className="text-[#030036] opacity-70 text-base font-medium">
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
          </form>
        </div>
      </div>
    </>
  );
};

export default TeacherInviteStudent;
