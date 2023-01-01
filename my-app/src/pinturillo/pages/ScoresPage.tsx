import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxToolkitHooks";
import { getSortMayorToMinor } from "../exports";
import { RoomContext } from "../../contexts/exports";
import { resetGame, resetUser } from "../../store/exports";
import { NavBar } from "../../ui/exports";
import "./ScoresPage.css";
import { User } from "../../types/types";

export const ScoresPage = () => {
  const { users } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [scores, setScores] = useState<Array<User>>([]);

  useEffect(() => {
    setScores([...users].sort(getSortMayorToMinor));
  }, [users]);

  const { ws } = useContext(RoomContext);
  const { roomId } = useParams();

  const deleteRoom = () => {
    ws.emit("delete-room", roomId);
    dispatch(resetUser());
    dispatch(resetGame());
  };
  return (
    <>
      <NavBar></NavBar>
      <main className="main_container_scores">
        <section className="podium_container">
          {scores && (
            <article className="podium">
              {scores[1]?.username && (
                <div className="podium_second">
                  <h3>{scores[1]?.username}</h3>
                  <h2>2</h2>
                </div>
              )}

              {scores[0]?.username && (
                <div className="podium_first">
                  <h3>{scores[0]?.username}</h3>
                  <h2>1</h2>
                </div>
              )}

              {scores[2]?.username && (
                <div className="podium_third">
                  <h3>{scores[2]?.username}</h3>
                  <h2>3</h2>
                </div>
              )}
            </article>
          )}
        </section>

        <Link to="/" onClick={deleteRoom}>
          HOME
        </Link>
      </main>
    </>
  );
};
