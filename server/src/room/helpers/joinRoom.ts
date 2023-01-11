import { Socket } from "socket.io";
import { rooms } from "..";
import { UserParams } from "../../types/types";
import { getAllUsers } from "./getAllUsers";
import { leaveRoom } from "./leaveRoom";

export const joinRoom = (
  roomId: string,
  user: UserParams,
  socket: Socket
): void | boolean => {
  if (!rooms[roomId]) return;

  const userInRoom = rooms[roomId].participants.filter(
    (room) => room.userId === user.userId
  );

  const roomParticipants = rooms[roomId].participants;

  if (rooms[roomId].roomIsStarted) return socket.emit("user-not-joined");
  if (userInRoom.length === 0) {
    if (roomParticipants.length === 0) {
      roomParticipants.push({
        ...user,
        isOwner: true,
      });
    } else {
      roomParticipants.push(user);
    }

    socket.join(roomId);
    socket.emit("get-users", {
      roomId: roomId,
      participants: roomParticipants,
    });
    socket.to(roomId).emit("user-joined", { user });
    getAllUsers(socket);
    console.log(`user joined the room: ${roomId} - ${user.userId}`);
  }

  socket.on("disconnect", () => {
    console.log("user left the room", user.userId);
    getAllUsers(socket);
    leaveRoom(roomId, user, socket);
  });
};
