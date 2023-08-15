
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";



type TExceptionProps = {
    id: number;
    name: string;
    teacher: number;
    student: number;
}
export interface ExceptionState {
    schools: TExceptionProps[],
    students: TExceptionProps[],
    freelancers: TExceptionProps[],
}
const initialState: ExceptionState = {
    schools: [],
    students: [],
    freelancers:[],
}

export const pricingExceptionSlice = createSlice({
    name: "pricing",
    initialState: initialState,
    reducers: {     
        setStudentsException: (state, action: PayloadAction<any[]>) => {
            state.students = action.payload;
        },
        setSchoolsException: (state, action: PayloadAction<any[]>) => {
            state.schools = action.payload;
        },
        setFreelancersException: (state, action: PayloadAction<any[]>) => {
            state.students = action.payload;
        },
    }
})

export const {setStudentsException,setSchoolsException,setFreelancersException} = pricingExceptionSlice.actions;
export default pricingExceptionSlice.reducer;