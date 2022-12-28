import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface gameState {
  messages: Array<{
    author: String;
    message: String;
  }>;
  round: number;
  limitRound: number;
}

interface payloadMessage {
  author: String;
  message: String;
}

interface payloadMessages {
  messages: Array<{
    author: String;
    message: String;
  }>;
}

// Define the initial state using that type
const initialState: gameState = {
  messages: [{ author: "ROOM", message: "Welcome guys, have fun!" }],
  round: 0,
  limitRound: 2,
};

export const gameSlice = createSlice({
  name: "game",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setNewMessage: (state, action: PayloadAction<payloadMessage>) => {
      state.messages.push(action.payload);
    },
    setNewRoundGame: (state) => {
      state.round = state.round + 1;
    },
    setCleanChat: (state) => {
      state.messages = [{ author: "ROOM", message: "Welcome guys, have fun!" }];
    },
    resetGame: (state) => {
      state.messages = [{ author: "ROOM", message: "Welcome guys, have fun!" }];
      state.round = 0;
    },
  },
});

export const { setNewMessage, setNewRoundGame, setCleanChat, resetGame } =
  gameSlice.actions;

export default gameSlice.reducer;
