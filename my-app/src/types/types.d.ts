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
