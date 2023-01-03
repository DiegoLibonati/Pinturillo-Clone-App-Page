import { Socket } from "socket.io";

export const getCanvasData = (
  roomId: string,
  base64ImageData: string,
  socket: Socket
): void => {
  socket.to(roomId).emit("canvas-data", base64ImageData);
};
