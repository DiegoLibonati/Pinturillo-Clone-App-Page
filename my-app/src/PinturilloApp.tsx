import { BrowserRouter } from "react-router-dom";
import { PinturilloRouter } from "./router/exports";
import "./PinturilloApp.css";
import { StreamChat } from "stream-chat";
import Cookies from "universal-cookie";
import { useAppDispatch } from "./hooks/ReduxToolkitHooks";
import { setLoginUser } from "./store/user/userSlice";

export const PinturilloApp = () => {
  const API_KEY = "46crsxsxjddd";
  const client = StreamChat.getInstance(API_KEY);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const dispath = useAppDispatch();

  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then(() => {
        dispath(
          setLoginUser({
            userId: cookies.get("userId"),
            username: cookies.get("username"),
            token: token,
            isAuth: true,
          })
        );
      });
  }

  return (
    <BrowserRouter>
      <PinturilloRouter></PinturilloRouter>
    </BrowserRouter>
  );
};
