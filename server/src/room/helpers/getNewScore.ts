import { rooms } from "..";

export const getNewScore = (roomId, user, socket) => {
  if (rooms[roomId].participants) {
    const userId = user.userId;
    const userScore = user.score;

    if (userId && userScore) {
      const usersUpdate = rooms[roomId].participants.map((user) => {
        if (user.userId === userId) {
          user.score = userScore;
          user.guessTheWord = true;
          return user;
        }
        return user;
      });

      rooms[roomId].participants = usersUpdate;

      socket
        .to(roomId)
        .emit("update-score-user", rooms[roomId].participants, user);
    }
  }
};
