import { Socket } from "socket.io";
import { rooms } from "..";
import { MessageData } from "../../types/types";

export const userGuessWord = (
  roomId: string,
  data: MessageData,
  misteryWordToLowerCase: string,
  score: number,
  socket: Socket
): void => {
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
