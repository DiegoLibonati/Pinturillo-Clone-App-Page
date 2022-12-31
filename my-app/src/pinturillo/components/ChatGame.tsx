import uuid from "react-uuid";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxToolkitHooks";
import { useState, useContext } from "react";
import { RoomContext } from "../../contexts/exports";
import { useParams } from "react-router-dom";
import { sendMessage } from "../exports";

export const ChatGame = () => {
  const [message, setMessage] = useState("");

  const { ws } = useContext(RoomContext);

  const dispatch = useAppDispatch();

  const { roomId } = useParams();

  const { messages, word, countdown } = useAppSelector((state) => state.game);
  const { user, users } = useAppSelector((state) => state.user);
  const { misteryWord } = word;

  return (
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
        <form
          className="chat_container_input"
          onSubmit={(e) =>
            sendMessage(
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
            )
          }
        >
          <input
            type="text"
            placeholder="Write..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></input>
        </form>
      )}
    </section>
  );
};
