import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: 0
}

const paginatorSlice = createSlice({
    name: 'paginator',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        }

    }
})

export const { setPage } = paginatorSlice.actions;
export default paginatorSlice.reducer;