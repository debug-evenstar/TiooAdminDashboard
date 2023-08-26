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

type TStateProps = {
    materials: TLibraryMaterials[],
    lessons:any[],
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