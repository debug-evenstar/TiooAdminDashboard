import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TTeachersProps = {
    id: number,
    name: string,
    admin: string | undefined,
    email: string,
    phone: string | null,
    account_type: string,
    display_image: null | string,
    verification_status: number,
    status: string,
    flag: string,
    createdAt: string,
    Teacher: {
        id: number,
        dateOfBirth: string | null,
        owerner_name: null | string,
        gender: null | string,
        email: null | string,
        phone: null | string,
        website: null | string,
        country: null | string,
        nationality: null | string,
        address: null | string,
        teacher_type: null | string,
        institution_type: null | string,
        bank_name: null | string,
        account_name: null | string,
        account_number: null | string,
        means_of_identification: null | string,
        ids: null | string,
        AccountId: number,
        SchoolManagementId: number
    }
}


const initialState: { teachers: TTeachersProps[] } = {
    teachers: []
};

export const teacherSlice = createSlice({
    name: 'admin',
    initialState: initialState,
    reducers: {
        setTeachers: (state, action: PayloadAction<TTeachersProps[]>) => {
            state.teachers = action.payload;
        },
        addTeacher: (state, action: PayloadAction<TTeachersProps>) => {
            state.teachers = [...state.teachers, action.payload];
        },
        clearTeachers: (state) => {
            state.teachers = [];
        },

    }
})

export const { addTeacher, setTeachers, clearTeachers } = teacherSlice.actions;
export default teacherSlice.reducer;