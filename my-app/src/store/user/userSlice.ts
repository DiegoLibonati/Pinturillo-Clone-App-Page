import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface userState {
  user: {
    userId: String;
    username: String;
    isAuth: Boolean;
    isOwner?: Boolean;
  };
  users: Array<{
    userId: String;
    username: String;
    isAuth: Boolean;
    isOwner?: Boolean;
  }>;
}

interface payloadUserState {
  userId: String;
  username: String;
  isAuth: Boolean;
  isOwner?: Boolean;
}

interface payloadUsersState {
  users: Array<{
    userId: String;
    username: String;
    isAuth: Boolean;
    isOwner?: Boolean;
  }>;
}

// Define the initial state using that type
const initialState: userState = {
  user: {
    userId: "",
    username: "",
    isAuth: false,
    isOwner: false,
  },
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoginUser: (state, action: PayloadAction<payloadUserState>) => {
      state.user.userId = action.payload.userId;
      state.user.username = action.payload.username;
      state.user.isAuth = action.payload.isAuth;
    },
    setOwnerUser: (state) => {
      state.user.isOwner = true;
    },
    setUsers: (state, action: PayloadAction<payloadUsersState>) => {
      state.users = action.payload.users;
    },
    setNewUser: (state, action: PayloadAction<payloadUserState>) => {
      state.users.push(action.payload);
    },
  },
});

export const { setLoginUser, setOwnerUser, setUsers, setNewUser } =
  userSlice.actions;

export default userSlice.reducer;
