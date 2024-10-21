import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TCouponProps } from "../../apps/administrator/pages/admin/settings/settingsPages/coupon";



const initialState: { reload: boolean, coupons: TCouponProps[], couponModal: boolean } = {
    coupons: [],
    reload: false,
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
        setCouponReload: (state) => {
            state.reload = !state.reload;
        },
        toggleCouponModal: (state) => {
            state.couponModal = !state.couponModal;
        }
    }
})

export const { addCoupon,setCouponReload, setCoupons, clearCoupons } = couponSlice.actions;
export default couponSlice.reducer;