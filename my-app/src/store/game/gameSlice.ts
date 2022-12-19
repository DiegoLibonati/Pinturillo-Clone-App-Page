import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface gameState {
  messages: Array<{
    author: String;
    message: String;
  }>;
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
  messages: [{ author: "pepe", message: "jirafa" }],
};

export const gameSlice = createSlice({
  name: "game",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setNewMessage: (state, action: PayloadAction<payloadMessage>) => {
      state.messages.push(action.payload);
    },
  },
});

export const { setNewMessage } = gameSlice.actions;

export default gameSlice.reducer;
