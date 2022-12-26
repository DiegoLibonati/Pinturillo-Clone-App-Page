import { rooms } from "..";

export const userGuessWord = (
  roomId,
  data,
  misteryWordToLowerCase,
  score,
  socket
) => {
  const { userId, message } = data;

  if (misteryWordToLowerCase === message.toLowerCase()) {
    rooms[roomId].participants = rooms[roomId].participants.map((user) => {
      if (user.userId === userId) {
        user.score = score;
        user.guessTheWord = true;
        return user;
      }

      if (user.isPainting) {
        user.score += 10;
        return user;
      }
      return user;
    });

    socket
      .to(roomId)
      .emit("user-guess-word", rooms[roomId].participants, userId, score);
  }
};
