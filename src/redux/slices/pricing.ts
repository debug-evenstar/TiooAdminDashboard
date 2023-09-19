import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PriceState {
    value: number;
    quarter: number;
    half: number;
    year: number;
    id: number;
}


const initialState = {
    schools: {
        id: 0,
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
        id: 0,
        value: 0,
        quarter: 0,
        half: 0,
        year: 0,
    },
    students: {
        id: 0,
        value: 0,
        quarter: 0,
        half: 0,
        year: 0,
    },
    reload: false,
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
        setSchoolsID: (state, action: PayloadAction<number>) => {
            state.schools.id = action.payload;
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

        reloadPricing: (state) => {
            state.reload = !state.reload;
        },

        clearPricing: (state) => {
            // state = initialState;
            state.schools = initialState.schools;
            state.freelancers = initialState.freelancers;
            state.students = initialState.students;
        },
    }
})

export const { setSchoolsStudents,reloadPricing,setSchoolsID, setSchoolsTeachers,clearPricing, setSchoolsTotal, setFreelancers, setStudents } = pricingSlice.actions;
export default pricingSlice.reducer;