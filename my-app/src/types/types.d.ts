import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export type User = {
  userId: string;
  username: string;
  isAuth: boolean;
  isOwner?: boolean;
  score: number;
  isPainting?: boolean;
  wasPainter?: boolean;
  guessTheWord?: boolean;
  words: Array<string>;
};

export type Message = {
  author: string;
  message: string;
};

export type WordGuess = {
  misteryWord?: string;
  wordToGuess?: string;
  uniqueLettersFromWord?: Array<string>;
};

export type CanvasProps = {
  color?: string;
  size?: number;
  canvasRef?: React.RefObject<HTMLCanvasElement>;
  startDrawing?: ({ nativeEvent }: { nativeEvent: MouseEvent }) => void;
  finishDrawing?: () => void;
  draw?: ({ nativeEvent }: { nativeEvent: MouseEvent }) => void;
  increaseSize?: () => void;
  decreaseSize?: () => void;
  changeColor?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearCanvas?: () => void;
};

export type CountdownProps = {
  countdown: number;
  setCountdown: ActionCreatorWithPayload<
    { countdown: number },
    "game/setCountdown"
  >;
};

export type Rooms = {
  roomId: string;
  lengthParticipants: number;
};
