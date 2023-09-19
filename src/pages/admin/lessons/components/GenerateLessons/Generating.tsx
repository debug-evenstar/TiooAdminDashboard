import React, { FC, useEffect, useState } from "react";
import { SuccessCheck } from "../../../../../components/AlertCheck";
import { PrimaryButton } from "../../../../../components/Buttons";
import { useNavigate } from "react-router-dom";
import { LiaTimesSolid } from "react-icons/lia";
import { LuUploadCloud } from "react-icons/lu";
import { useSelector } from "react-redux";
import { addGeneratedLesson, generateLesson } from "../../../../../api";
import { alertActions } from "../../../../../components/alertActions";
import { lessonActions } from "../../../../../store/lessonSlice";
import { getLessonClass } from "../../../../../services/authServices";
import { configure } from "../../../../../services/config";
import { useDispatch } from "react-redux";

interface Props {
  id: any;
  groupId?: any;
  close: () => void;
  passId?: any;
}
const GeneratingLesson: FC<Props> = ({ id, close, passId }) => {
  const userInfo = useSelector((state: any) => state.gods.auth.userInformation);
  const dispatch = useDispatch()
  const [isBusy, setIsBusy] = useState(true);
  const [loading, setLoading] = useState(true);
  const [lessonId, setLessonId] = useState(0);
  const [progs, setProgs] = useState(false);
  const [lessonGroups, setLessonGroups] = useState<any>();
  const navigate = useNavigate();
  const config = configure(userInfo.token);
  const lesson = useSelector((state: any) => state.gods.lesson.generateData);
  const classes = useSelector((state: any) => state.gods.lesson.lessonGroup);
  const navToLesson = () => {
    navigate(`/lessons/note/${lessonId}`);
  };

  const fetchSubjectLessonGroups = async () => {
    try {
      const val = await getLessonClass(id, config);
      setLessonGroups(val.data.data);
      dispatch(lessonActions.saveClass(val.data.data))
        generatingLesson();
    } catch (error: any) {}
  };

  const lessonGroupExists = (classArms: any[]) => {
    let status = false as any;
    classes.forEach((group: any) => {
      const groupUnmatched = group.ClassArms.filter(
        (arm: any) => !classArms.includes(arm.id)
      );
      if (
        groupUnmatched.length === 0 &&
        group.ClassArms.length === classArms.length
      ) {
        status = group;
      }
    });
    return status;
  };

  const addLessonToGroup = async (group: any) => {
    const payload = {
      ...lesson,
    };
    await addGeneratedLesson(payload, group)
      .then((res: any) => {
        if (!res.error) {
          alertActions.success(res.message);
          setLessonId(res.id);
          // lessonActions.saveGenerated(res.id);
          setIsBusy(false);
          loadingState();
        } else {
          alertActions.error(res.message);
          setIsBusy(false);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const generatingLesson = async () => {
    const payload = {
      ...lesson,
    };
    if (passId) {
      return;
    } else if (lessonGroupExists(lesson.class_arms)) {
      const group = lessonGroupExists(lesson.class_arms);
      addLessonToGroup(group.id);
      return;
    } else {
      await generateLesson(payload)
        .then((res: any) => {
          if (!res.error) {
            alertActions.success(res.message);
            setLessonId(res.id);
            // lessonActions.saveGenerated(res.id);
            setIsBusy(false);
            loadingState();
          } else {
            alertActions.error(res.message);
            setIsBusy(false);
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };
  const loadingState = () => {
    setProgs(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  useEffect(() => {
    if (!lessonId) {
      fetchSubjectLessonGroups();
    }
    if (passId) {
      addLessonToGroup(passId);
    }
  }, []);
  // useEffect(() => {
  //   if (!lessonId) {
  //     generatingLesson();
  //   }
  // }, [lessonGroups]);

  return (
    <>
      {loading ? (
        <div>
          <div className="flex justify-end border-b py-4 px-5">
            <LiaTimesSolid
              onClick={close}
              className="text-[#545454] text-lg cursor-pointer"
            />
          </div>
          <div className="py-16 px-12 text-center ">
            <LuUploadCloud className="text-2xl mx-auto" />
            <p className="font-medium text-[#030036BD] my-6 text-2xl">
              Tioo is Generating your lessons
            </p>
            <div className="w-full rounded-xl bg-[#E8E5E5] overflow-hidden ">
              <div
                className={`bg-[#4F46E5] h-12 upload-progress ${
                  progs && "complete-prog"
                }`}
              ></div>
            </div>
            <p className="mt-6 text-[#6C7C8C] text-[15px]">
              This process will take a few seconds, please wait
            </p>
          </div>
        </div>
      ) : (
        <div className="h-[370px] flex items-center justify-center">
          <div className="text-center w-10/12">
            <SuccessCheck />
            <p className="text-lg">Lessons uploaded successfully</p>
            <p className="mt-6 text-[#6C7C8C] text-[14px]">
              Your lessons has been generated successfully, please click on the
              coniue button to navigate to the notes
            </p>
            <div className="mt-4">
              <PrimaryButton text="Continue" onClick={navToLesson} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GeneratingLesson;
