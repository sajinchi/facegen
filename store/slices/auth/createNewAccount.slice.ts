import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import { StoreStatusEnum } from "@/store/types/commons/StoreStatusEnum";
import { CreateNewAccountData } from "@/components/auth/CreateNewAccountForm";
import { ICreateNewAccountState } from "@/store/types/states/ICreateNewAccountState";
import { CreateNewAccountService } from "@/services/auth/auth.createnewaccount.service";


const initialState: ICreateNewAccountState = {
    status: StoreStatusEnum.IDLE,
    message: "",
}

export const createNewAccount = createAsyncThunk("auth/createNewAccount", async (data:CreateNewAccountData, thunkApi ) => {
    let res = await CreateNewAccountService(data.first_name, data.last_name, data.username, data.email, data.password, data.login_method);
    console.log(res);
    if (res.status != 201) {
        return thunkApi.rejectWithValue(res.message);
      }
    return res;
})

const CreateNewAccountSlice = createSlice({
    name:'newaccount',
    initialState: initialState,
    reducers:{},
    extraReducers : (builder) => {
        builder.addCase(createNewAccount.pending,(state) =>{
            state.status = StoreStatusEnum.LOADING;
        }),
        builder.addCase(createNewAccount.fulfilled,(state,action) => {
            state.status = StoreStatusEnum.SUCCESS;
            state.message = "Account creation is Succesfull"
        }),
        builder.addCase(createNewAccount.rejected, (state) => {
            state.status = StoreStatusEnum.ERROR;
        })
    },
})

export default CreateNewAccountSlice.reducer;