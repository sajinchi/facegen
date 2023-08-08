import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { authGetFromLocalStorage, authStoreToLocalStorage, parseJwt } from "@/utils/jwt";
// import { persistor } from "../../";
import { LoginResponse } from "../../types/auth/LoginResponse";
import { LoginService } from "@/services/auth/auth.login.service";
import { StoreStatusEnum } from "../../types/commons/StoreStatusEnum";
import { RefreshService } from "@/services/auth/auth.refreshtoken.service";
import IAuthState, {
  ITokenInfo,
  LoginFormData,
} from "../../types/states/IAuthState";

const initialState: IAuthState = authGetFromLocalStorage();

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }: LoginFormData, thunkApi) => {
    const res: LoginResponse = await LoginService(username, password);
    if (res.status != 200) {
      return thunkApi.rejectWithValue(res.message);
    }
    authStoreToLocalStorage(res.access!,res.refresh!);
    const accesstokenstr = parseJwt(res.access!);
    const refreshtokenstr = parseJwt(res.refresh!);
    const response: ITokenInfo = {
      accessToken: res.access!,
      refreshToken: res.refresh!,
      accessExpiresIn: accesstokenstr.exp,
      refreshExpiresIn: refreshtokenstr.exp,
      userId: accesstokenstr.user_id,
    };
    return response;
  }
);
export const refresh = createAsyncThunk(
  "auth/refresh",
  async (token: string, thunkApi) => {
    const res: LoginResponse = await RefreshService(token);
    if (res.status != 200) {
      return thunkApi.rejectWithValue(res.message);
    }
    authStoreToLocalStorage(res.access!,res.refresh!);
    const accesstokenstr = parseJwt(res.access!);
    const refreshtokenstr = parseJwt(res.refresh!);
    const response: ITokenInfo = {
      accessToken: res.access!,
      refreshToken: res.refresh!,
      accessExpiresIn: accesstokenstr.exp,
      refreshExpiresIn: refreshtokenstr.exp,
      userId: accesstokenstr.user_id,
    };
    return response;
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout(state){
      state.status = StoreStatusEnum.IDLE;
      state.message = "";
      state.accessToken = "";
      state.accessExpiresIn = 0 ;
      state.refreshToken = "";
      state.refreshExpiresIn = 0;
      state.userId = "";
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = StoreStatusEnum.SUCCESS;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.accessExpiresIn = action.payload.accessExpiresIn;
      state.refreshExpiresIn = action.payload.refreshExpiresIn;
      state.userId = action.payload.userId;
    }),
      builder.addCase(login.pending, (state) => {
        state.status = StoreStatusEnum.LOADING;
      }),
      builder.addCase(login.rejected, (state, action) => {
        state.status = StoreStatusEnum.ERROR;
        console.log("rejected");
      }),
      builder.addCase(refresh.fulfilled, (state, action) => {
        state.status = StoreStatusEnum.SUCCESS;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.accessExpiresIn = action.payload.accessExpiresIn;
        state.refreshExpiresIn = action.payload.refreshExpiresIn;
        state.userId = action.payload.userId;
      }),
      builder.addCase(refresh.pending, (state) => {
        state.status = StoreStatusEnum.LOADING;
      }),
      builder.addCase(refresh.rejected, (state, action) => {
        state.status = StoreStatusEnum.ERROR;
        console.log("rejected");
      });
  },
});
export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;
