import { rooms } from "..";

export const deleteRoom = (roomId) => {
  if (rooms[roomId]) {
    delete rooms[roomId];
  }
};
