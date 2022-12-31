import { setNewMessage, updateScores } from "../../store/exports";

export const sendMessage = (
  e,
  message,
  misteryWord,
  user,
  roomId,
  ws,
  dispatch,
  countdown,
  users,
  setMessage
) => {
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
    const sumPoints = countdown * 0.5;

    const newPoints = user?.score + sumPoints;

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
