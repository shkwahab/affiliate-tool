import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EstimateRevenueResponse } from "~/types";

const initialState: EstimateRevenueResponse[] =
    [{
        label: "January",
        revenue: 0,
        referralPayout: 0,
    }];

    
const estimateRevenueSlice = createSlice({
    name: "estimateRevenue",
    initialState,
    reducers: {
        setEstimateRevenue: (state, action: PayloadAction<EstimateRevenueResponse[]>) => {
            return action.payload;
        }
    }
});

export const { setEstimateRevenue } = estimateRevenueSlice.actions;

export default estimateRevenueSlice.reducer;
