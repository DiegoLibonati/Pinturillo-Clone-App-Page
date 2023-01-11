import { Socket } from "socket.io";
import { rooms } from "..";
import { getAllUsers } from "./getAllUsers";

export const deleteRoom = (roomId: string, socket: Socket): void => {
  if (!rooms[roomId]) return;

  rooms[roomId] = {
    participants: [],
    countdown: 90,
    newPainterSetted: false,
    userPainting: null,
    userWasAPainter: null,
    userWasPainterId: null,
    roomIsStarted: false,
    userPaintingLeft: false,
    totalRounds: 3,
  };
  delete rooms[roomId];
  getAllUsers(socket);
};
