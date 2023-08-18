import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { StoreStatusEnum } from "../../types/commons/StoreStatusEnum";
import {  IUserDataResponse, UserMeService } from "@/services/user/userget.service";
import { IUserData } from "@/types/IUserData";
import { UserSingle } from "@/services/user/usergetsingle.service";

export interface IUserDataState {
  status: string
  email: string;
  first_name: string;
  image: string;
  last_name: string;
  login_method: string;
  username: string;
}

const initialState:IUserDataState = {
  status: StoreStatusEnum.IDLE,
  email: "",
  first_name: "",
  image: "",
  last_name: "",
  login_method: "",
  username: ""
};
export const userdata = createAsyncThunk("user/get", async () => {
    const user: IUserDataResponse = await UserMeService();
    let result:IUserData = {
      email: user.data?.email!,
      first_name: user.data?.first_name!,
      image: user.data?.image!,
      last_name: user.data?.last_name!,
      login_method: user.data?.login_method!,
      username: user.data?.username!
    }
    return result;

  }
);

const UserSlice = createSlice({
  name: "myuserdata",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userdata.pending,(state) => {
        state.status = StoreStatusEnum.LOADING;
    }),
    builder.addCase(userdata.fulfilled,(state,action)=>{
        state.status = StoreStatusEnum.SUCCESS;
        state.email = action.payload.email!;
        state.first_name = action.payload.first_name!;
        state.image = action.payload.image!;
        state.last_name = action.payload.last_name!;
        state.username = action.payload.username!;
    }),
    builder.addCase(userdata.rejected,(state)=>{
        state.status = StoreStatusEnum.ERROR;
    })
  },
});

export default UserSlice.reducer;