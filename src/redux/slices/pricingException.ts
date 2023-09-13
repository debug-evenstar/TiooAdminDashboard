
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type TExceptionProps = {
    id: number;
    name: string;
    teacher: number;
    student: number;
}

export interface ExceptionState {
    schools: TExceptionProps[];
    students: TExceptionProps[];
    freelancers: TExceptionProps[];
    reload: boolean;
}

const initialState: ExceptionState = {
    schools: [],
    students: [],
    freelancers: [],
    reload: false
}

export const pricingExceptionSlice = createSlice({
    name: "pricingException",
    initialState: initialState,
    reducers: {
        setStudentsException: (state, action: PayloadAction<any[]>) => {
            state.students = action.payload;
        },
        setSchoolsException: (state, action: PayloadAction<any[]>) => {
            state.schools = action.payload;
        },
        setFreelancersException: (state, action: PayloadAction<any[]>) => {
            state.freelancers = action.payload;
        },
        setExceptionReload: (state) => {
            state.reload = !state.reload;
        },
    }
})

export const { setStudentsException, setExceptionReload,setSchoolsException, setFreelancersException } = pricingExceptionSlice.actions;
export default pricingExceptionSlice.reducer;