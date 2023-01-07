export interface UserParams {
  userId: string;
  username: String;
  isAuth: Boolean;
  isOwner?: Boolean;
  score: number;
  isPainting?: Boolean;
  wasPainter?: Boolean;
  guessTheWord?: Boolean;
  words?: Array<string>;
}

export interface RoomParams {
  participants: Array<UserParams>;
  countdown: number;
  newPainterSetted: boolean;
  userPainting: UserParams;
  userWasAPainter: UserParams;
  userWasPainterId: string;
  roomIsStarted: boolean;
  userPaintingLeft: boolean;
  totalRounds: 3;
}

export interface MessageData {
  userId: string;
  username: string;
  message: string;
  roomId: string;
}
