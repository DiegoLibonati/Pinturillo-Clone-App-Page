import { rooms } from "..";
import { leaveRoom } from "./leaveRoom";
import randomWords from "ramdom-spanish-words";

export const joinRoom = (roomId, user, socket) => {
  const userInRoom = rooms[roomId].participants.filter(
    (room) => room.userId === user.userId
  );
  const room = rooms[roomId];
  const roomParticipants = rooms[roomId].participants;
  if (room && userInRoom.length === 0) {
    if (roomParticipants.length === 0) {
      roomParticipants.push({
        ...user,
        isOwner: true,
        word: randomWords(1)[0],
      });
    } else {
      roomParticipants.push({ ...user, word: randomWords(1)[0] });
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
