import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInformation: {},
    userInformationForm: {},
    schoolInformation: {},
    customschoolInformation: [],
    schoolid: "",
    token: "",
  },

  reducers: {
    savetoken(state, action) {
      const data = action.payload;
      state.token = data;
    },
    saveUserInfo(state, action) {
      const data = action.payload;

      state.userInformation = data;
    },
    saveUserInfoform(state, action) {
      const data = action.payload;

      state.userInformationForm = data;
    },
    saveSchoolInfo(state, action) {
      const data = action.payload;
      state.schoolInformation = data;
    },
    savecustomSchoolInfo(state, action) {
      const data = action.payload;
      state.customschoolInformation = data;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice;
