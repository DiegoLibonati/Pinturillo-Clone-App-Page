import { rooms } from "..";
import { leaveRoom } from "./leaveRoom";

export const joinRoom = (roomId, user, socket) => {
  const userInRoom = rooms[roomId].participants.filter(
    (room) => room.userId === user.userId
  );
  const room = rooms[roomId];
  const roomParticipants = rooms[roomId].participants;
  if (room && userInRoom.length === 0) {
    if (roomParticipants.length === 0) {
      roomParticipants.push({ ...user, isOwner: true });
    } else {
      roomParticipants.push(user);
    }

    socket.join(roomId);
    socket.emit("get-users", {
      roomId: roomId,
      participants: roomParticipants,
    });
    socket.to(roomId).emit("user-joined", { user });
    console.log(`user joined the room: ${roomId} - ${user.userId}`);
  }

  socket.on("disconnect", () => {
    console.log("user left the room", user.userId);
    leaveRoom(roomId, user, socket);
  });
};
