import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import { ResetPasswordData } from "@/components/auth/ResetPasswordForm";
import { StoreStatusEnum } from "@/store/types/commons/StoreStatusEnum";
import { IResetPasswordState } from "@/store/types/states/IResetPasswordState";
import { ResetPasswordService } from "@/services/auth/auth.resetpassword.service";

const initialState:IResetPasswordState = {
    status: StoreStatusEnum.IDLE,
    message: ""
}

export const resetpassword = createAsyncThunk("auth/ResetPassword",async(data:ResetPasswordData, thunkApi) => {
    let res = await ResetPasswordService(data.uid,data.token,data.password);
    if (res.status !=200) {
        return thunkApi.rejectWithValue(res.status);
    }
    return res;
})



const ResetPasswordSlice = createSlice({
    name:'resetpassword',
    initialState: initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(resetpassword.pending, (state) =>{
            state.status = StoreStatusEnum.LOADING;
        }),
        builder.addCase(resetpassword.fulfilled,(state) => {
            state.status = StoreStatusEnum.SUCCESS;
            state.message = "Reset Password Successfull"
        }),
        builder.addCase(resetpassword.rejected,(state) => {
            state.status = StoreStatusEnum.ERROR;
        })
    },
})

export default ResetPasswordSlice.reducer;