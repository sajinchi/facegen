import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/store";
import IAuthState from "@/store/types/states/IAuthState";
import { userdata } from "@/store/slices/user/userdata.slice";
import { StoreStatusEnum } from "@/store/types/commons/StoreStatusEnum";

const App = ({ children }: { children: React.ReactNode }) => {
  const auth: IAuthState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (auth.status == StoreStatusEnum.SUCCESS) {
      dispatch(userdata(auth.accessToken));
    }
  }, [auth]);
  return <>{children}</>;
};

export default App;
