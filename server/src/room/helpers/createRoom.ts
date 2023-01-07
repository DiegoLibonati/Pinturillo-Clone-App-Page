import { Socket } from "socket.io";
import { rooms } from "..";
export const createRoom = (roomId: string, socket: Socket): void => {
  if (rooms[roomId]) return;

  rooms[roomId] = {
    participants: [],
    countdown: 90,
    newPainterSetted: false,
    userPainting: null,
    userWasPainterId: null,
    userWasAPainter: null,
    roomIsStarted: false,
    userPaintingLeft: false,
    totalRounds: 3,
  };
  socket.emit("room-created", { roomId });
  console.log(`ROOM CREATED: ${roomId}`);
};
