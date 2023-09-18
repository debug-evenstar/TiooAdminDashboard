import { createSlice } from "@reduxjs/toolkit";

const lessonSlice = createSlice({
  name: "lesson",
  initialState: {
    uploadClass: "",
    generateData: {},
    generatedNote: {
      current: "",
      past: "",
      forward: "",
      pasttwo: "",
    },
    lessonGroup: []
  },
  reducers: {
    saveClass(state, action) {
      state.lessonGroup = action.payload;
    },
    saveClassLesson(state, action) {
      state.uploadClass = action.payload;
    },
    saveGenerate(state, action) {
      state.generateData = action.payload;
    },
    saveNote(state, action) {
      state.generatedNote.current = action.payload
    },
    savePastNote(state, action) {
      state.generatedNote.past = action.payload
    },
    savePastNoteTwo(state, action) {
      state.generatedNote.pasttwo = action.payload
    },
    saveFutureNote(state, action) {
      state.generatedNote.forward = action.payload
    }
  },
});
export const lessonActions = lessonSlice.actions;
export default lessonSlice;
