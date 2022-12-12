import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface gameState {}

interface payloadGameState {}

// Define the initial state using that type
const initialState: gameState = {};

export const gameSlice = createSlice({
  name: "game",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoginUser: (state) => {},
  },
});

export const {} = gameSlice.actions;

export default gameSlice.reducer;
