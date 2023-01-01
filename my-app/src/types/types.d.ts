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
