import { configureStore } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import userReducer from './slices/user';
import pricingReducer from './slices/pricing';
import couponReducer from './slices/coupon';
import adminReducer from './slices/admin';
import schoolReducer from './slices/schools';
import freelanReducer from './slices/freelancer';
import studentReducer from './slices/student';

const store: ToolkitStore = configureStore({
    reducer: {
        user: userReducer,
        pricing: pricingReducer,
        coupon: couponReducer,
        admin: adminReducer,
        school: schoolReducer,
        freelancer: freelanReducer,
        student: studentReducer
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;