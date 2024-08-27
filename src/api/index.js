import Request from "./request";
import {
  AddLessons,
  AddLessonsArms,
  SubjectWithLessonCount,
  UpdateLessonTime,
  addGenerated,
  allClasses,
  allSchoolClasses,
  allSubjects,
  assignClassesToSubject,
  changeStatus,
  classArmStudents,
  classArmSubjects,
  deleteLesson,
  editSlideInfo,
  fetchClassArmsByClassId,
  fetchSchoolProfile,
  fetchSchoolTeachers,
  generationLesson,
  getClassLevels,
  getClassTerms,
  getGenerated,
  getLessons,
  inviteBulkStudentsUrl,
  lessonTemplate,
  promptGenerated,
  removeClassesFromSubject,
  saveFile,
  studentInviteUrl,
  subjectTopics,
  topics,
  updateLesson
} from "./routes";



/* ----------------------------- SCHOOL HANDLERS ---------------------------- */
export const loadSchoolProfile = async () => Request.get(fetchSchoolProfile());

/* --------------------------------- CLASSES -------------------------------- */
export const getClasses = async () => Request.get(allSchoolClasses());

export const getClassArmStudents = async (id) =>
  Request.get(classArmStudents(id));

export const getClassArmSubjects = async (id) =>
  Request.get(classArmSubjects(id));

export const getClassArmsByClass = async (id) =>
  Request.get(fetchClassArmsByClassId(id));

/* -------------------------------- SUBJECTS -------------------------------- */
export const getSubjects = async (id) => Request.get(allSubjects(id));

export const getLevels = async () => Request.get(getClassLevels());

export const getSubjectClasses = async (id) => Request.get(allClasses(id));

export const fetchSubjectTopics = async (id) => Request.get(subjectTopics(id));

export const createSubjectTopic = async (id, data) => Request.post(subjectTopics(id), data);

export const deleteSubjectTopic = async (id) => Request.delete(topics(id));

export const getSchoolTerm = async (id) => Request.get(getClassTerms(id));

export const assignClassToSubject = async (items) =>
  Request.post(assignClassesToSubject(), items);

export const removeClassFromSubject = async (items) =>
  Request.post(removeClassesFromSubject(), items);

export const getSubjectWithLessonCount = async () =>
  Request.get(SubjectWithLessonCount());

export const updateTimeline = async (items, id) =>
  Request.put(UpdateLessonTime(id), items);

export const AddNewLesson = async (items, id) =>
  Request.post(AddLessons(id), items);

export const AddNewLessonArms = async (items, id) =>
  Request.post(AddLessonsArms(id), items);

export const DeleteLesson = async (id) =>
  Request.delete(deleteLesson(id));

export const UpdateLesson = async (textbook_id, lesson_id, data) =>
   Request.put(updateLesson(textbook_id, lesson_id),data);

export const EditLessonStatus = async (id, status) =>
  Request.put(changeStatus(id, status));


export const generateLesson = async (items) =>
  Request.post(generationLesson(), items);

export const addGeneratedLesson = async (items, id) =>
  Request.post(addGenerated(id), items);

export const fetchGenerated = async (id) => Request.get(getGenerated(id));

export const getPromptAddition = async (items, id) => Request.post(promptGenerated(id), items);

export const editGenerateLesson = async (items, id) =>
  Request.put(getGenerated(id), items);

/* -------------------------------- STUDENTS -------------------------------- */
export const inviteBulkStudents = async (data) =>
  Request.post(inviteBulkStudentsUrl(), data);
export const inviteStudents = async (data) =>
  Request.post(studentInviteUrl(), data);

/* -------------------------------- TEACHERS -------------------------------- */
export const getSchoolTeachers = async (id) =>
  Request.get(fetchSchoolTeachers(id));

// library
export const fetchLessons = async (id) => Request.get(getLessons(id));
export const fetchTemplate = async (id) => Request.get(lessonTemplate(id));
export const uploadFile = async (items, id) =>
  Request.put(saveFile(id), items);

export const editSlide = async (items, id) =>
  Request.put(editSlideInfo(id), items);


