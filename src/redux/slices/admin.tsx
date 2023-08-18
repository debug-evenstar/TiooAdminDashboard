import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


type TUserLevel = {
    fullname: string;
    email: string;
    role: string;
    permissions: string[];
}


const initialState: { reload: boolean,users: TUserLevel[] } = {
    users: [],
    reload: false,
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
        setAdminReload: (state) => {
            state.reload = !state.reload;
        }

    }
})

export const { addAdmin, setAdmins,setAdminReload, clearAdmins } = adminSlice.actions;
export default adminSlice.reducer;