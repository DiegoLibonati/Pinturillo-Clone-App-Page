import "./GamePage.css";
import { useState, useEffect, useRef } from "react";
import { getIncognito } from "../helpers/getIncognito";
import { useAppSelector } from "../../hooks/ReduxToolkitHooks";

export const GamePage = () => {
  const [misteryWord, setMisteryWord] = useState("");

  const { users } = useAppSelector((state) => state.user);

  useEffect(() => {
    setMisteryWord(() => getIncognito("JIRAFA"));
  }, []);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    contextRef?.current?.beginPath();
    contextRef?.current?.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef?.current?.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }

    const { offsetX, offsetY } = nativeEvent;

    contextRef?.current?.lineTo(offsetX, offsetY);
    contextRef?.current?.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const context = canvas.getContext("2d");
      context?.scale(1, 1);
      context!.lineCap = "round";
      context!.strokeStyle = "red";
      context!.lineWidth = 2;
      contextRef.current = context;
    }
  }, []);
  return (
    <>
      <main className="main_game_container">
        <section className="players_score_container">
          {users.map((user, index) => {
            return (
              <article key={index * 587} className="player_score_container">
                <h2>{user.username}</h2>
                <h3>{user.score?.toString()}</h3>
              </article>
            );
          })}
        </section>

        <section className="canvas_container">
          <h1>{misteryWord}</h1>
          <canvas
            id="canvas"
            width="600px"
            height="600px"
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            ref={canvasRef}
          ></canvas>
          <article className="canvas_container_toolbox">
            <button id="increase">+</button>
            <span id="size">30</span>
            <button id="decrease">-</button>
            <input type="color" id="color" />
            <button id="clear">Clear</button>
          </article>
        </section>

        <section className="chat_container">
          <article className="chat_container_messages">
            <h2>Diego say: pepe</h2>
            <h2>Diego say: pepe</h2>
            <h2>Diego say: pepe</h2>
            <h2>Diego say: pepe</h2>
          </article>

          <form className="chat_container_input">
            <input type="text" placeholder="Write..."></input>
            <button type="submit">Send</button>
          </form>
        </section>
      </main>
    </>
  );
};
