import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth/auth.slice";
import userdataReducer from "./slices/user/userdata.slice";
import PackageReducer from "./slices/package/package.slice";
import invoiceReducer from "./slices/invoice/invoice.slice";
import getproductReducer from "./slices/product/ProductGet.slice";
import getSubscriptionReducer from "./slices/subscription/subscriptionGet.slice";
import resetpasswordReducer from "./slices/auth/resetpassword.slice";
import forgotpasswordReducer from "./slices/auth/forgotPassword.slice";
import createNewAccountReducer from "./slices/auth/createNewAccount.slice";

const persistConfig = {
    key: 'root',
    storage,
  }

const allReducers = combineReducers({
  auth: authReducer,
  forgotpassword: forgotpasswordReducer,
  newaccount: createNewAccountReducer,
  resetpassword : resetpasswordReducer,
  package: PackageReducer,
  getproduct: getproductReducer,
  getsubscription: getSubscriptionReducer,
  userdata: userdataReducer,
  invoice: invoiceReducer,
})

const persistedReducer = persistReducer(persistConfig, allReducers);
  


export const store = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch