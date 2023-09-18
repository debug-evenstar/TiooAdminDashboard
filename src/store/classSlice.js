import { createSlice } from "@reduxjs/toolkit";

const classSlice = createSlice({
  name: "class",
  initialState: {
    classInformation: [],
    classSubject: [],
    classTeacher: [],
    selectedClass: [],
    selectedClassArm: [],
    classStudents: [],
    classLevels: [],
  },
  reducers: {
    saveclassInfo(state, action) {
      state.classInformation = action.payload;
    },
    saveclassSubject(state, action) {
      state.classSubject = action.payload;
    },
    saveclassTeacher(state, action) {
      state.classTeacher = action.payload;
    },
    saveselectedclass(state, action) {
      state.selectedClass = action.payload;
    },
    saveselectedclassArm(state, action) {
      state.selectedClassArm = action.payload;
    },
    saveClassStudents(state, action) {
      state.classStudents = action.payload;
    },
    saveClassLevel(state, action) {
      state.classLevels = action.payload;
    },
  },
});
export const classActions = classSlice.actions;
export default classSlice;
