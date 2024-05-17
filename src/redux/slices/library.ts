import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export type TTextbookModals = {
    id: number,
    naming: string,
    description: string,
    age: number,
    library: boolean,
    SchoolManagementId: number,
    lessonCount: number,
    tab: number;
}

export type TLibraryLesson = {
    id: number,
    topic: string,
    duration: string,
    curriculum: string | null,
    description: string,
    objective: string,
    additional_instruction: string | null,
    week: string | null,
    start_date: string | null,
    end_date: string | null,
    status: string,
    admin_status: string,
    published: number,
    term: number,
    files: any[],
    age: number,
    library: boolean,
    createdAt: string,
    updatedAt: string,
    GroupId: number | null,
    SubjectId: number,
    ClassId: number | null,
    ChapterId: number | null,
    ClassArms: any[],
    Class: any | null
}

export type TLibraryClass = {
    id: number,
    type: string,
    naming: string,
    SchoolManagementId: number,
}

type TStateProps = {
    materials: TTextbookModals[],
    lessons: TLibraryLesson[],
    classes: TLibraryClass[],
    reload: boolean,
}


const initialState: TStateProps = {
    materials: [], 
    lessons: [],
    classes: [],
    reload: false,
}

const librarySlice = createSlice({
    name: 'library',
    initialState: initialState,
    reducers:{
        setTextbookModals: (state, action: PayloadAction<TTextbookModals[]>) => {
            state.materials = action.payload;
        },
        setLibraryLessons: (state, action: PayloadAction<TLibraryLesson[]>) => {
            state.lessons = action.payload
        },
        setLibraryClass: (state, action: PayloadAction<TLibraryClass[]>) => {
            state.classes = action.payload
        },
        setLibraryReload: (state) => {
            state.reload = !state.reload;
        }
    }
})


export const { setLibraryReload, setLibraryClass,setTextbookModals,setLibraryLessons }  = librarySlice.actions;
export default librarySlice.reducer;