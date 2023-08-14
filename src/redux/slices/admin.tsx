import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


type TUserLevel = {
    fullname: string;
    email: string;
    role: string;
    permissions: string[];
}


const initialState: { users: TUserLevel[] } = {
    users: []
};

export const adminSlice = createSlice({
    name: 'admin',
    initialState: initialState,
    reducers: {
        setAdmins: (state, action: PayloadAction<TUserLevel[]>) => {
            state.users = action.payload;
        },
        addAdmin: (state, action: PayloadAction<TUserLevel>) => {
            state.users = [...state.users, action.payload];
        },
        clearAdmins: (state) => {
            state.users = [];
        },

    }
})

export const { addAdmin, setAdmins, clearAdmins } = adminSlice.actions;
export default adminSlice.reducer;