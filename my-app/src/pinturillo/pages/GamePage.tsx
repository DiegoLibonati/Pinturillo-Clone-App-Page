import "./GamePage.css";
import { useState, useEffect } from "react";
import { getIncognito } from "../helpers/getIncognito";

export const GamePage = () => {
  const [misteryWord, setMisteryWord] = useState("");

  useEffect(() => {
    setMisteryWord(() => getIncognito("JIRAFA"));
  }, []);

  return (
    <>
      <main className="main_game_container">
        <section className="players_score_container">
          <article className="player_score_container">
            <h2>Diego</h2>
            <h3>30 PTS</h3>
          </article>

          <article className="player_score_container">
            <h2>Diego</h2>
            <h3>30 PTS</h3>
          </article>

          <article className="player_score_container">
            <h2>Diego</h2>
            <h3>30 PTS</h3>
          </article>
        </section>

        <section className="canvas_container">
          <h1>{misteryWord}</h1>
          <canvas id="canvas" width="600px" height="600px"></canvas>
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
