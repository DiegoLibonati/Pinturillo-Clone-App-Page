import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// Define a type for the slice state
interface userState {
  user: payloadUserState;
  users: Array<{
    userId: string;
    username: string;
    isAuth: boolean;
    isOwner?: boolean;
    score: number;
    isPainting?: boolean;
    wasPainter?: boolean;
    guessTheWord?: boolean;
  }>;
  usersGuessed: Array<payloadUserState>;
}

interface payloadUserState {
  userId: string;
  username: string;
  isAuth: boolean;
  isOwner?: boolean;
  score: number;
  isPainting?: boolean;
  wasPainter?: boolean;
  guessTheWord?: boolean;
}

interface payloadUsersState {
  users: Array<{
    userId: string;
    username: string;
    isAuth: boolean;
    isOwner?: boolean;
    score: number;
    isPainting?: boolean;
    wasPainter?: boolean;
    guessTheWord?: boolean;
  }>;
}

interface payloadUpdateUserScore {
  users: Array<{
    userId: string;
    username: string;
    isAuth: boolean;
    isOwner?: boolean;
    score: number;
    isPainting?: boolean;
    wasPainter?: boolean;
    guessTheWord?: boolean;
  }>;
  user: {
    userId: string;
    username: string;
    isAuth: boolean;
    isOwner?: boolean;
    score: number;
    isPainting?: boolean;
    wasPainter?: boolean;
    guessTheWord?: boolean;
  };
}

interface payloadUpdatePainters {
  users: Array<{
    userId: string;
    username: string;
    isAuth: boolean;
    isOwner?: boolean;
    score: number;
    isPainting?: boolean;
    wasPainter?: boolean;
    guessTheWord?: boolean;
  }>;
  user: {
    userId: string;
    username: string;
    isAuth: boolean;
    isOwner?: boolean;
    score: number;
    isPainting?: boolean;
    wasPainter?: boolean;
    guessTheWord?: boolean;
  };
  userWasPainter: {
    userId: string;
    username: string;
    isAuth: boolean;
    isOwner?: boolean;
    score: number;
    isPainting?: boolean;
    wasPainter?: boolean;
    guessTheWord?: boolean;
  };
}

interface payloadPoints {
  newPoints: number;
}

// Define the initial state using that type
const initialState: userState = {
  user: {
    userId: "",
    username: "",
    isAuth: false,
    isOwner: false,
    score: 0,
    isPainting: false,
    wasPainter: false,
    guessTheWord: false,
  },
  users: [],
  usersGuessed: [],
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
    setNewPoints: (state, action: PayloadAction<payloadPoints>) => {
      state.user.score = Math.floor(action.payload.newPoints);
      state.user.guessTheWord = true;
      state.usersGuessed.push(state.user);

      state.users = state.users.map((user) => {
        if (user.userId === state.user.userId) {
          user.score = Math.floor(action.payload.newPoints);
          user.guessTheWord = true;
          return user;
        }
        return user;
      });
    },
    updateScoreToAllUsers: (
      state,
      action: PayloadAction<payloadUpdateUserScore>
    ) => {
      state.users = action.payload.users;
      state.usersGuessed.push(action.payload.user);
    },
    usersUpdatePainter: (
      state,
      action: PayloadAction<payloadUpdatePainters>
    ) => {
      state.usersGuessed = [];
      state.user.guessTheWord = false;

      if (
        action.payload.userWasPainter &&
        state.user.userId === action.payload.userWasPainter.userId
      ) {
        state.user = action.payload.userWasPainter;
      }

      if (state.user.userId === action.payload.user.userId) {
        state.user = action.payload.user;
      }
      state.usersGuessed.push(action.payload.user);
      state.users = action.payload.users;
    },
    updateUsersFinalRound: (
      state,
      action: PayloadAction<payloadUsersState>
    ) => {
      state.users = action.payload.users;

      if (state.user.isPainting === true) {
        state.user.isPainting = false;
        state.user.wasPainter = true;
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
  setNewPoints,
  updateScoreToAllUsers,
  usersUpdatePainter,
  updateUsersFinalRound,
} = userSlice.actions;

export default userSlice.reducer;
