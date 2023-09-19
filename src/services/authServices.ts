import axios from "axios";
import {
  SCHOOL_SETUP_URL,
  VERIFY_OTP_URL,
  VERIFY_OTP_NEW_URL,
  OTP_URL,
  NEW_OTP_URL,
  SIGNUP_URL,
  CREATE_CLASS_ARM,
  GET_ALL_SUBJECT,
  CREATE_SUBJECT,
  UPDATE_CLASS,
  GET_SCHOOL_MANAGEMENT,
  GET_SCHOOL_TEACHERS,
  GET_SCHOOL_TEACHERS_SUBJECT,
  GET_SCHOOL_TEACHERS_CLASS,
  EDIT_SUBJECT,
  DELETE_SUBJECT,
  GET_CLASS_SUBJECT,
  GET_INVITED_TEACHER,
  ACCEPT_INVITED_TEACHER,
  DEL_USERS,
  INVITE_TEACHER,
  CLASS_WITH_ARM,
  CREAT_NEW_CLASS,
  INVITE_GENERATE,
  DELETE_CLASS,
  GET_CLASS_TEACHER,
  UPDATE_CLASS_ARM,
  DELETE_CLASS_ARM,
  INVITE_STUDENT,
  GET_INVITEN_STUDENT,
  ACCEPT_STUDENT_INVITE,
  GET_CLASS_STUDENT,
  DELETE_STUDENT,
  BIND_SUBJECT_Teacher,
  BIND_CLASS_Teacher,
  BIND_SUBJECT_CLASS,
  INVITE_STUDENT_LINK,
  MAGIC_LINK_CREATE_TEACHER,
  UPDATE_USER,
  SIGN_IN,
  CLASS_BY_SUBJECTS,
  SUBJECT_TEACHERS,
  GET_TEACHER_LINK_INFO,
  MAGIC_LINK_CREATE_STUDENT,
  GET_STUDENT_LINK_INFO,
  RESET_PASS,
  RESET_PASS_REQ,
  GET_TEACHER_CLASS,
  GET_TEACHER_SUBJECTS,
  GET_TEACHER_STUDENTS,
  STUDENTS_BULK_INVITE,
  GET_TEACHER_LESSONS,
  GET_SUBJECT_LESSONS,
  GET_SUBJECT_CLASSES,
  DELETE_TEACHER,
  CREATE_LESSON,
  // GET_LESSONS,
  NEW_GET_LESSONS,
  GET_LESSONS_CLASS,
} from "./url.js";

//handle functions
const handleDelete = async (url?: string, config?: {}) => {
  try {
    return await axios.delete(`${url}`, config).then((res) => res);
  } catch (error: any) {
    return error;
  }
};

// };
const handlePostAPI = async (
  url?: string,
  payload?: string | {},
  config?: {}
) => {
  return await axios.post(`${url}`, payload, config).then((res) => res);
};

// const handleNewPostAPI = async (
//   url?: string,
//   payload?: string | {} | any,
//   config?: {}
// ) => {
//   const configs = {
//     method: "post",
//     url: url,
//     ...config,
//     body: payload
//   }
//   return await axios(configs).then((res) => res);
// };

const handlegetAPI = async (url?: string, config?: {}) => {
  try {
    return await axios.get(`${url}`, config).then((res) => res);
  } catch (error: any) {
    return error.message;
  }
};
const handlegetAPIwithid = async (url?: string, id?: any, config?: {}) => {
  try {
    return await axios.get(`${url}/${id}`, config).then((res) => res);
  } catch (error: any) {
    return error;
  }
};

const handlePutAPI = async (
  url?: string,
  payload?: string | {},
  config?: {}
) => {
  return await axios.put(`${url}`, payload, config).then((res) => res);
};

//calling functions

//binding
export const getClasswithArm = async (id: any, config: {}) => {
  return handlegetAPIwithid(GET_TEACHER_LINK_INFO, id, config);
};
export const bindClass___Teacher = async (vals: {}, config?: {}) => {
  return handlePostAPI(BIND_CLASS_Teacher, vals, config);
};
export const bindSubject___Teacher = async (vals: {}, config?: {}) => {
  return handlePostAPI(BIND_SUBJECT_Teacher, vals, config);
};
export const bindSubject___class = async (vals: {}, config?: {}) => {
  return handlePostAPI(BIND_SUBJECT_CLASS, vals, config);
};

export const generateInvite = async (vals: {}, config?: {}) => {
  return handlePostAPI(INVITE_GENERATE, vals, config);
};
export const generateInviteStudent = async (vals: {}, config?: {}) => {
  return handlePostAPI(INVITE_STUDENT_LINK, vals, config);
};

//teachers
export const acceptTeacherInvite = async (vals: {}, config?: {}) => {
  return handlePostAPI(ACCEPT_INVITED_TEACHER, vals, config);
};
export const acceptMagicLinkTeacher = async (vals: {}, config?: {}) => {
  return handlePostAPI(MAGIC_LINK_CREATE_TEACHER, vals, config);
};
export const getInvitedTeacher = async (id: any, config: {}) => {
  return handlegetAPIwithid(GET_INVITED_TEACHER, id, config);
};

export const getTeacherInviteInfo = async (id: any, config: {}) => {
  return handlegetAPIwithid(GET_TEACHER_LINK_INFO, id, config);
};
export const getSchoolTeachersSubject = async (id?: number, config?: {}) => {
  return handlegetAPIwithid(GET_SCHOOL_TEACHERS_SUBJECT, id, config);
};
export const getSchoolTeachersClass = async (id: number, config: {}) => {
  return handlegetAPIwithid(GET_SCHOOL_TEACHERS_CLASS, id, config);
};

export const getSchoolTeachers = async (id?: number, config?: {}) => {
  return handlegetAPIwithid(GET_SCHOOL_TEACHERS, id, config);
};

//student
export const deleteStudent = async (id: number, config: {}) => {
  return handleDelete(`${DELETE_STUDENT}/${id}`, config);
};
export const getClassStudent = async (id: any, config: {}) => {
  return handlegetAPIwithid(GET_CLASS_STUDENT, id, config);
};

export const acceptStudentsInvite = async (vals: {}, config?: {}) => {
  return handlePostAPI(ACCEPT_STUDENT_INVITE, vals, config);
};
export const acceptMagicLinkStudent = async (vals: {}, config?: {}) => {
  return handlePostAPI(MAGIC_LINK_CREATE_STUDENT, vals, config);
};
export const inviteStudent = async (vals: {}, config?: {}) => {
  return handlePostAPI(INVITE_STUDENT, vals, config);
};
export const getInvitedStudent = async (id: any, config: {}) => {
  return handlegetAPIwithid(GET_INVITEN_STUDENT, id, config);
};
export const getStudentInviteInfo = async (code: any, config: {}) => {
  return handlegetAPIwithid(GET_STUDENT_LINK_INFO, code, config);
};
//management
export const getManagementInfo = async (config: {}) => {
  return handlegetAPI(GET_SCHOOL_MANAGEMENT, config);
};

// classes
export const deleteClassArm = async (id: number, config: {}) => {
  return handleDelete(`${DELETE_CLASS_ARM}/${id}`, config);
};
export const deleteClass = async (id: number, config: {}) => {
  return handleDelete(`${DELETE_CLASS}/${id}`, config);
};
export const createNewClass = async (vals: {}, config?: {}) => {
  return handlePostAPI(CREAT_NEW_CLASS, vals, config);
};
export const getclassWithArms = async (config: {}) => {
  return handlegetAPI(CLASS_WITH_ARM, config);
};
export const getclassWithArmsbyClassID = async (id: number, config: {}) => {
  return handlegetAPIwithid(CLASS_WITH_ARM, id, config);
};
export const getclassSubjcts = async (id: number, config: {}) => {
  return handlegetAPIwithid(GET_CLASS_SUBJECT, id, config);
};
export const getclassTeacher = async (id: number, config: {}) => {
  return handlegetAPIwithid(GET_CLASS_TEACHER, id, config);
};

export const updateClassName = async (id: number, val: {}, config: {}) => {
  return handlePutAPI(`${UPDATE_CLASS}/${id}`, val, config);
};
export const updateClassArmName = async (id: number, val: {}, config: {}) => {
  return handlePutAPI(`${UPDATE_CLASS_ARM}/${id}`, val, config);
};

export const createClassArm = async (vals: {}, config?: {}) => {
  return handlePostAPI(CREATE_CLASS_ARM, vals, config);
};

//subjects
export const getAllSubjectsTeachers = async (id: number, config: {}) => {
  return handlegetAPIwithid(SUBJECT_TEACHERS, id, config);
};
export const getAllSubjects = async (id: number, config: {}) => {
  return handlegetAPIwithid(GET_ALL_SUBJECT, id, config);
};
export const getAllSubjectsClass = async (id: number, config: {}) => {
  return handlegetAPIwithid(CLASS_BY_SUBJECTS, id, config);
};
export const createSubject = async (vals: {}, config?: {}) => {
  return handlePostAPI(CREATE_SUBJECT, vals, config);
};
export const updateSubjects = async (val: {}, config: {}) => {
  return handlePutAPI(`${EDIT_SUBJECT}`, val, config);
};
export const deleteSubject = async (id: number, config: {}) => {
  return handleDelete(`${DELETE_SUBJECT}/${id}`, config);
};

//auth
export const changePass = async (val: {}, config?: {}) => {
  return handlePutAPI(`${RESET_PASS}`, val, config);
};
export const resetPassReq = async (vals: {}, config?: {}) => {
  return handlePostAPI(RESET_PASS_REQ, vals, config);
};
export const inviteUser = async (vals: {}, config?: {}) => {
  // export const Signup = async (vals: {}, config?: {}) => {
  return handlePostAPI(INVITE_TEACHER, vals, config);
  // };
};

export const delUser = async (id: number, config: {}) => {
  return handleDelete(`${DEL_USERS}/${id}`, config);
};
export const Signup = async (vals: {}, config?: {}) => {
  return handlePostAPI(SIGNUP_URL, vals, config);
};

export const generateOTPNew = async (vals: {}) => {
  return handlePostAPI(NEW_OTP_URL, vals);
};
export const generateOTP = async (vals: {}) => {
  return handlePostAPI(OTP_URL, vals);
};
export const verifyOTPNew = async (vals: {}) => {
  return handlePostAPI(VERIFY_OTP_NEW_URL, vals);
};

export const verifyOTP = async (vals: {}) => {
  return handlePostAPI(VERIFY_OTP_URL, vals);
};

export const createSchool = async (vals: {}) => {
  return handlePostAPI(SCHOOL_SETUP_URL, vals);
};
export const updateUser = async (id: number, val: {}, config: {}) => {
  return handlePutAPI(`${UPDATE_USER}/${id}`, val, config);
};
export const SignIn = async (vals: {}) => {
  return handlePostAPI(SIGN_IN, vals);
};

// export const fetchClass = async (vals: {}) => {
//   return handlegetAPI(SCHOOL_SETUP_URL, vals);
// };

// Teacher calls
export const getTeacherClass = async (id:number,config: {}) => {
  return handlegetAPI(`${GET_TEACHER_CLASS}/${id}`, config);
};
export const getTeacherSubjects = async (id:number,config: {}) => {
  return handlegetAPI(`${GET_TEACHER_SUBJECTS}/${id}`, config);
};
export const getTeacherStudents = async (id:number,config: {}) => {
  return handlegetAPI(`${GET_TEACHER_STUDENTS}/${id}`, config);
};
export const teacherInviteStudents = async (vals: {}, config?: {}) => {
  return handlePostAPI(STUDENTS_BULK_INVITE, vals, config);
};
export const unassignTeacher = async (vals: {}, config?: {}) => {
  return handlePostAPI(DELETE_TEACHER, vals, config);
};
// export const getTeacherLessons = async (config: {}) => {
//   return handlegetAPI(GET_TEACHER_LESSONS, config);
// };
export const getTeacherLessons = async (id:number,config: {}) => {
  return handlegetAPI(`${GET_TEACHER_LESSONS}/${id}`, config);
};
export const getSubjectLessons = async (id:number,config: {}) => {
  return handlegetAPI(`${GET_SUBJECT_LESSONS}/${id}`, config);
};
export const getSubjectClasses = async (id:number,config: {}) => {
  return handlegetAPI(`${GET_SUBJECT_CLASSES}/${id}`, config);
};

// lessons
export const createLessons = async (vals: {}, config?: {}) => {
  return handlePostAPI(CREATE_LESSON, vals, config);
};
export const getSubjectLesson = async (id:any,config: {}) => {
  return handlegetAPI(`${NEW_GET_LESSONS}?subject_id=${id}`, config);
};
export const getLessonClass = async (id:any, config: {}) => {
  return handlegetAPI(`${GET_LESSONS_CLASS}?subject_id=${id}`, config);
};
// export const getClassArms = async (id:any, config: {}) => {
//   return handlegetAPI(`${GET_LESSONS_CLASS}?subject_id=${id}`, config);
// };

