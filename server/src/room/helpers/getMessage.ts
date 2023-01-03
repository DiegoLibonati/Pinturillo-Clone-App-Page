import { Socket } from "socket.io";
import { MessageData } from "../../types/types";

export const getMessage = (data: MessageData, socket: Socket): void => {
  const { username, message, roomId } = data;

  const newMessage = {
    author: username,
    message: message,
  };

  socket.to(roomId).emit("new-message", newMessage);
};
