import { subscriptiongetservice } from "@/services/subscription/subscription.get.sevices";
import { StoreStatusEnum } from "@/store/types/commons/StoreStatusEnum";
import { ISubscriptionState } from "@/types/ISubscriptionState";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";


const initialstate:ISubscriptionState = {
    status:StoreStatusEnum.IDLE,
    data: [],
}

export const getsubscription = createAsyncThunk("subscription/subscriptionList",async (thunkApi) => {
    let res = await subscriptiongetservice();
    return res.data;
  }
);

const GetSubscriptionSlice = createSlice({
    name:'getSubscription',
    initialState: initialstate,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getsubscription.pending,(state) => {
            state.status = StoreStatusEnum.LOADING;
        }),
        builder.addCase(getsubscription.fulfilled,(state, action) => {
            state.status = StoreStatusEnum.SUCCESS;
            state.data = action.payload!;
        }),
        builder.addCase(getsubscription.rejected,(state) => {
            state.status = StoreStatusEnum.ERROR;
        })
    },
})

export default GetSubscriptionSlice.reducer;