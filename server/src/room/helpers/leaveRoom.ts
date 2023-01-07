import { Socket } from "socket.io";
import { rooms } from "..";
import { UserParams } from "../../types/types";

export const leaveRoom = (
  roomId: string,
  user: UserParams,
  socket: Socket
): void => {
  if (!rooms[roomId]) return;

  const roomParticipants = rooms[roomId].participants;

  const userId = user.userId;

  roomParticipants.map((participant) => {
    if (participant.userId === user.userId && participant.isPainting) {
      rooms[roomId].userPaintingLeft = true;
      return;
    }
    return;
  });

  rooms[roomId].participants = roomParticipants.filter(
    (room) => room.userId !== userId
  );

  if (user.isOwner && roomParticipants[0]) {
    roomParticipants[0]["isOwner"] = true;
  }

  socket.to(roomId).emit("user-disconnect", { user });

  if (rooms[roomId].participants.length === 1) {
    delete rooms[roomId];
  }
};
