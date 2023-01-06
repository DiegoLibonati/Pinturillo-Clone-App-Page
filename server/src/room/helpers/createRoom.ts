import { Socket } from "socket.io";
import { rooms } from "..";
export const createRoom = (roomId: string, socket: Socket): void => {
  const room = rooms[roomId];

  if (!room) {
    rooms[roomId] = {
      participants: [],
      countdown: 90,
      newPainterSetted: false,
      userPainting: null,
      userWasPainterId: null,
      userWasAPainter: null,
      roomIsStarted: false,
    };
    socket.emit("room-created", { roomId });
    console.log(`ROOM CREATED: ${roomId}`);
  }
};
