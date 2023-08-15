import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TSchoolsProps = {
    school: {
        id: number,
        name: string,
        admin: string,
        email: string,
        phone: string,
        account_type: string,
        verification_status: number,
        status: string,
        flag: string,
        createdAt: string,
        school_name: string,
        address: string
    },
    subjects: number,
    teachers: number,
    hybrid_teachers: number,
    students: number,
    classes: number
}

const initialState: { schools: TSchoolsProps[] } = {
    schools: []
};

export const schoolSlice = createSlice({
    name: 'admin',
    initialState: initialState,
    reducers: {
        setSchools: (state, action: PayloadAction<TSchoolsProps[]>) => {
            state.schools = action.payload;
        },
        addAdmin: (state, action: PayloadAction<TSchoolsProps>) => {
            state.schools = [...state.schools, action.payload];
        },
        clearSchools: (state) => {
            state.schools = [];
        },

    }
})

export const { addAdmin, setSchools, clearSchools } = schoolSlice.actions;
export default schoolSlice.reducer;