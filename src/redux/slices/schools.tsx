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
interface activeProps {
    id: string
}

const initialState: { schools: TSchoolsProps[], activeSchool: activeProps } = {
    schools: [],
    activeSchool: {
        id: ''
    },
};

export const schoolSlice = createSlice({
    name: 'admin',
    initialState: initialState,
    reducers: {
        setSchools: (state, action: PayloadAction<TSchoolsProps[]>) => {
            console.log("section ",action.payload);
            state.schools = action.payload;
        },
        addSchool: (state, action: PayloadAction<TSchoolsProps>) => {
            state.schools = [...state.schools, action.payload];
        },
        saveActiveSchId: (state, action: PayloadAction<string>) => {
            state.activeSchool.id = action.payload;
        },
        clearSchools: (state) => {
            state.schools = [];
        },

    }
})

export const { addSchool, setSchools, clearSchools, saveActiveSchId } = schoolSlice.actions;
export default schoolSlice.reducer;