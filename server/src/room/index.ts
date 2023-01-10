import { Socket } from "socket.io";
import { MessageData, RoomParams, UserParams } from "../types/types";
import { clearCanvas } from "./helpers/clearCanvas";
import { createRoom } from "./helpers/createRoom";
import { deleteRoom } from "./helpers/deleteRoom";
import { getAllUsers } from "./helpers/getAllUsers";
import { getCanvasData } from "./helpers/getCanvasData";
import { getCountdown } from "./helpers/getCountdown";
import { getMessage } from "./helpers/getMessage";
import { getNewPainter } from "./helpers/getNewPainter";
import { joinRoom } from "./helpers/joinRoom";
import { resetUsersRound } from "./helpers/resetUsersRound";
import { startGameRoom } from "./helpers/startGameRoom";
import { userGuessWord } from "./helpers/userGuessWord";

export const rooms: Record<string, RoomParams> = {};

export const roomHandler = (socket: Socket) => {
  socket.on("create-room", (roomId: string) => createRoom(roomId, socket));

  socket.on("join-room", (roomId: string, user: UserParams) =>
    joinRoom(roomId, user, socket)
  );

  socket.on("start-game", (roomId: string) => startGameRoom(roomId, socket));

  socket.on("canvas-data", (roomId: string, base64ImageData: string) =>
    getCanvasData(roomId, base64ImageData, socket)
  );

  socket.on("new-message", (data: MessageData) => getMessage(data, socket));

  socket.on("new-painter", (roomId: string) => getNewPainter(roomId, socket));

  socket.on("countdown-event", (roomId: string) =>
    getCountdown(roomId, socket)
  );

  socket.on("clear-canvas", (roomId: string) => clearCanvas(roomId, socket));

  socket.on("delete-room", (roomId: string) => deleteRoom(roomId));

  socket.on(
    "user-guess-word",
    (
      roomId: string,
      data: MessageData,
      misteryWordToLowerCase: string,
      score: number
    ) => userGuessWord(roomId, data, misteryWordToLowerCase, score, socket)
  );

  socket.on("reset-users-round", (roomId: string) => resetUsersRound(roomId));
  socket.on("get-all-rooms", () => getAllUsers(socket));
};
