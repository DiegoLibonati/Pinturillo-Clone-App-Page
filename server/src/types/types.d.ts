export interface UserParams {
  userId: string;
  username: String;
  isAuth: Boolean;
  isOwner?: Boolean;
  score: number;
  isPainting?: Boolean;
  wasPainter?: Boolean;
  guessTheWord?: Boolean;
  wordRoundZero?: string;
  wordRoundOne?: string;
}

export interface RoomParams {
  participants: UserParams[];
  countdown: number;
  newPainterSetted: boolean;
  userPainting: UserParams;
  userWasAPainter: UserParams;
  userWasPainterId: string;
  roomIsStarted: boolean;
}

export interface MessageData {
  userId: string;
  username: string;
  message: string;
  roomId: string;
}
