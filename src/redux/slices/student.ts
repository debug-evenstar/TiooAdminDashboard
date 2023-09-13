import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TStudentsProps = {
    id: number;
    name: string;
    email: string;
    admin: null | string;
    phone: null | string;
    account_type: string;
    verification_status: boolean;
    status: null | string;
    flag: string;
    createdAt: string;
    Student?: any;
    SchoolManagement: null | string;
}

const initialState: { students: TStudentsProps[] } = {
    students: []
};

export const studentSlice = createSlice({
    name: 'admin',
    initialState: initialState,
    reducers: {
        setStudents: (state, action: PayloadAction<TStudentsProps[]>) => {
            state.students = action.payload;
        },
        addStudent: (state, action: PayloadAction<TStudentsProps>) => {
            state.students = [...state.students, action.payload];
        },
        clearStudents: (state) => {
            state.students = [];
        },

    }
})

export const { addStudent, setStudents, clearStudents } = studentSlice.actions;
export default studentSlice.reducer;