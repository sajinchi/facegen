import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { StoreStatusEnum } from "@/store/types/commons/StoreStatusEnum";
import { IForgotPasswordState } from "@/store/types/states/IForgotPasswordState";
import { ForgotPasswordService } from "@/services/auth/auth.forgotpassword.service";

const initialState: IForgotPasswordState = {
  status: StoreStatusEnum.IDLE,
  message: "",
}


export const forgorpassword = createAsyncThunk("auth/forgotPassword", async (email:string, thunkApi) => {
    const res = await ForgotPasswordService(email);
    console.log(res?.status);
    if (res.status != 204) {
      return thunkApi.rejectWithValue(res.status);
    }
    return res;
  })


  const ForgotPasswordSlice = createSlice({
    name:'forgotpassword',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(forgorpassword.pending,(state,action) => {
        state.status = StoreStatusEnum.LOADING;
        console.log(action.payload);

      }),
      builder.addCase(forgorpassword.fulfilled, (state, action) => {
        state.status = StoreStatusEnum.SUCCESS;
        console.log(action.payload);
        state.message = "Reset Mail sent"
      }),
      builder.addCase(forgorpassword.rejected, (state,action) => {
        state.status = StoreStatusEnum.ERROR;
        console.log(action.payload);
      })
    },
  })

  export default ForgotPasswordSlice.reducer;