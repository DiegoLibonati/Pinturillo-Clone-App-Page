import uuid from "react-uuid";
import { estrella, pincel } from "../../assets/exports";
import { useAppSelector } from "../../hooks/ReduxToolkitHooks";
import { getSortMayorToMinor } from "../exports";
import { useMemo } from "react";

export const PlayerScores = () => {
  const { users } = useAppSelector((state) => state.user);
  const newArray = useMemo(() => {
    return [...users].sort(getSortMayorToMinor);
  }, [users]);
  return (
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
            {user.guessTheWord && !user.isPainting && (
              <img className="image_guess" src={estrella} alt="estrella"></img>
            )}
          </article>
        );
      })}
    </section>
  );
};
