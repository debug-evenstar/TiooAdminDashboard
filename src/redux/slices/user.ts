import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState{
    user: object,
    isAuthenticated: boolean
}

const initialState: UserState = {
    user: {},
    isAuthenticated: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers:{
        update: (state,action: PayloadAction<object>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        remove: (state) => {
            state.user = {};
            state.isAuthenticated = false;
        }
    }
})

export const { update } = userSlice.actions;
export default userSlice.reducer;