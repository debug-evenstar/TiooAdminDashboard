import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export type TLibraryMaterials = {
    id: number,
    naming: string,
    description: string,
    age: number,
    library: boolean,
    SchoolManagementId: number,
    lessonCount: number,
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

type TStateProps = {
    materials: TLibraryMaterials[],
    lessons: TLibraryLesson[],
    reload: boolean,
}

const initialState: TStateProps = {
    materials: [
        {
            id: 42,
            naming: "Public Speaking",
            description: "how to speak in a public setting",
            age: 16,
            library: true,
            SchoolManagementId: 3,
            lessonCount: 2,
        }
        
    ], 
    lessons: [],
    reload: false,
}

const librarySlice = createSlice({
    name: 'library',
    initialState: initialState,
    reducers:{
        setLibraryMaterials: (state, action: PayloadAction<TLibraryMaterials[]>) => {
            state.materials = action.payload;
        },
        setLibraryLessons: (state, action: PayloadAction<any[]>) => {
            state.lessons = action.payload
        },
        setLibraryReload: (state) => {
            state.reload = !state.reload;
        }
    }
})


export const { setLibraryReload,setLibraryMaterials,setLibraryLessons }  = librarySlice.actions;
export default librarySlice.reducer;