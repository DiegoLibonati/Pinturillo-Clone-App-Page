import { rooms } from "..";

export const startGameRoom = (roomId, socket) => {
  if (rooms[roomId].participants) {
    socket.to(roomId).emit("start-game-room", roomId);
  }
};
