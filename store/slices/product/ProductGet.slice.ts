import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { IProductState } from '@/types/IProductState';
import { StoreStatusEnum } from '@/store/types/commons/StoreStatusEnum';
import { GetProducts } from '@/services/product/product.get.service';

const initialstate:IProductState = {
    status:StoreStatusEnum.IDLE,
    data: [],
}



export const getproduct = createAsyncThunk("product/productView",async ( _, thunkApi) => {
    let res = await GetProducts();
    if (res.status == 200) {
        return res.data;
    }
    return thunkApi.rejectWithValue(res.message);
})

const GetProductSlice = createSlice({
    name: "getproduct",
    initialState: initialstate,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getproduct.pending,(state)=>{
            state.status = StoreStatusEnum.LOADING;
            state.data = [];
        }),
        builder.addCase(getproduct.fulfilled,(state,action)=>{
            state.status = StoreStatusEnum.SUCCESS;
            state.data = action.payload!;
        }),
        builder.addCase(getproduct.rejected,(state)=>{
            state.status = StoreStatusEnum.ERROR;
            state.data = [];
        })
    },
})

export default GetProductSlice.reducer;