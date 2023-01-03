import { Socket } from "socket.io";

export const clearCanvas = (roomId: string, socket: Socket): void => {
  socket.to(roomId).emit("clear-canvas");
};
