import { createSlice } from "@reduxjs/toolkit";

const schoolSlice = createSlice({
  name: "school",
  initialState: {
    schoolManagementInfo: {},
    teachersInfo: [],
    teachersSubject: [],
    teachersClass: [],
    teachersStudents: [],
    subjectClass: [],
    subjectTeacher: [],
    subjectLesson: [],
    schoolSubject: [],
  },
  reducers: {
    // saveItem(action) {
    //   return action.payload;
    // },
    saveSchoolManagementInfo(state, action) {
      const data = action.payload;
      state.praise.schoolManagementInfo = data;
    },
    saveTeachersInfo(state, action) {
      const data = action.payload;
      state.praise.teachersInfo = data;
    },
    saveTeachersSubject(state, action) {
      const data = action.payload;
      state.praise.teachersSubject = data;
    },
    saveTeachersClass(state, action) {
      const data = action.payload;
      state.praise.teachersClass = data;
    },
    saveSubjectClass(state, action) {
      //   console.log(this.saveItem(action));
      state.subjectClass = action.payload;
    },
    saveSubjectLesson(state, action) {
      state.subjectLesson = action.payload;
    },
    saveSubjectTeacher(state, action) {
      state.subjectTeacher = action.payload;
    },
    schoolSubjects(state, action) {
      state.praise.schoolSubject = action.payload;
    },
    saveTeacherStudents(state, action) {
      state.praise.teachersStudents = action.payload;
    },
  },
});
export const schoolActions = schoolSlice.actions;
export default schoolSlice;
