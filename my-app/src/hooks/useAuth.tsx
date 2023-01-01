import { useEffect, useState } from "react";
import { useAppSelector } from "./exports";

interface AuthHook {
  auth: boolean;
}

interface AuthHookState {
  auth: boolean;
}

export const useAuth = (): AuthHook => {
  const [auth, setAuth] = useState<AuthHookState["auth"]>(false);

  const userStates = useAppSelector((state) => state.user);

  const { user } = userStates;

  useEffect(() => {
    if (!user.isAuth) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  }, [user]);

  return {
    auth,
  };
};
