import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TCouponProps } from "../../pages/admin/settingsPages/coupon";



const initialState: { coupons: TCouponProps[], couponModal: boolean } = {
    coupons: [],
    couponModal: false,
};

export const couponSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setCoupons: (state, action: PayloadAction<TCouponProps[]>) => {
            state.coupons = action.payload;
        },
        addCoupon: (state, action: PayloadAction<TCouponProps>) => {
            state.coupons = [...state.coupons, action.payload];
        },
        clearCoupons: (state) => {
            state.coupons = [];
        },
        toggleCouponModal: (state) => {
            state.couponModal = !state.couponModal;
        }
    }
})

export const { addCoupon, setCoupons, clearCoupons } = couponSlice.actions;
export default couponSlice.reducer;