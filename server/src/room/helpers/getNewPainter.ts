import { rooms } from "..";

export const getNewPainter = (roomId, userWasPainter = null, socket) => {
  let newPainterSetted = false;
  let userPainting = null;
  let userWasAPainter = null;

  if (userWasPainter) {
    const usersUpdate = rooms[roomId].participants.map((user) => {
      if (user.userId === userWasPainter) {
        userWasAPainter = user;
        user.wasPainter = true;
        user.isPainting = false;
        user.guessTheWord = false;
        return user;
      }
      user.guessTheWord = false;
      return user;
    });

    rooms[roomId].participants = usersUpdate;
  }

  const usersUpdate = rooms[roomId].participants.map((user) => {
    if (!user.wasPainter && !newPainterSetted) {
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
    socket
      .to(roomId)
      .emit(
        "new-painter",
        rooms[roomId].participants,
        userPainting,
        userWasAPainter
      );
  } else {
    socket.to(roomId).emit("final-round", rooms[roomId].participants);
  }
};