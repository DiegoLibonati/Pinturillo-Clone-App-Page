import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./game/gameSlice";
import userSlice from "./user/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    game: gameSlice,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
