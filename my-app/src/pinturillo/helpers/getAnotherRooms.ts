import { Socket } from "socket.io-client";

export const getAnotherRooms = (ws: Socket) => {
  ws.emit("get-all-rooms");
};
