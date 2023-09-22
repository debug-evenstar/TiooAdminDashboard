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
export const AddLessons = (id) => `lesson/groups/${id}/add`
export const AddLessonsArms = (id) => `lesson/groups/${id}/editarms`
export const deleteLesson = (id) => `lesson/${id}`
export const changeStatus = (id, status) => `lesson/${id}/status?status=${status}`
export const getClassTerms = (id) => `school/${id}/terms`
export const generationLesson = () => `lesson/generate`
export const getGenerated = (id) => `lesson/generated/${id}`
export const addGenerated = (id) => `lesson/generate/groups/${id}`
export const promptGenerated = (id) => `lesson/${id}/generate/extra`

/* -------------------------------- STUDENTS -------------------------------- */
export const inviteBulkStudentsUrl = () => `students/bulk/invite`;
export const studentInviteUrl = () => `student/invite`

/* -------------------------------- TEACHERS -------------------------------- */
export const fetchSchoolTeachers = (id) => `school/teachers/${id}`;

// lessons
export const getLessons = (id) => `lesson/check?subject_id=${id}`
export const lessonTemplate = (id) => `lesson/${id}/template`
export const saveFile = (id) => `open/lesson/templateimage/${id}`
export const editSlideInfo = (id) => `lesson/template/${id}`