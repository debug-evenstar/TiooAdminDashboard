/* --------------------------------- SCHOOL --------------------------------- */
export const fetchSchoolProfile = () => `school/profile`;
export const allSchoolClasses = () => `class/readwitharms`;

/* --------------------------------- CLASSES -------------------------------- */
export const fetchClassArmsByClassId = (id) =>`class/${id}/arms`;

/* -------------------------------- SUBJECTS -------------------------------- */
export const getClassLevels = () => `tio/classes`
export const allSubjects = (id) => `subjects/school/read/${id}`;
export const allClasses = (id) => `subjects/classes/read/${id}`;
export const assignClassesToSubject = () => `subjects/classes/add`;
export const removeClassesFromSubject = () => `class/remove/subject`;
export const classArmStudents = (id) => `class/arms/students/${id}`
export const classArmSubjects = (id) => `class/arms/${id}/subjects`
export const SubjectWithLessonCount = () => `/admin/management/subjects/lessons/count`
export const UpdateLessonTime = (id) => `/lesson/${id}`
export const updateLesson = (textbook_id, lesson_id) => `/library/textbooks/${textbook_id}/lessons/${lesson_id}`
export const AddLessons = (id) => `lesson/groups/${id}/add`
export const AddLessonsArms = (id) => `lesson/groups/${id}/editarms`
export const deleteLesson = (id) => `/library/textbooks/${id}/lessons/${id}`
// export const deleteLesson = (id) => `lesson/${id}`

export const changeStatus = (id, status) => `lesson/${id}/status?status=${status}`
export const getClassTerms = (id) => `school/${id}/terms`
export const generationLesson = () => `lesson/generate`
export const getGenerated = (id) => `lesson/generated/${id}`
export const addGenerated = (id) => `lesson/generate/groups/${id}`
export const promptGenerated = (id) => `lesson/${id}/generate/extra`
export const subjectTopics = (id) => `subjects/${id}/topics`;
export const topics = (id) => `topics/${id}`;
export const categories = () => '/library/textbooks/categories'

/* -------------------------------- STUDENTS -------------------------------- */
export const inviteBulkStudentsUrl = () => `students/bulk/invite`;
export const studentInviteUrl = () => `student/invite`

/* -------------------------------- TEACHERS -------------------------------- */
export const fetchSchoolTeachers = (id) => `school/teachers/${id}`;

// lessons
export const getLessons = (id) => `lessons/check?subject_id=${id}`
export const lessonTemplate = (id) => `lessons/${id}`
export const saveFile = (id) => `open/lesson/templateimage/${id}`
export const editSlideInfo = (id) => `lesson/template/${id}`



// export const SIGNIN_URL = `${BASE_URL}account/read`;
// export const SIGNUP_URL = `${BASE_URL}account/signup`;
// export const NEW_OTP_URL = `${BASE_URL}new/account/send_otp`;
// export const OTP_URL = `${BASE_URL}new/account/send_otp`;
// export const VERIFY_OTP_NEW_URL = `${BASE_URL}new/account/verify`;
// export const VERIFY_OTP_URL = `${BASE_URL}new/account/verify`;
// export const SCHOOL_SETUP_URL = `${BASE_URL}school/setup`;
// export const CREATE_CLASS_ARM = `${BASE_URL}class/arms/create_bulk`;
// export const GET_ALL_SUBJECT = `${BASE_URL}subjects/read`;
// export const CREATE_SUBJECT = `${BASE_URL}subjects/create`;
// export const UPDATE_CLASS = `${BASE_URL}class/update`;
// export const GET_SCHOOL_MANAGEMENT = `${BASE_URL}school/profile`;
// export const GET_TEACHER_PROFILE = `${BASE_URL}teacher/profile`;
// export const GET_SCHOOL_TEACHERS = `${BASE_URL}school/teachers`;
// export const GET_SCHOOL_TEACHERS_SUBJECT = `${BASE_URL}teacher/subjects`;
// export const GET_SCHOOL_TEACHERS_CLASS = `${BASE_URL}teacher/classess`;
// export const EDIT_SUBJECT = `${BASE_URL}subjects/update`;
// export const DELETE_SUBJECT = `${BASE_URL}subjects/delete`;
// export const GET_CLASS_SUBJECT = `${BASE_URL}class/subjects/read`;
// export const GET_INVITED_TEACHER = `${BASE_URL}teacher/invited`;
// export const GET_TEACHER_LINK_INFO = `${BASE_URL}invites/info`;
// export const INVITE_TEACHER = `${BASE_URL}teacher/invite`;
// export const ACCEPT_INVITED_TEACHER = `${BASE_URL}teacher/invite/accept`;
// export const MAGIC_LINK_CREATE_TEACHER = `${BASE_URL}invites/teacher/accept`;
// export const DEL_USERS = `${BASE_URL}account/delete`;
// export const CLASS_WITH_ARM = `${BASE_URL}class/readwitharms`;
// export const CREAT_NEW_CLASS = `${BASE_URL}class/create`;
// export const INVITE_GENERATE = `${BASE_URL}invites/generate`;
// export const DELETE_CLASS = `${BASE_URL}class/delete`;
// export const GET_CLASS_TEACHER = `${BASE_URL}class/teachers/read`;
// export const UPDATE_CLASS_ARM = `${BASE_URL}class/arms/update`;
// export const DELETE_CLASS_ARM = `${BASE_URL}class/arms/delete`;
// export const INVITE_STUDENT = `${BASE_URL}student/invite`;
// export const GET_INVITEN_STUDENT = `${BASE_URL}student/invited`;
// export const GET_STUDENT_LINK_INFO = `${BASE_URL}/invites/student/info`;
// export const ACCEPT_STUDENT_INVITE = `${BASE_URL}student/invite/accept`;
// export const MAGIC_LINK_CREATE_STUDENT = `${BASE_URL}invites/student/accept`;
// export const GET_CLASS_STUDENT = `${BASE_URL}class/students`;
// export const DELETE_STUDENT = `${BASE_URL}students/delete`;
// export const RESET_PASS_REQ = `${BASE_URL}account/resetpassword`;
// export const RESET_PASS = `${BASE_URL}account/change_password`;
// export const BIND_SUBJECT_CLASS = `${BASE_URL}class/addsubject`;
// export const BIND_SUBJECT_Teacher = `${BASE_URL}teacher/assignsubject`;
// export const BIND_CLASS_Teacher = `${BASE_URL}class/teacher`;
// export const INVITE_STUDENT_LINK = `${BASE_URL}invites/student/generate`;
// export const GET_INVITED_MAGIC = `${BASE_URL}invites/info`;
// export const CREATE_ACC_MAGIC = `${BASE_URL}invites/teacher/accept`;
// export const GET_INVITED_MAGIC_STUDENT = `${BASE_URL}invites/student/info`;
// export const CREATE_ACC_MAGIC_STUDENT = `${BASE_URL}invites/student/accept`;
// export const UPDATE_USER = `${BASE_URL}account/update`;
// export const SIGN_IN = `${BASE_URL}account/signin`;
// export const CLASS_BY_SUBJECTS = `${BASE_URL}subjects/classes/read`;
// export const SUBJECT_TEACHERS = `${BASE_URL}subjects/teachers/read`;
// // export const CLASS_STUDENTS = `${BASE_URL}class/students`;
// // export const CLASS_WITH_ARM = `${BASE_URL}account/signin`;
// export const GET_TEACHER_CLASS = `${BASE_URL}teacher/classess`
// export const GET_TEACHER_SUBJECTS = `${BASE_URL}teacher/subjects`
// export const GET_TEACHER_STUDENTS = `${BASE_URL}teacher/students`
// export const GET_TEACHER_SUBJECTS_WITH_LESSON =    `${BASE_URL}teacher/subjectswithlesson`
// export const STUDENTS_BULK_INVITE = `${BASE_URL}students/bulk/invite`
// export const GET_TEACHER_LESSONS = `${BASE_URL}teacher/subjectswithlessons`
// export const GET_SUBJECT_LESSONS = `${BASE_URL}subjects/lessons`
// export const GET_SUBJECT_CLASSES = `${BASE_URL}subjects/classes/read/`
// export const DELETE_TEACHER = `${BASE_URL}teacher/unassignsubject`
// export const CREATE_LESSON = `${BASE_URL}lesson/create`
// export const GET_LESSONS = `${BASE_URL}lesson/subjectlessons`
// // export const NEW_GET_LESSONS = `${BASE_URL}lesson/check`
// export const NEW_GET_LESSONS = `${BASE_URL}lesson/check`
// export const GET_LESSONS_CLASS = `${BASE_URL}lesson/groups`