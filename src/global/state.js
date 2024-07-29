import {
  getClasses,
  getLevels,
  getSchoolTeachers,
  getSubjectClasses,
  getSubjects,
  loadSchoolProfile,
} from "../api";
import store from "../store";
import { classActions } from "../store/classSlice";
import { schoolActions } from "../store/schoolSlice";

export const loadSchoolInfo = async () => {
  const response = await loadSchoolProfile();
  store.dispatch(schoolActions.saveSchoolManagementInfo(response?.data));
  return;
};

export const loadSchoolClasses = async () => {
  const response = await getClasses();
  store.dispatch(classActions.saveclassInfo(response?.data));
  return;
};

export const loadSchoolSubjects = async () => {
  const state = store.getState();
  const response = await getSubjects(
    state.school?.schoolManagementInfo.schoolManagementId
  );
  store.dispatch(schoolActions.schoolSubjects(response?.data));
  return;
};

export const loadSchoolTeachers = async () => {
  const state = store.getState();
  const response = await getSchoolTeachers(
    state.school?.schoolManagementInfo.schoolManagementId
  );
  store.dispatch(schoolActions.saveTeachersInfo(response?.data));
  return;
};

export const loadClassLevels = async () => {
  const response = await getLevels();
  store.dispatch(classActions.saveClassLevel(response?.data));
  return;
};

export const initGlobalState = async () => {
  const account = store.getState().auth?.userInformation?.account_type;
  if (account && (account === "school" || account === "freelancer")) {
    await loadSchoolInfo();
    await loadSchoolClasses();
    await loadSchoolSubjects();
    await loadSchoolTeachers();
    await loadClassLevels();
  }
};
