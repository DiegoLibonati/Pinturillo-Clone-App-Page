import { rooms } from "..";

export const getNewPainter = (roomId, socket) => {
  let newPainterSetted = rooms[roomId].newPainterSetted;
  let userPainting = rooms[roomId].userPainting;
  let userWasAPainter = rooms[roomId].userWasAPainter;

  const usersUpdate = rooms[roomId].participants.map((user) => {
    if (!user.wasPainter && !newPainterSetted) {
      rooms[roomId].userWasPainterId = user.userId;
      user.isPainting = true;
      newPainterSetted = true;
      user.guessTheWord = false;
      userPainting = user;
      return user;
    }
    user.isPainting = false;
    user.guessTheWord = false;
    return user;
  });

  rooms[roomId].participants = usersUpdate;

  if (newPainterSetted) {
    socket.emit(
      "new-painter",
      roomId,
      rooms[roomId].participants,
      userPainting,
      userWasAPainter
    );
  }
};
