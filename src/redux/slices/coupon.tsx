import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TCouponProps } from "../../pages/admin/settingsPages/coupon";



const initialState: { coupons: TCouponProps[]} = {
    coupons: []
};

export const couponSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setCoupons: (state,action: PayloadAction<TCouponProps[]>) => {
            state.coupons = action.payload;
        },
        addCoupon: (state, action: PayloadAction<TCouponProps>) => {
            state.coupons = [...state.coupons,action.payload];
        },
        clearCoupons: (state) => {
            state.coupons = [];
        }
    }
})

export const { addCoupon,setCoupons,clearCoupons } = couponSlice.actions;
export default couponSlice.reducer;