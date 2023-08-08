import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { StoreStatusEnum } from "../../types/commons/StoreStatusEnum";
import { IUserData, UserService } from "@/services/user/userget.service";


const initialState = {
  status: StoreStatusEnum.IDLE,
  email: "",
  first_name: "",
  image: "",
  last_name: "",
  login_method: "",
  username: "",
};
export const userdata = createAsyncThunk("user/get", async () => {
    const user: IUserData = await UserService();
    return user;
  }
);

const UserSlice = createSlice({
  name: "userdata",
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