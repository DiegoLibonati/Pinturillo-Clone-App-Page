import { Dispatch } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { correct_sound } from "../../assets/exports";
import { setNewMessage, updateScores } from "../../store/exports";
import { User } from "../../types/types";

export const sendMessage = (
  e: React.FormEvent<HTMLFormElement>,
  message: string,
  misteryWord: string | undefined,
  user: User,
  roomId: string | undefined,
  ws: Socket,
  dispatch: Dispatch,
  countdown: number,
  users: Array<User>,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  setModalOpen: (type: string, message: string, component: string) => void
): void => {
  e.preventDefault();
  const messageWordToLowerCase = message.toLowerCase();
  const misteryWordToLowerCase = misteryWord?.toLowerCase();

  const data = {
    userId: user.userId,
    username: user.username,
    message: message,
    roomId: roomId,
  };

  if (messageWordToLowerCase !== misteryWordToLowerCase)
    ws.emit("new-message", data);

  dispatch(setNewMessage({ author: user.username, message: message }));

  if (messageWordToLowerCase === misteryWordToLowerCase) {
    const sumPoints = Math.floor(countdown * 0.5);

    const newPoints = user?.score + sumPoints;

    new Audio(correct_sound).play();
    setModalOpen("", sumPoints.toString(), "guesswordmodal");

    ws.emit("update-painter-score", roomId);
    ws.emit("user-guess-word", roomId, data, misteryWordToLowerCase, newPoints);

    const newUsersArray = users.map((user) => {
      if (user.userId === data.userId) {
        user = { ...user, score: newPoints, guessTheWord: true };
        return user;
      }

      if (user.isPainting) {
        user = { ...user, score: user.score + 10 };
        return user;
      }
      return user;
    });

    dispatch(
      updateScores({
        users: newUsersArray,
        userId: data.userId,
        score: newPoints,
      })
    );
  }

  setMessage("");
};
