import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// Define a type for the slice state
interface userState {
  user: {
    userId: String;
    username: String;
    isAuth: Boolean;
    isOwner?: Boolean;
    score?: Number;
  };
  users: Array<{
    userId: String;
    username: String;
    isAuth: Boolean;
    isOwner?: Boolean;
    score?: Number;
  }>;
}

interface payloadUserState {
  userId: String;
  username: String;
  isAuth: Boolean;
  isOwner?: Boolean;
  score?: Number;
}

interface payloadUsersState {
  users: Array<{
    userId: String;
    username: String;
    isAuth: Boolean;
    isOwner?: Boolean;
    score?: Number;
  }>;
}

// Define the initial state using that type
const initialState: userState = {
  user: {
    userId: "",
    username: "",
    isAuth: false,
    isOwner: false,
    score: 0,
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
    setDisconnectUser: (state, action: PayloadAction<payloadUserState>) => {
      state.users = state.users.filter(
        (user) => user.userId !== action.payload.userId
      );

      if (
        action.payload.isOwner &&
        state.user.userId === state.users[0].userId
      ) {
        state.users[0]["isOwner"] = true;
        state.user.isOwner = true;
      }
    },
  },
});

export const {
  setLoginUser,
  setOwnerUser,
  setUsers,
  setNewUser,
  setDisconnectUser,
} = userSlice.actions;

export default userSlice.reducer;
