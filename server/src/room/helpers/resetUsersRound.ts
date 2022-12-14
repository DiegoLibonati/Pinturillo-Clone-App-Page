import { rooms } from "..";

export const resetUsersRound = (roomId: string): void => {
  if (!rooms[roomId]) return;

  rooms[roomId].participants = rooms[roomId].participants.map((user) => {
    user.guessTheWord = false;
    user.isPainting = false;
    user.wasPainter = false;
    return user;
  });

  rooms[roomId].newPainterSetted = false;
  rooms[roomId].userPainting = null;
  rooms[roomId].userWasAPainter = null;
  rooms[roomId].userWasPainterId = null;
};
