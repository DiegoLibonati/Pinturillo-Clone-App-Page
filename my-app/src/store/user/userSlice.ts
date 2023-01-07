import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/types";
// Define a type for the slice state
interface userState {
  user: User;
  users: Array<User>;
  usersGuessed: Array<User>;
}

interface payload {
  usersUpdate: {
    participants: Array<User>;
  };
  userUpdateScore: {
    users: Array<User>;
    userId: string;
    score: number;
  };
  userUpdatePainters: {
    users: Array<User>;
    user: User;
    userWasPainter: User;
  };
  updatePoints: {
    newPoints: number;
  };
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
    words: [],
  },
  users: [],
  usersGuessed: [],
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoginUser: (state, action: PayloadAction<User>) => {
      state.user.userId = action.payload.userId;
      state.user.username = action.payload.username;
      state.user.isAuth = action.payload.isAuth;
    },
    setOwnerUser: (state) => {
      state.user.isOwner = true;
    },
    setUsers: (state, action: PayloadAction<payload["usersUpdate"]>) => {
      state.users = action.payload.participants;

      state.users.map((user) => {
        if (
          user.userId === state.user.userId &&
          state.user.words.length === 0 &&
          user.words.length > 0
        ) {
          state.user.words = user.words;
          return user;
        }
        return user;
      });
    },
    setNewUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    setDisconnectUser: (state, action: PayloadAction<User>) => {
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
    setNewPoints: (state, action: PayloadAction<payload["updatePoints"]>) => {
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
    usersUpdatePainter: (
      state,
      action: PayloadAction<payload["userUpdatePainters"]>
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
      action: PayloadAction<payload["usersUpdate"]>
    ) => {
      state.users = action.payload.participants;

      if (state.user.isPainting === true) {
        state.user.isPainting = false;
        state.user.wasPainter = true;
      }
    },
    resetUser: (state) => {
      state.user.userId = "";
      state.user.username = "";
      state.user.isAuth = false;
      state.user.isOwner = false;
      state.user.score = 0;
      state.user.isPainting = false;
      state.user.wasPainter = false;
      state.user.guessTheWord = false;
      state.user.words = [];
      state.users = [];
      state.usersGuessed = [];
    },
    updateScores: (
      state,
      action: PayloadAction<payload["userUpdateScore"]>
    ) => {
      state.users = action.payload.users;
      const userFilter = state.users.filter(
        (user) => user.userId === action.payload.userId
      )[0];

      if (state.user.isPainting) {
        state.user.score += 10;
      }

      if (state.user.userId === action.payload.userId) {
        state.user.score = action.payload.score;
        state.user.guessTheWord = true;
      }
      state.usersGuessed.push(userFilter);
    },
    resetUsersRound: (state) => {
      state.user.guessTheWord = false;
      state.user.isPainting = false;
      state.user.wasPainter = false;

      state.usersGuessed = [];

      state.users = state.users.map((user) => {
        user.guessTheWord = false;
        user.isPainting = false;
        user.wasPainter = false;
        return user;
      });
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
  usersUpdatePainter,
  updateUsersFinalRound,
  resetUser,
  updateScores,
  resetUsersRound,
} = userSlice.actions;

export default userSlice.reducer;
