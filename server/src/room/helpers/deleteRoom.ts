import { rooms } from "..";

export const deleteRoom = (roomId: string): void => {
  if (rooms[roomId]) {
    rooms[roomId] = {
      participants: [],
      countdown: 90,
      newPainterSetted: false,
      userPainting: null,
      userWasAPainter: null,
      userWasPainterId: null,
    };
    delete rooms[roomId];
  }
};
