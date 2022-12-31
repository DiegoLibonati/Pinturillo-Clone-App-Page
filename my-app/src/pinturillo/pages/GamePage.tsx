import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { RoomContext } from "../../contexts/exports";
import { useCanvas, useCountdown, useIncognito } from "../exports";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxToolkitHooks";
import { setNewMessage, updateScores } from "../../store/exports";
import uuid from "react-uuid";
import { Loader } from "../../ui/exports";
import { PlayerScores } from "../components/PlayerScores";
import "./GamePage.css";

export const GamePage = () => {
  const [message, setMessage] = useState("");

  const { ws } = useContext(RoomContext);
  const { countdown } = useCountdown(90);

  const dispatch = useAppDispatch();

  const {
    color,
    size,
    canvasRef,
    startDrawing,
    finishDrawing,
    draw,
    increaseSize,
    decreaseSize,
    changeColor,
    clearCanvas,
  } = useCanvas();

  const { roomId } = useParams();

  const [misteryWord, setMisteryWord] = useState("");
  const { wordToGuess } = useIncognito(misteryWord, countdown);

  const { users, user } = useAppSelector((state) => state.user);
  const { messages, round, limitRound } = useAppSelector((state) => state.game);

  const sendMessage = (e) => {
    e.preventDefault();
    const messageWordToLowerCase = message.toLowerCase();
    const misteryWordToLowerCase = misteryWord.toLowerCase();

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

  useEffect(() => {
    if (countdown === 90) {
      const userPainting = users.filter((user) => user.isPainting === true)[0];

      if (userPainting) {
        setMisteryWord(
          round === 0 ? userPainting?.wordRoundZero : userPainting?.wordRoundOne
        );
      }
    }
  }, [countdown, users, round]);

  return (
    <>
      {countdown === 90 && <Loader></Loader>}
      <main className="main_game_container">
        <PlayerScores></PlayerScores>

        <section className="canvas_container">
          <article className="canvas_container_title">
            <h2>{countdown}</h2>
            <div className="canvas_container_title_header">
              <h3>Room: {roomId}</h3>
              <h3>
                Round {round}/{limitRound}
              </h3>
            </div>
            <h1>
              {user.isPainting || user.guessTheWord ? misteryWord : wordToGuess}
            </h1>
          </article>
          <article className="canvas_container_toolbox">
            {user.isPainting ? (
              <>
                <button id="increase" onClick={increaseSize}>
                  +
                </button>
                <span id="size">{size}</span>
                <button id="decrease" onClick={decreaseSize}>
                  -
                </button>
                <input
                  type="color"
                  id="color"
                  value={color}
                  onChange={changeColor}
                />
                <button id="clear" onClick={clearCanvas}>
                  B
                </button>
              </>
            ) : (
              <h3>
                {users &&
                  users.filter((user) => user.isPainting === true)[0]
                    ?.username}{" "}
                is painting
              </h3>
            )}
          </article>
          <canvas
            id="canvas"
            onMouseDown={user.isPainting ? startDrawing : undefined}
            onMouseUp={user.isPainting ? finishDrawing : undefined}
            onMouseMove={user.isPainting ? draw : undefined}
            ref={canvasRef}
            width="800"
            height="781"
          ></canvas>
        </section>

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
