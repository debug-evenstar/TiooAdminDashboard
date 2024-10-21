import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";



export type TLibraryClass = {
    id: number,
    type: string,
    naming: string,
    SchoolManagementId: number,
}

type TStateProps = {
    materials: any[],
    lessons:any[],
    classes: TLibraryClass[],
    textbooks: any[],
    games: any[],
    extra: any[],
    reload: boolean,
}


const initialState: TStateProps = {
    materials: [], 
    lessons: [],
    games: [],
    extra: [],
    textbooks: [],
    classes: [],
    reload: false,
}

const librarySlice = createSlice({
    name: 'library',
    initialState: initialState,
    reducers:{
        setLibraryTextbooks: (state, action: PayloadAction<any[]>) => {
            state.textbooks = action.payload;
        },
        
        setLibraryGames: (state, action: PayloadAction<any[]>) => {
            state.games = action.payload;
        },
        setLibraryExtra: (state, action: PayloadAction<any[]>) => {
            state.extra = action.payload;
        },

        setLibraryLessons: (state, action: PayloadAction<any[]>) => {
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


export const { setLibraryReload, setLibraryClass,setLibraryTextbooks,setLibraryGames, setLibraryExtra, setLibraryLessons }  = librarySlice.actions;
export default librarySlice.reducer;