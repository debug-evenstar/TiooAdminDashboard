import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TFreelancersProps = {


    freelancer: {
        id: number,
        name: string
        admin: string | undefined,
        email: string
        phone: string,
        account_type: string,
        verification_status: number,
        status: string,
        flag: string,
        createdAt: string,
        school_name: string
        address: null | string
    },
    subjects: {
        subjectInstances: any[],
        count: number
    },
    students: {
        studentInstances: any[],
        count: number
    },
    classes: {
        classInstances: any[],
        count: number
    }
    
    }

const initialState: { freelancers: TFreelancersProps[] } = {
    freelancers: []
};

export const freelancerSlice = createSlice({
    name: 'admin',
    initialState: initialState,
    reducers: {
        setFreelancers: (state, action: PayloadAction<TFreelancersProps[]>) => {
            state.freelancers = action.payload;
        },
        addFreelancer: (state, action: PayloadAction<TFreelancersProps>) => {
            state.freelancers = [...state.freelancers, action.payload];
        },
        clearFreelancers: (state) => {
            state.freelancers = [];
        },

    }
})

export const { addFreelancer, setFreelancers, clearFreelancers } = freelancerSlice.actions;
export default freelancerSlice.reducer;