import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxToolkitHooks";
import { useCountdown, useIncognito } from "../exports";
import { useEffect } from "react";
import { setWord } from "../../store/exports";

export const CanvasTitle = () => {
  const { word, round, limitRound } = useAppSelector((state) => state.game);
  const { user, users } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const { misteryWord } = word;

  const { roomId } = useParams();
  const { wordToGuess } = useIncognito(misteryWord);
  const { countdown } = useCountdown();

  useEffect(() => {
    if (countdown === 90) {
      const userPainting = users.filter((user) => user.isPainting === true)[0];

      if (userPainting) {
        dispatch(
          setWord({
            misteryWord:
              round === 0
                ? userPainting?.wordRoundZero
                : userPainting?.wordRoundOne,
          })
        );
      }
    }
  }, [countdown, users, round]);

  return (
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
  );
};
