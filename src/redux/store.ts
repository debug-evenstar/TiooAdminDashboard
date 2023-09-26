import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userReducer from './slices/user';
import pricingReducer from './slices/pricing';
import couponReducer from './slices/coupon';
import adminReducer from './slices/admin';
import schoolReducer from './slices/schools';
import teacherReducer from './slices/teachers';
import freelanceReducer from './slices/freelancer';
import studentReducer from './slices/student';
import pricingExceptionReducer from './slices/pricingException';
import libraryReducer from './slices/library';
import paginatorReducer from "./slices/paginator";


import authSlice from "../store/authSlice";
import classSlice from "../store/classSlice";
import schoolSlice from "../store/schoolSlice";
import lessonSlice from "../store/lessonSlice";

const store: ToolkitStore = configureStore({
    reducer: combineReducers({
        praise: combineReducers({
            user: userReducer,
            pricing: pricingReducer,
            coupon: couponReducer,
            admin: adminReducer,
            school: schoolReducer,
            teacher: teacherReducer,
            freelancer: freelanceReducer,
            student: studentReducer,
            pricingException: pricingExceptionReducer,
            library: libraryReducer,
            paginator: paginatorReducer,
        }),
        gods: combineReducers( {
            auth: authSlice.reducer,
            class: classSlice.reducer,
            school: schoolSlice.reducer,
            lesson: lessonSlice.reducer
        })
    })
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;