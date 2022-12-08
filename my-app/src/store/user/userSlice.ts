import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface userState {
  user: {
    username: String;
    lang: String;
  };
}

interface payloadUserState {
  username: String;
  lang: String;
}

// Define the initial state using that type
const initialState: userState = {
  user: {
    username: "",
    lang: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoginUser: (state, action: PayloadAction<payloadUserState>) => {
      state.user.username = action.payload.username;
      state.user.lang = action.payload.lang;
    },
  },
});

export const { setLoginUser } = userSlice.actions;

export default userSlice.reducer;
