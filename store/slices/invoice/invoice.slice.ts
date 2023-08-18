import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import { getInvoice } from "@/services/invoices/invoice.get.service";
import { StoreStatusEnum } from "@/store/types/commons/StoreStatusEnum";
import { InvoiceData } from "@/store/types/states/IInvoiceState";

const initialState:InvoiceData = {
    status: StoreStatusEnum.IDLE,
    data:[],
};
export const getinvoice = createAsyncThunk("invoice/invoiceGet", async(_, thunkApi)=> {
    let res = await getInvoice();
    if (res.status != 200) {
        return thunkApi.rejectWithValue(res.message);
      }      
    return res.data;
})

const InvoiceSlice = createSlice({
    name: "invoice",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getinvoice.pending, (state)=>{
            state.status = StoreStatusEnum.LOADING;
        }),
        builder.addCase(getinvoice.fulfilled, (state,action)=> {
            state.status = StoreStatusEnum.SUCCESS;
            state.data = action.payload!;
        }),
        builder.addCase(getinvoice.rejected, (state)=> {
            state.status = StoreStatusEnum.ERROR;
        })
    },
})

export default InvoiceSlice.reducer;