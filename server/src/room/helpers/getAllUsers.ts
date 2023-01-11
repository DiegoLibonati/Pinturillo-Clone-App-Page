import { Socket } from "socket.io";
import { rooms } from "..";

export const getAllUsers = (socket: Socket) => {
  if (Object.keys(rooms).length > 0) {
    const response = [];

    for (const [key, value] of Object.entries(rooms)) {
      if (!rooms[key].roomIsStarted) {
        const objectRoom = {
          roomId: key,
          lengthParticipants: rooms[key].participants.length,
        };

        if (objectRoom.lengthParticipants > 0) response.push(objectRoom);
      }
    }
    socket.emit("get-all-rooms", response);
    socket.broadcast.emit("get-all-rooms", response);
  }
};
