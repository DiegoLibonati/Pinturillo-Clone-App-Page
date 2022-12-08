import { useEffect, useState } from "react";
import { useAppSelector } from "./exports";

export const useAuth = () => {
  const [auth, setAuth] = useState(false);

  const userStates = useAppSelector((state) => state.user);

  const { user } = userStates;

  useEffect(() => {
    if (!user.username) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  }, [user]);

  return {
    auth,
  };
};
