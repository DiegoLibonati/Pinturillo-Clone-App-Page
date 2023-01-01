import { ActionCreatorWithPayload, Dispatch } from "@reduxjs/toolkit";

export interface User {
  userId: string;
  username: string;
  isAuth: boolean;
  isOwner?: boolean;
  score: number;
  isPainting?: boolean;
  wasPainter?: boolean;
  guessTheWord?: boolean;
  wordRoundZero: string;
  wordRoundOne: string;
}

export interface Message {
  author: string;
  message: string;
}

export interface WordGuess {
  misteryWord?: string;
  wordToGuess?: string;
  uniqueLettersFromWord?: Array<string>;
}

export interface CanvasProps {
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
}

export interface CountdownProps {
  countdown: number;
  setCountdown: ActionCreatorWithPayload<
    { countdown: number },
    "game/setCountdown"
  >;
}
