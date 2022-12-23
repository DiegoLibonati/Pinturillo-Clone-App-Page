import { rooms } from "..";

export const leaveRoom = (roomId, user, socket) => {
  const room = rooms[roomId];
  const roomParticipants = rooms[roomId].participants;

  if (room) {
    const userId = user.userId;

    rooms[roomId].participants = roomParticipants.filter(
      (room) => room.userId !== userId
    );

    if (user.isOwner && roomParticipants[0]) {
      roomParticipants[0]["isOwner"] = true;
    }

    socket.to(roomId).emit("user-disconnect", { user });

    if (roomParticipants.length === 0) {
      delete rooms[roomId];
    }
  }
};
