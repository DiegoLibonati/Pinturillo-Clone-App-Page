import { rooms } from "..";
import { leaveRoom } from "./leaveRoom";

export const joinRoom = (roomId, user, socket) => {
  const userInRoom = rooms[roomId].participants.filter(
    (room) => room.userId === user.userId
  );
  if (rooms[roomId] && userInRoom.length === 0) {
    if (rooms[roomId].participants.length === 0) {
      rooms[roomId].participants.push({ ...user, isOwner: true });
    } else {
      rooms[roomId].participants.push(user);
    }

    socket.join(roomId);
    socket.emit("get-users", {
      roomId: roomId,
      participants: rooms[roomId].participants,
    });
    socket.to(roomId).emit("user-joined", { user });
    console.log(`user joined the room: ${roomId} - ${user.userId}`);
  }

  socket.on("disconnect", () => {
    console.log("user left the room", user.userId);
    leaveRoom(roomId, user, socket);
  });
};
