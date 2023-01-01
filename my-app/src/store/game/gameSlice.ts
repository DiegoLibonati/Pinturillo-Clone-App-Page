import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Message, WordGuess } from "../../types/types";

// Define a type for the slice state
interface gameState {
  messages: Array<Message>;
  round: number;
  limitRound: number;
  countdown: number;
  word: WordGuess;
}

interface payload {
  message: Message;
  word: WordGuess;
  countdown: { countdown: number };
}

// Define the initial state using that type
const initialState: gameState = {
  messages: [{ author: "ROOM", message: "Welcome guys, have fun!" }],
  round: 0,
  limitRound: 2,
  countdown: 90,
  word: {
    misteryWord: "",
    wordToGuess: "",
    uniqueLettersFromWord: [],
  },
};

export const gameSlice = createSlice({
  name: "game",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setNewMessage: (state, action: PayloadAction<payload["message"]>) => {
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
      state.countdown = 90;
    },
    setCountdown: (state, action: PayloadAction<payload["countdown"]>) => {
      state.countdown = action.payload.countdown;
    },
    setWord: (state, action: PayloadAction<payload["word"]>) => {
      if (action.payload.uniqueLettersFromWord) {
        state.word.uniqueLettersFromWord = action.payload.uniqueLettersFromWord;
      }

      if (action.payload.misteryWord) {
        state.word.misteryWord = action.payload.misteryWord;
      }

      if (action.payload.wordToGuess) {
        state.word.wordToGuess = action.payload.wordToGuess;
      }
    },
  },
});

export const {
  setNewMessage,
  setNewRoundGame,
  setCleanChat,
  resetGame,
  setWord,
  setCountdown,
} = gameSlice.actions;

export default gameSlice.reducer;
