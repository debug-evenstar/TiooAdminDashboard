import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TSubjectsProps = {
  subjects: any[],
}


const initialState: { subjects: any[], reload: boolean } = {
    subjects: [],
    reload: false
};

export const subjectSlice = createSlice({
    name: 'subject',
    initialState: initialState,
    reducers: {
        setSubjects: (state, action: PayloadAction<any[]>) => {
            state.subjects = action.payload;
        },
        addSubject: (state, action: PayloadAction<TSubjectsProps>) => {
            state.subjects = [...state.subjects, action.payload];
        },
        clearSubjects: (state) => {
            state.subjects = [];
        },
        reloadSubjects: (state) => {
            state.reload = !state.reload;
        }
    }
})

export const { addSubject, setSubjects, clearSubjects , reloadSubjects} = subjectSlice.actions;
export default subjectSlice.reducer;