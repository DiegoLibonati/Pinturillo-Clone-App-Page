import { Socket } from "socket.io";
import { rooms } from "..";

export const startGameRoom = (roomId: string, socket: Socket): void => {
  const roomParticipants = rooms[roomId].participants;

  if (roomParticipants) {
    socket.to(roomId).emit("start-game-room", roomId);

    if (!rooms[roomId].roomIsStarted) rooms[roomId].roomIsStarted = true;
  }
};
