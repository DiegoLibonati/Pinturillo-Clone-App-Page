import { rooms } from "..";

export const leaveRoom = (roomId, user, socket) => {
  if (rooms[roomId]) {
    const userId = user.userId;

    rooms[roomId].participants = rooms[roomId].participants.filter(
      (room) => room.userId !== userId
    );

    if (user.isOwner && rooms[roomId][0]) {
      rooms[roomId].participants[0]["isOwner"] = true;
    }

    socket.to(roomId).emit("user-disconnect", { user });

    if (rooms[roomId].participants.length === 0) {
      delete rooms[roomId];
    }
  }
};
