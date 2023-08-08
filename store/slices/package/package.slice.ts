import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { packagegetservice } from "@/services/packages/package.get.service";
import { StoreStatusEnum } from "@/store/types/commons/StoreStatusEnum";
import { IPackageResponse } from "@/services/packages/package.getsingle.service";
import { IPackage } from "@/types/packages";


export interface PackageData {
  status: StoreStatusEnum;
  data: IPackage[];
}

const initialState: PackageData = {
  status: StoreStatusEnum.IDLE,
  data: [],
};

export const getpackage = createAsyncThunk("packages/packageList",async (thunkApi) => {
    let res = await packagegetservice();
    console.log(res);
    return res.data;
  }
);


const PackageSlice = createSlice({
    name: "package",
    initialState: initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getpackage.pending, (state)=>{
            state.status = StoreStatusEnum.LOADING;
        }),
        builder.addCase(getpackage.fulfilled, (state,action)=>{
            state.status = StoreStatusEnum.SUCCESS;
            state.data = action.payload!;
        }),
        builder.addCase(getpackage.rejected, (state)=>{
            state.status = StoreStatusEnum.ERROR;
        })
    },
})

export default PackageSlice.reducer;