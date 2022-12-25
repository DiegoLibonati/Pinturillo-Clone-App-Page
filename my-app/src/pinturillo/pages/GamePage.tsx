import { useState, useEffect, useContext } from "react";
import { getIncognito } from "../helpers/getIncognito";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxToolkitHooks";
import { useCanvas } from "../hooks/useCanvas";
import { useNavigate, useParams } from "react-router-dom";
import { estrella, pincel } from "../../assets/exports";
import { getSortMayorToMinor } from "../helpers/getSortMayorToMinor";
import { RoomContext } from "../../contexts/socket/RoomContext";
import { setNewMessage } from "../../store/game/gameSlice";
import { useCountdown } from "../hooks/useCountdown";
import { setNewPoints } from "../../store/user/userSlice";
import uuid from "react-uuid";
import "./GamePage.css";
import { Loader } from "../../ui/components/Loader";

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

  const [misteryWordToSolved, setMisteryWordToSolved] = useState("");
  const [misteryWord, setMisteryWord] = useState("");

  const { users, user } = useAppSelector((state) => state.user);
  const { messages, round, limitRound } = useAppSelector((state) => state.game);

  const newArray = [...users].sort(getSortMayorToMinor);

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

      dispatch(setNewPoints({ newPoints }));
    }

    setMessage("");
  };

  useEffect(() => {
    ws.emit("update-score-user", roomId, user);
  }, [user.score]);

  useEffect(() => {
    if (countdown === 90) {
      const userPainting = users.filter((user) => user.isPainting === true)[0];

      if (userPainting) {
        setMisteryWordToSolved(() => getIncognito(userPainting?.word));
        setMisteryWord(userPainting?.word);
      }
    }
  }, [countdown, users]);

  return (
    <>
      {countdown === 90 && <Loader></Loader>}
      <main className="main_game_container">
        <section className="players_score_container">
          {newArray.map((user) => {
            return (
              <article key={uuid()} className="player_score_container">
                <div className="player_score_container_information">
                  <h2>{user.username}</h2>
                  <h3>{user.score?.toString()}</h3>
                </div>
                {(user.wasPainter || user.isPainting) && (
                  <img className="pincel_guess" src={pincel} alt="pincel"></img>
                )}
                {user.guessTheWord && (
                  <img
                    className="image_guess"
                    src={estrella}
                    alt="estrella"
                  ></img>
                )}
              </article>
            );
          })}
        </section>

        <section className="canvas_container">
          <article className="canvas_container_title">
            <h2>{countdown}</h2>
            <div className="canvas_container_title_header">
              <h3>Room: {roomId}</h3>
              <h3>
                Round {round}/{limitRound}
              </h3>
            </div>
            <h1>{user.isPainting ? misteryWord : misteryWordToSolved}</h1>
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
