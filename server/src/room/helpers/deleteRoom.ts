import { rooms } from "..";

export const deleteRoom = (roomId: string): void => {
  if (!rooms[roomId]) return;

  rooms[roomId] = {
    participants: [],
    countdown: 90,
    newPainterSetted: false,
    userPainting: null,
    userWasAPainter: null,
    userWasPainterId: null,
    roomIsStarted: false,
    totalRounds: 3,
  };
  delete rooms[roomId];
};
