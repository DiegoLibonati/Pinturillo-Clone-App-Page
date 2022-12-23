import { rooms } from "..";

export const startGameRoom = (roomId, socket) => {
  const roomParticipants = rooms[roomId].participants;

  if (roomParticipants) {
    socket.to(roomId).emit("start-game-room", roomId);
  }
};
