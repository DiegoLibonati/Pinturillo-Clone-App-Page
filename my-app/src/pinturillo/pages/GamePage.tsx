import "./GamePage.css";
import { useState, useEffect, useMemo } from "react";
import { getIncognito } from "../helpers/getIncognito";
import { useAppSelector } from "../../hooks/ReduxToolkitHooks";
import { useCanvas } from "../hooks/useCanvas";
import { useParams } from "react-router-dom";
import { pincel } from "../../assets/exports";
import { getSortMayorToMinor } from "../helpers/getSortMayorToMinor";

export const GamePage = () => {
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

  const { users, user } = useAppSelector((state) => state.user);

  useEffect(() => {
    setMisteryWord(() => getIncognito("JIRAFA"));
  }, []);

  const newArray = [...users].sort(getSortMayorToMinor);

  return (
    <>
      <main className="main_game_container">
        <section className="players_score_container">
          {newArray.map((user, index) => {
            return (
              <article key={index * 587} className="player_score_container">
                <div className="player_score_container_information">
                  <h2>{user.username}</h2>
                  <h3>{user.score?.toString()}</h3>
                </div>
                <img src={pincel} alt="pincel"></img>
              </article>
            );
          })}
        </section>

        <section className="canvas_container">
          <article className="canvas_container_title">
            <h2>90</h2>
            <div className="canvas_container_title_header">
              <h3>Room: {roomId}</h3>
              <h3>Ronda 1/1</h3>
              <h3>Paiting: Die</h3>
            </div>
            <h1>{misteryWord}</h1>
          </article>
          <article className="canvas_container_toolbox">
            {user.isPainting && (
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
            )}
          </article>
          <canvas
            id="canvas"
            onMouseDown={user.isPainting && startDrawing}
            onMouseUp={user.isPainting && finishDrawing}
            onMouseMove={user.isPainting && draw}
            ref={canvasRef}
            width="800"
            height="781"
          ></canvas>
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
          </form>
        </section>
      </main>
    </>
  );
};
