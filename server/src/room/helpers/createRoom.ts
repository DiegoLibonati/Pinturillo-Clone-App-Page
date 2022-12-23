import { rooms } from "..";
export const createRoom = (roomId, socket) => {
  const room = rooms[roomId];

  if (!room) {
    rooms[roomId] = {
      participants: [],
      countdown: 90,
      newPainterSetted: false,
      userPainting: null,
      userWasAPainter: null,
    };
    socket.emit("room-created", { roomId });
    console.log(`ROOM CREATED: ${roomId}`);
  }
};
