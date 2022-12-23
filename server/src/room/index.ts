import { Socket } from "socket.io";
import { clearCanvas } from "./helpers/clearCanvas";
import { createRoom } from "./helpers/createRoom";
import { getCanvasData } from "./helpers/getCanvasData";
import { getCountdown } from "./helpers/getCountdown";
import { getMessage } from "./helpers/getMessage";
import { getNewPainter } from "./helpers/getNewPainter";
import { getNewScore } from "./helpers/getNewScore";
import { joinRoom } from "./helpers/joinRoom";
import { startGameRoom } from "./helpers/startGameRoom";

export const rooms: Record<
  string,
  {
    participants: UserParams[];
    countdown: number;
    newPainterSetted: boolean;
    userPainting: UserParams;
    userWasAPainter: UserParams;
  }
> = {};

interface UserParams {
  userId: String;
  username: String;
  isAuth: Boolean;
  isOwner?: Boolean;
  score: number;
  isPainting?: Boolean;
  wasPainter?: Boolean;
  guessTheWord?: Boolean;
}

export interface IRoomParams {
  roomId: string;
  user: {
    userId: String;
    username: String;
    isAuth: Boolean;
    isOwner?: Boolean;
    score: number;
    isPainting?: Boolean;
    wasPainter?: Boolean;
    guessTheWord?: Boolean;
  };
}

export const roomHandler = (socket: Socket) => {
  socket.on("create-room", (roomId) => createRoom(roomId, socket));

  socket.on("join-room", (roomId, user) => joinRoom(roomId, user, socket));

  socket.on("start-game", (roomId) => startGameRoom(roomId, socket));

  socket.on("canvas-data", (roomId, base64ImageData) =>
    getCanvasData(roomId, base64ImageData, socket)
  );

  socket.on("new-message", (data) => getMessage(data, socket));

  socket.on("update-score-user", (roomId, user) =>
    getNewScore(roomId, user, socket)
  );

  socket.on("new-painter", (roomId, userWasPainter) =>
    getNewPainter(roomId, userWasPainter, socket)
  );

  socket.on("countdown-event", (roomId) => getCountdown(roomId, socket));

  socket.on("clear-canvas", (roomId) => clearCanvas(roomId, socket));
};
