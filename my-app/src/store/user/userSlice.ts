import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface userState {
  user: {
    userId: String;
    username: String;
    token: String;
    isAuth: Boolean;
  };
}

interface payloadUserState {
  userId: String;
  username: String;
  token: String;
  isAuth: Boolean;
}

// Define the initial state using that type
const initialState: userState = {
  user: {
    userId: "",
    username: "",
    token: "",
    isAuth: false,
  },
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoginUser: (state, action: PayloadAction<payloadUserState>) => {
      state.user.userId = action.payload.userId;
      state.user.username = action.payload.username;
      state.user.token = action.payload.token;
      state.user.isAuth = action.payload.isAuth;
    },
  },
});

export const { setLoginUser } = userSlice.actions;

export default userSlice.reducer;
