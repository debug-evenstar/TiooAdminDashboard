import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import authSlice from "./authSlice";
import classSlice from "./classSlice";
import schoolSlice from "./schoolSlice";
import lessonSlice from "./lessonSlice";

 const reducer = combineReducers( {
    auth: authSlice.reducer,
    class: classSlice.reducer,
    school: schoolSlice.reducer,
    lesson: lessonSlice.reducer
  })

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});
export default store;
