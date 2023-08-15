import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PriceState {
    value: number;
    quarter: number;
    half: number;
    year: number;
}


const initialState = {
    schools: {
        teachers: {
            value: 0,
            quarter: 0,
            half: 0,
            year: 0,
        },
        students: {
            value: 0,
            quarter: 0,
            half: 0,
            year: 0,
        },
        total: {
            value: 0,
            quarter: 0,
            half: 0,
            year: 0,
        }
    },
    freelancers: {
        value: 0,
        quarter: 0,
        half: 0,
        year: 0,
    },
    students: {
        value: 0,
        quarter: 0,
        half: 0,
        year: 0,
    },
}

export const pricingSlice = createSlice({
    name: "pricing",
    initialState: initialState,
    reducers: {
        setSchoolsTeachers: (state, action: PayloadAction<PriceState>) => {
            state.schools.teachers = action.payload;
        },
        setSchoolsStudents: (state, action: PayloadAction<PriceState>) => {
            state.schools.students = action.payload;
        },
        setSchoolsTotal: (state, action: PayloadAction<PriceState>) => {
            state.schools.total = action.payload;
        },
        setFreelancers: (state, action: PayloadAction<PriceState>) => {
            state.freelancers = action.payload;
        },
        setStudents: (state, action: PayloadAction<PriceState>) => {
            state.students = action.payload;
        },

    }
})

export const { setSchoolsStudents, setSchoolsTeachers, setSchoolsTotal, setFreelancers, setStudents } = pricingSlice.actions;
export default pricingSlice.reducer;