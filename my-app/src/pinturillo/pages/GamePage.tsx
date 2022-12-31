import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { RoomContext } from "../../contexts/exports";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxToolkitHooks";
import { setNewMessage, updateScores } from "../../store/exports";
import uuid from "react-uuid";
import { Loader } from "../../ui/exports";
import { PlayerScores } from "../components/PlayerScores";
import "./GamePage.css";
import { Canvas } from "../components/Canvas";

export const GamePage = () => {
  const [message, setMessage] = useState("");

  const { ws } = useContext(RoomContext);

  const dispatch = useAppDispatch();

  const { roomId } = useParams();

  const { users, user } = useAppSelector((state) => state.user);
  const { messages, word, countdown } = useAppSelector((state) => state.game);
  const { misteryWord } = word;

  const sendMessage = (e) => {
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
      ws.emit(
        "user-guess-word",
        roomId,
        data,
        misteryWordToLowerCase,
        newPoints
      );

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

  return (
    <>
      {countdown === 90 && <Loader></Loader>}
      <main className="main_game_container">
        <PlayerScores></PlayerScores>

        <Canvas></Canvas>

        <section className="chat_container">
          <article className="chat_container_messages">
            {messages.map((message) => {
              return (
                <h2 key={uuid()}>
                  {message.author}: {message.message}
                </h2>
              );
            })}
          </article>

          {!user.guessTheWord && !user.isPainting && (
            <form className="chat_container_input" onSubmit={sendMessage}>
              <input
                type="text"
                placeholder="Write..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></input>
            </form>
          )}
        </section>
      </main>
    </>
  );
};
